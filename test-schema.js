import mongoose from "mongoose";

const schema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    }
})

export default mongoose.model('testing', schema, 'testing')
//module.exports = mongoose.model('testing', schema)