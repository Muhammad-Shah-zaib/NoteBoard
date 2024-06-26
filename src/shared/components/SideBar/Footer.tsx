import TrashBtnSvg from '../../../assets/button-svgs/TrashBtnSvg.tsx';
import ExclamationMarkSvg from '../../../assets/button-svgs/ExclamationMarkSvg.tsx';
const Footer = () => {
    return (
        <div className={`footer-ctn`}>
            <div
                className={`flex gap-2 p-1 transition-all duration-200 hover:bg-primary`}
            >
                <TrashBtnSvg />
                <span>Trash</span>
            </div>

            <div
                className={`flex gap-2 p-1 transition-all duration-200 hover:bg-primary`}
            >
                <ExclamationMarkSvg />
                <span>Contact / Support</span>
            </div>
        </div>
    );
};

export default Footer;
``;
