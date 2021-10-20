// Recorder: Used to get selectors from e-commerce website & assign field name of selectors

// TODO: recorder from many urls
// TODO: define table recorder for DB crawler

import puppeteer from 'puppeteer'

import { logger } from '../utils/logger'
import { saveFile } from '../utils/helper'

declare global {
    interface Window {
        reportEvent: any
    }
}

// await page.exposeFunction('generateSelector', (context) => {
// })

export const recorder = async (url: string) => {
    let selectorsData = []

    try {
        const browser = await puppeteer.launch({ headless: false })

        const page = await browser.newPage()
        await page.setViewport({
            width: 1560,
            height: 1000,
        })

        // add function in the page that will log
        await page.exposeFunction('reportEvent', (info: any) => {
            console.log(info)
            selectorsData.push(info)
        })

        // Hook document with capturing event listeners that capture selectors
        await page.evaluateOnNewDocument(() => {
            function generateSelector(context) {
                let pathSelector = []
                if (context == 'null') throw 'not an dom reference'
                while (context.tagName) {
                    // selector path
                    const className = context.className
                    const idName = context.id
                    const tagName = context.tagName

                    if (tagName === 'BODY') pathSelector.push('body')
                    else {
                        pathSelector.push(
                            tagName.toLowerCase() +
                            (className ? `.${className}` : '') +
                            (idName ? `#${idName}` : '')
                        )
                    }
                    context = context.parentNode
                }
                if (pathSelector.length > 3) {
                    pathSelector = pathSelector.slice(0, 3)
                }
                pathSelector.reverse()
                let result = pathSelector.join('>')
                return result
            }
            // load document
            document.addEventListener('DOMContentLoaded', () => {
                document.body.addEventListener('click', (e) => {
                    let output = generateSelector(e.target)
                    window.reportEvent(output)
                })
            })
        })
        await page.goto(url)
        await page
            .waitForNavigation()
            .then(async () => {
                await browser.close()
            })
            .catch((error) => {
                logger.info('[recorder] Navigation done')
            })
    } catch (error) {
        logger.error(error)
    } finally {
        await saveFile(selectorsData, 'selectors.json')
    }
}
