import fs from 'fs'

export async function saveFile(data: string[], filename: string) {
    try {     
        let output = JSON.stringify(data, null, 2)
        const outputPath = `./output/${filename}`
        await fs.promises.writeFile(outputPath, output, 'utf-8')
        console.log(`[utils][saveFile] Save file ${filename} success`);
    } catch (error: any) {
        throw `[utils][saveFile] ${error.message}`       
    }
}