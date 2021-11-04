import React from 'react'
import StarRating from './StarRating'

const Reviews = ({ reviews }) => {
  console.log(reviews)
  return (
    <div className="flex justify-between items-center flex-wrap gap-4">
      { reviews && reviews.map(review => (
        <div key={review.id} className="border rounded bg-blue-600 text-white z-20 w-full" style={{ maxWidth: '30%' }}>
          <div className="bg-blue-700 flex justify-between px-2 items-start rounded h-12 pt-2 z-10">
            <p>{review.name}</p>
            <span className="flex"><StarRating key={review.id} rating={review.rating}/></span>
          </div>
          <div className="text-center flex justify-center items-center h-30 px-3 py-3">
            <p className="">{review.review}</p>
          </div>
      </div>
      )) }
    </div>
  )
}

export default Reviews
