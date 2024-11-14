export { default as envConf } from './env';
import './theme.config';
import './device';
import appJson from '../../app.json'

/**
 * App名称
 */
export const appName = appJson.displayName;