import fs from 'fs'

import { logger } from './logger'

export async function saveFile(data: string[], filename: string) {
    if (data.length != 0) {
        try {
            let output = JSON.stringify(data, null, 2)
            const outputPath = `./output/${filename}`

            await fs.promises.writeFile(outputPath, output, 'utf-8')

            logger.info(`[utils] save: ${data.length} data`)
        } catch (error: any) {
            const msg = `[utils] save: ${error.message}`
            logger.error(msg)
            throw msg
        }
    } else {
        logger.info('[utils] save: empty')
    }
}

export function getData(dir: string) {
    try {
        let result: string[]
        let data = fs.readFileSync(dir, {encoding: 'utf-8'});
        result = JSON.parse(data)
        logger.info(`[utils] get: ${result}`)
        return result;   
    } catch (error) {
        const msg = `[utils] get: error ${error.message}`
        logger.error(msg)
        throw msg
    }
}
