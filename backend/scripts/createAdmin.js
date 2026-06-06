require("dotenv").config()

const bcrypt = require("bcryptjs")

const connectDB = require("../config/db")

const Admin = require("../models/Admin")

const createAdmin = async () => {
    await connectDB();

    const hashedPassword = await bcrypt.hash(
        "Admin123!",
        10
    );

    await Admin.create({
        email: "admin@example.com",
        password: hashedPassword
    });

    console.log("Admin Created")

    process.exit()
}

createAdmin()