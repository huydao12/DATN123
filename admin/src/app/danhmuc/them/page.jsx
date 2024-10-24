'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCategory() {
  const router = useRouter();
  const name = useRef('');
  const description = useRef('');
  const message = useRef('');
  const error = useRef('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name.current.value,
      description: description.current.value,
    };
    
    const res = await fetch('http://localhost:3000/addcategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.error) {
      error.current = result.error;
    } else {
      message.current = result.message;
      router.push('/danhmuc');
    }
  };

  return (
    <div className="m-3">
      <h2>Thêm danh mục sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label className='form-label'>Tên danh mục</label>
          <input
            type="text"
            className="form-control"
            ref={name}
          />
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Mô tả</label>
          <textarea
            className="form-control"
            ref={description}
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">Thêm danh mục</button>
      </form>
    </div>
  );
}
