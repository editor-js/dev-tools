import { z } from 'zod';

/**
 * Regex for string as version
 */
const versionRegex = /(^|~)*\d+\.\d+\.\d+$/;

/**
 * Configuration for editor.js tool installation from registry
 */
const ToolFromRegistry = z.object({
  name: z.string(),
  version: z.optional(z.string().regex(versionRegex)),
  exportName: z.string().default('default'),
});

/**
 * Configuration for editor.js tool by path
 */
const ToolFromPath = z.object({
  path: z.string(),
  exportName: z.string().default('default'),
});

/**
 * Configuration for Core initiation
 */
const Core = z.object({
  name: z.string().default('@editorjs/editorjs'),
  version: z.optional(z.string().regex(versionRegex)),
  path: z.optional(z.string()),
  exportName: z.string().default('default'),
});

/**
 * Configuration for editor.js setup
 */
const Setup = z.object({
  core: Core,
  tools: z.optional(z.record(z.string(), z.union([ToolFromRegistry, z.string(), ToolFromPath]))),
});

/**
 * Configuration for incoming config file
 */
export const Config = z.object({
  setup: Setup,
  editorConfig: z.optional(z.unknown()),
  extensions: z.optional(z.array(z.unknown())),
});