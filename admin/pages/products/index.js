import Link from "next/link";
import Layout from "../components/Layout";

export default function Products () {
    return (
        <Layout>
            <Link className="bg-blue-900 rounded-md text-white py-2 px-2" href={'/products/new-product'}>Add New Product</Link>
        </Layout>
    )
}