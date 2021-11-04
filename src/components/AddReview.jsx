import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import RestaurantAPI from '../apis/RestaurantAPI'

const AddReview = ({ id }) => {
  const [fields, setFields] = useState({ name: '', rating: null, review: '' })
  const queryClient = useQueryClient()

  const { mutate, isError } = useMutation((data) => RestaurantAPI.post(`/${id}/addReview`, data).then(res => res.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['restaurant', id])
    }
  })

  const handleSubmitReview = async e => {
    e.preventDefault()
      mutate(fields)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFields({...fields, [name]: value})

  }

  if(isError) return <h3>Something went wrong</h3>

  return (
    <div className="mb-2">
      <form action="">
        <div className="flex justify-between items-center gap-4 pt-5">
          <div className="w-3/4 flex items-start flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input type="text" name='name' value={fields.name} onChange={handleChange} id="name" className='focus:border-gray-700 border w-full h-10 rounded px-3'/>
          </div>
          <div className="w-1/4 flex items-start flex-col gap-2">
            <label htmlFor="rating">Rating</label>
            <select name='rating' value={fields.rating} onChange={handleChange} id="rating" className='focus:border-gray-700 border w-full h-10 rounded px-3'>
              <option disabled value="">Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="w-full flex items-start flex-col gap-2 mt-3">
          <label htmlFor="review">Review</label>
          <textarea name='review' value={fields.review} onChange={handleChange} id="review" className="form-control"></textarea>
        </div>
        <button onClick={e => handleSubmitReview(e)} type="submit" className="border rounded bg-blue-600 h-10 px-4 text-white mt-3">Submit</button>
      </form>
    </div>
  )
}

export default AddReview
