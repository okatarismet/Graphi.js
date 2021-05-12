import winston from 'winston'
import path from 'path'
import appRoot from 'app-root-path'
const options = {
    file: {
      level: 'info',
      filename: path.join(appRoot.toString(), 'logs', 'main.log'),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: true,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };
  
  let logger = winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
  });
  
  logger.stream = {
    write: function(message) {
      logger.info(message);
    }, 
  };

export default logger