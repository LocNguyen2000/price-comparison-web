import express, { Request, Response } from 'express'

const port = 4000 || process.env.PORT
const app = express()

app.get('/api', (req: Request, res: Response) => {
    res.status(201).json('Hello World')
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
