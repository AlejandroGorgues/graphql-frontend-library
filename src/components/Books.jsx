import { useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, FIND_BOOKS_BY_GENRE, BOOK_ADDED } from '../queries'
import { useState, useEffect, useRef } from 'react'
import '../tableData.css'
const Books = () => {
  const [genre, setGenre] = useState('allGenres')
  const genresRef = useRef([]);
  const resultBooks = useQuery(FIND_BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre,
  })


  useSubscription(BOOK_ADDED, {
    onData: (data) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      alert(`${addedBook.title} added`)
    }
  })


  if (resultBooks.loading) {
    return <div>loading...</div>
  }else{
    const genres = resultBooks.data.findBooksByGenre.map(p=> p.genres)
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
          {resultBooks.data.findBooksByGenre
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