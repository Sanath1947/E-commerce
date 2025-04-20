import multer from 'multer';
import { Request } from 'express';

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter to allow only GLB and GLTF files
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (
    file.mimetype === 'model/gltf-binary' ||
    file.mimetype === 'model/gltf+json' ||
    // Some systems might not recognize the official MIME types
    file.originalname.endsWith('.glb') ||
    file.originalname.endsWith('.gltf')
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only GLB and GLTF files are allowed.'));
  }
};

// Configure multer with size limits and file filter
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  },
}); 