import { Router } from 'express';

const router = Router();

// Inyectar cookies
// router.get('/', (req,res)=>{
//     res.render('home', { title: "Express" })
// })

// router.get('/getCookie', (req,res)=>{
//     console.log(req.cookies)
//     res.redirect('/')
// })

// router.post('/setCookie', (req,res)=>{
//     const {user, email} = req.body
//     res.cookie(user, email, {maxAge:10000})
//     res.redirect('/')
// })



// Session de usuario
router.get('/', (req,res)=>{
    console.log(req.session)
    if (req.query.name) {
        if(req.session.counter){
            req.session.counter++
            res.send(`${req.query.name ||= req.query.name} ha visitado el sitio ${req.session.counter} veces`)
        } else{
            req.session.name = req.query.name
            req.session.counter = 1
            res.send(`Bienvendido ${req.query.name && req.query.name}`)
        }
    } else {
        res.render('home', { title: "Express" })
    }
})



export default router;