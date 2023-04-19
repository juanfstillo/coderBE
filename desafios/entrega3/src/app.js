const ProductManager = require("./ProductManager");
const ProductManager1 = new ProductManager("products.json");
app.use(express.urlencoded({extended:true}));

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to index "/" ');
  })

app.get('/products', async (req, res) => {
    const allProducts = await ProductManager1.getProducts();
    const limit = parseInt(req.query.limit)
    if (!limit) {
        res.json(allProducts);
    }else{
        limitedProducts = allProducts.slice(0, limit)
        res.json(limitedProducts)
    }
});

app.get('/products/:productId', async (req, res) => {
    const pId = parseInt(req.params.productId)
    const product = await ProductManager1.getProductById(pId);
    if (product) {
        res.json(product);
     }else{
         const error = {error: 'Producto not found'}
         return res.status(404).send(error)    }
});


app.listen(8080, () => {
    console.log('Server listening to the port 8080');
  });