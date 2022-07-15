function camelTextToUnderscore(text) {
  return text.replace(/([A-Z])/g, '_$1').toLowerCase();
}

export function objectKeysCamelCaseToUnderscore(obj = {}) {
  if (typeof obj !== 'object') return obj;

  const newObject = {};

  for (const key in obj) {
    const newKey = camelTextToUnderscore(key);
    if (newKey !== key) {
      // new key
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] !== 'object') {
          newObject[newKey] = obj[key];
        } else {
          newObject[newKey] = objectKeysCamelCaseToUnderscore(obj[key]);
        }
      }
    } else {
      if (typeof obj[key] !== 'object') {
        newObject[key] = obj[key];
      } else {
        newObject[key] = objectKeysCamelCaseToUnderscore(obj[key]);
      }
    }
  }

  return newObject;
}
