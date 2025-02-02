import { useState } from 'react'
import { useMutation, useSubscription } from '@apollo/client'
import { CREATE_BOOK, FIND_BOOKS_BY_GENRE, BOOK_ADDED } from '../queries'
const BookForm = ({setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(0)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    },
    update: (cache, response) => {
      cache.updateQuery({ query: FIND_BOOKS_BY_GENRE, variables: { genre: 'allGenres' } }, ({findBooksByGenre} ) => {
        return {
          findBooksByGenre: findBooksByGenre.concat(response.data.addBook),
        }
      })
    },
  })

  const addGenre = (event) =>{
    event.preventDefault()
    setGenres(genres.concat(genre))
  }

  const submit = (event) => {
    event.preventDefault()
    createBook({  variables: { title, published:parseInt(published), author, genres } })

    setTitle('')
    setPublished(0)
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          title <input value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author <input value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published <input value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input value={genre}
            onChange={({ target }) => setGenre(target.value)}
          /> <button onClick={addGenre}>add genre</button>
        </div>
        <div>
            genres: {genres.join(', ')}
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )
}

export default BookForm