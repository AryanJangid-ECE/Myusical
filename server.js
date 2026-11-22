const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Homepage serve karna
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Myusical.html'));
});

// Uploads folder create karna
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Upload API
app.post('/upload', upload.single('audio'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('File received and saved:', req.file.filename);

    res.json({
        message: 'File uploaded successfully',
        filename: req.file.filename
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Backend server running on port ${port}`);
});