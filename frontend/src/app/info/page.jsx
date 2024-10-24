'use client';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';


export default function Info() {
    // Lấy token từ cookie ở máy tính
    const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
    const tokenValue = token?.split('=')[1];
    if (!tokenValue) {
        window.location.href = '/dangnhap';
    }
    
    // Lấy thông tin user bằng token
    const [user, setUser] = useState({});
    useEffect(() => {
        const getUser = async () => {
            const res = await fetch('http://localhost:3000/detailuser', {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                },
            });
            const data = await res.json();
            setUser(data);
        };
        getUser();
    }, [tokenValue]);
    

    return (
        <div className='container'>
            <h2>Thông tin cá nhân</h2>
            <div>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Tên:</strong> {user.username}</p>
                <p><strong>Địa chỉ:</strong> {user.address}</p>
            </div>
            {/* nút đăng xuất */}
            <button className='btn btn-primary' onClick={() => {
                document.cookie = 'token=; path=/; max-age=0';
                window.location.href = '/dangnhap';
            }}>Đăng xuất</button> 
        </div>
    );
}