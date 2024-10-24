'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function EditCategory({ params }) {
  const router = useRouter();
  const id = params.id;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const getCategory = async () => {
      const res = await fetch(`http://localhost:3000/categorydetail/${id}`);
      const data = await res.json();
      setCategory(data);
      // Đặt giá trị ban đầu cho form
      setValue('name', data.name);
      setValue('description', data.description);
    };
    if (id) {
      getCategory();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const res = await fetch(`http://localhost:3000/updatecategory/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!result.error) {
      router.push('/danhmuc');
    } else {
      // Xử lý hiển thị lỗi
      console.error(result.error);
    }
  };

  return (
    <div className="m-3">
      <h2>Chỉnh sửa danh mục</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group my-2">
          <label className='form-label'>Tên danh mục</label>
          <input type="text" className="form-control" {...register('name', { required: 'Tên danh mục là bắt buộc' })} />
          {errors.name && <div className="text-danger">{errors.name.message}</div>}
        </div>
        <div className="form-group my-2">
          <label className='form-label'>Mô tả</label>
          <textarea className="form-control" {...register('description', { required: 'Mô tả là bắt buộc' })} />
          {errors.description && <div className="text-danger">{errors.description.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary my-3">Cập nhật danh mục</button>
      </form>
    </div>
  );
}
