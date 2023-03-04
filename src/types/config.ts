import { z } from 'zod';
import { PackageManager } from '../utils/packageInstaller.js';

/**
 * Regex for string as version
 */
const versionRegex = /(^|~)*\d+\.\d+\.\d+$/;

/**
 * Configuration for editor.js tool installation
 */
const ToolSetup = z.object({
  name: z.string(),
  version: z.optional(z.string().regex(versionRegex)),
  path: z.optional(z.string()),
});

/**
 * Configuration for Core initiation
 */
const Core = z.object({
  version: z.optional(z.string().regex(versionRegex)),
  path: z.optional(z.string()),
});

/**
 * Configuration for Tool
 */
const Tool = z.object({}).catchall(z.any());

/**
 * Configuration for Tool tuple
 */
const ToolRecord = z.tuple([
  z.union([ToolSetup, z.string()]),
  Tool,
]);

/**
 * Configuration for editor.js setup
 */
const Setup = z.object({
  core: Core,
  packageManager: z.optional(z.nativeEnum(PackageManager)),
  tools: z.optional(z.array(ToolRecord)),
});

/**
 * Configuration for incoming config file
 */
export const Config = z.object({
  setup: Setup,
  editorConfig: z.object({}).catchall(z.any()),
});