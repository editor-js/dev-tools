import { Config } from './types/config.js';
import { PackageInstaller } from './utils/packageInstaller.js';
import config  from '../editorjs.config.js';
import { z } from 'zod';

/**
 * Class editor.js dev tools
 */
class DevTools {
  private readonly parsedConfig: z.infer<typeof Config>;
  private readonly installer: PackageInstaller;

  /**
   * Initiate editor.js dev tools
   */
  constructor() {
    this.parsedConfig = Config.parse(config());
    this.installer = new PackageInstaller(this.parsedConfig.setup.packageManager);
  }

  /**
   * Create editor.js workspace
   */
  public createWorkspace(): void {
    const coreVersion = this.parsedConfig.setup.core.version;

    // check is version in config
    if (coreVersion) {
      // install editor.js by version
      this.installer.installPackage('@editorjs/editorjs', coreVersion);
    }
  }
}

const devTools = new DevTools();

devTools.createWorkspace();