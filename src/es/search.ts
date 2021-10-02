// won't be using this

import * as es from 'elasticsearch'
import { ProductsDto } from '../crawler/dto/products.dto'

const client = new es.Client({ host: 'localhost:9200' })
const esIndex = 'index_laptop'
const esType = '_doc'

export class SearchService {
    static index(products: ProductsDto[]) {
        // console.log(product);
        products.map((product: ProductsDto) => {
            client.index(
                {
                    index: esIndex,
                    type: esType,
                    id:
                        product.shop.toLowerCase() +
                        '_' +
                        JSON.stringify(product.itemid),
                    body: product,
                },
                (err, res) => {
                    if (err) throw err
                    else console.log('index 1 document')
                }
            )
        })
    }
    static get(productId: string) {
        client.get(
            {
                index: esIndex,
                type: esType,
                id: productId,
            },
            (err, res) => {
                if (err) {
                    throw err
                } else {
                    console.log(res._source)
                }
            }
        )
    }
}
