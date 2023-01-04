const mongoose= require('mongoose');

const SchemaResearch = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publisher:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})
module.exports=mongoose.model('Research',SchemaResearch);
;
