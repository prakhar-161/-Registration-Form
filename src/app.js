const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
require('./database/connect');
const Register = require('./models/students');

const port = process.env.PORT || 3000;

//important
const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

//last
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path));

//hbs partial files
hbs.registerPartials(partials_path);

//setting up view engine
app.set("view engine","hbs");

//since views path is changed
app.set("views",template_path);

app.get('/',(req,res) => {
    res.render('index');
});

app.get('/register',(req,res) => {
    res.render('register');
});

app.get('/login',(req,res) => {
    res.render('login');
});

//create a new user in our database
app.post('/register',async (req,res) => {
    try{
        const registerStudent = new Register({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password
        });

        const registered = await registerStudent.save();
        res.status(201).render("index");

    }catch(error){
        res.status(400).send(error);
    };
});

//check login 
// app.post('/login',async(req,res) => {
//     try{
//         const email = req.body.email;
//         const password = req.body.password;

//         const userEmail = await Register.findOne({email})             //object destructuring can also be applied here.
//         if(userEmail.password === password){
//             alert("Welcome!");
//             res.status(201).render("index");
            
//         }else{
//             alert("Password not matching");
//         }

//     }catch(error){
//         res.status(400).send("Invalid Email");
//     };
// });

app.listen(port,(err) => {
    if(err){
        console.log(`Error in listening to port ${port}`);
    }
    console.log(`Listening to port ${port}`);
});