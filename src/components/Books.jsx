import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect, useRef } from 'react'
import '../tableData.css'
const Books = () => {
  const [genre, setGenre] = useState('allGenres')
  const genresRef = useRef([]);
  const resultBooks = useQuery(ALL_BOOKS)


  if (resultBooks.loading) {
    return <div>loading...</div>
  }else{
    const genres = resultBooks.data.allBooks.map(p=> p.genres)
    genresRef.current= [...new Set(genres.flat()), 'allGenres']
  }

  return (
    <div>
      <h2>books</h2>
      {genre !== 'allGenres' && <div>genre: <strong>{genre}</strong></div>}
      <table>
        <thead>
          <tr>
            <th className='header'></th>
            <th className='header'>author</th>
            <th className='header'>published</th>
          </tr>
        </thead>
        <tbody>
          {resultBooks.data.allBooks
          .filter(p=> genre === 'allGenres' || p.genres.includes(genre) )
          .map(p => 
            <tr key={p.title}>
              <th>{p.title}</th>
              <th>{p.author.name}</th>
              <th>{p.published}</th>
            </tr>
          )}
        </tbody>
      </table>
      {genresRef.current.map(g => <button key={g} onClick={({ target }) => setGenre(target.innerHTML)}>{g}</button>)}
    </div>
  )
}

export default Books