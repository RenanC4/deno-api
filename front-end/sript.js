
async function getLivros(){
const livros =await  fetch('http://127.0.0.1:7700/books')
console.log(livros)
}
getLivros()