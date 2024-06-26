import DefaultUser from '../../../assets/DefaultUser.svg';
import { useState } from 'react';
import Button from '../../button/Button.tsx';
import AddBtnSvg from '../../../assets/button-svgs/AddBtnSvg.tsx';
const Profile = () => {
    const [username] = useState<string>('Muhammad Shahzaib');

    const getName = (): string => {
        if (username.length > 10) {
            return username.substring(0, 10) + '...';
        }

        return username;
    };
    return (
        <div className={`profile-ctn`}>
            {/* image */}
            <div
                className={`h-[50px] w-[50px] rounded-md bg-zinc-800 text-center text-xs`}
            >
                <img src={DefaultUser} alt={`Profile picture`} />
            </div>
            <span className={`text-sm`}>{getName()}</span>
            <Button
                className={`opacity-60 transition-all duration-200 hover:opacity-100`}
            >
                {<AddBtnSvg />}
            </Button>
        </div>
    );
};

export default Profile;
