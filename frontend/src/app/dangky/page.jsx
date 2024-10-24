'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Đảm bảo bạn đã cài đặt Bootstrap

// Trang đăng ký
export default function Register() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rePassword: '',
            username: '',
            address: '',  // Thêm trường address
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
            password: Yup.string()
                .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số')
                .required('Vui lòng nhập mật khẩu'),
            rePassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
                .required('Vui lòng nhập lại mật khẩu'),
            username: Yup.string().required('Vui lòng nhập tên người dùng'),
            address: Yup.string().required('Vui lòng nhập địa chỉ'), // Thêm xác thực cho address
        }),
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const res = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password,
                        username: values.username,
                        address: values.address,  // Thêm address vào body
                    }),
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    if (res.status === 400 && errorData.message === "Email đã tồn tại") {
                        setFieldError('email', 'Email đã tồn tại');
                    } else {
                        throw new Error(errorData.message || 'Đăng ký thất bại');
                    }
                }
                // Xử lý thành công
                alert('Đăng ký thành công');
            } catch (error) {
                setFieldError('general', error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Đăng ký tài khoản</h2>
            <form onSubmit={formik.handleSubmit} className="bg-light p-4 rounded shadow-sm">
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        id="password"
                        type="password"
                        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="rePassword">Nhập lại mật khẩu</label>
                    <input
                        id="rePassword"
                        type="password"
                        className={`form-control ${formik.touched.rePassword && formik.errors.rePassword ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('rePassword')}
                    />
                    {formik.touched.rePassword && formik.errors.rePassword ? (
                        <div className="invalid-feedback">{formik.errors.rePassword}</div>
                    ) : null}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="username">Tên người dùng</label>
                    <input
                        id="username"
                        type="text"
                        className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('username')}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className="invalid-feedback">{formik.errors.username}</div>
                    ) : null}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="address">Địa chỉ</label>
                    <input
                        id="address"
                        type="text"
                        className={`form-control ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('address')}
                    />
                    {formik.touched.address && formik.errors.address ? (
                        <div className="invalid-feedback">{formik.errors.address}</div>
                    ) : null}
                </div>
                <button type="submit" className="btn btn-primary w-100 my-3" disabled={formik.isSubmitting}>
                    Đăng ký
                </button>
                {formik.errors.general && (
                    <p className="text-center text-danger">{formik.errors.general}</p>
                )}
            </form>
        </div>
    );
}
