// src/lib/logger.js

/**
 * Logs a message with timestamp and context.
 * @param {string} level - The log level ('info', 'warn', 'error').
 * @param {string} message - The main log message.
 * @param {object} [meta] - Optional metadata for extra context.
 */
export const log = (level, message, meta = {}) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      level: level.toUpperCase(),
      timestamp,
      message,
      ...meta,
    };
  
    switch (level) {
      case 'info':
        console.info(`[INFO] [${timestamp}] ${message}`, meta);
        break;
      case 'warn':
        console.warn(`[WARN] [${timestamp}] ${message}`, meta);
        break;
      case 'error':
        console.error(`[ERROR] [${timestamp}] ${message}`, meta);
        break;
      default:
        console.log(`[LOG] [${timestamp}] ${message}`, meta);
    }
  
    // Future enhancement: Send to Firestore or external log service here
  };
  
  export const logInfo = (message, meta) => log('info', message, meta);
  export const logWarn = (message, meta) => log('warn', message, meta);
  export const logError = (message, meta) => log('error', message, meta);
  