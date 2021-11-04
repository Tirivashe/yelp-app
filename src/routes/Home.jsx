import React from 'react'
import AddRestaurant from '../components/AddRestaurant'
import Header from '../components/Header'
import RestaurantList from '../components/RestaurantList'

const Home = () => {
  return (
    <div className="container w-11/12">
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>
  )
}

export default Home
