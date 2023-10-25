const http = require('http');
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const { start, apiRoute } = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

const app = start();

// Middleware
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(xss());
app.use(compression());
app.use(cors());
app.options('*', cors());

// Logging middleware
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Define API routes
apiRoute(app);

const server = http.createServer(app);

// Listen to the specified port
server.listen(config.port, () => {
    logger.info(`Server is running on port ${config.port}`);
});

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        logger.error(`Port ${config.port} is already in use.`);
        process.exit(1);
    } else {
        logger.error(`Server error: ${error.message}`);
        process.exit(1);
    }
});

// Gracefully handle process termination
const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.message}`);
    exitHandler();
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection: ${reason}`);
    exitHandler();
});

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
