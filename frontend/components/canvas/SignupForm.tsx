// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { Input } from "postcss";
// import { Button } from "../ui/button";
// import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
// import { FormControl, FormLabel } from "../ui/form";



// const SignupForm = () => {
//   const [show, setShow] = useState(false);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:4000/api/auth/signup", {
//         username,
//         email,
//         password,
//       });
//       router.push("/signin");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center p-4">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader>
//           <div className="text-center font-bold">
//             Welcome to{" "}
//             <span className="text-purple-500">Workflo</span>!
//           </div>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleRegister}>
//             <FormControl id="username" required>
//               <FormLabel>Full name</FormLabel>
//               <Input
//                 type="text"
//                 placeholder="Full name"
//                 onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUsername(e.target.value)}
//               />
//             </FormControl>

//             <FormControl id="email" required className="mt-4">
//               <FormLabel>Your email</FormLabel>
//               <Input
//                 type="email"
//                 placeholder="Your email"
//                 onChange={(e:any) => setEmail(e.target.value)}
//               />
//             </FormControl>

//             <FormControl id="password" required className="mt-4">
//               <FormLabel>Password</FormLabel>
//               <div className="relative">
//                 <Input
//                   type={show ? "text" : "password"}
//                   placeholder="Enter password"
//                   onChange={(e:any) => setPassword(e.target.value)}
//                 />
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-2 top-2"
//                   onClick={() => setShow(!show)}
//                 >
//                   {show ? "Hide" : "Show"}
//                 </Button>
//               </div>
//             </FormControl>

//             <Button type="submit" className="mt-6 w-full bg-purple-500 text-white hover:bg-purple-600">
//               Sign up
//             </Button>
//           </form>
//         </CardContent>
//         <CardFooter>
//           <div className="text-center">
//             Already have an account?{" "}
//             <span
//               onClick={() => router.push("/signin")}
//               className="cursor-pointer text-blue-500"
//             >
//               Log in.
//             </span>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default SignupForm;
