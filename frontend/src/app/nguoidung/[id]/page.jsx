"use client";
import useSWR from "swr";
const fetcher=(...args)=>fetch(...args).then((res)=>res.json());
export default function User({ params }) {
  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/users/${params.id}`,
    fetcher
  );
  if (error) return <div>Lỗi tải dữ liệu</div>;
  if (isLoading) return <div>Đang tải...</div>;
  return (
    <ul>
      <li>Họ tên: {data.name}</li>
      <li>Email: {data.email}</li>
    </ul>
  );
}
