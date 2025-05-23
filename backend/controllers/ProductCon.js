const supabase = require('../util/Sb')
// create a product

const CreateProduct = async(req, res)=>{
    const {name, description, price, category, stock_quantity, image_url } = req.body
    
    if (!name || !description || !price || !category || !stock_quantity || !image_url) {
              return res.status(400).json({ message: "All data fields are required" })} 
    try{
    const{data, error} = await supabase.from("products")
        .insert([{name, description, price, category, stock_quantity, image_url}])
        if(error) res.status(400).json({err:error.message})
        
       res.status(201).json({data:data})
    }
   catch(error){
    res.status(500).json({err:error.message})
   }

}

// update a product
 const UpdateProduct = async (req, res) => {
        const {id} = req.params
        const {name, description, price, category, stock_quantity, image_url } = req.body


         if(id) return res.status(400).json({error:"data is missing"})

          const updateValues = {};
  if (name !== undefined) updateValues.name = name;
  if (description !== undefined) updateValues.description = description;
  if (price !== undefined) updateValues.price = price;
  if (category !== undefined) updateValues.category = category;
  if (stock_quantity !== undefined) updateValues.stock_quantity = stock_quantity;
  if (image_url !== undefined) updateValues.image_url = image_url;

         if (Object.keys(updateValues).length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }
        try{
           
            const {data, error} = await supabase.from('products').insert(updateValues).eq('id',id)

        if(error) return res.status(400).json({ message: "sorry no such product" })
        
        res.status(200).json({ data: data })
        }
        catch(err){
            res.status(500).json({ message: "internal eoo" })
        }
 }

// delete a product

 const DeleteProduct = async (req, res) => {
        const {id} = req.params
           if(!id) res.status(400).json({message:"No item"})
        try{
         
            const {data, error} = await supabase.from('products').delete().eq('id', id)

        if(error) return res.status(400).json({ message: "sorry unable to delete product" })
        
        res.status(200).json({ data: data })
        }
        catch(err){
            res.status(500).json({ message: "internal eoo" })
        }
 }

// get all product

const getAllProducts =async(req, res) => {
    console.log(req.user)
      try{
         
            const {data, error} = await supabase.from('products').select('*')

        if(error) return res.status(400).json({ message: "sorry unable to fetch product" })
        
        // if(data.length == 0)  res.status(400).json({ message: "sorry unable to fetch product" })


        res.status(200).json({ data: data })
        }
        catch(err){
            res.status(500).json({ message: "internal eoo" })
        }
}


// view single product
const singleProduct =async (req, res) => {
    const {id} = req.params
       if(!id) res.status(400).json({message:"No id"})
      try{
            const {data, error} = await supabase.from('products').select('*').eq('id',id)

        if(error) return res.status(400).json({ message: "sorry unable to fetch product" })
        
        res.status(200).json({ data: data })
        }
        catch(err){
            res.status(500).json({ message: "internal eoo" })
        }
}

module.exports ={CreateProduct,UpdateProduct,DeleteProduct, singleProduct, getAllProducts }