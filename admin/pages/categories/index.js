import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

function Categories({swal}){
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

    function deleteCategory(category){
        swal.fire({
            title: 'Are you Sure ? ',
            text: `Do you want to Delete - ${category.name} ?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Delete',
            reverseButtons: true,
            icon: 'warning',
            confirmButtonColor: '#d55',
            
            didOpen: ()=>{

            },
            didClose: () => {

            }
        }).then( async result => {
            if(result.isConfirmed){
                const {_id} = category
                await axios.delete('/api/categories?_id='+_id)
                fetchCategories()
            }
        }).catch(error => {
            console.log(error)
        })
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
                    <button type="submit" className="bg-blue-900 py-2 -mt-3 text-white px-3 rounded-md">{pageTopic === 'New Category' ? 'Save' : 'Update'}</button>
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
                                    <button 
                                        className="btn-primary"
                                        onClick={() => deleteCategory(category)}
                                    >
                                        Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
        </Layout>
    )
}

export default withSwal(({swal}, ref) => (
    <Categories swal={swal} ref={ref} />
))