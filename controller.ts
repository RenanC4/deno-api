interface IBook {
  isbn: string;
  author: string;
  title: string;
  routeLink: string;
}
const decoder = new TextDecoder('utf-8');
const text = decoder.decode(
  await Deno.readAll(
    await Deno.open('lidos.json')
  )
);

let books: Array<IBook> = JSON.parse(text)

const getBooks = ({ response }: { response: any }) => {
  response.body = books
}

const getBook = ({ params, response }: { params: { isbn: string }; response: any }) => {
  const book: IBook | undefined = searchBookByIsbn(params.isbn)
  if (book) {
      response.status = 200
      response.body = book
  } else {
      response.status = 404
      response.body = { message: `Book not found.` }
  }
}

const addBook = async ({ request, response }: { request: any; response: any }) => {
  const body = await request.body()
  const book: IBook = body.value
  books.push(book)
  let tes2 = JSON.stringify(books)

await Deno.writeFileSync('lidos.json', new TextEncoder().encode(tes2));
  response.body = { message: 'OK' }
  response.status = 200
}

const updateBook = async ({ params, request, response }: { params: { isbn: string }; request: any; response: any }) => {
  let book: IBook | undefined = searchBookByIsbn(params.isbn)
  if (book) {
      const body = await request.body()
      const updateInfos: { author?: string; title?: string } = body.value
      book = { ...book, ...updateInfos }
      books = [...books.filter(book => book.isbn !== params.isbn), book]
      response.status = 200
      response.body = { message: 'OK' }
  } else {
      response.status = 404
      response.body = { message: `Book not found` }
  }
}

const deleteBook = ({ params, response }: { params: { isbn: string }; response: any }) => {
  books = books.filter(book => book.isbn !== params.isbn)
  response.body = {
      message: 'OK'
  }
  response.status = 200
}

const root = ({ params, response }: { params: { isbn: string }; response: any }) => {
  response.body = {
      message: 'Welcome',
      routeLink: 'http://localhost:7700/books'
  }
  response.status = 200
}

const searchBookByIsbn = (isbn: string): (IBook | undefined) => {
   return books.filter(book => book.isbn === isbn)[0];
}

export { getBooks, getBook, addBook, updateBook, deleteBook, root }