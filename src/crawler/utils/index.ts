import fs from 'fs'

export async function saveFile(data: string[], filename: string) {
    if (data.length != 0) {
        try {
            let output = JSON.stringify(data, null, 2)
            const outputPath = `./output/${filename}`

            await fs.promises.writeFile(outputPath, output, 'utf-8')

            console.log(`[saveFile] Data length: ${data.length}`)
            console.log(`[saveFile] Save file ${filename} success`)
        } catch (error: any) {
            throw `[saveFile] ${error.message}`
        }
    } else {
        console.log('[saveFile] Data empty')
    }
}
