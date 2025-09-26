require('dotenv').config;
const mongoose = require('mongoose');
const config = require('../../config/config.json');
// const environment = 'production';
const environment = 'development';

const dbCredentials = config[environment];


const connectDB = async () => {
    try {
        let connectionString = "mongodb+srv://" + dbCredentials.user + ":" + dbCredentials.password + dbCredentials.host + dbCredentials.database + "?retryWrites=true&w=majority";

        mongoose.set('strictQuery', false); 

        await mongoose.connect(connectionString); 

        if (environment == 'development') {
            console.log('Both Node and DB Servers are Up In Development Environment!!!');
            console.log(`MongooseServer is running on http://Mongoose:${mongoose.connection.port}`);
        } else {
            console.log('Both Node and DB Servers are Up In Production Environment!!!');
            console.log(`MongooseServer is running on http://Mongoose:${mongoose.connection.port}`);
        }
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;