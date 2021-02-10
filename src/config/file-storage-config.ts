import path from 'path';

import { FileStorageConfig } from 'src/infra/console/file-storage';

export const fileStorageConfig: FileStorageConfig = {
  filePath: path.resolve(__dirname, '..', '..', 'data', 'state.json'),
  identInFile: 2,
};
