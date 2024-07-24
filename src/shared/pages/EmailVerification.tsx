import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TEmailVerificationProps } from '../../containers/EmailVerificationContainer';

const EmailVerification = ({userDto, error, verifyEmailAsync}: TEmailVerificationProps) => {
    // router hooks
    const { emailVerificationToken } = useParams<{ emailVerificationToken: string }>();

    useEffect(()=> {
        // make a request to the backend to verify the email
        if (emailVerificationToken){
            verifyEmailAsync(emailVerificationToken);
        }
    }, [emailVerificationToken]);
    return (
        <div
            className={`flex h-screen w-screen justify-center bg-secondary pt-16`}
        >
            <span className={`space-y-8 border-b-2 border-primary`}>
                <h1 className={`font-mono text-5xl font-bold`}>
                    {
                        error && 
                            <span className={`text-red-700`}>{error.message}</span>
                    }
                    {
                       error === null && userDto === null &&
                        <>
                            <span>Please wait... </span>
                            <p className={`font-mono text-xl font-bold text-primary-500`}>
                                <em>We are currently confirming you email</em>

                                <br />
                                
                                <em className={`text-xs`}>
                                    This may take a minute or two.
                                </em>
                            </p>
                        </>
                    }
                    {
                        userDto &&
                            <span className={`text-green-600`}>Email verified</span>
                    }
                </h1>
               
            </span>
        </div>
    );
};

export default EmailVerification;
