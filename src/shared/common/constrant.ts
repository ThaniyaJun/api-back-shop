import path from 'path';

export const ROOT_PATH = path.resolve('');
export const UPLOAD_PATH = path.join(ROOT_PATH, 'upload');
export const PUBLIC_PATH = '/public';

export class LogMessage {
  msgId: string;
  msgUrl: string;
  msgTo: string[];
  msgDetail: string;
  msgStatus: string;
  remark: string;
}
