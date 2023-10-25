export const getConfigVar = (name: string, fallback = undefined) => {
  const value = process.env[name];
  if (value === undefined) {
    if (fallback === undefined) {
      throw new Error(`Missing environment variable: ${name}`);
    }
    return fallback;
  }
  return value;
};
////jud amar kono .env name missing thakle error dekhabe,
