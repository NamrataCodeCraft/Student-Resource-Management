const express = require('express');
require('dotenv').config();
const { rateLimit } = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const PORT = process.env.PORT || 4000;

const sequelize = require('./config/database'); // Import the sequelize instance
const UserRoute = require('./routes/auth'); // Import the UserRoute
const StudentRoute = require('./routes/student'); // Import the UserRoute


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.use(express.json());
app.use('/api/v1', UserRoute);
app.use('/api/v1', StudentRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, async () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    try {
        await sequelize.sync({ alter: true });
        console.log("✅ Database tables synchronized.");
    } catch (error) {
        console.error("❌ Error syncing database:", error);
    }
});
