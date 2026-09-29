# Contact Management System

A simple Contact Management System built using **Node.js, Express.js, MongoDB, and Mongoose**.

The application allows users to add, view, update, delete, and search contacts.

---

# 1. Setup Instructions

## Step 1: Install Node.js

Make sure Node.js and npm are installed.

Check the versions:

```bash
node --version
npm --version
```

---

## Step 2: Install Dependencies

Initialize the project:

```bash
npm init -y
```

Install the required packages:

```bash
npm install express mongoose dotenv
```

Install Nodemon for development:

```bash
npm install --save-dev nodemon
```

---

## Step 3: Configure MongoDB

Create a MongoDB Atlas database and obtain the MongoDB connection string.

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
PORT=3000
```

The application uses the following database:

```text
contact_management
```

---

## Step 4: Start the Server

Navigate to the `src` directory:

```bash
cd src
```

Start the application:

```bash
node app.js
```

The server should display:

```text
MongoDB connected successfully
Database: contact_management
Server is running on port 3000
```

---

## Step 5: Open the Application

Open the following URL in a browser:

```text
http://localhost:3000
```

The application provides a simple frontend for managing contacts.

---

# 2. Project Structure

```text
contact-management-system/
│
├── src/
│   ├── models/
│   │   └── Contact.js
│   │
│   ├── app.js
│   └── index.html
│
├── .env
├── package.json
├── package-lock.json
└── Dockerfile
```

---

# 3. Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- HTML
- CSS
- JavaScript
- Postman

---

# 4. Contact Data Format

Each contact contains the following fields:

| Field | Type | Required | Description |
|---|---|---|---|
| contactId | String | Yes | Unique contact ID |
| name | String | Yes | Contact name |
| phone | String | Yes | Exactly 10 digits |
| email | String | Yes | Valid and unique email |

Example contact:

```json
{
    "contactId": "C001",
    "name": "Shaqeeq",
    "phone": "9876543210",
    "email": "shaqeeq@gmail.com"
}
```

---

# 5. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/contacts` | Create a new contact |
| GET | `/contacts` | Get all contacts |
| GET | `/contacts/:id` | Get a single contact |
| PUT | `/contacts/:id` | Update a contact |
| DELETE | `/contacts/:id` | Delete a contact |

---

# 6. API Examples

## 6.1 Create Contact

### Request

```http
POST /contacts
Content-Type: application/json
```

Request body:

```json
{
    "contactId": "C001",
    "name": "Shaqeeq",
    "phone": "9876543210",
    "email": "shaqeeq@gmail.com"
}
```

### Response

```json
{
    "message": "Contact created successfully",
    "contact": {
        "_id": "68d...",
        "contactId": "C001",
        "name": "Shaqeeq",
        "phone": "9876543210",
        "email": "shaqeeq@gmail.com"
    }
}
```

Status:

```text
201 Created
```

---

## 6.2 Get All Contacts

### Request

```http
GET /contacts
```

### Response

```json
{
    "count": 2,
    "contacts": [
        {
            "_id": "68d...",
            "contactId": "C001",
            "name": "Shaqeeq",
            "phone": "9876543210",
            "email": "shaqeeq@gmail.com"
        },
        {
            "_id": "68d...",
            "contactId": "C002",
            "name": "Aswanth",
            "phone": "9876543211",
            "email": "aswanth@gmail.com"
        }
    ]
}
```

Status:

```text
200 OK
```

---

## 6.3 Get a Single Contact

### Request

```http
GET /contacts/C001
```

### Response

```json
{
    "contact": {
        "_id": "68d...",
        "contactId": "C001",
        "name": "Shaqeeq",
        "phone": "9876543210",
        "email": "shaqeeq@gmail.com"
    }
}
```

Status:

```text
200 OK
```

If the contact does not exist:

```json
{
    "message": "Contact not found"
}
```

Status:

```text
404 Not Found
```

