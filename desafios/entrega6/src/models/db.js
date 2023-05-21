import mongoose from 'mongoose';

mongoose.connect(`mongodb+srv://juanstillo:abc123abc123@ecommerce.ywig996.mongodb.net/?retryWrites=true&w=majority`,{
    dbName: 'ecommerce', 
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error to connect MongoDB:'));
db.once('open', () => {
  console.log('Connection succesfully to MongoDB');
});

export default  db;