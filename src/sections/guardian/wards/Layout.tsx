import React from 'react'
import { createPortal } from 'react-dom';
import WardCard from '../../../components/cards/WardCard'
import PlusIcon from '../../../components/icons/Plus'
import AddWardModal from '../../../components/modals/AddWard';

const WardsLayout: React.FC = () => {
    const [addWard, setAddWard] = React.useState(false);
    const wardsData = [
        { id: 1, name: "Timothy Zubairu", exam: 82, test: 82 },
        { id: 2, name: "Treasure Zubairu", exam: 82, test: 82 },
        { id: 3, name: "Triumph Zubairu", exam: 82, test: 82 },
        { id: 4, name: "Nicholas Zubairu", exam: 82, test: 82 },
    ];

    // handle opening and closing of modal
    const handleOpenModal = () => {
        setAddWard(true);
    };

    const handleCloseModal = () => {
        setAddWard(false);
    }

    return (
        <section className='p-10 max-w-[1306px] flex flex-col gap-9'>
            <div className='flex justify-between items-center'>
                <h3 className="text-dark font-bold text-xl md:text-3xl">Your Wards</h3>
                <button className='bg-primary text-white rounded-[10px] flex items-center justify-center 
                h-[50px] w-[137px] gap-3' onClick={handleOpenModal}>
                    <PlusIcon /> Add Ward
                </button>
            </div>
            <div className='max-w-[1306px] lg:h-[311px] max-h-screen overflow-y-auto flex flex-row flex-wrap gap-4 justify-between items-center'>
                {wardsData.map((ward, index) => (
                    <WardCard key={index} id={ward.id} name={ward.name} avgExamScore={ward.exam} avgTestScore={ward.test} />
                ))}
            </div>
            {addWard && createPortal(<AddWardModal onClose={handleCloseModal} />, document.body)}
        </section>
    )
}

export default WardsLayout