import { SAMPLE_CODE } from './sample-code';

export type SampleFileType = 'cpp' | 'py' | 'js' | 'readme';

export const getNewFileCommitData = (
  path: string,
  fileType: SampleFileType,
) => {
  let content = '',
    message = '';

  switch (fileType) {
    case 'cpp':
      content = SAMPLE_CODE.cpp;
      break;
    case 'js':
      content = SAMPLE_CODE.js;
      break;
    case 'py':
      content = SAMPLE_CODE.py;
      break;
    default:
      content = `# README
This readme file was created using oauth access to your github account with read and write permissions`;
      break;
  }

  message = `added ${path} file`;
  content = Buffer.from(content).toString('base64');

  return { content, message };
};
