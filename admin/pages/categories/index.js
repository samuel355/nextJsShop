import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function Categories(){
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [parentCategory, setParentCategory] = useState('')

    useEffect(() => {
        fetchCategories()
    }, [])

    async function fetchCategories(){
        await axios.get('/api/categories').then(res => {
            setCategories(res.data)
        })
    }

    async function saveCategory(ev){
        ev.preventDefault()
        await axios.post('/api/categories', {name, parentCategory})
        setName('')
        setParentCategory('')
        fetchCategories()
    }
     
    return(
        <Layout>
            <h1 className="text-3xl mb-3">Categories</h1>
            <form className="mb-5" onSubmit={saveCategory}>
                <label htmlFor="category-name">New Category Name</label>
                <div className="flex gap-2 items-center">
                    <input value={name} onChange={ev => setName(ev.target.value)} type="text" placeholder="Category Name" />
                    <select className="mb-0 p-2 -mt-3" value={parentCategory} onChange = {ev => setParentCategory(ev.target.value)}>
                        <option value="">No parent Category</option>
                        {
                           categories.length > 0 && categories.map(category => (
                            <option value={category._id}>{category.name}</option>
                           ))
                        }
                    </select>
                    <button type="submit" className="bg-blue-900 py-2 -mt-3 text-white px-3 rounded-md">Save</button>
                </div>
            </form>
            <table className='mb-3 basic'>
                <thead>
                    <tr>
                        <td>Category Name</td>
                        <td>Actions</td>
                    </tr>
                </thead>

                <tbody>
                    {
                        categories && categories.map(category =>(
                            <tr>
                                <td key={category._id}>{category.name}</td>
                                <td>
                                    
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
        </Layout>
    )
}