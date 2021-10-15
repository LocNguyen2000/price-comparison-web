// Recorder: Used to get selectors from e-commerce website & assign field name of selectors

// TODO: recorder from many urls
// TODO: define table recorder for DB crawler

import puppeteer from 'puppeteer'

import { logger } from '../utils/logger'
import { saveFile } from '../utils/index'

declare global {
    interface Window {
        reportEvent: any
    }
}

// await page.exposeFunction('generateSelector', (context) => {
// })

export const recorder = async () => {
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
                let pathSelector
                if (context == 'null') throw 'not an dom reference'
                while (context.tagName) {
                    // selector path
                    const className = context.className
                    const idName = context.id
                    pathSelector =
                        context.localName +
                        (className ? `.${className}` : '') +
                        (idName ? `#${idName}` : '') +
                        (pathSelector ? '>' + pathSelector : '')
                    context = context.parentNode
                }
                return pathSelector
            }
            // load document
            document.addEventListener('DOMContentLoaded', () => {
                // let delay = 1000
                // let timer
                // hover on element for 3s to generate selectors
                // document.body.addEventListener("mouseover", (e) => {
                //    timer = setInterval(() => {
                //       output = generateSelector(e.target);
                //       selectors.push({ "selector": output })
                //       reportEvent({ "selector": output });
                //    }, delay)
                // });
                // document.body.addEventListener("mouseout", (e) => {
                //    clearInterval(timer)
                // })
                document.body.addEventListener('click', (e) => {
                    let output = generateSelector(e.target)
                    window.reportEvent({ selector: output })
                })
            })
        })
        await page.goto('https://en.wikipedia.org/wiki/Puppeteer')
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
