import Layout from "@/pages/components/Layout";
import ProductForm from "@/pages/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProduct(){
    const [productInfo, setProductInfo] = useState(null)

    const router = useRouter()
    const {id} = router?.query
    
    useEffect(() => {
        if(!id){
            return;
        }

        axios.get('/api/products?id='+id).then(response =>{
            setProductInfo(response.data)
        })
    }, [id, productInfo]);


    return(
        <Layout>
            {
                productInfo && (
                    <ProductForm productInfo={...productInfo} />
                )
            }
           
        </Layout>
    )
}