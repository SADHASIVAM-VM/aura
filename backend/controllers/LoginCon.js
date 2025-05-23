const jwt = require('jsonwebtoken');
const path = require('path');
const supabase = require('../util/Sb');
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,'/config','.env')})
const secret = process.env.JWT_SCRET_KEY

// login
const Login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const { data, error } =  await supabase.from('users')
      .select('*')
      .eq('email', email)
      .eq('password',password)
      .single();
      
      if (error) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Return token or store in HTTP-only cookie
      const twk = jwt.sign(data,secret,{expiresIn:'7d'})

      res.status(200).json({
        message: 'Login successful',
        user: data,
        token: twk, // important!
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = {Login}