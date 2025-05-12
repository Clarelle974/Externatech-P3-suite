import { randomUUID } from "node:crypto";
import type { RequestHandler } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/uploads/resumes",
  filename: (req, file, cb) => {
    const name = `${randomUUID()}-${file.originalname}`;
    req.body.picture = name;
    cb(null, name);
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedMimeTypes = ["application/pdf"];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Le fichier doit être au format PDF."));
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

const uploadFile: RequestHandler = (req, res, next) => {
  return upload.single("resume")(req, res, next);
};

export default { uploadFile };
