export const toPlain = <T>(data: string | T) => {
  if (typeof data === 'string') return JSON.parse(data) as T;
  return JSON.parse(JSON.stringify(data)) as T;
};

export default toPlain;
