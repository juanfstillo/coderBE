import mongoose from 'mongoose';

import db from './db.js';

const collection = "products";

const schema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true  
    },
    code:{
        type:String,
        require:true,
        unique:true  
    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        required:false
    },
    stock:{
        type:Number,
        required:true
    },
    thumbnails:{
        type:String,
        required:true
    }
})

const productModel = db.model(collection,schema);
export default productModel;