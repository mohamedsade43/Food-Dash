import{r as i,i as l,j as e,H as u,L as g,B as o}from"./index-V3xU5zvR.js";import x from"./Footer-BVCtypdT.js";const h=()=>{const[s,n]=i.useState(""),[d]=l(),c=async t=>{var a;t.preventDefault();try{const r=await d({email:s}).unwrap();o.success("Link is sent to your email!"),console.log(r)}catch(r){o.error(((a=r==null?void 0:r.data)==null?void 0:a.message)||r.error)}};return e.jsxs(e.Fragment,{children:[e.jsx(u,{}),e.jsx("div",{className:"flex items-center justify-center min-h-screen bg-background text-text dark:bg-background-dark dark:text-text-dark p-4",children:e.jsxs("div",{className:"w-full max-w-sm p-8 space-y-6 bg-background dark:bg-gray-800 rounded-lg shadow-2xl",children:[e.jsx("h2",{className:"text-3xl font-bold text-center text-red-600 dark:text-red-400",children:"Forgot Password"}),e.jsxs("form",{onSubmit:c,className:"space-y-4",children:[e.jsx("div",{children:e.jsx("input",{type:"email",value:s,onChange:t=>n(t.target.value),required:!0,placeholder:"Email",className:"w-full px-4 py-3 border rounded-lg bg-gray-100 dark:bg-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"})}),e.jsx("button",{type:"submit",className:"w-full py-3 mt-4 text-white bg-red-500 rounded-lg shadow-lg hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400",children:"Send Reset Link"})]}),e.jsxs("p",{className:"text-sm text-center text-gray-600 dark:text-gray-300",children:["Don't have an account?"," ",e.jsx(g,{to:"/register",className:"font-medium text-red-600 dark:text-red-400 hover:underline",children:"Register"})]})]})}),e.jsx(x,{})]})};export{h as default};