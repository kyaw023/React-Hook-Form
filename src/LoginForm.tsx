
import { User, Mail, Tv } from 'lucide-react';
import  './LoginForm.css'
import {useForm} from "react-hook-form";
import React from "react";
import {DevTool} from "@hookform/devtools";

interface FormValues{
    username : string,
    email :string,
    channel :string
}

const LoginForm: React.FC = () => {

    const {register,control,handleSubmit,formState : {errors}} = useForm<FormValues>({
        defaultValues : {
            username : "Sayar kyaw",
            email : "sayarkyaw@gmail.com",
            channel : "The winter is coming"
        }
    });

    const onSubmit = (data :FormValues) =>{
        console.log("formValue",data)

    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="input-group">
                        <User className="icon" />
                        <input
                            type="text"
                            id={"username"}
                            {
                              ...register("username",{
                                  required : {
                                      value : true,
                                      message : "Username is required"
                                  }

                              })
                            }
                            placeholder="Username"

                        />
                        <p>{errors.username?.message}</p>
                    </div>
                    <div className="input-group">
                        <Mail className="icon"/>
                        <input
                            type="email"
                            id={"email"}
                            {...register("email", {
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Please enter a valid email address',
                                },
                                validate : {
                                    notAdmin : (fieldValue) => {
                                       return fieldValue !== "admin@gmail.com" || "Enter a different email"
                                    }
                                }
                            })}
                            placeholder="Email"

                        />
                        <p>{errors.email?.message}</p>
                    </div>
                    <div className="input-group">
                        <Tv className="icon"/>
                        <input
                            type="text"
                            id={"channel"}
                            {...register("channel", {
                                required: {
                                    value: true,
                                    message: "Channel is Required"
                                }
                            })}
                            placeholder="Channel"
                        />
                        <p>{errors.channel?.message}</p>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p className="signup-link">
                    Don't have an account? <a href="#">Sign up</a>
                </p>
            </div>
            <DevTool control={control}/>
        </div>
    );
};

export default LoginForm;