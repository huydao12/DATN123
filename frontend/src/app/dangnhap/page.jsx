'use client';   
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Đảm bảo bạn đã cài đặt Bootstrap

export default function Login() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
            password: Yup.string().required('Bắt buộc'),
        }),
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const res = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: values.email, password: values.password }),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Đăng nhập thất bại');
                }
                // Lưu token vào cookie
                const data = await res.json();
                // localStorage.setItem('token', data.token);
                document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}`;
                // Chuyển trang theo role
                const token = data.token;
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.role === 'admin') {
                    window.location.href = 'http://localhost:3002';
                } else {
                    window.location.href = '/';
                }
            } catch (error) {
                setFieldError('general', error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-50">
            <div className="w-100" style={{ maxWidth: '800px' }}>
                <h2 className="text-center mb-4">Đăng nhập</h2>
                <form onSubmit={formik.handleSubmit} className="bg-light p-4 rounded shadow-sm">
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
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
                            name="password"
                            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="invalid-feedback">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={formik.isSubmitting}>
                        Đăng nhập
                    </button>
                    {formik.errors.general ? (
                        <div className="text-danger mt-3">{formik.errors.general}</div>
                    ) : null}
                </form>
            </div>
        </div>
    );
}
