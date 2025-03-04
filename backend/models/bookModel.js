import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
    {
    title: { type: String, required: true},
    author: { type: String, required: true},
    publishYear: { type: String, required: true}
    },
    {
        timestamps: true
    }
)

export const bookModel = mongoose.model('book',bookSchema)