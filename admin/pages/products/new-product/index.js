import Layout from "@/pages/components/Layout";
import ProductForm from "@/pages/components/ProductForm";

export default function NewProduct(){

    return(
        <Layout>
            <ProductForm productInfo={''} />
        </Layout>
    )
}