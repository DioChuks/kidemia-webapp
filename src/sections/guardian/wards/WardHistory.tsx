import React from 'react'

interface WardHistoryProps {
    id: number;
    title: string;
    avgScore: number;
    status: string;
    comment: string;
    dateCreated: string;
}

interface IWardHistory {
    ward: WardHistoryProps
}

const WardHistory: React.FC<IWardHistory> = ({ ward }) => {
    return (
        <div className="w-[1000px] md:w-full h-[60px] flex items-center justify-between border-bottom border-primary">
            <p className='w-[26px] text-sm font-normal'>{ward.id}</p>
            <p className='w-[500px] text-sm font-normal'>{ward.title}</p>
            <p className='w-[150px] text-sm font-medium h-10 flex items-center justify-center'>{ward.avgScore}</p>
            <p className='w-[100px] text-sm font-normal px-5 py-2 text-primary bg-primary-10 flex items-center justify-center border border-primary rounded-[10px]'>{ward.status}</p>
            <p className='w-[150px] text-sm font-normal flex items-center justify-center'>
                <span className='px-5 py-2 text-white bg-green-700 flex items-center justify-center rounded-[10px]'>{ward.comment}</span>
            </p>
            <p className='w-[150px] text-sm font-normal h-10 flex items-center justify-center'>{ward.dateCreated}</p>
            <p className='w-[200px] text-sm font-normal text-primary cursor-pointer h-10 flex items-center justify-center'>View Result</p>
        </div>
    )
}

export default WardHistory