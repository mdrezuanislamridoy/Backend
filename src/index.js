const app = require("./app");

const multer = require("multer");

app.listen(process.env.PORT, () => {
  console.log("Connected to port:", process.env.PORT);
});
