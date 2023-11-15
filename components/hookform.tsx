"use client";

import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, fieldsSchema, signUpSchema } from '@/lib/types';
import toast from "react-hot-toast";

export default function HookForm() {

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
    } = useForm<TSignUpSchema>({
        resolver:zodResolver(signUpSchema)
    });

    const onSubmit = async(data:TSignUpSchema) => {
        const response = await fetch('api/signup',{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        });

        const responseData = await response.json();
        if(response.ok) {
            toast.success("submitted")
            return;
        }
        if(responseData.errors) {
            const errors = responseData.errors;
            
            Object.keys(errors).forEach((fieldName) => {
                setError(fieldName as fieldsSchema, {
                  type: "server",
                  message: errors[fieldName],
                });
              });
            
              
              if (Object.keys(errors).length === 0) {
                toast.error("something went wrong");
              }
        }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-2'>
        <input type='email' 
            {...register("email")}
            placeholder='email' className='px-4 py-2 rounded'/>
            {errors.email && (
                <p className='text-red-500'>{`${errors.email.message}`}</p>
            )}
        <input type='password' 
            {...register("password")}
            placeholder='password' className='px-4 py-2 rounded'/>
            {errors.password && (
                <p className='text-red-500'>{`${errors.password.message}`}</p>
            )}
        <input type='password' 
            {...register("confirmPassword")}
            placeholder='confirm password' className='px-4 py-2 rounded'/>
            {errors.confirmPassword && (
                <p className='text-red-500'>{`${errors.confirmPassword.message}`}</p>
            )}
        <button type='submit' 
        disabled={isSubmitting}
        className='bg-blue-500 disabled:bg-gray-500 py-2 rounded'>Submit</button>
    </form>
  )
}
