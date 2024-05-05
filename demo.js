import express from 'express'; 
import studentRouters from "./router/student.router.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import dotenv from 'dotenv'; 
import cors from 'cors';

const PORT = process.env.PORT || 3000;

dotenv.config();
await connectToMongoDB();

const app = express();
app.use(cors())
app.use(express.json());

app.use ("/api/students", studentRouters);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
