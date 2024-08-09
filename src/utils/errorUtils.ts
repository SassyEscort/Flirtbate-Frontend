import errorMessages from './errorHandler';

export function getErrorMessage(code: number): string {
  return errorMessages[code] || 'SomethingWent';
}
