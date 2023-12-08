import CodeforcesClient from '@acmascis/codeforces-client';
import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import filterRouter from './routes/filterRoute';


const app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });
    

export const codeForcesClient = new CodeforcesClient(process.env.KEY, process.env.SECRET);
app.use("/filter",filterRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);

