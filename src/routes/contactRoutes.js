const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// POST /contacts
router.post("/", async (req, res) => {
    try {
        const { contactId, name, phone, email } = req.body;

        const contact = new Contact({
            contactId,
            name,
            phone,
            email
        });

        const savedContact = await contact.save();

        res.status(201).json({
            message: "Contact created successfully",
            contact: savedContact
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to create contact",
            error: error.message
        });
    }
});

module.exports = router;