import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'

export class Scripts {
    public static performScan = null
    public static getResults = null
    public static getResultsSummary = null
    public static saveTestResults = null
    // TODO: Update from response once server changes done

    // public static commandsToWrap = require('./commands.json')

    public static browserstackFolderPath = path.join(os.homedir(), '.browserstack')
    // public static commandsPath = path.join(this.browserstackFolderPath, "commands.json")

    constructor() {}

    public static parseFromJson(responseData: { scripts: { scan: null; getResults: null; getResultsSummary: null; saveResults: null; }; }) {
        // console.log(responseData)
        if (responseData.scripts) {
            this.performScan = responseData.scripts.scan
            this.getResults = responseData.scripts.getResults
            this.getResultsSummary = responseData.scripts.getResultsSummary
            this.saveTestResults = responseData.scripts.saveResults
        }

        // this.commandsToWrap = responseData.commands
    }

    // public static shouldWrapCommand(method: string) {
    //   return this.commandsToWrap.findIndex((el: { name: string }) => el.name.toLowerCase() === method.toLowerCase()) != -1
    // }

    public static toJson() {

        if (!fs.existsSync(this.browserstackFolderPath)){
            fs.mkdirSync(this.browserstackFolderPath)
        }

        // fs.writeFileSync(this.commandsPath, JSON.stringify({
        //   scripts: {
        //     scan: this.performScan,
        //     getResults: this.getResults,
        //     getResultsSummary: this.getResultsSummary,
        //     saveResults: this.saveTestResults,
        //   },
        //   // commands: this.commandsToWrap
        // }))
    }
}
