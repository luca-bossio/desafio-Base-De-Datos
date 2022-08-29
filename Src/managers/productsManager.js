import fs from 'fs';
const path = 'src/files/products.json';

class productManager {

    getAllProducts = async () => {
        try {
            if (fs.existsSync(path)) {
                let fileData = await fs.promises.readFile(path, 'utf-8');
                let products = JSON.parse(fileData)
                return products;
            }else{
                return "No hay productos";
            }} catch (error) {console.log("Cannot write file: "+error)};
    }

    saveProduct = async (product) => {
        try{
            let products = await this.getAllProducts ();

            if(products.length === 0){
                product.id=1;
                product.timestamp = new Date().toLocaleString();
                products.push(product);
                await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'));
                return products[product.id] + product.id
            }else{
                product.id = products[products.length-1].id+1;
                product.timestamp = new Date().toLocaleString();
                products.push(product);
                await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'));
            }
            return [product]
        }catch(error){
            console.log("Cannot write file: "+error)
        }
        
    }

    replaceProduct = async (product,id) => {
        let products = await this.getAllProducts();
        console.log(1)
        if (id-1 < products.length){
            product.id = Number(id)
            product.timestamp = products[id-1].timestamp
            products.splice(id-1,1,product)
            await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'));
        }else{
            return 1
        }
    }
    
    getProductById = async (id) =>{
        try {
            let products = await this.getAllProducts();
            if (id-1 <= products.length){
                return products[[id-1]]
            }else{
                return 1
            }
            
        } catch (error) {
            console.log(`El producto ID=> ${id} no existe`)  
        }
    }

    deleteProductById = async (id) =>{
        try {
            let products = await this.getAllProducts();
            if (id-1 <= products.length){
                products.splice(id-1,1)
                await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'));
            }else{
                return 1
            }
            
        } catch (error) {
            console.log(error + "Deleting product")
        }
    }

    deletAllProducts = async () =>{
        try {
            await fs.promises.writeFile(path,"[]");
        } catch (error) {
            console.log(error)
        }
    }
}


export default productManager;