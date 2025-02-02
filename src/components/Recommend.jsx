import { useQuery } from '@apollo/client'
import { FIND_BOOKS_BY_GENRE, ME } from '../queries'
import { useState, useEffect } from 'react'
import '../tableData.css'
const Recommend = () => {
  const [genre, setGenre] = useState(null)
  const resultBooks = useQuery(FIND_BOOKS_BY_GENRE, {
    variables: { genre },
    skip: genre===null,
  })
  const resultMe = useQuery(ME)

  useEffect(() => {
    if (resultMe.data && resultMe.data.me) {
      setGenre(resultMe.data.me.favoriteGenre);
    }
  }, [resultMe.data]); // Se ejecuta solo cuando resultMe.data cambia

  if (resultMe.loading || genre === null || resultBooks.loading) {
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
    </div>
  )
}

export default Recommend