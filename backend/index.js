const express = require("express");
const cors = require("cors");

//
const userRoutes = require("./api/routes/userroutes")
const siswaRoutes = require("./api/routes/siswaroutes")

const app = express();
const PORT = 3001;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api/user', userRoutes);
app.use('/api/siswa', siswaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});