"use client"
import React from 'react'
import { useSearchParams, useRouter} from 'next/navigation'
import MobileForm from '../../components/Forms/MobileForm.jsx'
import CarForm from '../../components/Forms/CarForm.jsx'
import BikeForm from '../../components/Forms/BikeForm.jsx'
import ElectronicsForm from '../../components/Forms/ElectronicsForm.jsx'
import FurnitureForm from '../../components/Forms/FurnitureForm.jsx'
import PropertyForm from '../../components/Forms/PropertyForm.jsx'
import FashionForm from '../../components/Forms/FashionForm.jsx'
import HobbyForm from '../../components/Forms/HobbyForm.jsx'
import PetForm from '../../components/Forms/PetForm.jsx'

function categoryAttribute() {
    const searchParams =  useSearchParams()
    const categoryId = Number(searchParams.get("categoryId"))
    const router = useRouter()

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
      categoryId === 5? (
        <ElectronicsForm/>
      ):
      categoryId === 6? (
        <FurnitureForm/>
      ):
      categoryId === 7? (
        <PropertyForm/>
      ):
      categoryId === 8? (
        <FashionForm/>
      ):
      categoryId === 9? (
        <HobbyForm/>
      ):
      categoryId === 10? (
        <PetForm/>
      ):
      (router.push("/post"))
    }
   
   
    </div>

  )
}

export default categoryAttribute