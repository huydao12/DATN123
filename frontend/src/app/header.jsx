"use client";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Header = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.reduce((count, item) => count + Number(item.quantity), 0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
        const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    return (
        <div>
            <header class="sticky-top bg-white border">
            <div class="bg-info d-none d-sm-block">
                <div class="container text-white">
                    <div class="row">
                        <div class="col-md-6 pt-3">
                            <p class="text-white fs-6"><img src="https://file.hstatic.net/1000402464/file/output-onlinegiftools_9bbbf15c266044699bca3a5635e05246.gif" width="30px" alt="" /> Cửa hàng bán điện thoại, laptop và đồ công nghệ hàng đầu <span class="text-danger">Việt</span> <span class="text-danger">Nam</span></p>
                        </div>
                        <div class="col-md-6 pt-3 d-flex align-items-end justify-content-end">
                            <p><i class="bi bi-telephone-fill me text-success"></i> <span class="text-danger">HOTLINE: 0987654321</span> </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container p-2 d-flex justify-content-between align-items-center">
                <nav class="navbar navbar-expand-lg bg-white ">
                    <div class="container px-0 mx-0">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse " id="navbarTogglerDemo01">
                            <a class="navbar-brand" href="http://localhost:3001"><span class="text-success">LPT</span><span>STORE</span></a>
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link class="nav-link text-black" href={'/'}>Trang Chủ</Link>
                                    {/* <a class="nav-link text-black" href='/' >Trang Chủ</a> */}
                                </li>
                           
                                <li class="nav-item">
                                    <Link class="nav-link text-black"  href={'/sanpham'}>Sản Phẩm </Link>
                                    {/* <a class="nav-link text-black" href='sanpham'>Sản Phẩm Đấu Giá</a> */}
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link text-black"  href={'/giohang'}>Giỏ Hàng </Link>
                                    {/* <a class="nav-link text-black" href='sanpham'>Sản Phẩm Đấu Giá</a> */}
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link text-black"  href={'/gioithieu '}>Giới thiệu</Link>
                                    {/* <a class="nav-link text-black" href='gioithieu' >Giới Thiệu</a> */}
                                </li>
                              
                            </ul>
                            <form class="d-flex ms-4" action="/timkiem">
                                <input class="form-control me-2" name="keyword" placeholder="Nhập tên sản phẩm" />
                                <button class="btn btn-outline-success" type="submit" >Tìm</button>
                            </form>   
                        </div>
                    </div>
                </nav>
                <div class="d-flex align-items-center ms-5">
                    <div id="cart" class="position-relative d-flex justify-content-center align-items-center rounded-circle bg-black bg-opacity-10 px-2 py-1 ">
                        <Link href={'/giohang'}>                           
                             <i class="bi bi-cart fs-5  fw-bolder text-dark" />
                        </Link>
                        <div class="">
                        <span id="amount-cart" class="text-white  position-absolute top-0 start-75 translate-middle bg-success px-2 rounded-circle">
                            {cartCount}
                        </span>
                        </div>
                    </div>
                    <div id="account" class="d-flex justify-content-center align-items-center rounded-circle bg-black bg-opacity-10  mx-2 px-2 py-1">
                        <Link href={'/dangky'}>
                            <i class="bi bi-person-circle fs-5 fw-bolder text-dark  mx-2 my-3" />
                        </Link>
                        <div id="account" class="d-flex justify-content-center align-items-center rounded-circle bg-black bg-opacity-10  mx-2 px-2 py-1">
                            <Link href={isLoggedIn ? '/info' : '/dangnhap'}>
                                <i class={isLoggedIn ? "bi bi-person fs-5  fw-bolder text-dark" : "bi bi-box-arrow-in-right fs-5  fw-bolder text-dark"} />
                            </Link>
                        </div>     
                    </div>
                </div>
            </div>
        </header >
                    <div class="container">
                    <div class="row mt-2 ">
                        <div class="col-md-9 m-0 p-0">
                            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="img/img0.jpeg" class="d-block w-100" alt="..."/>
                                    </div>
                                    <div class="carousel-item ">
                                        <img src="img/img1.jpeg" class="d-block w-100" alt="..."/>
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-3 m-0">
                            <img class="img-fluid" src="img/banner3.jpeg" alt=""/>
                                <img class="img-fluid mt-2" src="img/banner4.jpeg" alt=""/>
                                </div>
                        </div>
                    </div>
                  
        </div>
    );
};

export default Header;


