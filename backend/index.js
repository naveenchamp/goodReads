const express = require('express')
const cors = require('cors')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()
app.use(express.json())
app.use(cors())

const dbPath = path.join(__dirname, 'goodreads.db')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
        const PORT = process.env.PORT || 3001
        app.listen(PORT, () => {
          console.log(`Server started at http://localhost:${PORT}`)
        })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}
initializeDBAndServer()

// Get Books API
app.get('/books/', async (request, response) => {
  try {
    const getBooksQuery = `SELECT * FROM book ORDER BY book_id;`
    const booksArray = await db.all(getBooksQuery)
    response.json(booksArray)
  } catch (e) {
    console.error(e)
    response.status(500).send({error: e.message})
  }
})

//Get Book API
app.get('/books/:bookId/', async (request, response) => {
  try {
    const {bookId} = request.params
    const getBookQuery = `SELECT * FROM book WHERE book_id = ?;`
    const book = await db.get(getBookQuery, [bookId])
    if (!book) {
      return response.status(404).send({error: 'Book not found'})
    }
    response.json(book)
  } catch (e) {
    console.error(e)
    response.status(500).send({error: e.message})
  }
})

app.post('/books/', async (request, response) => {
  try {
    const bookDetails = request.body
    const {
      title,
      authorId,
      rating,
      ratingCount,
      reviewCount,
      description,
      pages,
      dateOfPublication,
      editionLanguage,
      price,
      onlineStores,
    } = bookDetails

    if (!title) {
      return response.status(400).send({error: 'Missing required field: title'})
    }

    // store onlineStores as JSON if it's an array/object
    const onlineStoresValue =
      typeof onlineStores === 'string' ? onlineStores : JSON.stringify(onlineStores || null)

    const addBookQuery = `
      INSERT INTO book
        (title, author_id, rating, rating_count, review_count, description, pages, date_of_publication, edition_language, price, online_stores)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

    const dbResponse = await db.run(addBookQuery, [
      title,
      authorId || null,
      rating || null,
      ratingCount || null,
      reviewCount || null,
      description || null,
      pages || null,
      dateOfPublication || null,
      editionLanguage || null,
      price || null,
      onlineStoresValue,
    ])

    const bookId = dbResponse.lastID
    const created = await db.get(`SELECT * FROM book WHERE book_id = ?;`, [bookId])
    response.status(201).json(created)
  } catch (e) {
    console.error(e)
    response.status(500).send({error: e.message})
  }
})

app.put('/books/:bookId/', async (request, response) => {
  try {
    const {bookId} = request.params
    const bookDetails = request.body
    const {
      title,
      authorId,
      rating,
      ratingCount,
      reviewCount,
      description,
      pages,
      dateOfPublication,
      editionLanguage,
      price,
      onlineStores,
    } = bookDetails

    const onlineStoresValue =
      typeof onlineStores === 'string' ? onlineStores : JSON.stringify(onlineStores || null)

    const updateBookQuery = `
      UPDATE book
      SET title = ?, author_id = ?, rating = ?, rating_count = ?, review_count = ?, description = ?, pages = ?, date_of_publication = ?, edition_language = ?, price = ?, online_stores = ?
      WHERE book_id = ?;`

    await db.run(updateBookQuery, [
      title,
      authorId || null,
      rating || null,
      ratingCount || null,
      reviewCount || null,
      description || null,
      pages || null,
      dateOfPublication || null,
      editionLanguage || null,
      price || null,
      onlineStoresValue,
      bookId,
    ])

    const updated = await db.get(`SELECT * FROM book WHERE book_id = ?;`, [bookId])
    if (!updated) return response.status(404).send({error: 'Book not found'})
    response.json(updated)
  } catch (e) {
    console.error(e)
    response.status(500).send({error: e.message})
  }
})

app.delete('/books/:bookId/', async (request, response) => {
  try {
    const {bookId} = request.params
    const deleteBookQuery = `DELETE FROM book WHERE book_id = ?;`
    const result = await db.run(deleteBookQuery, [bookId])
    if (result.changes === 0) {
      return response.status(404).send({error: 'Book not found'})
    }
    response.send({message: 'Book Deleted Successfully'})
  } catch (e) {
    console.error(e)
    response.status(500).send({error: e.message})
  }
})
