import { UAParser } from 'ua-parser-js';
import { Request } from 'express';

export function parseUserAgent(req: Request) {
  const parser = new UAParser(req.headers['user-agent']);
  const result = parser.getResult();

  return {
    browser: result.browser.name || 'Unknown',
    platform: result.os.name || 'Unknown',
    device: result.device.type || 'Desktop',
  };
}
