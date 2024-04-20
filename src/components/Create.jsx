import React, { useContext, useState } from "react";
import { ProductsContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Create() {
  const [products,setproducts]=useContext(ProductsContext);
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const navigate=useNavigate();
  const AddProductHandler=(e)=>{
    e.preventDefault();

    if(title.trim().length<5 || image.trim().length<5 || category.trim().length<5 || price.trim().length<1 || description.trim().length<5){
      alert("every field must have atleast 4 characters")
      return;
    }

    const product={
      id:nanoid(),
      title,image,category,price,description
    }
    setproducts([...products,product]);
    localStorage.setItem("products",JSON.stringify([...products,product]));
    toast.success("Product Added Successfully")
    navigate("/");
  }
  return (
    <form className="flex flex-col items-center justify-center w-screen h-screen gap-3" onSubmit={AddProductHandler}>
      <h1 className="text-3xl font-semibold">Add New Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-xl bg-zinc-200 rounded p-2 w-1/2 placeholder:text-zinc-600 border-none outline-none"
        onChange={(e) => setimage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="title"
        className="text-xl bg-zinc-200 rounded p-2 w-1/2 placeholder:text-zinc-600 border-none outline-none"
        onChange={(e) => settitle(e.target.value)}
        value={title}
      />
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="category"
          className="text-xl bg-zinc-200 rounded p-2 w-[48%] placeholder:text-zinc-600 border-none outline-none"
          onChange={(e) => setcategory(e.target.value)}
          value={category}
        />
        <input
          type="number"
          placeholder="price"
          className="text-xl bg-zinc-200 rounded p-2 w-[48%] placeholder:text-zinc-600 border-none outline-none"
          onChange={(e) => setprice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        className="text-xl bg-zinc-200 rounded p-2 w-1/2 h-[150px] placeholder:text-zinc-600 border-none outline-none resize-none"
        onChange={(e) => setdescription(e.target.value)}
        value={description}
        placeholder="Enter product description"
      ></textarea>
      <div className="w-1/2 flex justify-start">
        <button
          type="submit"
          className="px-3 py-2 text-md font-semibold rounded-md border border-blue-600 text-blue-600"
          href="/create"
        >
          Add New Product
        </button>
      </div>
    </form>
  );
}

export default Create;
