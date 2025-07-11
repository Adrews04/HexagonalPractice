import mongoose from 'mongoose';

const connectDB = async () =>{
    try{
        const mongoUri = process.env.MONGO_URI;

        if(!mongoUri){
            throw new Error('MONGO_URI is not defined in the .env variables');
        }

        
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB Atlas (or local) successfully');
    }catch (error){
        console.error('Error connectiing to MongoDB: ', error);
        process.exit(1);
    }
}

export default connectDB;