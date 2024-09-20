import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const SignInForm = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/signin', { email, password });
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg rounded-md">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">
            Welcome to <span className="text-purple-500">Workflo</span>!
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-12"
                />
                <Button
                  type="button"
                  onClick={handleClick}
                  className="absolute right-2 top-2 h-6 text-xs"
                >
                  {show ? 'Hide' : 'Show'}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white">
              Sign In
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center">
          <p>
            Don’t have an account?{" "}
            <span
              onClick={() => router.push('/signup')}
              className="text-blue-500 cursor-pointer"
            >
              Create a new account
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInForm;
