const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// CORS enable karna taaki frontend se error na aaye
app.use(cors());

// Uploads folder create karein agar nahi hai
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer storage setup (Audio file kahan aur kis naam se save hogi)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // 'uploads' folder me save hoga
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Frontend se jo naam aaya wahi rakhenge
    }
});

const upload = multer({ storage: storage });

// API Route jahan frontend audio bhejega
app.post('/upload', upload.single('audio'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log('File received and saved:', req.file.filename);
    
    // File successfully save ho gayi
    res.json({ 
        message: 'File uploaded successfully', 
        filename: req.file.filename 
    });
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});