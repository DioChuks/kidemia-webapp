import React, { useContext, useEffect } from 'react'
import cardConfig from '../data/WardData';
import BarChart from '../../../components/charts/BarChart';
import CardInfoBox from '../../../components/cards/CardInfoBox';
// import { fetchCardsCount } from '../../../lib/admin/api-home';
import toast, { Toaster } from 'react-hot-toast';
import UserIcon from '../../../assets/images/Ellipse 1.svg';
import PlusIcon from '../../../components/icons/Plus';
import { useLocation, useNavigate } from 'react-router-dom';
import { wardHistory } from '../data/history';
import WardHistory from './WardHistory';
import { AuthContext } from '../../../contexts/AuthContext';
import { handleRequestError } from '../../../lib/api-error-handler';

const WardReport: React.FC = () => {
    const { userData } = useContext(AuthContext);
    const { state } = useLocation();
    const navigate = useNavigate();
    // Safely access state and ward
    const ward = state?.ward;

    useEffect(() => {
        const loadCounts = async () => {
            const toastId = toast.loading('Loading ward report...');
            try {
                if (!ward) {
                    throw new Error('Ward data not found');
                }
                await new Promise((resolve) => setTimeout(resolve, 1000));
                toast.success('Data loaded successfully', { id: toastId });
            } catch (error) {
                handleRequestError(error, toastId);
            }
        };

        loadCounts();
    }, []);

    if (!ward) {
        return (
            <div className="flex flex-col justify-center items-center h-full gap-3">
                <p className='text-xl font-normal text-red-600'>Ward data not found!</p>
                <button className='bg-primary text-white rounded-[10px] flex items-center justify-center h-[50px] w-[137px]' onClick={() => navigate(-1)}>&larr; Go Back</button>
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-between max-w-[1306px] md:h-16 items-center my-6">
                <h1 className='font-bold text-dark text-xl md:text-3xl'>Hello, {userData?.user.name ?? 'Admin'}</h1>
                <div className='flex flex-col md:flex-row items-center justify-center md:justify-end gap-7 lg:gap-[50px]'>
                    <p>Category: Common entrance</p>
                    <p className='h-12 bg-primary text-white rounded-[10px] flex items-center p-3 cursor-pointer'>Change Category</p>
                    <p className='h-12 bg-primary text-white rounded-[10px] flex items-center p-3 gap-2 cursor-pointer'><PlusIcon /> Create Assessment</p>
                </div>
            </div>
            <div className="w-full flex justify-between items-center gap-5 flex-wrap max-w-[1306px]">
                <div
                    className='w-72 md:w-[300px] h-[200px] bg-grey-gradient rounded-[10px]
                    flex flex-col justify-center items-center gap-1 flex-shrink-0 
                    hover:shadow-lg transition-all'
                >
                    <div className='flex flex-col justify-center items-center gap-5'>
                        <figure className='w-14 h-14 flex justify-center items-center rounded bg-slate-300 p-2'>
                            <img src={UserIcon} alt="user-img" className='border-2 border-primary rounded-full' />
                        </figure>
                        <p className='text-base md:text-lg font-normal text-gray-600'>Wardname</p>
                        <h1 className='text-xl md:text-2xl font-bold text-[#080730]'>{ward.name}</h1>
                    </div>
                </div>
                {Object.entries(cardConfig).map(([key, config]) => (
                    <CardInfoBox
                        icon={config.icon}
                        title={config.title}
                        amount={config.amount}
                        className={config.class}
                        type={config.type}
                        key={key} />
                ))}
            </div>
            <br />
            <div className="w-full h-half flex md-flex-row flex-col items-center gap-10 max-w-[1306px]">
                <BarChart bars={[30, 15, 5, 60, 90]} titleId='recent-test' className='bg-white rounded-sm' />
                <BarChart bars={[30, 45, 35, 55, 50]} titleId='recent-exam' className='bg-white rounded-sm' />
            </div>
            <div className="flex flex-col max-w-[1306px] justify-center items-center my-6">
                <h3 className='text-dark font-bold text-lg lg:text-2xl'>Assessment History</h3>
                <br />
                <div className="w-full h-[60px] bg-primary text-white flex items-center gap-5 px-5 mb-5 overflow-x-auto">
                    <div className="w-[1000px] md:w-full flex items-center justify-between">
                        <p className='w-[26px] text-sm font-extrabold mr-1'>S/N</p>
                        <p className='w-[500px] text-sm font-extrabold'>Title</p>
                        <p className='w-[150px] text-sm font-extrabold flex items-center justify-center'>Average Score (%)</p>
                        <p className='w-[100px] text-sm font-extrabold flex items-center justify-center'>Status</p>
                        <p className='w-[150px] text-sm font-extrabold flex items-center justify-center'>Comment</p>
                        <p className='w-[150px] text-sm font-extrabold flex items-center justify-center'>Date Created</p>
                        <p className='w-[200px] text-sm font-extrabold'></p>
                    </div>
                </div>
                <div className="h-[671px] w-full px-5 overflow-x-auto">
                    {Object.entries(wardHistory).map(([key, history]) => (
                        <WardHistory key={key} ward={history} />
                    ))}
                    <div className='h-[71px] flex justify-between items-center w-[1000px] overflow-x-auto'>
                        <p className='text-gray-500 font-normal'>Showing 10 of 320</p>
                        <div className='flex gap-4 items-center'>
                            <span className='text-gray-500'>{"<"} Prev</span>
                            <p>1</p>
                            <p>2</p>
                            <p>3</p>
                            <span>Next {">"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default WardReport
