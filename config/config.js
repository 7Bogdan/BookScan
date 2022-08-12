import multer from "multer";

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, "text.txt");
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/plain") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let sumQuantity = [
  {
    $group: {
      _id: "quantity",
      sum: {
        $sum: "$quantity",
      },
    },
  },
];
export { storageConfig, fileFilter,sumQuantity };
