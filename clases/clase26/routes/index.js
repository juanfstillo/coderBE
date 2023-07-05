import express from "express";
const router = express.Router();

router.get('/suma',(req,res)=>{
    res.send(200).send(req.params.num1 + req.params.num2)
})

router.get('/resta');
router.get('/mult');
router.get('/div');
router.get('/listar');
router.get('/login');

export default router;