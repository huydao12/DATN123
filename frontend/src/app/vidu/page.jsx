// 'use client';
//  import React, { useState } from 'react';
//  export default function Counter() {
//     const [count, setCount] = useState(0);
//     const increment = () => {
//             setCount(count + 1);
//         }
//         const decrement = () => {
//             setCount(count -1);
//         }
    
//     return (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={increment}>tăng</button>
//             <button onClick={decrement}>Giảm</button>
//         </div>
//     );
// }

// import React, { useState } from 'react';

// export default function Counter() {
//    const [like, setLike] = useState("Like");

//    const toggleLike = () => {
//        setLike(prevLike => prevLike === "Like" ? "đã Like" : "Like");
//    };

//    return (
//        <div>
//            <h1>Ảnh: {like}</h1>
//            <button onClick={toggleLike}>{like === "Like" ? "Like" : "Unlike"}</button>
//        </div>
//    );
// }

// 'use client';
// import React,{useState} from "react";
// export default function Counter(){
//     const [count,setCount]=useState(0);
//     const increment=()=>{
//         setCount(count+1);
//     }
//     const decrement = ()=>{
//         setCount(count-1);
//     }
//     return(
//         <div>
//             <h1>Count: {count} </h1>
//             <button onClick={increment}>Tăng</button>
//             <button onClick={decrement}>Giảm</button>
//         </div>
//     )
// }

// import React,{useState} from "react";
// export default function Like(){
//     const [like,setLike]=useState('Thích');
//     const changeLike =()=>{
//         if(like=="Thích"){
//             setLike("Đã thích")
//         }else{
//             setLike("Thích")
//         }
//     }
//     return(
//         <div>
//             <button onClick={changeLike}>{like}</button>
//         </div>
//     )
// }

// 'use client';
// import React, { useState, useEffect } from 'react';

// export default function DataFetcher() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((responseData) => setData(responseData));
//   }, []);

//   return (
//     <div>
//       {data.map((item) => (
//         <li key={item.id}>{item.name}</li>
//       ))}
//     </div>
//   );
// }

// "use client";
// import useSWR from "swr";
// const fetcher=(...args)=>fetch(...args).then((res)=>res.json());
// export default function User({ params }) {
//   const { data, error, isLoading } = useSWR(
//     `https://jsonplaceholder.typicode.com/users/${params.id}`,
//     fetcher
//   );
//   if (error) return <div>Lỗi tải dữ liệu</div>;
//   if (isLoading) return <div>Đang tải...</div>;
//   return (
//     <ul>
//       <li>Họ tên: {data.name}</li>
//       <li>Email: {data.email}</li>
//     </ul>
//   );
// }

// 'use client';
// import React, { useRef } from 'react';

// export default function Count() {
// const countRef = useRef(0);
// const handleClick = () => {
// countRef.current++;
// console.log('Count:', countRef.current);
// };
// return (
// <div>
// <button onClick={handleClick}>Click me</button>
// </div>
// );
// };

// "use client";
// import { useRef } from "react";
// export default function InputForm() {
//   const fullname = useRef("");
//   const email = useRef("");
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(fullname.current.value, email.current.value);
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" ref={fullname} placeholder="Họ tên" />
//       <input type="email" ref={email} placeholder="Email" />
//       <button type="submit">Gửi</button>
//     </form>
//   );
// }
// 'use client';
// import { useState } from 'react';

// export default function FormExample() {
//   const [data, setData] = useState('');

//   const handleChange = (event) => {
//     setData(event.target.value);
//   };

//   return (
//     <>
//         <input
//             type="text"
//             value={data}
//             onChange={handleChange}
//         />
//         <h1>{data}</h1>
//     </>
//   );
// }

// 'use client';
// import { useState } from 'react';

// export default function FormExample() {
//   const [inputValue, setInputValue] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     alert(`Email: ${inputValue}`);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Email:
//         <input
//           type="email"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//         />
//       </label>
//       <button type="submit">Đăng ký nhận tin</button>
//     </form>
//   );
// }

// 'use client';
// import { useState } from 'react';

// export default function FormExample() {
//   const [inputValue, setInputValue] = useState('');
//   const [isFocused, setIsFocused] = useState('Đang focus');

//   return (
//     <form>
//       <label>
//         Input:
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onFocus={() => setIsFocused('Đang focus')}
//           onBlur={() => setIsFocused('Đang blur')}
//         />
//       </label>
//         <h1>{isFocused}</h1>
//     </form>
//   );
// }

// 'use client';
// import { useRef } from 'react';

// export default function UncontrolledForm() {
//   const inputRef = useRef(null);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     alert(`Input value: ${inputRef.current.value}`);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Input:
//         <input type="text" ref={inputRef} />
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  photo: Yup.mixed().required('A photo is required')
});

const FormExample = () => {
  const handleSubmit = (values) => {
    console.log('Form data', values);
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', photo: null }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <Field name="name" type="text" className="form-control" />
            <ErrorMessage name="name" component="small" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage name="email" component="small" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage name="password" component="small" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="photo" className="form-label">Photo</label>
            <input
              name="photo"
              type="file"
              className="form-control"
              onChange={(event) => {
                setFieldValue('photo', event.currentTarget.files[0]);
              }}
            />
            <ErrorMessage name="photo" component="small" className="text-danger" />
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormExample;
