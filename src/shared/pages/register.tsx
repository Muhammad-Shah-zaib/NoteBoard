import { useParams } from 'react-router-dom';

const Register = () => {
    const { emailVerificationToken } = useParams();

    console.log(emailVerificationToken);
    return (
        <div
            className={`flex h-screen w-screen justify-center bg-secondary pt-16`}
        >
            <span className={`space-y-8 border-b-2 border-primary`}>
                <h1 className={`font-mono text-5xl font-bold`}>
                    Please Wait...
                </h1>
                <p className={`font-mono text-xl font-bold text-primary-500`}>
                    <em>We are currently confirming you email</em>
                    <br />
                    <em className={`text-xs`}>
                        This may take a minute or two.
                    </em>
                </p>
            </span>
        </div>
    );
};

export default Register;
