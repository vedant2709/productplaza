import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Edit() {
  const [products, setproducts] = useContext(ProductsContext);
  const { id } = useParams();
  const [product, setproduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const ChangeHandler = (e) => {
    setproduct({...product,[e.target.name]:e.target.value});
  };
  const navigate = useNavigate();

  useEffect(() => {
    setproduct(products.filter((p) => String(p.id) === id)[0]);
  }, []);
  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("every field must have atleast 4 characters");
      return;
    }

    const pi=products.findIndex((p)=>String(p.id)===id);
    const copyData=[...products];
    copyData[pi]={...products[pi],...product};
    
    setproducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    toast.info("Product edited successfully");
    navigate(-1);
  };
  return (
    <form
      className="flex flex-col items-center justify-center w-screen h-screen gap-3"
      onSubmit={AddProductHandler}
    >
      <h1 className="text-3xl font-semibold">Edit Product</h1>
      <input
        name="image"
        type="url"
        placeholder="image link"
        className="text-xl bg-zinc-200 rounded p-2 w-1/2 placeholder:text-zinc-600 border-none outline-none"
        onChange={ChangeHandler}
        value={product && product.image}
      />
      <input
        name="title"
        type="text"
        placeholder="title"
        className="text-xl bg-zinc-200 rounded p-2 w-1/2 placeholder:text-zinc-600 border-none outline-none"
        onChange={ChangeHandler}
        value={product && product.title}
      />
      <div className="w-1/2 flex justify-between">
        <input
          name="category"
          type="text"
          placeholder="category"
          className="text-xl bg-zinc-200 rounded p-2 w-[48%] placeholder:text-zinc-600 border-none outline-none"
          onChange={ChangeHandler}
          value={product && product.category}
        />
        <input
          name="price"
          type="number"
          placeholder="price"
          className="text-xl bg-zinc-200 rounded p-2 w-[48%] placeholder:text-zinc-600 border-none outline-none"
          onChange={ChangeHandler}
          value={product && product.price}
        />
      </div>
      <textarea
        name="description"
        className="text-xl bg-zinc-200 rounded p-2 w-1/2 h-[150px] placeholder:text-zinc-600 border-none outline-none resize-none"
        onChange={ChangeHandler}
        value={product && product.description}
        placeholder="Enter product description"
      ></textarea>
      <div className="w-1/2 flex justify-start">
        <button
          type="submit"
          className="px-3 py-2 text-md font-semibold rounded-md border border-blue-600 text-blue-600"
          href="/create"
        >
          Edit Product
        </button>
      </div>
    </form>
  );
}

export default Edit;
