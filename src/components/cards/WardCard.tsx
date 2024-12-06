import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserIcon from '../../assets/images/Ellipse 1.svg';

interface IWardCard {
    id: number;
    name: string;
    avgExamScore: number;
    avgTestScore: number;
}

const WardCard: React.FC<IWardCard> = ({ id, name, avgExamScore, avgTestScore }) => {
    const navigate = useNavigate();
  return (
    <div 
        className='w-72 md:w-[300px] h-full bg-primary-gradient 
                border rounded-[10px] border-primary
                flex flex-col justify-center items-center gap-1 flex-shrink-0 
                hover:shadow-lg transition-all'
    >
        <div className='flex flex-col justify-center items-center gap-5'>
            <figure className='w-14 h-14 flex justify-center items-center rounded bg-slate-300 p-2'>
                <img src={UserIcon} alt="user-img" className='border-2 border-primary rounded-full'/>
            </figure>
            <h1 className='text-xl md:text-2xl font-bold text-[#080730]'>{name}</h1>
            <p className='text-base md:text-lg font-normal text-gray-600'>Avg. Exam Score: {avgExamScore}%</p>
            <p className='text-base md:text-lg font-normal text-gray-600'>Avg. Test Score: {avgTestScore}%</p>
            <button className='bg-primary text-white rounded-[10px] flex items-center justify-center h-[50px] w-[137px]' 
                    onClick={() => navigate("/admin/guardian/ward-report", { state: {ward_id: id}})}>
                View Ward
            </button>
        </div>
    </div>
  )
}

export default WardCard