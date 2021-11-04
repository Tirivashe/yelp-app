import React from 'react'
import { useParams } from 'react-router-dom'
import RestaurantAPI from '../apis/RestaurantAPI'
import AddReview from '../components/AddReview'
import Reviews from '../components/Reviews'
import StarRating from '../components/StarRating'
import { useQuery } from 'react-query'

const RestaurantDetails = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useQuery(['restaurant', id], ()=> RestaurantAPI.get(`/${id}`).then(res => res.data))

  if(isLoading) return <h4>Loading...</h4>
  if(isError) return <h4>Error. Something went wrong</h4>


  return (
    <div>
      <div className="text-center">{data.data.restaraunt ? (
        <>
          <h1 className="mt-3 mb-2 font-light text-center text-7xl">{data.data.restaraunt.name}</h1>
          <div className="flex items-center justify-center text-center">
            <StarRating rating={data.data.restaraunt.avg_rating}/>
            <span className="ml-1 text-warning">
              {data.data.restaraunt.count ? `(${data.data?.restaraunt.count})` : '(0)'}
            </span>
          </div>
          <div className="w-full px-5 mt-4">
            { data.data.reviews.length === 0 ? <h3 className='my-10 text-4xl font-light'>No Reviews For This Restaurant. Add One!</h3>: <Reviews reviews={data.data?.reviews}/>}
            <AddReview id={id}/>
          </div>
        </>
      ) : <p>Loading...</p>}</div>
    </div>
  )
}

export default RestaurantDetails
