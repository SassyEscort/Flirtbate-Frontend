import { v4 } from 'uuid';

export const gaEventTrigger = (action: string, data: any, credits?: number) => {
  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    if (window.gtag) {
      try {
        // Check if the value is a string but not a JSON object
        const isPlainString = typeof data.value === 'string' && !isJSON(data.value);

        if (!isPlainString) {
          const parsedValue = tryParseJSON(data.value);
          if (parsedValue) {
            const flattenedValue = flattenObject(parsedValue, 'custom_');
            data = { ...data, ...flattenedValue };
          }
        }

        if (action === 'purchase') {
          data = {
            ...data,
            value: credits,
            currency: 'USD',
            transaction_id: v4(),
            items: [{ name: 'purchase', quantity: 1, price: credits }],
            item_name: 'purchase'
          };
        }
      } catch (e) {
        console.error('Error processing value field:', e);
      }
      window.gtag('event', action, data);
    }
  }
};

// Helper function to safely parse JSON
const tryParseJSON = (jsonString: string): any => {
  try {
    const obj = JSON.parse(jsonString);
    if (obj && typeof obj === 'object') {
      return obj;
    }
  } catch (e) {
    console.error('Invalid JSON string:', jsonString);
  }
  return null;
};

// Helper function to check if a string is valid JSON
const isJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

// Helper function to flatten a nested object
const flattenObject = (obj: any, prefix: string = '', parentKey: string = ''): any => {
  return Object.keys(obj).reduce((acc: any, key) => {
    const newKey = `${prefix}${parentKey ? `${parentKey}_` : ''}${key}`.replace(/\./g, '_');
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], prefix, newKey));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {});
};
