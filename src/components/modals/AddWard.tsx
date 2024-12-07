import React from 'react'
import "animate.css";
import Logo from "../../assets/images/KIDEMIA LOGO pro.png";
import MailIcon from '../icons/MailIcon';
import toast, { Toaster } from 'react-hot-toast';
import { handleRequestError } from '../../lib/api-error-handler';

interface ModalProps {
    onClose: () => void
}

const AddWardModal: React.FC<ModalProps> = ({ onClose }) => {
    const [email, setEmail] = React.useState('');
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handleWardRegister = async () => {
        const toastId = toast.loading('sending...');
        try {
            console.log(email);
            // simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // handle response
            toast.success('Email sent successfully!', { id: toastId });
        } catch (error) {
            handleRequestError(error, toastId);
        }
    }
    return (
        <div
            className="fixed inset-0 flex z-10 w-screen h-screen justify-center items-center bg-semi-black p-10"
        >
            <div className='w-full h-full bg-semi-black -z-10 absolute' onClick={onClose}></div>
            <div className="w-40 h-40 md:w-1/2 md:h-1/2 flex flex-col justify-between items-center gap-10 
      p-20 text-dark bg-brand-white rounded-md z-50 animate__animated animate__zoomInUp">
                <div className="w-20 h-10 flex justify-center">
                    <img
                        src={Logo}
                        alt="logo"
                        className="object-cover"
                    />
                </div>

                <div className="w-full text-center test-body">
                    <h1 className="mb-1 md:text-2xl text-xl font-bold">Add Ward</h1>
                    <p className="font-md text-lg md:text-xl">Your ward would recieve an email to register</p>
                </div>

                <div
                    id="inputBox"
                    className="flex items-center bg-inputGrey gap-5 p-5 rounded-sm"
                >
                    <label htmlFor="email">
                        <MailIcon />
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Ward email"
                        className="w-full border-none outline-none bg-transparent font-xs text-16 text-dark"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>

                <div className="flex gap-10">
                    <button
                        className="btn btn-primary sm-btn"
                        onClick={handleWardRegister}
                    >
                        send
                    </button>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}

export default AddWardModal