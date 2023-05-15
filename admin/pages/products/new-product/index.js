import Layout from "@/pages/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewProduct(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [goToProducts, setGoToProducts] = useState(false)
    const router = useRouter()

    async function createProduct(ev){
        ev.preventDefault();

        const data = {title, description, price}
        await axios.post('/api/products', data)
        setGoToProducts(true)
    }

    if(goToProducts){
        router.push('/products')
    }
    return(
        <Layout>
            <form action="" onSubmit={createProduct}>
                <h2 className="text-blue-900 mb-4 text-2xl">New Product</h2>
                <label htmlFor="product-name"> Product Name</label>
                <input name="product-name" value={title} onChange ={ev =>setTitle(ev.target.value)} type="text" placeholder="Product Name" />
                <label htmlFor="description">Description</label>
                <textarea name="description" value={description} onChange ={ev =>setDescription(ev.target.value)} rows={5} placeholder="Description" /> 
                <label htmlFor="price">Price</label>
                <input value={price} onChange ={ev =>setPrice(ev.target.value)} name="price" type="number" placeholder="Price" />
                <button type="submit" className="btn-primary">Save</button>
            </form>
        </Layout>
    )
}