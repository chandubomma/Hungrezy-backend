import mongoose from 'mongoose';

const stringToObjectId = (string)=>{
    return new mongoose.Types.ObjectId(string);
}

export {
    stringToObjectId,
}