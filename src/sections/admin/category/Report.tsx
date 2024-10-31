import React from 'react'
import cardConfig from '../data/Card';
import BarChart from '../../../components/charts/BarChart';
import CardInfoBox from '../../../components/cards/CardInfoBox';

const Report: React.FC = () => {
  return (
    <>
    <div className="w-full flex justify-between items-center gap-5 flex-wrap">
    {Object.entries(cardConfig).map(([key, config]) => (
        <CardInfoBox
            icon={config.icon}
            title={config.title}
            amount={config.amount}
            className={config.class}
            type={config.type}
            key={key}/>
    ))}
    </div>
    <br/>
    <div className="w-full h-half flex md-flex-row flex-col items-center gap-10">
        <BarChart bars={[30,15,5,60,90]} titleId='recent-test' className='bg-white rounded-sm'/>
        <BarChart bars={[30,45,35,55,50]} titleId='recent-exam' className='bg-white rounded-sm'/>
    </div>
    </>
  )
}

export default Report
