'use strict';

const mongoose = require('mongoose');
const logger = require('../config/logger');
const Props = require('../util/api-properties');
const dbUrl = Props.db.url;
const dbName = Props.db.name;

mongoose.connect( dbUrl, {auth : { authdb : dbName } }, function (error) {
    if (error) {
        logger.info("MongoDB connection error: "+error);
    }else{
    	logger.info("mongo db connection successful .. on "+dbUrl)
    }

});

const db = mongoose.connection;
mongoose.set('debug', true);
exports.db = db;
