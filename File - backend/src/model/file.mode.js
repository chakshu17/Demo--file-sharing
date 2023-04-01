const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    }
    , fileUrl: {
        type: String,
        required: true,
    },
    fileUploadedBy: {
        type: String,
        required: true,
    }
})
const fileModel = new mongoose.model('file', fileSchema)
module.exports = fileModel
