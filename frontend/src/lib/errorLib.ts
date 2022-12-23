import * as Sentry from '@sentry/browser';
import config from '../config';
import { ErrorInfo } from '../utils/Interfaces';

const isLocal = process.env.NODE_ENV === 'development';

export function initSentry() {
  if (isLocal) {
    return;
  }
  Sentry.init({ dsn: config.SENTRY_DNS });
}

export function logError(error: Error, errorInfo?: any) {
  if (isLocal) {
    return;
  }
  Sentry.withScope((scope) => {
    errorInfo && scope.setExtras(errorInfo);
    Sentry.captureException(error);
  });
}

export function onError(error: any) {
  let errorInfo: ErrorInfo = {};
  let message = error.toString();
  if (!(error instanceof Error) && error.message) {
    errorInfo = error;
    message = error.message;
    error = new Error(message);
    // API errors
  } else if (error.config && error.config.url) {
    errorInfo.url = error.config.url;
  }
  logError(error, errorInfo);
  // alert(message);
}
