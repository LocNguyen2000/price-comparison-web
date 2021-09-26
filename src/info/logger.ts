class Logger {
    message: string
    date: Date
    constructor() {
        this.message = ''
    }
    info(msg: string | string[]) {
        this.date = new Date()
        if (typeof msg === 'string') {
            console.log(`[INFO] [${this.date.toLocaleTimeString()}]: ${msg}`)
        } else {
            msg.map((str: string) => {
                console.log(
                    `[INFO] [${this.date.toLocaleTimeString()}]: ${msg}`
                )
            })
        }
    }
    error(msg: string) {
        this.date = new Date()
        console.log(`[ERROR] [${this.date.toLocaleTimeString()}]: ${msg}`)
    }
}
export const logger = new Logger()
