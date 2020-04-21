import appRoot from 'app-root-path';
import winston from 'winston';

const options = {
    file: {
        level: "info",
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.File(options.file)
    ],
    exitOnError: false,
});

export const stream = {
    write: (message) => {
        logger.info(message);
    },
};

logger.debug("Logging initialized at debug level");

export default logger;