const dividir = (dividendo,divisor) =>{
    return new Promise((resolve,reject)=>{
        if(divisor === 0){
            reject("No se puede hacer divisiones entre 0")
        }else{
            resolve(dividendo/divisor)
        }
    })
}

dividir(10,0)
.then(resultado=>{
    console.log(resultado)
})
.catch(error=>{
    console.log(error)
})

new Promise(function(resolve,reject){
    setTimeout(()=>resolve(2),1000);
})
.then(result => {
    console.log(result);
    return result * 2;
})
.then(result =>{
    console.log(result);
    return result * 2;
});