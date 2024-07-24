import { useForm, SubmitHandler } from "react-hook-form";
import { ISignUpRequestDto } from "../../store/Users/types";
import { TSignupProps } from "../../containers/SignUpContainer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signup = ({ signUpSuccessMessage, signUpAsync, error }: TSignupProps) => {
    // FORM HOOKS
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ISignUpRequestDto>();
    const usernameRegex = /^[a-z0-9_]{8,50}$/;

    // router hooks
    const navigate = useNavigate();

    // USE EFFECT FOR SUCCESS MESSAGE
    useEffect(()=> {
        if (signUpSuccessMessage){
            alert(signUpSuccessMessage + ", Please verify your email to login");
            reset();
            navigate('/login');
        }
    }, [signUpSuccessMessage]);
    // USE EFFECT FOR ERROR
    useEffect(()=> {
        if (error){
            alert(error.message);
        }
    }, [error]);

    // FORM SUBMIT HANDLER
    const onSubmit: SubmitHandler<ISignUpRequestDto> = (data: ISignUpRequestDto) => {
        signUpAsync(data);
    };

    return (
        <div className={`h-screen w-screen flex items-center justify-center bg-primary`}>
            <div className={` w-[500px] shadow-lg shadow-secondary px-8 py-4 space-y-8`}>
                <h1 className="flex w-full justify-center">
                    <span className="px-4 py-2 shadow-lg shadow-secondary rounded-lg text-xl text-primary-200 font-bold">Sign Up</span>
                </h1>

                {/* Form */}
                <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                    {/* Firstname */}
                    <div className={`w-full grid grid-cols-3 items-center`}>
                        <label className="font-mono font-bold text-lg">Firstname: <strong className="font-bold text-red-500 text-xl">*</strong></label>
                        <input
                            type="text"
                            {...register("firstname", { 
                                required: "Firstname is required", 
                                minLength: { value: 5, message: "Firstname should be more than 5 characters" },
                                maxLength: { value: 20, message: "Firstname should be less than 20 characters" }
                            })}

                            className={`px-4 py-1 w-full col-span-2 bg-transparent outline-none border-b-2 border-primary-700 focus:border-blue-700 transition-all duration-300`}
                        />
                        {errors.firstname && <span className="text-red-500 col-span-3 py-2 font-bold font-mono text-sm">{errors.firstname.message}</span>}
                    </div>

                    {/* Lastname */}
                    <div className={`w-full grid grid-cols-3 items-center`}>
                        <label className="font-mono font-bold text-lg">Lastname:</label>
                        <input
                            type="text"
                            {...register("lastname")}
                            className={`px-4 py-1 w-full col-span-2 bg-transparent outline-none border-b-2 border-primary-700 focus:border-blue-700 transition-all duration-300`}
                        />
                    </div>

                    {/* Username */}
                    <div className={`w-full grid grid-cols-3 items-center`}>
                        <label className="font-mono font-bold text-lg">Username: <strong className="font-bold text-red-500 text-xl">*</strong></label>
                        <input
                            type="text"
                            {...register("username", { 
                                required: "Username is required",
                                pattern: {
                                    value: usernameRegex,
                                    message: "Invalid username format (only underscores, lowercase letters, and digits, length between 8-50)",
                                },
                            })}
                            className={`px-4 py-1 w-full col-span-2 bg-transparent outline-none border-b-2 border-primary-700 focus:border-blue-700 transition-all duration-300`}
                        />
                        {errors.username && <span className="text-red-500 col-span-3 py-2 font-bold font-mono text-sm">{errors.username.message}</span>}
                    </div>

                    {/* Email */}
                    <div className={`w-full grid grid-cols-3 items-center`}>
                        <label className="font-mono font-bold text-lg">Email: <strong className="font-bold text-red-500 text-xl">*</strong></label>
                        <input
                            type="text"
                            {...register("email", { 
                                required: true,
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email format"
                                }
                                })}
                            className={`px-4 py-1 w-full col-span-2 bg-transparent outline-none border-b-2 border-primary-700 focus:border-blue-700 transition-all duration-300`}
                        />
                        {errors.email && (
                            <span className="text-red-500 col-span-3 py-2 font-bold font-mono text-sm">
                                {errors.email.type === "required" ? "Email is required" : "Invalid email format"}
                            </span>
                        )}
                    </div>

                    {/* Submit button */}
                    <div className="w-full flex justify-center">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
