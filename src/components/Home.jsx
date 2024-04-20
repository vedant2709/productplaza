import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductsContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";



function Home() {
  const [products,setproducts]=useContext(ProductsContext);
  const {search}=useLocation();
  const category=decodeURIComponent(search.split("=")[1]);
  const [filteredproducts, setfilteredproducts] = useState(products)
  // const getproductscategory=async ()=>{
  //   try {
  //     const {data}=await axios.get(`/products/category/${category}`);
  //     setfilteredproducts(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(()=>{
    if(!filteredproducts || category=="undefined"){
      setfilteredproducts(products);
    }
    if(category!="undefined"){
      // getproductscategory();
      setfilteredproducts(products.filter(p=>p.category===category)); 
    }
  },[category,products])
  return products?(
    <>
    <Nav/>
    
    <div className="w-[85%] h-screen  p-5  flex flex-wrap justify-between overflow-x-hidden overflow-y-auto">
    
      {filteredproducts && filteredproducts.map((p,i)=><Link key={p.id} to={`/details/${p.id}`} className="card w-[18%] h-[42vh] rounded-md shadow border overflow-hidden p-2 mt-7">
        <div
        
          style={{
            backgroundImage:
              `url(${p.image}`,
          }}
          className="w-full h-[80%] bg-contain bg-no-repeat bg-center mix-blend-multiply hover:scale-110"
        ></div>
        
          {p.title.length>15?(
              <h1 className="text-center pt-3 text-md font-semibold">{p.title.slice(0,15)}...</h1>
          ):(<h1 className="text-center pt-3 text-md font-semibold">{p.title}</h1>)}
        
      </Link>)}
    </div>
    </>
    
  ):(
    <Loading/>
  )       

        
}

export default Home;
