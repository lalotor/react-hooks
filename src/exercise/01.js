// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

//*** Normal ***/
// function Greeting() {
//*** Extra Credit 1 ***/
function Greeting(props) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  //*** Normal ***/
  // const [name, setName] = React.useState()
  //*** Extra Credit 1 ***/
  const [name, setName] = React.useState(props.initialName)

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  //*** Normal ***/
  // return <Greeting />
  //*** Extra Credit 1 ***/
  return <Greeting initialName="stranger" />
}

export default App
