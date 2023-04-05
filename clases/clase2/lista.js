const obj = [
    {manzanas:3,
    peras:2},
    {
        manzanas:1,
        peras:2,
        cristianU: 0
    }
]

//obtener todos los tipos de productos

const allProducts = []
obj.forEach(obj=> {
    Object.keys(obj).forEach(producto => {
        if(!allProducts.includes(producto)){
            allProducts.push(producto);
        }
    });
});

console.log(allProducts);