// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'
//*** Extra Credit 6 ***/
import {ErrorBoundary} from 'react-error-boundary'

//*** Extra Credit 4 ***/
// class ErrorBoundary extends React.Component {
//   state = {error: null}

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return {error}
//   }

//   render() {
//     const {error} = this.state
//     if (error) {
//       // You can render any custom fallback UI
//       return <this.props.FallbackComponent error={error} />
//     }

//     return this.props.children
//   }
// }

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
  // if (!pokemonName) {
  //   return
  // }
  // const [pokemon, setPokemon] = React.useState(null)
  //*** Extra Credit 1 ***/
  // const [error, setError] = React.useState(null)
  //*** Extra Credit 2 ***/
  // const [status, setStatus] = React.useState('idle')
  //*** Extra Credit 3 ***/
  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status: 'idle',
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    // setPokemon(null)
    // setError(null)
    //*** Extra Credit 2 ***/
    // setStatus('pending')
    //*** Extra Credit 3 ***/
    setState({status: 'pending'})
    fetchPokemon(pokemonName)
      .then(pokemon => {
        // setPokemon(pokemon)
        //*** Extra Credit 2 ***/
        // setStatus('resolved')
        //*** Extra Credit 3 ***/
        setState({pokemon, status: 'resolved'})
      })
      .catch(error => {
        // setError(error)
        //*** Extra Credit 2 ***/
        // setStatus('rejected')
        //*** Extra Credit 3 ***/
        setState({error, status: 'rejected'})
      })
  }, [pokemonName])
  // 💣 remove this
  // return 'TODO'
  //*** Extra Credit 3 ***/
  const {status, error, pokemon} = state
  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }
}

//*** Extra Credit 4 ***/
// function ErrorFallback({error}) {
//   return (
//     <div role="alert">
//       There was an error:{' '}
//       <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//     </div>
//   )
// }
//*** Extra Credit 7 ***/
function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  //*** Extra Credit 7 ***/
  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* Extra Credit 4 
          <PokemonInfo pokemonName={pokemonName} />
          */}
        {/* Extra Credit 4
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary> */}
        {/* Extra Credit 5
        <ErrorBoundary FallbackComponent={ErrorFallback} key={pokemonName}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary> */}
        {/* Extra Credit 7 
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>*/}
        {/* Extra Credit 8 */}
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
