const router = require('express').Router();
const Login = require('../models/Login')


//the whole path is /users/login

// login post route
router.post('/login', async (req, res) => {
  try {
    
    const loginData = await Login.findOne({ where: {email: req.body.email } });
    
let error_type={};

    if (!loginData) {
error_type =  {error: "Your password or email is not correct."}
      return res.render("homepage", {error: "Your password or email is not correct."});
    }

    const validatePassword = await loginData.checkPassword(req.body.password);

  

    if (!validatePassword) {
      error_type = {error :"Your password or email is not correct."}
   }

  
     
    req.session.save(() => {
      req.session.user_id = loginData.id
      req.session.email = loginData.email;
      req.session.logged_in = true;
      
      res.render('dashboard', {
        loggedIn: req.session.logged_in,
        error_type
      
      })
    });


} catch (err){
    res.status(400).json(err);
  }
});






//registartion post route

router.post('/register', async  (req, res) => {
  console.log(req.body)
  
  const { first_name, last_name, email, password, password2 } = req.body
  try {
  
    let errors = [];

    if (!first_name || !last_name || !email || !password || !password2) {
      
      errors.push({ message: 'you for got to fill in one of the fields.' });
    }


      if (password !== password2) {
        errors.push({ msg: 'Make sure the passwords match' });
      }

      if (password.length < 8) {
        errors.push({ msg: 'password should be a minimum of 8 characters' });
      } 


      if(errors.length > 0) {
        console.log(errors)
        res.json(errors)

      }else{
        
        //user exists 
        
       regData = await Login.findOne({ where:{ email: email} })

      
       
       if(regData){
         errors.push({msg: "That email had already been registered, please login!"})
         res.json(errors)
       } else {
        
        const newLogin = await  Login.create({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password       
        });

        req.session.save(() => {
          req.session.user_id = newLogin.id
          req.session.email = newLogin.email;
          req.session.logged_in = true;
          
          res.render('dashboard', {
          
            loggedIn: req.session.logged_in,
          
          });
        });
    

       }    
      }



  } catch (err) {
    res.status(500).json(err);
  }
});





// logout request.
    router.get('/logout',  (req, res) => {
      if (req.session.logged_in) {
        // Remove the session variables
        req.session.destroy(() => {
          res.status(204).end();
          });

        res.redirect('/');
    
      } else {
        res.status(404).end();
      }
      });
      
    

module.exports = router;
