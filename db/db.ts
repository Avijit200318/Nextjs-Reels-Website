import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URL!

if(!mongodbUrl){
    throw new Error("please define mongo_uri in env variables");
}

//  define the global variable
let cached = global.mongoose;

if(!cached){
    global.mongoose = {
        connection: null,
        promise: null
    }
}

export const connectToDb = async () => {
    // if we have the chacked, then we also have the connection
    if(cached.connection){
        return cached.connection;
    }

    // if we don't have the cached and there is also no promise. then create a promise for the connection
    if(!cached.promise){
        // ********for production if we have a paid plan*****
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }
        // ********

        mongoose.connect(mongodbUrl, opts).then(() => {
            mongoose.connection
        })
    }

    try{
        cached.connection = await cached.promise;
    }
    catch(error){
        cached.promise = null;
        throw Error;
    }
    return cached.connection;
}