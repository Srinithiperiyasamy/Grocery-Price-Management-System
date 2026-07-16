const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/grocery_shop');

    const adminExists = await User.findOne({ email: 'admin@grocery.com' });

    if (adminExists) {
      console.log('Admin user already exists');
      process.exit();
    }

    const admin = new User({
      email: 'admin@grocery.com',
      password: 'password123',
    });

    await admin.save();
    console.log('Admin user seeded: admin@grocery.com / password123');
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
