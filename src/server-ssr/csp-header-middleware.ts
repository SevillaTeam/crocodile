import { expressCspHeader, presets } from '@/utlis/express-csp-header';
import { RequestHandler } from 'express';

const cspConfig = {
  presets,
  policies: {},
  serviceName: 'croco-app',
  useDefaultReportUri: true,
  reportOnly: true
}

export const cspHeader: RequestHandler = expressCspHeader(cspConfig);