export const Ok = (result?: any, message = '') => {
  return { result: result || [], message: message };
};
