import React from 'react'
import { Link } from 'react-router-dom'


const Pnf = () => {
  return (
    <div style={{height:'100vh'}} className='d-flex justify-content-center align-items-center flex-column'>
      <h1 style={{fontSize:'80px'}}></h1>
      <img width={'500px'} className='img-fluid' src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ftenor.com%2Fsearch%2F404-gifs&psig=AOvVaw2FK-KinPb1NQCHinigcdpX&ust=1734067102457000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJDl8cC9oYoDFQAAAAAdAAAAABAh" alt="" />
      <h1>Look Like You're Lost</h1>
      <p>The page your loooking for is not available!</p>
      <Link to={'/'} className="btn btn-warning" >Go To Home</Link>
    </div>
  )
}

export default Pnf