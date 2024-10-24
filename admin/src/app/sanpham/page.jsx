'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";

export default function Products() {
  const [data, setData] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/products", {
      cache: 'no-store'
    });
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      const res = await fetch(`http://localhost:3000/deleteproduct/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.message) {
        fetchProducts(); 
      }
    }
  };

  return (
    <div className="m-3">
      <h2>Quản lý sản phẩm</h2>
      <Link className="btn btn-info" href="/sanpham/them">Thêm sản phẩm</Link>
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Giá</th>
            <th>Mô tả</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>
                <img src={`http://localhost:3000/img/${product.image}`} width='100px' />
              </td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                 <Link className="btn btn-success mx-1" href={`/sanpham/sua/${product._id}`}>Sửa</Link>
                <button className="btn btn-danger mx-1" onClick={() => deleteProduct(product._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}