import { PluginSchema } from '@src/PluginSchema';
import { PluginSchemaBase } from '@src/PluginSchemaBase';
import { z } from 'zod';

export type Mixin = typeof mixinSchema.schema;
export type Standalone = typeof standaloneSchema.schema;

// schemas
export const mixinSchema = new PluginSchema(
    ({ object, string, literal }) =>
        object({
            name: string(),
            type: literal('mixin'),
        }),
    {
        type: 'mixin',
    },
    true
);

export const moduleSchema = new PluginSchema(
    ({ object, string, literal }) =>
        object({
            name: string(),
            type: literal('module'),
        }),
    {
        type: 'module',
    }
);

export const standaloneSchema = new PluginSchema(
    ({ object, string, boolean }) =>
        object({
            name: string(),
            description: string(),
            allowExec: boolean(),
        }),
    {
        type: 'standalone',
    }
);

export const advancedSchema = new PluginSchema(
    ({ union, object, string, number }) =>
        union([
            b.schema,
            object({
                hello: string(),
                there: string(),
                count: number(),
            }),
        ]),
    {
        type: 'advanced',
    },
    true
);

const b = new PluginSchemaBase(({ object, string }) =>
    object({
        namespace: string(),
        name: string(),
        description: string(),
    })
);

/* 
type ReaxiBasePlugin = {
    namespace: string;
    name: string;
    description: string;
    enabled: boolean;
    targets?: TargetTypes[]; // todo < - define,
    trigger?: string;
    triggerMode: TriggerMode;
};
*/
