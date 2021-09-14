import express, { Request, Response } from 'express'
import bodyParser  from 'body-parser'
import { ProductsDto } from './crawler/dto/ProductsDto'
import { WebCrawlerService } from './crawler/WebCrawlerService'
import { SearchService } from './es/search'

const port = 4000 || process.env.PORT
const app = express()

app.use(bodyParser.json())

app.get('/api', (req: Request, res: Response) => {
    res.status(201).json('Hello World')
})

// Crawler Service
const crawler = new WebCrawlerService()

app.get('/api/crawl', async (req: Request, res: Response) => {
    await crawler.startCrawler()
    res.status(201).json('Start Crawler')
})

// Elastic search
app.post('/api/search', (req: Request, res: Response) => {
    try {
        console.log(req.body)

        const data: ProductsDto[] = req.body

        SearchService.index(data)
        res.status(201).json('Index data')
    } catch (error) {
        res.status(400).json(error.message)
    }
})

app.get('/api/search/:id', (req: Request, res: Response) => {
    try {
        console.log(req.params.id);
        
        SearchService.get(req.params.id)
        res.status(201).json('Finding data')
    } catch (error) {
        res.status(400).json(error.message)
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
