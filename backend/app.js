require('dotenv').config();
const mongoose=require('mongoose');
const express=require('express');
const PORT=5000;
const URL=process.env.MONGO_URL;
const errorHandler=require('./middlewares/errHandler');
const app=express();
const hintRoutes=require('./Routes/hintRoute');
const cors=require('cors');
mongoose
  .connect(URL)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

const corsOptions = {
    origin: ["https://coding-club-y7lo.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}; 

app.use(cors(corsOptions));
app.use(express.json());

app.use('/',hintRoutes);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`server is running`);
})