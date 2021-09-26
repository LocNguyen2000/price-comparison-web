import fs from 'fs'

import details from '../data/details.json'
import { logger } from '../../info/logger'

export async function saveFile(data: string[], filename: string) {
    if (data.length != 0) {
        try {
            let output = JSON.stringify(data, null, 2)
            const outputPath = `./output/${filename}`

            await fs.promises.writeFile(outputPath, output, 'utf-8')

            logger.info(`[saveFile] Data length: ${data.length}`)
            logger.info(`[saveFile] Save file ${filename} success`)
        } catch (error: any) {
            logger.error(error.message)
            throw `[saveFile] ${error.message}`
        }
    } else {
        logger.info('[saveFile] Data empty')
    }
}
export function identifyShop(url: string) {
    for (let content of details) {
        const prefix: string = content.url
        if (url.startsWith(prefix)) {
            return content.shop
        }
    }
    return ''
}
