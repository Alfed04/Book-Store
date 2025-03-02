import express from "express";
import { bookModel } from "../models/bookModel.js";
const router = express.Router();

router.get("/",async (req,res)=>{
    try {
        const books = await bookModel.find({})
        if(!books){
            return res.status(404).send({messsage:"Books are not found"})
        }
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({message: error.message})
    }
})

router.post("/",async (req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear ){
            return res.status(400).send({
                message: "Send all required fields , title , author and publishYear too!"
            })
        }
        const title = req.body.title;
        const author = req.body.author;
        const publishYear = req.body.publishYear;

        const book =await bookModel.create({
            title,
            author,
            publishYear
        })
        return res.status(201).send(book);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({
            Error: error,
            ErrorDotMessage: error.message 
        })
    }
})

router.get("/:id",async (req,res)=>{
    try{
    const {id} = req.params;
    const book = await bookModel.findById(id)
    if(!book){
        return res.status(404).json({message: "Book not found"})
    }
    return res.status(200).json(book)
    }catch(error){
        console.log(error.message);
        return res.status(500).send({message: error.message})
    }

})

router.put("/:id", async (req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear ){
                return res.status(400).json({message:"Send all required fields : title, author and publishYear"})
        }
        const title = req.body.title;
        const author = req.body.author;
        const publishYear = req.body.publishYear
        
        const {id} = req.params
        const result = await bookModel.findByIdAndUpdate(id,{
            title,
            author,
            publishYear
        })
        if(!result){
            return res.status(404).json({
                result: result,
                message: "Book not found"
            })
        }
        return res.status(200).json({message: "Book updated successfully"})
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message})
    }
})

router.delete("/:id",async (req,res)=>{
    try{
        const {id} = req.params
        const result = await bookModel.findByIdAndDelete(id)
        if(!result){
            return res.status(404).json({message: "Book not found"});
        }
        return res.status(200).json({message: "Book deleted successfully"})
    }catch(error){
        console.log(error.message);
        return res.status(500).send({message: error.message})
    }
})

export default router;