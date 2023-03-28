import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __dirname = fileURLToPath(import.meta.url);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
  });
  
  const upload = multer({
    storage: storage
});

export default upload;