import React from 'react'
import StarRating from './StarRating'


const Restaurant = ({ restaurant, handleDelete, handleRestaurantSelect, handleUpdate }) => {


  const RenderRating = ({ restaurant: { count, avg_rating } }) => {
    if(count <= 0){
      return <span className="text-warning">0 Reviews</span>
    }
    return(
      <div className="flex justify-start items-center">
        <StarRating rating={avg_rating}/>
        <span className="text-warning ml-1">{`(${count})`}</span>
      </div>
    )
  }


  return (
    <tr key={restaurant.id} onClick={()=> handleRestaurantSelect(restaurant.id)}>
      <td>{restaurant.name}</td>
      <td>{restaurant.location}</td>
      <td>{"$".repeat(restaurant.price_range)}</td>
      <td>{<RenderRating restaurant={restaurant}/>}</td>
      <td><button onClick={e=> handleUpdate(e, restaurant.id)} className="bg-warning w-20 h-9 rounded text-black">Update</button></td>
      <td><button onClick={e=> handleDelete(e, restaurant.id)} className="bg-danger w-20 h-9 rounded text-white">Delete</button></td>
    </tr>
  )
}

export default Restaurant
