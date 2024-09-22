'use client'

import React, { useState } from 'react'

interface DropAreaProps {
    onDrop: () => void; // Define the type for onDrop
  }
  
  const DropArea: React.FC<DropAreaProps> = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <section
      className={`w-full border border-dashed p-4 m-4 transition-opacity duration-300 ${showDrop ? 'opacity-100' : 'opacity-0'}`}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)} 
      onDrop={()=>{
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      drop here
    </section>
  )
}

export default DropArea
