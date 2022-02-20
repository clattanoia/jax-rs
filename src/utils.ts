export const isFunction = (val: any) => typeof val === 'function';

export const isConstructor = (val: any) => {
  try {
    new val();
  } catch (err) {
    return false;
  }
  return true;
};
