const express = require("express");
const { connectDB } = require("./src/config/db");
const userRoutes = require("./src/routes/user.route");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/users", userRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
