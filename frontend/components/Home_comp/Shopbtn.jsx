import React from 'react'
import { Link } from 'react-router-dom'

const Shopbtn = () => {
  return (
    <div className="flex justify-center">
      <Link to="/shop" className="
        px-6 
        py-3 
        mt-12 
        font-semibold 
        rounded-xl 
        text-white 
        bg-linear-to-r from-green-600 to-lime-500
        shadow-lg shadow-green-800/30
        hover:from-lime-500 hover:to-green-600
        hover:scale-105
        hover:shadow-green-500/50
        transition-all duration-300 ease-out
        inline-block
      ">
       Shop Now
      </Link>
    </div>
  )
}

export default Shopbtn
