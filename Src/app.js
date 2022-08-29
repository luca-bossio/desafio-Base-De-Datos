import express from "express";
import __dirname from './utils.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';

const app = express();

const admin = false

app.listen(8080,()=>console.log("listening on 8080"));

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.use('/api',productRouter);
app.use('/api',cartRouter);

export default admin