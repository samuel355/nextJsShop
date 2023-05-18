import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({productInfo}){

    const {
        title: existingTitle, 
        description:existingDescription, 
        price:existingPrice,
        _id,
        images:existingImages
    } = productInfo;

    const [pageHeader, setPageHeader] = useState('')
    const [pageBtn, setPageBtn] = useState('')
    useEffect(() => {
        if(_id){
            setPageHeader('Update Product')
            setPageBtn('Update')
        }else{
            setPageHeader('Add New Product')
            setPageBtn('Save')
        }
    }, [])

    const [title, setTitle] = useState(existingTitle ||  '')
    const [description, setDescription] = useState( existingDescription || '')
    const [price, setPrice] = useState( existingPrice ||  '')
    const [goToProducts, setGoToProducts] = useState(false)
    const [images, setImages] = useState(existingImages || [])
    const [uploading, setUploading] = useState(false)
    const router = useRouter()

    async function saveProduct(ev){
        ev.preventDefault();
        const data = {title, description, price, images}

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

    async function uploadImages(ev){
        const files = ev.target?.files
        if(files?.length > 0){
            setUploading(true)
            const data = new FormData()
            for(const file of files){
                data.append('file', file)
            }
            //const res = await axios.post('/api/upload', data, {headers: {'Content-Type':'multipart/form-data'}} )
            const res = await axios.post('/api/upload', data)
            //console.log(res.data)
            setImages( oldImages =>{
                return [...oldImages, ...res.data.links]
            })
            setUploading(false)
        }
    }

    //Dragging images
    function updateImagesOrder(images){
        setImages(images)
        
    }

    return(
        <form action="" onSubmit={saveProduct}>
            <h2 className="text-blue-900 mb-4 text-2xl">{pageHeader}</h2>
            <label htmlFor="product-name"> Product Name</label>
            <input name="product-name" value={title} onChange ={ev =>setTitle(ev.target.value)} type="text" placeholder="Product Name" />
            <label htmlFor="photos">Product Images</label>
            <div class="mb-2 flex flex-wrap gap-1">
                <ReactSortable className="flex flex-wrap gap-1" list={images} setList={updateImagesOrder}>
                    {
                        !!images?.length && images.map((link, index) =>(
                            <img key={index} className="w-24 h-24 object-contain border" src={link} alt="Product Image" />
                        ))
                    }
                </ReactSortable>
                
                {
                    uploading && (
                        <div className="w-24 h-24 flex items-center justify-center">
                            <Spinner />
                        </div>
                    )
                }
                <label htmlFor='images' style={{display: uploading ? 'none' : 'flex', alignItem: 'center'}} className="w-24 h-24 border bg-gray-100 hover:bg-gray-200 flex flex-col items-center justify-center text-md hover:text-lg cursor-pointer">
                    <svg class="w-6 h-6 text-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <span>Upload</span>
                    <input type="file" name="images" id="images" className="hidden" onChange={uploadImages} />
                </label>
                
            </div>
            <label htmlFor="description">Description</label>
            <textarea name="description" value={description} onChange ={ev =>setDescription(ev.target.value)} rows={5} placeholder="Description" /> 
            <label htmlFor="price">Price</label>
            <input value={price} onChange ={ev =>setPrice(ev.target.value)} name="price" type="number" placeholder="Price" />
            <button type="submit" className="btn-primary">{pageBtn}</button>
        </form>
    )
    
}