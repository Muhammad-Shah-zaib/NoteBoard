import ExclamationMarkSvg from '../../../assets/button-svgs/ExclamationMarkSvg.tsx';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
    // router HOOKS
    const naviagte = useNavigate();
    return (
        <div className={`footer-ctn`}>
            <div
                onClick={() => {
                    if (confirm('Are you sure you want to log out?')) {
                        localStorage.removeItem('userDto');
                        naviagte('/login');
                    }
                }}
                className={`flex cursor-pointer gap-2 p-1 transition-all duration-200 hover:bg-primary`}
            >
                <ExclamationMarkSvg />
                <span>Log out</span>
            </div>
        </div>
    );
};

export default Footer;
``;
