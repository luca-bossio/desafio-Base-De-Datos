import { Router } from "express";
import productManager from "../managers/productsManager.js";
import userLicense from "../middlewares/usersLicense.js";

const router = Router();

const productService = new productManager();

router.get('/products',(req,res)=>{
    const enviroment = async () =>{
        let products = await productService.getAllProducts();
        res.send(products)
    }
    enviroment()
});

router.get('/products/:ID',(req,res)=>{
    const enviroment = async () =>{
        let id = req.params.ID
        let products = await productService.getProductById(id);
        res.send(products)
    }
    enviroment()
});

router.put('/products/:ID',userLicense,(req,res)=>{
    const enviroment = async () =>{
        let id = req.params.ID
        let newProduct = req.body
        await productService.replaceProduct(newProduct,id)
    };
    enviroment()
})

router.post('/products',userLicense,(req,res)=>{
    const enviroment = async () =>{
        let user = req.body
        productService.saveProduct(user)
        res.send("Producto añadido")
    }
    enviroment()
});

router.delete('/products/:ID',userLicense,(req,res) =>{
    const enviroment = async () =>{
        let id = req.params.ID
        await productService.deleteProductById(id);
    }
    enviroment()
})

export default router