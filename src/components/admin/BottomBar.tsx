import React from 'react'

const BottomBar: React.FC = () => {
  return (
    <div className="fixed flex items-center justify-center md-d-none bottom-0 left-0 gap-4 w-full border border-red h-5 bg-white">
        <span>Home</span>
        <span>Report</span>
        <span>Subject</span>
    </div>
  )
}

export default BottomBar
