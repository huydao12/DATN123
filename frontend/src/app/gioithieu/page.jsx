// 'use client'
// import React from "react";

// import ChildComponent from "../component/ChildComponent";

// export default function About () {
//     return(
//       <>
//       <h1>Dây là trang giới thiệu</h1>
//       <ChildComponent color="primary" text="hello"/>
//       <ChildComponent color="warning" text="Hi hi"/>
//       </>
//     )
//   }

// export default class About extends React.Component {
//   render(){
//     return (
//       <h1>Dây là trang giới thiệu</h1>
//     );
//   }
// }
//

const Home = async ()  => {
  const res = await fetch("http://localhost:3000/products");
  const data = await res.json();
  console.log(data);
  return (
    <h1>Đây là giới thiệu</h1>
  );
};

export default Home;