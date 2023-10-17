const fs = require("fs");

class ProductManager {
    static id = 0;
    static code = 0;
    static path = "./package.json";

    constructor(stock) {
        this.products = [];
        this.stock = stock;
    }

    addProduct(title, description, price, thumbnail, stock) {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code: ProductManager.code += 1123,
            stock,
            id: ProductManager.id += 1,
        };

        if (!title || title.trim() === "") {
            throw new Error("El título del producto no puede estar vacío");
        }

        if (!description || description.trim() === "") {
            throw new Error("La descripción del producto no puede estar vacía");
        }

        this.products.push(product);

        return product;
    }

    async getProducts() {
        const products = await fs.promises.readFile("./package.json", "utf-8");
        const dbj = JSON.parse(products);

        return dbj;
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find((p) => p.id === id);

        if (!product) {
            return {
                status: "error",
                message: "El producto no existe",
            };
        }

        return product;
    }
}

module.exports = ProductManager;