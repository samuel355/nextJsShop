import { mongooseConnect } from "@/lib/mongooseConnect";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  const {method} = req;
  await mongooseConnect()
  
  //Create New Product
  if(method === 'POST'){
    const {title, description, price, images} = req.body;
    const productDoc = await Product.create({
      title, description, price, images
    })
    res.json(productDoc)
  }

  //Fetch all products
  if(method === 'GET'){
    if(req.query?.id){
      const product = await Product.findOne({_id:req.query.id})
      res.json(product)
    }else{
      const products = await Product.find()
      res.json(products)
    }
  }

  //Update Product
  if(method === 'PUT'){
    const {title, description, price, images, _id} = req.body;
    await Product.updateOne({_id}, {title, description, price, images})
    res.json(true)
  }

  //Delete Product
  if(method === 'DELETE'){
    if(req.query?.id){
      await Product.deleteOne({_id:req.query.id})
      res.json(true)
    }
  }
}
