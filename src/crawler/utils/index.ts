import fs from 'fs'

export async function saveFile(data: string[], filename: string) {
    try {     
        const outputPath = `./output/${filename}`
        await fs.promises.writeFile(outputPath, data, 'utf-8')
        console.log(`[utils][saveFile] Save file ${filename} success`);
    } catch (error: any) {
        throw `[utils][saveFile] ${error.message}`       
    }
}