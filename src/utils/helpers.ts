import path from 'path';

export const getProjectRoot = () => {
  return path.dirname(require?.main?.filename || '');
};


export const getModuleRoot = () => {
  return path.dirname(__dirname || '');
};
