//#region 
const express = require('express')
const router=express.Router()
const research = require('../Controllers/ResearchControl')
router.get('/', research.getAll);
router.get('/:id', research.getOne);
router.post('/', research.add);
router.put('/:id', research.update);
router.delete('/:id', research.delete);

module.exports=router;
//#endregion
