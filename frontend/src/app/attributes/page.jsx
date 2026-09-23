"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import MobileForm from '../../components/Forms/MobileForm.jsx'
import CarForm from '../../components/Forms/CarForm.jsx'
import BikeForm from '../../components/Forms/BikeForm.jsx'
function categoryAttribute() {
    const searchParams =  useSearchParams()
    const categoryId = Number(searchParams.get("categoryId"))

  return (
    <div className='flex flex-col justify-center items-center'>
    {
      categoryId === 2 ? (
      
          <MobileForm/>
      ):
      categoryId === 3? (
          <CarForm/>
      ):
      categoryId === 4? (
        <BikeForm/>
      ):
      (<p>not found</p>)
    }
   
   
    </div>

  )
}

export default categoryAttribute