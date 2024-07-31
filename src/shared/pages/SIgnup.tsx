import { useForm, SubmitHandler } from 'react-hook-form';
import { ISignUpRequestDto } from '../../store/Users/types';
import { TSignupProps } from '../../containers/SignUpContainer';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Signup = ({ signUpSuccessMessage, signUpAsync, error }: TSignupProps) => {
    // FORM HOOKS
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ISignUpRequestDto>();
    const usernameRegex = /^[a-z0-9_]{8,50}$/;

    // router hooks
    const navigate = useNavigate();

    // USE EFFECT FOR SUCCESS MESSAGE
    useEffect(() => {
        if (signUpSuccessMessage) {
            alert(signUpSuccessMessage + ', Please verify your email to login');
            reset();
            navigate('/login');
        }
    }, [signUpSuccessMessage]);
    // USE EFFECT FOR ERROR
    useEffect(() => {
        if (error) {
            alert(error.message);
        }
    }, [error]);

    // FORM SUBMIT HANDLER
    const onSubmit: SubmitHandler<ISignUpRequestDto> = (
        data: ISignUpRequestDto,
    ) => {
        signUpAsync(data);
    };

    return (
        <div
            className={`flex h-screen w-screen items-center justify-center bg-primary`}
        >
            <div
                className={`w-[500px] space-y-8 px-8 py-4 shadow-lg shadow-secondary`}
            >
                <h1 className="flex w-full justify-center">
                    <span className="rounded-lg px-4 py-2 text-xl font-bold text-primary-200 shadow-lg shadow-secondary">
                        Sign Up
                    </span>
                </h1>

                {/* Form */}
                <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                    {/* Firstname */}
                    <div className={`grid w-full grid-cols-3 items-center`}>
                        <label className="font-mono text-lg font-bold">
                            Firstname:{' '}
                            <strong className="text-xl font-bold text-red-500">
                                *
                            </strong>
                        </label>
                        <input
                            type="text"
                            {...register('firstname', {
                                required: 'Firstname is required',
                                minLength: {
                                    value: 5,
                                    message:
                                        'Firstname should be more than 5 characters',
                                },
                                maxLength: {
                                    value: 20,
                                    message:
                                        'Firstname should be less than 20 characters',
                                },
                            })}
                            className={`col-span-2 w-full border-b-2 border-primary-700 bg-transparent px-4 py-1 outline-none transition-all duration-300 focus:border-blue-700`}
                        />
                        {errors.firstname && (
                            <span className="col-span-3 py-2 font-mono text-sm font-bold text-red-500">
                                {errors.firstname.message}
                            </span>
                        )}
                    </div>

                    {/* Lastname */}
                    <div className={`grid w-full grid-cols-3 items-center`}>
                        <label className="font-mono text-lg font-bold">
                            Lastname:
                        </label>
                        <input
                            type="text"
                            {...register('lastname')}
                            className={`col-span-2 w-full border-b-2 border-primary-700 bg-transparent px-4 py-1 outline-none transition-all duration-300 focus:border-blue-700`}
                        />
                    </div>

                    {/* Username */}
                    <div className={`grid w-full grid-cols-3 items-center`}>
                        <label className="font-mono text-lg font-bold">
                            Username:{' '}
                            <strong className="text-xl font-bold text-red-500">
                                *
                            </strong>
                        </label>
                        <input
                            type="text"
                            {...register('username', {
                                required: 'Username is required',
                                pattern: {
                                    value: usernameRegex,
                                    message:
                                        'Invalid username format (only underscores, lowercase letters, and digits, length between 8-50)',
                                },
                            })}
                            className={`col-span-2 w-full border-b-2 border-primary-700 bg-transparent px-4 py-1 outline-none transition-all duration-300 focus:border-blue-700`}
                        />
                        {errors.username && (
                            <span className="col-span-3 py-2 font-mono text-sm font-bold text-red-500">
                                {errors.username.message}
                            </span>
                        )}
                    </div>

                    {/* Email */}
                    <div className={`grid w-full grid-cols-3 items-center`}>
                        <label className="font-mono text-lg font-bold">
                            Email:{' '}
                            <strong className="text-xl font-bold text-red-500">
                                *
                            </strong>
                        </label>
                        <input
                            type="text"
                            {...register('email', {
                                required: true,
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Invalid email format',
                                },
                            })}
                            className={`col-span-2 w-full border-b-2 border-primary-700 bg-transparent px-4 py-1 outline-none transition-all duration-300 focus:border-blue-700`}
                        />
                        {errors.email && (
                            <span className="col-span-3 py-2 font-mono text-sm font-bold text-red-500">
                                {errors.email.type === 'required'
                                    ? 'Email is required'
                                    : 'Invalid email format'}
                            </span>
                        )}
                    </div>

                    {/* Submit button */}
                    <div className="flex w-full items-center justify-between">
                        <Link
                            to={`/login`}
                            className={`text-blue-500 underline-offset-4 hover:underline`}
                        >
                            Already have an account?
                        </Link>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-700"
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
