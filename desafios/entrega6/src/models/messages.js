import mongoose from 'mongoose';

import db from './db.js';;


const collection = "messages";

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
      },
    message:{
        type:String
    }
})

const chatModel = db.model(collection,schema);
export default chatModel;