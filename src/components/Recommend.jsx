import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import { useState } from 'react'
import '../tableData.css'
const Recommend = () => {
  const [genre, setGenre] = useState('allGenres')
  const resultBooks = useQuery(ALL_BOOKS)
  const resultMe = useQuery(ME)


  if (resultBooks.loading || resultMe.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favourite genre: <strong>{resultMe.data.me.favoriteGenre}</strong></div>
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
          .filter(p=> p.genres.includes(resultMe.data.me.favoriteGenre) )
          .map(p => 
            <tr key={p.title}>
              <th>{p.title}</th>
              <th>{p.author.name}</th>
              <th>{p.published}</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend