import { Router } from 'express';
import User from '../../models/user.js';
import { createHash, isValidPassword } from "../../utils.js"
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    res.send({status: "success", message: "Usuario registrado"})
    
    /*const { first_name, last_name, email, age, password } = req.body;
    try {
        const newUser = new User({ first_name, last_name, email, age, password });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }//*/
});

router.get("/failregister", async(req,res)=>{
    console.log("Estrategia fallida")
    res.send({error: "Failed!"})
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {
    //const { email, password } = req.body;
    try {
        if (!req.user) return res.status(400).send({status: "Error", error: "Credenciales invalidas"})

            req.session.user={
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                age: req.user.age,
                email: req.user.email
            }
            res.send({status: "Success", payload: req.session.user})

        /*
        if (!email || !password) return res.status(400).send({status: "Error", error: "Valores Incompletos"})
            
        const user = await User.findOne({ email }, { email:1, first_name:1, last_name:1, password:1});
        if (!user) return res.status(400).send({status: "Error", error: "Usuario no encontrado"})
        if (!isValidPassword(user, password)) return res.status(400).send({status: "Error", error:"Contraseña incorrecta"})
        delete user.password
        req.session.user = user
        res.send({status: "Success", payload: user})
        res.redirect('/profile')//*/
    }
    catch (error){
        console.error(error)
    }
    
});

router.get("/faillogin", async(req,res)=>{
    console.log("Login fallido")
    res.send({error: "Failed!"})
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});

export default router;
