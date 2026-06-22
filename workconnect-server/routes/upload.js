const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file' });
    const result = await cloudinary.uploader.upload_stream(
      { folder: 'workconnect' },
      (error, resu) => {
        if (error) return res.status(500).json({ message: 'Upload error', error });
        // Not used because upload_stream callback isn't used this way
      }
    );
    // Use upload_stream with a promise wrapper
    const streamifier = require('streamifier');
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'workconnect' }, (error, result) => {
          if (result) resolve(result);
          else reject(error);
        });
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };
    const uploaded = await streamUpload(req.file.buffer);
    res.json({ url: uploaded.secure_url, public_id: uploaded.public_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
