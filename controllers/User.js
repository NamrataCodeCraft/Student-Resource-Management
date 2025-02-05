const User = require("./../models/User");
exports.createUser = async(req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}