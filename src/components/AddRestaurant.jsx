import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import RestaurantAPI from '../apis/RestaurantAPI'

const AddRestaurant = () => {

  const [fields, setFields] = useState({ name: '', location: '', price_range: null })
  const queryClient = useQueryClient()

  const { mutate, isError } = useMutation(data => RestaurantAPI.post('/', data), {
    onSuccess: () => {
      queryClient.invalidateQueries('restaurants')
    }
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFields(prevState => {
      return {...prevState, [name]: value}
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    mutate(fields)
  }

  if(isError) return <h4>Something wrong happened</h4>

  return (
    <div className="mb-4">
      <form action="">
        <div className="flex justify-between items-center gap-4">
          <div className="w-1/3">
            <input type="text" name="name"value={fields.name} onChange={handleChange} className='focus:border-gray-700 border w-full h-10 rounded px-3'  placeholder='Name'/>
          </div>
          <div className="w-1/3">
            <input type="text" name="location"value={fields.location} onChange={handleChange} className='focus:border-gray-700 border w-full h-10 rounded px-3' placeholder='Location'/>
          </div>
          <div className="w-1/3">
            <select name="price_range" className='focus:border-gray-700 border w-full h-10 rounded px-3 my-1 sm-2' value={fields.priceRange} onChange={handleChange}>
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button type="submit" onClick={ handleSubmit } className="border rounded bg-blue-600 h-10 px-4 text-white">Add</button>
        </div>
      </form>
      
    </div>
  )
}

export default AddRestaurant
