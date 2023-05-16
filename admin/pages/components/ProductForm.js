import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

export default function ProductForm({productInfo}){
    const {title:existingTitle, description:existingDescription, price:existingPrice, _id} = productInfo
    
    const [title, setTitle] = useState(existingTitle ||  '')
    const [description, setDescription] = useState( existingDescription || '')
    const [price, setPrice] = useState( existingPrice ||  '')
    const [goToProducts, setGoToProducts] = useState(false)
    const router = useRouter()

    async function saveProduct(ev){
        ev.preventDefault();

        const data = {title, description, price}

        if(_id){
            //Update Product
            await axios.put('/api/products', {...data, _id})
            setGoToProducts(true)
        }else{
            //Create new Product
            await axios.post('/api/products', data)
            setGoToProducts(true)
        }
        
    }

    if(goToProducts){
        router.push('/products')
    }


    return(
        <form action="" onSubmit={saveProduct}>
            <h2 className="text-blue-900 mb-4 text-2xl">New Product</h2>
            <label htmlFor="product-name"> Product Name</label>
            <input name="product-name" value={title} onChange ={ev =>setTitle(ev.target.value)} type="text" placeholder="Product Name" />
            <label htmlFor="description">Description</label>
            <textarea name="description" value={description} onChange ={ev =>setDescription(ev.target.value)} rows={5} placeholder="Description" /> 
            <label htmlFor="price">Price</label>
            <input value={price} onChange ={ev =>setPrice(ev.target.value)} name="price" type="number" placeholder="Price" />
            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
    
}