import { Router } from 'express';

const router = Router();

const auth = (req, res, next) => {
    if(req.session?.user === 'nico' && req.session?.admin) {
        return next()
    }
    return res.status(401).send('error de autorizacion')
}

router.get('/', (req,res)=>{
    res.render('home', { title: "Express" })
})

router.get('/privado', auth, (req,res) => {
    res.send('Si estas viendo esto es porque ya esta logeado')
})

router.post('/setCookie', (req,res)=>{
    const {user, email} = req.body
    res.cookie(user, email, {maxAge:10000})
    res.redirect('/')
})

router.get('/getCookie', (req,res)=>{
    console.log(req.cookies)
    res.redirect('/')
})

router.get('/session', (req,res) => {
    // if(req.session.counter){
    //     req.session.save
    //     req.session.counter++
    //     res.send(`Se ha visitado el sitio ${req.session.counter} veces`)
    // } else{
    //     req.session.counter = 1
    //     res.send("bienvendidos")
    // }
    res.send(req.session)
})

router.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if(!err) res.send("Logout user")
        else res.send({status: 'logout error', body: err})
    })
})

router.get('/login', (req,res) => {
    const { user, password } = req.query
    if(user !== 'nico' || password !== 'nicopass'){
        res.send('login failed')
    }

    req.session.user = user
    req.session.admin = true
    res.send('login successs!')
    
})

// router.get('/login', (req,res) => )

export default router;