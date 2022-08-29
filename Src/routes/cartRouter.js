import { Router } from "express";
import cartManager from "../managers/cartsManager.js";
import productManager from '../managers/productsManager.js'

const cartService = new cartManager();
const productService = new productManager();

const router = Router();

router.post('/carts',(req,res)=>{
    const enviroment = async () =>{
        let newCart = await cartService.createCart();

        res.send("Carrito Creado ID: " + newCart)
    }
    enviroment()
})

router.delete('/carts/:ID',(req,res)=>{
    const enviroment = async () =>{
        let id = req.params.ID
        await cartService.deleteCartById(id)
        res.send(`Carrito ID:${id} eliminado`)
    }
    enviroment()
})

router.get('/carts/:ID/products',(req,res)=>{
    const enviroment = async () =>{
        let id = req.params.ID
        let cartProducts = await cartService.getProductsById(id)
        res.send(cartProducts)
    }
    enviroment()
})

router.post('/carts/:ID/:productID',(req,res)=>{
    const enviroment = async () =>{
        let id = req.params.ID
        let productId = req.params.productID
        let product = await productService.getProductById(productId)
        await cartService.addProductToCart(id,product)
        res.send("HOLA")
    }
    enviroment()
})

router.delete('/carts/:ID/products/:productID',(req,res)=>{
    const enviroment = async () =>{
        let id = req.params.ID
        let productId = req.params.productID
        await cartService.deleteProductFromCart(id,productId)
        res.send("nice")
    }
    enviroment()
})

export default router