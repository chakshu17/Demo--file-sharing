const express = require('express');
const routes = new express.Router();
const fileModel = require('../model/file.mode')

/* add files */
routes.post(`/add-files`, async (req, res) => {
    try {
        const file = await new fileModel(req.body)
        if (!file) {
            throw new Error("File not updated")
        }
        const saved = await file.save();
        if (!saved) {
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