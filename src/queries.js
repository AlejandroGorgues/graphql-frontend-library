import { gql } from "@apollo/client";


const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      born
      _id
    }
    genres
    published
    _id
  }
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    _id
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const FIND_BOOKS_BY_GENRE = gql`
query allBooksByGenre($genre: String!){
  findBooksByGenre(genre: $genre) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const FIND_BOOKS_BY_AUTHOR = gql`
query allBooksByAuthor($author: String!){
  findBooksByAuthor(author: $author) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const EDIT_BIRTH = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      _id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`


export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`