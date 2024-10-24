'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../component/ProductCard';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('asc');
  const [filterOption, setFilterOption] = useState('all');

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('http://localhost:3000/products');
      const newProducts = await res.json();
      setProducts(newProducts);
    }
    fetchProducts();
  }, []);

  const handleSort = (products) => {
    return [...products].sort((a, b) => {
      if (sortOption === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  const handleFilter = (products) => {
    if (filterOption === 'all') {
      return products;
    }
    return products.filter(product => product.category === filterOption);
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  }

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  }

  const filteredAndSortedProducts = handleSort(handleFilter(products));

  return (
    <div className="container my-3">
      <div>
        <div className="d-flex justify-content-between mx-1">
          <div className="p-1 w-auto">
            <h5 className="text-success">DANH SÁCH SẢN PHẨM</h5>
          </div>
          <div className="d-flex">
            <select className="form-select w-auto me-2" onChange={handleFilterChange}>
              <option value="all">Tất cả</option>
              <option value="category1">Danh mục 1</option>
              <option value="category2">Danh mục 2</option>
              {/* Thêm các tùy chọn lọc khác tại đây */}
            </select>
            <select className="form-select w-auto" onChange={handleSortChange}>
              <option value="asc">Giá tăng dần</option>
              <option value="desc">Giá giảm dần</option>
            </select>
          </div>
        </div>
        <div className="row">
          <ProductCard data={filteredAndSortedProducts} />
        </div>
      </div>
    </div>
  );
}
