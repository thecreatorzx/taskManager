import React from 'react'
import Hero from './Hero'

const Main = ({login, setLogin}) => {
  return (
    <div>
      <Hero  login = {login} setLogin={setLogin}/>
    </div>
  )
}

export default Main