const createId = (): string => {
  const result: string = (Math.random() * 1000).toString();
  return result;
};

export { createId };
