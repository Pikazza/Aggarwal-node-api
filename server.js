import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'express-jwt';
import db from './config/db-config';
import routes from './routes/index';
import logger from './config/logger';
import Props from'./util/api-properties';
import fs from 'fs';
//import notify from'./util/notification-sender';

const app = express();

const router = express.Router();

app.use(morgan(':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent', 
{ stream: { write: message => logger.info(message.trim()) }}));
app.use(router);

router.use(bodyParser.json({limit: '15mb'}));
router.use(bodyParser.urlencoded({
	extended: true
}));
router.use(cors());
router.options('*', cors());

require('./routes/index')(router);
require('./routes/seller')(router);
require('./routes/customer')(router);
require('./routes/product')(router);
require('./routes/category')(router);
require('./routes/order')(router);
require('./routes/checksum')(router);
require('./routes/notification')(router);
require('./routes/reference-data')(router);
require('./exceptions/error-middleware')(router);


let imgUploadingDir = Props.imageRefPath.uploadPath;
let imgHostingDir = Props.imageRefPath.hostingPath;
if (!fs.existsSync(imgHostingDir)) {
	fs.mkdirSync(imgHostingDir);
}
if (!fs.existsSync(imgUploadingDir)) {
	fs.mkdirSync(imgUploadingDir);
}
router.use(express.static(imgHostingDir));
router.use(express.static(__dirname+'/public'));

process.on('uncaughtException', function(err) {
logger.info( "['uncaughtException'] " + err.stack || err.message );
});

logger.info('log files with rotating feature are located on '+Props.logger.path);
logger.info('Static image files are located on '+Props.imageRefPath.uploadPath);
app.listen(8080, () => logger.info('Server is listening on port: 8080'));