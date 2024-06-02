import React from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <div className='text-center my-24'>
         <div className="text-center">
        <Link to='/about' className="uppercase text-gray-500 font-semibold leading-4">
          Our Strory
        </Link>
        <h2 className="text-primary font-bold text-4xl italic">About Us</h2>
      </div>
      <div classsName="text-gray-500">
        <p className='max-w-2xl mx-auto mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eos is sapiente aspernatur amet itaque aliquam nulla. Perspiciatis accusantium facilis illo architecto ducimus dignissimos tetio ad in! Nemo officia repellat, porro iusto dolorum corrupti natus?</p>
        <p className='max-w-2xl mx-auto mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eos is sapiee minus laudantium a, aliquam suscipit nostrum optio ad in! Nemo officia repellat, porro iusto dolorum corrupti natus?</p>

        <p className='max-w-2xl mx-auto mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eos is sapiente in! Nemo officia repellat, porro iusto dolorum corrupti natus?</p>
      </div>
      
    </div>
  )
}

export default AboutUs
