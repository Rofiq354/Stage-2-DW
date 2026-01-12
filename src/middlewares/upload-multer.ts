import { Request } from "express";
import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  },
});

const fileFilter = (req: Request, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, file must be jpeg, png, or jpg"), false);
  }
};

const limits = {
  //   fileSize: 5 * 1024 * 1024, // 5 MB
  fileSize: 500 * 1024, // 500 KB
  files: 3, // 3 files
};

export const upload = multer({ storage, fileFilter, limits });
