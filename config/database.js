const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testdbs', 'postgres', 'nishu', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,  // Optional: Disable logging of SQL queries
});

sequelize.authenticate()
    .then(() => {
        console.log('✅ Database connected successfully.');
    })
    .catch((err) => {
        console.error('❌ Unable to connect to the database:', err);
    });
sequelize.sync({ alter: true })
    .then(() => console.log("✅ Database tables updated successfully!"))
    .catch(err => console.error("❌ Error updating tables:", err));

module.exports = sequelize;
