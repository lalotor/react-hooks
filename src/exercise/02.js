// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

//*** Extra Credit 3 ***/
// function useLocalStorageState(initialName) {
//   const [name, setName] = React.useState(
//     () => window.localStorage.getItem('name') ?? initialName,
//   )

//   React.useEffect(() => {
//     window.localStorage.setItem('name', name)
//   }, [name])

//   return [name, setName]
// }
//*** Extra Credit 4 ***/
function useLocalStorageState(key, defaultValue = '') {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) ?? defaultValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  //*** Normal ***/
  // const [name, setName] = React.useState(
  //   window.localStorage.getItem('name') ?? initialName,
  // )
  //*** Extra Credit 1 ***/
  // const [name, setName] = React.useState(
  //   () => window.localStorage.getItem('name') ?? initialName,
  // )

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  //*** Normal ***/
  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // })
  //*** Extra Credit 2 ***/
  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])
  //*** Extra Credit 3 ***/
  // const [name, setName] = useLocalStorageState(initialName)
  //*** Extra Credit 4 ***/
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
