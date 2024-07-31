import DefaultUser from '../../../assets/DefaultUser.svg';
import { useState } from 'react';

const Profile = () => {
    const [username] = useState<string>('Muhammad Shahzaib');

    const getName = (): string => {
        if (username.length > 15) {
            return username.substring(0, 15) + '...';
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
        </div>
    );
};

export default Profile;
