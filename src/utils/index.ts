import { exec as _exec } from 'child_process';
import { readdirSync } from 'fs';
import { readJsonSync } from 'fs-extra';
import path from 'path';

import { promisify } from 'util';
import { cache } from './cache';

const exec = promisify(_exec);

const globalPathsCacheOptions = {
    filePath: 'global-root.json',
    ttl: 2592e6, //30d
};

export const isSupportedType = v =>
    typeof v !== 'string' && typeof v !== 'function';

export function filterSupportedTypes(obj) {
    const filteredObjs = isArray(obj) ? supportedTypesInArr(obj) : obj;

    return filteredObjs;
}

// @todo parse it

export function parseObjAsArray(filteredObjs) {
    const count = Object.values(filteredObjs).length;
    if (count === 0) return;

    const parsed = count > 1 ? filteredObjs : Object.values(filteredObjs)[0];
    if (!parsed) return;
    return parsed;
}

function supportedTypesInArr(arr) {
    return arr.filter(item => {
        return (
            typeof item === 'object' &&
            Object.values(item).filter(isSupportedType)
        );
    });
}

function isArray(obj) {
    return Array.isArray(obj);
}

export function push(parsed, arr) {
    if (!parsed) return;
    Array.isArray(parsed)
        ? arr.push(...parsed.flat(Infinity))
        : arr.push(parsed);
}

// ? ---- paths

async function executeCommand(command) {
    const { stdout, stderr } = await exec(command);

    return { stdout, stderr };
}

export const getGlobalModules = async () => {
    const cached = await cache.deserialize(
        'global-root.key',
        globalPathsCacheOptions
    );
    if (cached) return cached as string;

    const { stdout } = await executeCommand('npm root -g');
    const globalModulesPath = stdout.trim();
    await cache.serialize(
        'global-root.key',
        globalModulesPath,
        globalPathsCacheOptions
    );

    return globalModulesPath;
};

export function getPackagePath(globalNpmPath, packageName) {
    return path.join(globalNpmPath, packageName);
}

export function getByFilter(deps, packageFilter) {
    return deps.filter(dep => dep.includes(packageFilter));
}

export async function getInstalledPackages(packageFilter) {
    const deps = await readJsonSync(path.resolve('.', 'package.json'))
        ?.dependencies;

    const filtered = await getByFilter(Object.keys(deps), packageFilter);

    return filtered;
}

export async function getGlobalFilteredPackagesPaths(pkgFilter) {
    const gnm = await getGlobalModules();
    const allPkgs = readdirSync(gnm);

    const filtered = getByFilter(allPkgs, pkgFilter);

    const paths = filtered.map(pkg => getPackagePath(gnm, pkg));

    return paths;
}

export async function loadPlugin(_path: string | object) {
    try {
        const obj: object =
            typeof _path === 'object'
                ? _path
                : await import(_path).catch(e =>
                      console.log(`[${_path}] plugin/module cannot be find`, e)
                  );

        if (!obj) return;

        const target = isArray(obj?.['default'])
            ? obj?.['default']
            : { ...obj, default: undefined };

        return Object.values(target).filter(v => typeof v === 'object');
    } catch (error) {
        console.log(error);
    }
}

export const cacheGlobalModulesPath = async () => {
    const { stdout } = await executeCommand('npm root -g');
    const globalModulesPath = stdout.trim();
    await cache.serialize(
        'global-root.key',
        globalModulesPath,
        globalPathsCacheOptions
    );
};
