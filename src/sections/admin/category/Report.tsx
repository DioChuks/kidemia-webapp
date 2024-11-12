import React, { useEffect, useState } from 'react'
import cardConfig from '../data/Card';
import BarChart from '../../../components/charts/BarChart';
import CardInfoBox from '../../../components/cards/CardInfoBox';
import { fetchCardsCount } from '../../../lib/admin/api-home';
import toast, { Toaster } from 'react-hot-toast';

const Report: React.FC = () => {
  const [counts, setCounts] = useState(cardConfig);

  useEffect(() => {
    const loadCounts = async () => {
      const toastId = toast.loading('Loading card data...');
      try {
        const data = await fetchCardsCount();
        setCounts(prevCounts => ({
          studentsAmount: { ...prevCounts.studentsAmount, amount: data.studentsAmount },
          subjectsAmount: { ...prevCounts.subjectsAmount, amount: data.subjectsAmount },
          topicsAmount: { ...prevCounts.topicsAmount, amount: data.topicsAmount },
          testsAmount: { ...prevCounts.testsAmount, amount: data.testsAmount },
        }));
        toast.success('Data loaded successfully', { id: toastId });
      } catch (error) {
        toast.error('Failed to load card data', { id: toastId });
        console.error("Error fetching card counts:", error);
      }
    };

    loadCounts();
  }, []);
  return (
    <>
    <div className="w-full flex justify-between items-center gap-5 flex-wrap">
    {Object.entries(counts).map(([key, config]) => (
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
    <Toaster/>
    </>
  )
}

export default Report
