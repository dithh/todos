import { app } from './app'

app.listen(process.env.PORT)

console.log(process.env['JWT_SECRET'])
