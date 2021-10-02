import fs from 'fs'

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
            logger.error(`[saveFile] ${error.message}`)
            throw `[saveFile] ${error.message}`
        }
    } else {
        logger.info('[saveFile] Data empty')
    }
}