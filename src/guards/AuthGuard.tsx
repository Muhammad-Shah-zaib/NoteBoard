import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/store';
import { IUserDto, IVerifyCredentialsRequest } from '../store/Users/types';
import { Outlet, useNavigate } from 'react-router-dom';
import { TAuthGuardProps } from '../containers/AuthGuardContainer';

const AuthGuard = ({
    userDto,
    authError: error,
    updateUserDto,
    verifyCredentialsAsync,
}: TAuthGuardProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        if (error) {
            updateUserDto({ userDto: null });
            navigate('/login');
        }
    }, [error, updateUserDto, navigate]);

    useEffect(() => {
        const storedUserDto = localStorage.getItem('userDto');

        if (storedUserDto) {
            updateUserDto({
                userDto: JSON.parse(storedUserDto) as IUserDto,
            });
        } else {
            navigate('/login');
        }
        setLoading(false); // Set loading to false after fetching data
    }, [dispatch, localStorage.getItem('userDto'), navigate, updateUserDto]);

    useEffect(() => {
        if (!loading) {
            if (!userDto) {
                navigate('/login'); // Navigate if userDto is still not available
            }
        }
    }, [loading, userDto, navigate]);

    useEffect(() => {
        const savedUserDto = localStorage.getItem('userDto');
        if (savedUserDto)
            verifyCredentialsAsync(
                JSON.parse(savedUserDto as string) as IVerifyCredentialsRequest,
            );
        return () => undefined;
    }, [userDto]);
    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while fetching userDto
    }

    return <Outlet />;
};

export default AuthGuard;
