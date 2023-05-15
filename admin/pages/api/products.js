import { mongooseConnect } from "@/lib/mongooseConnect";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  const {method} = req;
  await mongooseConnect()
  
  //Create New Product
  if(method === 'POST'){
    const {title, description, price} = req.body;
    const productDoc = await Product.create({
      title, description, price
    })
    res.json(productDoc)
  }

  //Fetch all products
  if(method === 'GET'){
    const products = await Product.find()
    res.json(products)
  }
}
