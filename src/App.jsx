import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import { useApolloClient, useSubscription } from '@apollo/client'
import { CREATE_BOOK, FIND_BOOKS_BY_GENRE, BOOK_ADDED } from './queries'
import Home from './components/Home'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import Notify from './components/Notify'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'
import { useState } from 'react'
import './tableData.css'
const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  useSubscription(BOOK_ADDED, {
    onData: ({data}) => {
      const addedBook = data.data.bookAdded
      alert(`${addedBook.title} added`)
    },
    onError: (error) => {
      console.error('❌ Error en la suscripción:', error);
    },
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <Link to="/"><button type="button">Home</button></Link>
        <Link to="/authors"><button type="button">Authors</button></Link>
        <Link to="/books"><button type="button">Books</button></Link>
        {token === null ?(
          <>
            <Link to="/login"><button type="button">Login</button></Link>
          </>
        ):(
          <>
            <Link to="/addBook"><button type="button">Add book</button></Link>
            <Link to="/recommend"><button type="button">Recommended</button></Link>
            <button onClick={logout}>logout</button>
          </>
        )
        }
      </div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginForm setError={notify} setToken={setToken}/>} />
        <Route path="/authors" element={<Authors setError={notify} token={token}/>} />
        <Route path="/books" element={<Books/>} />
        <Route path="/addBook" element={<BookForm setError={notify}/>} />
        <Route path="/recommend" element={<Recommend />} />
      </Routes>
    </div>
  )
}

export default App