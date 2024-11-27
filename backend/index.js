const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const ticketRoutes = require('./routes/ticketRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//Routes

app.get('/',(req,res)=>{
    res.json("Hello Rakesh");
})

app.use('/api/',authRoutes);
app.use('/api/admin',dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use("/uploads", express.static("uploads"));

connectDB(); // Connect Database

const Port = process.env.PORT;

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})