import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { IUserDto } from '../store/Users/types';
import { updateUserDto } from '../store/Users/UsersSlice';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthGuard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true); // Add loading state
    const userDto = useAppSelector((state) => state.usersSlice.userDto);

    useEffect(() => {
        const storedUserDto = localStorage.getItem('userDto');

        if (storedUserDto) {
            dispatch(
                updateUserDto({
                    userDto: JSON.parse(storedUserDto) as IUserDto,
                }),
            );
        }
        setLoading(false); // Set loading to false after fetching data
    }, [dispatch]);

    useEffect(() => {
        if (!loading) {
            if (!userDto) {
                navigate('/login'); // Navigate if userDto is still not available
            }
        }
    }, [loading, userDto, navigate]);

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while fetching userDto
    }

    return <Outlet />;
};

export default AuthGuard;
