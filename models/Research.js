//#region 
const mongoose= require('mongoose');
const researchSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        // required: true
    },
    publisher:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        // required: true
    },
    type: {
        type:String,
        enum:['research', 'contuct']
    },
},
{ timestamps: true },
{
    versionKey: false,
    strict: true,
  })
module.exports=mongoose.model('Research',researchSchema);
//#endregion
