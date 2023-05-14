import Layout from "@/pages/components/Layout";

export default function NewProduct(){
    return(
        <Layout>
            <h2 className="text-blue-900 mb-4 text-2xl">New Product</h2>
            <label htmlFor="product-name"> Product Name</label>
            <input name="product-name" type="text" placeholder="Product Name" />
            <label htmlFor="description">Description</label>
            <textarea name="description" rows={5} placeholder="Description"></textarea>
            <label htmlFor="price">Price</label>
            <input name="price" type="number" placeholder="Price" />
            <button className="btn-primary">Save</button>
        </Layout>
    )
}