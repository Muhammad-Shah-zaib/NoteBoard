import { useParams } from 'react-router-dom';

const LoginVerification = () => {
    // router hooks
    const { loginVerificationToken } = useParams<{
        loginVerificationToken: string;
    }>();

    return (
        <div>
            <h1>Hello</h1>
        </div>
    );
};
export default LoginVerification;
