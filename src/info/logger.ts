import winston from 'winston'
import moment from 'moment'

const logFormat = winston.format.printf((info) => {
  return `[${info.level}] [${moment().format('LTS')}]: ${JSON.stringify(info.message, null, 4)}`
});

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(winston.format.colorize(), logFormat)
    })
  ]
});
