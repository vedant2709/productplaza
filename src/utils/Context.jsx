import axios from './axios';
import React, { createContext, useEffect, useState } from 'react'

export const ProductsContext=createContext();

function Context(props) {
  const [products, setproducts] = useState(JSON.parse(localStorage.getItem("products")) || null)
  // const getProducts=async ()=>{
  //   try {
  //     const {data}=await axios("/products");
  //     setproducts(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(()=>{
  //   getProducts();  
  // },[]);

  return (
    <ProductsContext.Provider value={[products, setproducts]}>
      {props.children}
    </ProductsContext.Provider>
  )
}

export default Context