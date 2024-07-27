import { useNavigate, useParams } from 'react-router-dom';
import { TLoginVerificationProps } from '../../containers/LoginVerificationContainer';
import { useEffect } from 'react';

const LoginVerification = ({
    loginVerifiedStatus,
    verifyLoginAsync,
    error,
}: TLoginVerificationProps) => {
    // router hooks
    const navigate = useNavigate();
    const { loginVerificationToken } = useParams<{
        loginVerificationToken: string;
    }>();

    useEffect(() => {
        // verify Login
        if (loginVerificationToken) {
            verifyLoginAsync({ token: loginVerificationToken });
        }
    }, [verifyLoginAsync, loginVerificationToken]);

    useEffect(() => {
        if (loginVerifiedStatus)
            setTimeout(() => {
                navigate('/');
            }, 500);
    }, [loginVerifiedStatus]);

    if (error) {
        return (
            <div className="flex h-screen w-screen justify-center bg-primary py-16">
                <div className="flex flex-col items-center gap-4">
                    <span className="text-5xl font-bold text-red-500">
                        {error.message}
                    </span>
                    {error.statusCode === 404 && (
                        <span className="font-mono text-lg font-bold text-primary-500">
                            May be your token has expired try login again
                        </span>
                    )}
                    <span>
                        <button
                            onClick={() => navigate('/login')}
                            className="rounded-lg border-2 border-primary-500 px-4 py-2 text-white shadow-lg shadow-secondary transition-all duration-300 hover:bg-primary-500 focus:bg-primary-700"
                        >
                            Go to login
                        </button>
                    </span>
                </div>
            </div>
        );
    }
    return (
        <div className="flex h-screen w-screen justify-center bg-primary py-16">
            <div className="space-y-4">
                <h1 className="text-5xl font-bold text-primary-200">
                    {loginVerifiedStatus ? (
                        <span className="text-green-600">Verified</span>
                    ) : (
                        <span>Verifying Login</span>
                    )}
                </h1>
                <p className="font-mono text-lg font-bold text-primary-500">
                    {loginVerifiedStatus ? (
                        <span>Redirecting to dashboard...</span>
                    ) : (
                        <span>Please wait while we verify your login</span>
                    )}
                </p>
            </div>
        </div>
    );
};
export default LoginVerification;
