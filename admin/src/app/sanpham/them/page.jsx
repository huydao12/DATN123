'use client';

import { useRef, useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'


export default function AddProduct() {
  const router = useRouter();
  const name = useRef('');
  const price = useRef('');
  const description = useRef('');
  const image = useRef(null);
  const category = useRef('');
  const message = useRef('');
  const error = useRef('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch('http://localhost:3000/categories');
      const data = await res.json();
      setCategories(data);
    };
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', name.current.value);
    data.append('price', price.current.value);
    data.append('description', description.current.value);
    data.append('categoryId', category.current.value);
    data.append('image', image.current.files[0]);
    
    const res = await fetch('http://localhost:3000/addproduct', {
      method: 'POST',
      body: data,
    });
    const result = await res.json();
    if (result.error) {
      error.current = result.error;
    } else {
      message.current = result.message;
      router.push('/sanpham');
    }
  };

  return (
    <div className="m-3">
      <h2>Thêm sản phẩm</h2>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <div className="form-group my-2">
          <label className='form-label'>Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            ref={name}
          />
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Giá</label>
          <input
            type="number"
            className="form-control"
            ref={price}
          />
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Mô tả</label>
          <textarea
            className="form-control"
            ref={description}
          />
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Hình ảnh</label>
          <input
            type="file"
            className="form-control"
            ref={image}
          />
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Danh mục</label>
          <select className='form-control' id="category" ref={category}>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary my-3">Thêm sản phẩm</button>
      </form>
    </div>
  );
}