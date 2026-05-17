import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import express from 'express';
import multer from 'multer';

const PORT = 7689;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, parameterLimit: 10000 }));
app.use(express.json({ type: 'application/json' }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ROOT upload directories
const uploadsRoot = path.join(__dirname, '..', 'public', 'uploads');
const mimicRoot = path.join(uploadsRoot, 'mimic-elements');

// Ensure base directories exist
for (const dir of [uploadsRoot, mimicRoot]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Helper function to properly decode UTF-8 filenames from multipart/form-data
// Multer receives filenames encoded as latin1 in multipart/form-data,
// but the actual bytes are UTF-8. We need to interpret the latin1 bytes as UTF-8.
const decodeFilename = (filename) => {
  try {
    // Convert from latin1 (byte-by-byte) to UTF-8
    // This handles the case where UTF-8 bytes are incorrectly interpreted as latin1
    return Buffer.from(filename, 'latin1').toString('utf8');
  } catch (error) {
    // If decoding fails, return original filename
    console.error('Error decoding filename:', error);
    return filename;
  }
};

// Factory to create a Multer storage config for a given base directory
const createStorage = (baseDir) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = req.params.folder || '';
      const targetPath = path.join(baseDir, folder);

      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }

      cb(null, targetPath);
    },
    filename: (req, file, cb) => {
      // Decode the filename properly from latin1 to utf8
      const decodedFilename = decodeFilename(file.originalname);
      cb(null, decodedFilename);
    },
  });

// Multer instances
const uploadGeneral = multer({
  storage: createStorage(uploadsRoot),
  preservePath: true,
});

const uploadMimic = multer({
  storage: createStorage(mimicRoot),
  preservePath: true,
});

// ---------- GENERAL UPLOADS (public/uploads) ----------

// @ts-ignore
app.post('/upload/:folder', uploadGeneral.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const folder = req.params.folder;
  res.json({
    filePath: `/uploads/${folder}/${req.file.filename}`,
  });
});

app.get('/file-info/:folder/:filename', (req, res) => {
  const { folder, filename } = req.params;
  const decodedFilename = decodeURIComponent(filename);
  const filePath = path.join(uploadsRoot, folder, decodedFilename);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.json({
      fileName: decodedFilename,
      fileSize: stats.size, // in bytes
    });
  });
});

app.delete('/uploads/:folder/:filename', (req, res) => {
  const { folder, filename } = req.params;
  const decodedFilename = decodeURIComponent(filename);
  const filePath = path.join(uploadsRoot, folder, decodedFilename);

  fs.stat(filePath, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting file' });
      }

      res.json({ message: 'File deleted successfully' });
    });
  });
});

// ---------- MIMIC ELEMENT UPLOADS (public/uploads/mimic-elements) ----------

// @ts-ignore
app.post('/upload-mimic/:folder', uploadMimic.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const folder = req.params.folder;
  res.json({
    filePath: `/uploads/mimic-elements/${folder}/${req.file.filename}`,
  });
});

app.get('/mimic-file-info/:folder/:filename', (req, res) => {
  const { folder, filename } = req.params;
  const decodedFilename = decodeURIComponent(filename);
  const filePath = path.join(mimicRoot, folder, decodedFilename);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.json({
      fileName: decodedFilename,
      fileSize: stats.size, // in bytes
    });
  });
});

app.delete('/uploads/mimic-elements/:folder/:filename', (req, res) => {
  const { folder, filename } = req.params;
  const decodedFilename = decodeURIComponent(filename);
  const filePath = path.join(mimicRoot, folder, decodedFilename);

  fs.stat(filePath, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting file' });
      }

      res.json({ message: 'File deleted successfully' });
    });
  });
});

// ---------- STATIC FILE SERVING ----------

// Serves everything under public/uploads (including mimic-elements)
app.use('/uploads', express.static(uploadsRoot));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
