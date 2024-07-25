import { useForm, SubmitHandler } from "react-hook-form";

interface ILoginForm {
    username: string;
    email: string;
}

const Login = () => {
    const {register,handleSubmit, formState: {errors}} = useForm<ILoginForm>();

    const onSubmit: SubmitHandler<ILoginForm> = (data) => {
        console.log(data)
    }
    return (
        <div className={`h-screen w-screen flex items-center justify-center bg-primary`}>
        <div className={` w-[500px] shadow-lg shadow-secondary px-8 py-4 space-y-8`}>
            <h1 className="flex w-full justify-center">
                <span className="px-4 py-2 shadow-lg shadow-secondary rounded-lg text-xl text-primary-200 font-bold">Sign In</span>
            </h1>

            {/* Form */}
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}> 

                {/* Username */}
                <div className={`w-full grid grid-cols-3 items-center`}>
                    <label className="font-mono font-bold text-lg">Username: <strong className="font-bold text-red-500 text-xl">*</strong></label>
                    <input
                        type="text"
                        {...register("username", {
                            required: "Username is required",
                        })

                        }
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
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email format"
                            }
                        })}
                        className={`px-4 py-1 w-full col-span-2 bg-transparent outline-none border-b-2 border-primary-700 focus:border-blue-700 transition-all duration-300`}
                    />
                </div>
                {errors.email && <span className="text-red-500 col-span-3 py-2 font-bold font-mono text-sm">{errors.email.message}</span>}
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
}
export default Login;