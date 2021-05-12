import cors from 'cors';
import parser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import winston from '../utils/winston.js'

export const handleLogger = (router) => {
  router.use(morgan('combined',{ stream: winston.stream }));
};

export const handleCors = (router) => {
  router.use(cors({ credentials: true, origin: true }));
  router.use(helmet());
}

export const handleBodyRequestParsing = (router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

export const handleCompression = (router) => {
  router.use(compression());
};