---

## 6.4 Update Contact

### Request

```http
PUT /contacts/C001
Content-Type: application/json
```

Request body:

```json
{
    "name": "Shaqeeq Updated",
    "phone": "9876543212",
    "email": "shaqeeq.updated@gmail.com"
}
```

### Response

```json
{
    "message": "Contact updated successfully",
    "contact": {
        "_id": "68d...",
        "contactId": "C001",
        "name": "Shaqeeq Updated",
        "phone": "9876543212",
        "email": "shaqeeq.updated@gmail.com"
    }
}
```

Status:

```text
200 OK
```

---

## 6.5 Delete Contact

### Request

```http
DELETE /contacts/C001
```

### Response

```json
{
    "message": "Contact deleted successfully",
    "contact": {
        "_id": "68d...",
        "contactId": "C001",
        "name": "Shaqeeq Updated",
        "phone": "9876543212",
        "email": "shaqeeq.updated@gmail.com"
    }
}
```

Status:

```text
200 OK
```

---

# 7. Validation

The application validates contact information before saving it to MongoDB.

## Invalid Phone Number

The phone number must contain exactly 10 digits.

Example:

```json
{
    "contactId": "C003",
    "name": "Test User",
    "phone": "12345",
    "email": "test@gmail.com"
}
```

The request will be rejected because the phone number is not 10 digits.

---

## Invalid Email

Example:

```json
{
    "contactId": "C004",
    "name": "Test User",
    "phone": "9876543210",
    "email": "invalid-email"
}
```

The request will be rejected because the email format is invalid.

---

## Duplicate Contact ID

The `contactId` field must be unique.

Example:

```json
{
    "contactId": "C001",
    "name": "Another User",
    "phone": "9876543213",
    "email": "another@gmail.com"
}
```

If `C001` already exists, the request will be rejected.

---

## Duplicate Email

The email field must also be unique.

If an existing email address is used again, MongoDB will reject the duplicate value.

---

# 8. Testing with Postman

The REST APIs can be tested using Postman.

## Create Contact

```text
POST http://localhost:3000/contacts
```

Select:

```text
Body → raw → JSON
```

Enter:

```json
{
    "contactId": "C001",
    "name": "Shaqeeq",
    "phone": "9876543210",
    "email": "shaqeeq@gmail.com"
}
```

---

## Get All Contacts

```text
GET http://localhost:3000/contacts
```

---

## Get One Contact

```text
GET http://localhost:3000/contacts/C001
```

---

## Update Contact

```text
PUT http://localhost:3000/contacts/C001
```

Body:

```json
{
    "name": "Shaqeeq Updated",
    "phone": "9876543212",
    "email": "shaqeeq.updated@gmail.com"
}
```

---

## Delete Contact

```text
DELETE http://localhost:3000/contacts/C001
```

---

# 9. Frontend

The project contains a simple frontend interface using HTML, CSS, and JavaScript.

The frontend provides:

- Add Contact
- View Contacts
- Search Contacts
- Edit Contact
- Delete Contact

Open the application:

```text
http://localhost:3000
```

The frontend communicates with the Express API using JavaScript `fetch()`.

---

# 10. Database

The application uses MongoDB with Mongoose.

Database name:

```text
contact_management
```

Collection name:

```text
contacts
```

---

# 11. API Summary

```text
POST   /contacts       → Create Contact
GET    /contacts       → Get All Contacts
GET    /contacts/:id   → Get One Contact
PUT    /contacts/:id   → Update Contact
DELETE /contacts/:id   → Delete Contact
```

---

# 12. Author

**Shaqeeq**

**Department:** AI & DS

**Roll Number:** 24BAD109

# 13. Postman API Testing
![alt text](images/Postman_1ChSEefk3g.png)
![alt text](images/Postman_ghqkS6SqWm.png)
![alt text](images/Postman_jpAR3mWn1a.png)