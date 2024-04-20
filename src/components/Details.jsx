import axios from "../utils/axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { ProductsContext } from "../utils/Context";
import { toast } from "react-toastify";

function Details() {
  const navigate=useNavigate();
  const [products, setproducts] = useContext(ProductsContext);
  const [product, setproduct] = useState(null);
  const { id } = useParams();
  // const getsingleproduct=async ()=>{
  //   try {
  //     const {data}=await axios.get(`/products/${id}`);
  //     setproduct(data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  useEffect(() => {
    if (!product) {
      setproduct(products.filter(p=>String(p.id)===id)[0]);
    }
  }, []);

  const ProductDeleteHandler=(id)=>{
    const filteredProducts=products.filter((p)=>p.id!==id)
    setproducts(filteredProducts);
    localStorage.setItem("products",JSON.stringify(filteredProducts));
    toast.error("Product Deleted Successfully");
    navigate("/");
  }

  return product ? (
    <div className="w-[70%] h-full mx-auto p-[10%] px-[5%] flex">
      <img
        src={`${product.image}`}
        alt=""
        className="mix-blend-multiply w-[100%] object-contain"
      />
      <div className="flex flex-col gap-2 justify-center">
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <h3 className="text-zinc-500 font-medium">{product.category}</h3>
        <h2 className="text-red-400 font-semibold">$ {product.price}</h2>
        <p>{product.description}</p>
        <div className="flex justify-start gap-6 pt-3">
          <Link to={`/edit/${product.id}`} className="px-4 py-1 text-md font-semibold rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
            Edit
          </Link>
          <button
            onClick={() => ProductDeleteHandler(product.id)}
            className="px-4 py-1 text-md font-semibold rounded-md border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Details;
