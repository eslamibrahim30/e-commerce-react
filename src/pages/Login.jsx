import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useAuthStore from "@/store/useAuthStore";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// 1. Create the Schema
const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email string.",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  // 2. Initialize the Hook
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 5. Form Submission
  const onSubmit = (values) => {
    console.log("Validated Form Data:", values);
    // Simulate API Login
    login("fake-jwt-token-123");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-md border border-gray-100 dark:border-zinc-800">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Please enter your email and password
          </p>
        </div>
        
        {/* 3. Build the UI */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  {/* 4. Display Errors */}
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  {/* 4. Display Errors */}
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
