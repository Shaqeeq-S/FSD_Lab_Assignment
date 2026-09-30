const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

const Contact = require("./models/Contact");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        dbName: "contact_management"
    })
    .then(() => {
        console.log("MongoDB connected successfully");
        console.log("Database: contact_management");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });


// Frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


// CREATE
app.post("/contacts", async (req, res) => {

    try {

        const contact = new Contact(req.body);

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


// GET ALL
app.get("/contacts", async (req, res) => {

    try {

        const contacts = await Contact.find();

        res.json({
            count: contacts.length,
            contacts
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch contacts",
            error: error.message
        });

    }

});


// GET ONE
app.get("/contacts/:id", async (req, res) => {

    try {

        const contact = await Contact.findOne({
            contactId: req.params.id
        });

        if (!contact) {

            return res.status(404).json({
                message: "Contact not found"
            });

        }

        res.json({
            contact
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch contact",
            error: error.message
        });

    }

});


// UPDATE
app.put("/contacts/:id", async (req, res) => {

    try {

        const contact = await Contact.findOneAndUpdate(
            {
                contactId: req.params.id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!contact) {

            return res.status(404).json({
                message: "Contact not found"
            });

        }

        res.json({
            message: "Contact updated successfully",
            contact
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to update contact",
            error: error.message
        });

    }

});


// DELETE
app.delete("/contacts/:id", async (req, res) => {

    try {

        const contact = await Contact.findOneAndDelete({
            contactId: req.params.id
        });

        if (!contact) {

            return res.status(404).json({
                message: "Contact not found"
            });

        }

        res.json({
            message: "Contact deleted successfully",
            contact
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete contact",
            error: error.message
        });

    }

});


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});