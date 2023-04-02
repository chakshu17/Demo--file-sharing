const express = require('express');
const routes = new express.Router();
const fileModel = require('../model/file.mode')

/* add files */
routes.post(`/add-files`, async (req, res) => {
    try {
        const file = await new fileModel(req.body)
        if (!file) {
           
            res.status(400).send({
            message: "Please provide a file!",
            data: null
           })
           
            throw new Error("File not updated")
        }
        const saved = await file.save();
        if (!saved) {
            
            res.status(400).send({
            message: "An Error occured while saving your file!",
            data: null
           })
           
            throw new Error("File not updated")
        }
        res.status(200).send({
            message: "File stored",
            data: null
        })
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
})

routes.get(`/files`, async (req, res) => {
    try {
        const file = await  fileModel.find()
        if (!file) {
            
            res.status(400).send({
            message: "We could not get the files please try again!",
            data: null
           })
           
            throw new Error("File not found")
        }

        res.status(200).send({
            message: "File fetched",
            data: file
        })
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
});
module.exports=routes;
