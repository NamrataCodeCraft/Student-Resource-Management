const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const sequelize = require('./config/database');
const User = require('./models/User');  // ✅ Import the User model AFTER sequelize is initialized
const Course = require('./models/Course'); 
const University = require('./models/University');
const UserRoute = require('./routes/user');

app.use(express.json()); // ✅ Middleware to parse JSON requests

// Test API Route
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll(); // ✅ Fetch users using Sequelize
        const Course = await Course.findAll();
        const University = await University.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.use('/api', UserRoute)
// Start the Server
app.listen(PORT, async () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    
    try {
        await sequelize.sync({ alter: true }); // ✅ Sync database tables
        console.log("✅ Database tables synchronized.");
    } catch (error) {
        console.error("❌ Error syncing database:", error);
    }
});
