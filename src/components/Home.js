import React, { useEffect, useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import MovieCard from './MovieCard'
const Home = ({ movie, type }) => {
  const {
    removeMovieFromWatchlist,
    addMovieToWatched,
    moveToWatchlist,
    removeFromWatched,
  } = useContext(GlobalContext)
  const [popularMovies, setPopularMovies] = useState([])
  const fetchUpComingMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=e8270466c09aac716e7e631afa371113&language=en-US&page=1'
    )
    const data = await response.json()
    setPopularMovies(data.results)
  }
  useEffect(() => {
    fetchUpComingMovies()
    console.log(popularMovies)
  }, [])
  return (
    <div className='movie-page'>
      <div className='container'>
        <div className='header'>
          <h1 className='heading'>Popular Movies</h1>

          <span className='count-pill'>
            {popularMovies.length}{' '}
            {popularMovies.length == 1 ? 'Movie' : 'movies'}
          </span>
        </div>

        {popularMovies.length > 0 ? (
          <div className='movie-grid'>
            {popularMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} type='watchlist' />
            ))}
          </div>
        ) : (
          <h2 className='no-movies'>No movies in your watchlist, ADD SOME!!</h2>
        )}
      </div>
    </div>
  )
}

export default Home
