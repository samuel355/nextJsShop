import Layout from "@/pages/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProduct(){
    const router = useRouter()
    const {id} = router.query 
    const [productInfo, setProductInfo] = useState('')

    useEffect(() => {
        if(!id){
            return;
        }else{
            axios.get('/api/products?id='+id).then(response =>{
                setProductInfo(response.data)
            })
        }
    },[id])

    function goBack(){
        router.push('/products')
    }

    async function deleteProduct(){
        await axios.delete('/api/products?id='+id)
        goBack()
    }

    return(
        <Layout>
            <h2 className="text-2xl">Do you want to Delete this product - &nbsp;"{productInfo?.title}" ? </h2>
            <div className="flex mt-4 gap-4">
                <button onClick={deleteProduct} className="btn-red">Yes</button>
                <button className="btn-default" onClick={goBack}>No</button>
            </div>
        </Layout>
    )
}