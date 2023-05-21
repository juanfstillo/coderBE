import mongoose from 'mongoose';

import db from './db.js';;


const collection = "messages";

const schema = new mongoose.Schema({
  
})

const chatModel = db.model(collection,schema);
export default chatModel;