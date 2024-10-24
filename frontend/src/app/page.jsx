import React from "react";
import ProductCard from "./component/ProductCard";


export default async function Home()  {
  const res = await fetch("http://localhost:3000/products", {
    cache: 'no-store'
  });
  const data = await res.json();
  console.log(data);
  return (
    <div className="container my-3">
      <div>
        <div className="row d-flex justify-content-between mx-1 ">
          <div className="p-1 w-auto">
            <h5 className="text-success">SẢN PHẨM</h5>
          </div>
        </div>
        <div className="row ">
         <ProductCard data={data}/>
        </div>
      </div>
      </div>
  );
};