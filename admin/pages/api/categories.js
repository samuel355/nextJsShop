import { mongooseConnect } from "@/lib/mongooseConnect";
import { Category } from "@/models/Category";

export default async function handler(req, res){
    const {method} = req;
    await mongooseConnect()

    //Add New Category
    if(method === 'POST'){
        const {name, parentCategory} = req.body;
        const categoryDoc  = await Category.create({name, parent:parentCategory})
        res.json(categoryDoc);
    }

    //Fetch all categories
    if(method === 'GET'){
        const categoriesDoc = await Category.find()
        res.json(categoriesDoc)
    }
}