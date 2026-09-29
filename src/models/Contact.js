const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        contactId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            match: [/^[0-9]{10}$/, "Phone number must contain exactly 10 digits"]
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address"
            ]
        }
    },
    {
        timestamps: true
    }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;