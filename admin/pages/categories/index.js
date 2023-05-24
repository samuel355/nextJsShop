import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function Categories(){
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [parentCategory, setParentCategory] = useState('')
    const [pageTopic, setPageTopic] = useState('New Category')
    const [catId, setCatId] = useState()

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
        const data ={name, parentCategory}
        //if page topic = New Category create new category else update the category
        if(pageTopic === 'New Category'){
            await axios.post('/api/categories', data)
        }else{
            await axios.put('/api/categories', {...data, _id: catId})
        }
        setName('')
        setParentCategory('')
        setPageTopic('New Category')
        fetchCategories()
    }
     
    function editCategory(category){  
        setCatId(category._id)
        setPageTopic(category.name)
        setName(category.name)
        setParentCategory(category.parent?._id)
    }


    return(
        <Layout>
            <h1 className="text-3xl mb-3 text-center">Categories</h1>
            <form className="mb-5" onSubmit={saveCategory}>
                <h1 htmlFor="category-name mb-3 text-2xl">{pageTopic}</h1>
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
                        <td>Parent Category</td>
                        <td>Action</td>
                    </tr>
                </thead>

                <tbody>
                    {
                        categories && categories.map(category =>(
                            <tr key={category._id}>
                                <td key={category._id}>{category.name}</td>
                                <td>{category?.parent?.name}</td>
                                <td>
                                    <button onClick={() => editCategory(category)} className="btn-primary mx-2">Edit</button>
                                    <button className="btn-primary">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
        </Layout>
    )
}