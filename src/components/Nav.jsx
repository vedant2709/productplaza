import React, { useContext } from "react";
import { ProductsContext } from "../utils/Context";
import { Link } from "react-router-dom";

function Nav() {
  const [products] = useContext(ProductsContext);
  const color=()=>{
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},1)`;
  }
  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];
  return (
    <nav className="w-[15%] h-full bg-zinc-100 flex flex-col items-center pt-3">
      <a
        className="px-3 py-2 text-md font-semibold rounded-md border border-blue-600 text-blue-600"
        href="/create"
      >
        Add New Product
      </a>
      <hr className="w-[90%] border border-zinc-300 my-3" />
      <h1 className="text-xl font-semibold w-[80%]">Category Filter</h1>
      <div className="w-[80%] pt-3">
        {distinct_category.map((c, i) => (
          <Link
          key={i}
            to={`/?category=${c}`}
            className="mb-3 font-medium flex w-full items-center text-md"
          >
            <span style={{backgroundColor:color()}} className="w-[8px] h-[8px] rounded-full  mr-2"></span>
            {c}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Nav;
