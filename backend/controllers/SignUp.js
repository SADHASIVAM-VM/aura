const supabase = require("../util/Sb");

const signUp = async (req, res) => {
   const { username, email, password, role } = req.body;
   console.log( req.body)
 
   try {
     // Check if user exists
     const { data:existingUser, error: selectError } = await supabase
       .from('users')
       .select('email')
       .eq('email', email)
       .single();
 
     if (existingUser) {
       return res.status(400).json({ message: 'The given email already exists' });
     }
 
     // Insert new user (not recommended to store plain password)
     const { data:newUser, error: insertError } = await supabase
       .from('users')
       .insert({ username, email, password, role });
 
     if (insertError) {
       return res.status(500).json({ error: insertError.message });
     }
 
     res.status(201).json(newUser);
   } catch (err) {
     res.status(500).json({ error: err.message });
   }
 };
 
const getUsers = async (req, res) => {
try{
   const { data, error } = await supabase.from('users').select('*')
      
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
   }
   catch(err){
    res.status(500).json({msg:"internal server error"})
   }
   
}

module.exports = {signUp, getUsers}