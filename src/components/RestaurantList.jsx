import React from 'react'
import { useHistory } from 'react-router'
import RestaurantAPI from '../apis/RestaurantAPI'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Restaurant from './Restaurant'

const RestaurantList = () => {
  const queryClient = useQueryClient()
  const { data, isError, isLoading } = useQuery('restaurants', () => RestaurantAPI.get('/').then(res => res.data))
  const { mutate } = useMutation(id => RestaurantAPI.delete(`/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('restaurants')
    }
  })
  const history = useHistory()

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    mutate(id)
  }

  const handleUpdate = (e,id) => {
    e.stopPropagation()
    history.push(`/restaurants/${id}/update`)
  }

  const handleRestaurantSelect = id => {
    history.push(`/restaurants/${id}`)
  }

  if(isLoading) return <h3>Loading...</h3>
  if(isError) return <h3>Error, something went wrong</h3>

  return (
    <div>
      {
        data.restaraunts.length === 0 ? <h4 className='mt-20 text-6xl font-thin text-center'>Nothing Here. Add Some Restaurants!</h4> : 
        <table className="table text-white table-auto">
          <thead className='bg-blue-500'>
            <tr className="bg-primary">
              <th scope="col">Restaurant</th>
              <th scope="col">Location</th>
              <th scope="col">Price Range</th>
              <th scope="col">Ratings</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 border-gray-600">
            {data?.restaraunts.map(restaurant => (
              <Restaurant restaurant={restaurant} handleRestaurantSelect={handleRestaurantSelect} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            ))}
          </tbody>
      </table> 
      }
    </div>
  )
}

export default RestaurantList
