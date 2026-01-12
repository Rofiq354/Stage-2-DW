import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import path from "node:path";

const app = express();
const corsOptions = {
  origin: "http://127.0.0.1:5502",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(rateLimiter);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error('File type must be "image/jpeg" or "image/png"'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // Batasi ukuran file hingga 5MB
  },
});

const uploadMiddleware = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "gallery", maxCount: 2 },
]);

// Rute untuk menangani upload file
app.post(
  "/upload-multiple-files",
  upload.array("photos", 2),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ message: "success", files: req.files });
    } catch (error) {
      next(error);
    }
  }
);

// Rute untuk menangani upload dari field yang berbeda
app.post(
  "/upload-multiple-different-files",
  uploadMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.files);
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const avatar = files?.["avatar"];
      const gallery = files?.["gallery"];

      if (!avatar || !gallery || gallery.length === 0) {
        return res
          .status(400)
          .json({ message: "avatar and gallery is required!" });
      }
      res.status(200).json({
        message: "success",
        avatarFiles: avatar,
        galleryFiles: gallery,
      });
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  "/cors-test",
  cors(corsOptions),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ message: "success" });
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/upload-profile-picture",
  cors(corsOptions),
  upload.single("photo"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ message: "file uploaded", file: req.file });
    } catch (error) {
      next(error);
    }
  }
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});
