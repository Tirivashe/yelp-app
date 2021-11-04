import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import RestaurantAPI from '../apis/RestaurantAPI'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const UpdateRestaurant = () => {
  const { id } = useParams()
  const history = useHistory()
  const queryClient = useQueryClient()
  const [fields, setFields] = useState({ name:'', location:'', price_range: null })
  const { data } = useQuery(['restaurant', id], ()=> RestaurantAPI.get(`/${id}`).then(res => res.data))

  const { mutate, isLoading, isError } = useMutation((data) => RestaurantAPI.put(`/${id}`, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('restaurants',)
    }
  })
  
  const handleSubmit = async e => {
    e.preventDefault()
    mutate(fields)
    history.push('/')
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFields({...fields, [name]: value})
  } 
  
  if(isLoading) return <h5>Loading...</h5>
  if(isError) return <h3>Error</h3>

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input value={fields.name} placeholder={data?.data.restaraunt.name} onChange={handleChange} name="name" className="form-control" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input value={fields.location} placeholder={data?.data.restaraunt.location} onChange={handleChange} name="location" className="form-control" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input value={fields.price_range} placeholder={data?.data.restaraunt.price_range} onChange={handleChange} name="price_range" className="form-control" type="number" />
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary"> Submit </button>
      </form>
    </div>
  )
}

export default UpdateRestaurant
