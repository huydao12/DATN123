'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";

export default function Users() {
  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/users", {
      cache: 'no-store'
    });
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
      const res = await fetch(`http://localhost:3000/deleteuser/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.message) {
        fetchUsers();
      }
    }
  };

  return (
    <div className="m-3">
      <h2>Quản lý người dùng</h2>
      <Link className="btn btn-info" href="/nguoidung/them">Thêm người dùng</Link>
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Link className="btn btn-success mx-2" href={`/nguoidung/sua/${user._id}`}>Sửa</Link>
                <button className="btn btn-danger mx-2" onClick={() => deleteUser(user._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
