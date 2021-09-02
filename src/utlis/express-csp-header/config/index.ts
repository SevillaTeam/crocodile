import {CSPDirectives} from 'csp-header';

import defaultCspPreset from './presets';

export const presets: Partial<CSPDirectives>[] = [
    defaultCspPreset,
];