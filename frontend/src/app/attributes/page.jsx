"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import MobileForm from '../../components/MobileForm.jsx'
import CarForm from '../../components/CarForm.jsx'
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
      (<p>not found</p>)
    }
   
   
    </div>

  )
}

export default categoryAttribute