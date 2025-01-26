import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTH } from '../queries'
import { useState, useEffect } from 'react'
import '../tableData.css'


const Authors = ({setError, token}) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState(0)

  const [ changeBornYear, result ] = useMutation(EDIT_BIRTH,{refetchQueries: [ { query: ALL_AUTHORS } ],})
  const resultAuthors = useQuery(ALL_AUTHORS)
  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('author not found')
    }
  }, [result.data])

  useEffect(() => {
    if(resultAuthors.data){
      setName(resultAuthors.data.allAuthors[0].name)
    }
  }, [resultAuthors.data])
  const submit = (event) => {
    event.preventDefault()


    changeBornYear({ variables: { name, setBornTo: parseInt(birthYear) } })

    setName('')
    setBirthYear(0)
  }

  if (resultAuthors.loading) {
    return <div>loading...</div>
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <thead>
          <tr>
            <th className='header'></th>
            <th className='header'>born</th>
            <th className='header'>books</th>
          </tr>
        </thead>
        <tbody>
          {resultAuthors.data.allAuthors.map(p => 
            <tr key={p._id}>
              <th>{p.name}</th>
              <th>{p.born}</th>
              <th>{p.bookCount}</th>
            </tr>
          )}
        </tbody>
      </table>
      {token !== null &&
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <div>
              name: <select defaultValue={resultAuthors.data.allAuthors[0].name} name="selectedName" onChange={({ target }) => setName(target.value)}>
                {resultAuthors.data.allAuthors.map(p=>{
                  return <option key={p._id} value={p.name}>{p.name}</option>
                })}
              </select>
            </div>
            
            <div>
              born <input value={birthYear}
                onChange={({ target }) => setBirthYear(target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      }
    </div>
  )
}

export default Authors