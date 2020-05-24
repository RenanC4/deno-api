import { Application } from 'https://deno.land/x/oak/mod.ts'
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import router from './routes.ts'

const env = Deno.env.toObject()
const HOST ='127.0.0.1'
const PORT =7700

const app = new Application()

app.use(oakCors()); 
app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Listening on port ${PORT} ...`)
await app.listen(`${HOST}:${PORT}`)