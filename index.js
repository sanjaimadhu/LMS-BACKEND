const express = require("express");
const dotenv = require("dotenv");

const app = express();

//import middlewares
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
//middlewares
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "tmp",
  })
);

//routes
const authRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const transactionRoutes = require("./routes/Transaction");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/transaction", transactionRoutes);
app.use("/", (req, res) => {
    res. json({
        status: "LIBRARY MANAGEMENT SYSTEM",
        code: 200
    })
})

//connect to db
const connectDB = require("./config/db");
connectDB();

//cloudinary
const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();
//server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
