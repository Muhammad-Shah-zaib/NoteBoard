import { useForm, SubmitHandler } from 'react-hook-form';
import { TLoginProps } from '../../containers/loginContainer';
import BackBtnSvg from '../../assets/button-svgs/BackBtnSvg';
import { useEffect } from 'react';

interface ILoginForm {
    email: string;
}

const Login = ({
    loginStatus,
    updateLoginStatus,
    loginAsync,
    incorrectEmail,
    loginPending,
    error,
}: TLoginProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<ILoginForm>();

    const onSubmit: SubmitHandler<ILoginForm> = (data) => {
        loginAsync(data);
    };

    // USE EFFECT HOOK
    useEffect(() => {
        // add a root error for incorrect email
        if (incorrectEmail)
            setError('root', {
                message: 'Invalid Email',
            });
    }, [incorrectEmail]);
    useEffect(() => {
        if (error) {
            setError('root', {
                message: error.message,
            });
        }
    }, [error]);
    return (
        <div
            className={`flex h-screen w-screen items-center justify-center bg-primary`}
        >
            <div
                className={`w-[500px] space-y-8 px-8 py-4 shadow-lg shadow-secondary`}
            >
                <h1 className="flex w-full justify-center">
                    <span className="rounded-lg px-4 py-2 text-xl font-bold text-primary-200 shadow-lg shadow-secondary">
                        Sign In
                    </span>
                </h1>

                {loginStatus ? (
                    <div className={`Hello world flex flex-col gap-4`}>
                        <h1 className="text-center text-4xl font-bold text-green-700">
                            Please check your email to login
                        </h1>
                        <div className="flex justify-center">
                            <button
                                onClick={() =>
                                    updateLoginStatus({ status: false })
                                }
                                className="relative flex items-center rounded-lg border-2 border-primary-600 py-1 pl-2 pr-4 text-lg font-bold shadow-lg shadow-secondary transition-all duration-200 hover:bg-primary-600"
                            >
                                <BackBtnSvg />
                                back
                            </button>
                        </div>
                    </div>
                ) : (
                    <form
                        className="space-y-8"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* Email */}
                        <div className={`grid w-full grid-cols-3 items-center`}>
                            {/* ROOT ERROR */}
                            {errors.root && (
                                <div className="col-span-3 pb-2">
                                    <span className="font-mono text-sm font-bold text-red-500">
                                        {errors.root.message}
                                    </span>
                                </div>
                            )}
                            <label className="font-mono text-lg font-bold">
                                Email:{' '}
                                <strong className="text-xl font-bold text-red-500">
                                    *
                                </strong>
                            </label>
                            <input
                                type="text"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'Invalid email format',
                                    },
                                })}
                                className={`col-span-2 w-full border-b-2 border-primary-700 bg-transparent px-4 py-1 outline-none transition-all duration-300 focus:border-blue-700`}
                            />
                            {errors.email && (
                                <div className="col-span-3 py-2 font-mono text-sm font-bold text-red-500">
                                    {errors.email.message}
                                </div>
                            )}
                        </div>
                        {/* Submit button */}
                        <div className="flex w-full justify-center">
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-700 focus:bg-blue-900 disabled:cursor-not-allowed disabled:bg-primary-400"
                                disabled={loginPending}
                            >
                                {loginPending ? 'signing in...' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
export default Login;
