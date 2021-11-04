import React from 'react'
import {FaRegStar as UnfilledStar, FaStar, FaStarHalfAlt} from 'react-icons/fa'

const StarRating = ({ rating }) => {
  let stars = []

  for(let i = 1; i<= 5; i++){
    if(i <= rating){
      stars.push(<FaStar className='text-warning' />)
    }else if(i === Math.ceil(rating) && !Number.isInteger(rating)){
      stars.push(<FaStarHalfAlt className='text-warning'/>)
    }else{
      stars.push(<UnfilledStar className='text-warning'/>)
    }

    
  }

  return (
    <>
      { stars }
    </>
  )
}

export default StarRating
