'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity} from '@/redux/slices/cartslice';
import { useMemo } from 'react';

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart?.items) || [];
    const dispatch = useDispatch();

    const total = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);
    return (
        <div className="container mt-3">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Thành tiền</th>
                        <th scope="col">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>
                            <input 
                                min="1"
                                type="number" 
                                value={item.quantity} 
                                onChange={(e) => dispatch(updateCartItemQuantity({ _id: item._id, quantity: parseInt(e.target.value) }))}
                            />
                            </td>                            
                            <td>{item.price.toLocaleString()}</td>
                            <td>{(item.price * item.quantity).toLocaleString()}</td>                            <td>
                                <button className="btn btn-danger" onClick={() => dispatch(removeFromCart(item._id))}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr className='table-primary'>
                        <td colSpan="3">Tổng cộng</td>
                        <td>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        <td></td>
                    </tr>
                </tbody>

            </table>
        </div>
    );
};

export default CartPage;