const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();

app.use(express.json());

const productManager = new ProductManager(100);

app.get("/products", async (req, res) => {
    const products = await productManager.getProducts();
    res.json({
        products,
        status: "success",
    });
});

app.get("/products/:pid", async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);
    res.json({
        product,
        status: "success",
    });
});

app.listen(8080, () => console.log("Servidor iniciado"));