
import {User, Mail, Tv, FacebookIcon, InstagramIcon, PhoneIcon} from 'lucide-react';
import  './LoginForm.css'
import {useFieldArray, useForm} from "react-hook-form";
import React from "react";
import {DevTool} from "@hookform/devtools";

interface FormValues{
    username : string,
    email :string,
    channel :string
    social : {
        facebook : string,
        instagram : string
    }

    phoneNumber : string[]
    phoneLists : {
        number : string
    }[]
}

const LoginForm: React.FC = () => {

    const {register,control,handleSubmit,formState : {errors}} = useForm<FormValues>({
        defaultValues : {
            username : "Sayar kyaw",
            email : "sayarkyaw@gmail.com",
            channel : "The winter is coming",
            social : {
                facebook : "kyaw khaing lynn",
                instagram : "kyaw khaing lynn"
            },
            phoneNumber : [],
            phoneLists : [
                {
                    number :"",
                }
            ]
        }
    });

    const {append,remove,fields}  = useFieldArray({
        control,
        name : "phoneLists"
    })

    const onSubmit = (data :FormValues) =>{
        console.log("formValue",data)

    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="input-group">
                        <User className="icon"/>
                        <input
                            type="text"
                            id={"username"}
                            {
                                ...register("username", {
                                    required: {
                                        value: true,
                                        message: "Username is required"
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
                                validate: {
                                    notAdmin: (fieldValue) => {
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
                    <div className="input-group">
                        <InstagramIcon className="icon"/>
                        <input
                            type="social.instagram"
                            id={"social.instagram"}
                            {...register("social.instagram")}
                            placeholder="Instagram"

                        />
                        <p>{errors?.social?.instagram?.message}</p>
                    </div>
                    <div className="input-group">
                        <FacebookIcon className="icon"/>
                        <input
                            type="text"
                            id={"channel"}
                            {...register("social.facebook", {
                                required: {
                                    value: true,
                                    message: "facebook is Required"
                                }
                            })}
                            placeholder="Channel"
                        />
                        <p>{errors?.social?.facebook?.message}</p>
                    </div>
                    <div className="input-group">
                        <PhoneIcon className="icon"/>
                        <input
                            type="text"
                            id={"primary-phone"}
                            {...register("phoneNumber.0")}
                            placeholder="primary-phone"

                        />
                        <p>{errors?.phoneNumber?.[0]?.message}</p>
                    </div>
                    <div className="input-group">
                        <PhoneIcon className="icon"/>
                        <input
                            type="text"
                            id={"secondary-phone"}
                            {...register("phoneNumber.1", {
                                required: {
                                    value: true,
                                    message: "secondary-phone is Required"
                                }
                            })}
                            placeholder="Channel"
                        />
                        <p>{errors?.phoneNumber?.[1]?.message}</p>
                    </div>
                     <div className={"input-group"} style={
                         {
                             gap : "10px",
                             display : "flex",
                             flexDirection : "column"
                         }
                     }>
                         {
                             fields.map((field,index)=>{
                                 return(
                                     <div key={field.id} style={
                                         {
                                             gap : "10px",
                                             display : "flex",
                                             flexDirection : "row",
                                             alignItems : "center"
                                         }
                                     }>
                                         <PhoneIcon className="icon"/>
                                         <input
                                             type="text"
                                             id={"phoneLists"}
                                             {...register(`phoneLists.${index}.number`)}
                                             placeholder="phoneLists"
                                         />
                                         {
                                             index > 0 && (
                                                 <button type="button" onClick={() => remove(index)}>Remove</button>
                                             )
                                         }
                                     </div>
                                 )
                             })
                         }
                         <button type="button" onClick={() => append({number : ""})}>Add</button>
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