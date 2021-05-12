import { 
  handleLogger,
  handleCors,
  handleBodyRequestParsing,
  handleCompression
} from './common.js';

export default [
  handleLogger,
  handleCors, 
  handleBodyRequestParsing, 
  handleCompression
];
