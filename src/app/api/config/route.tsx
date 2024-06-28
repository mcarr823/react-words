import fs from "node:fs"
import NextResponseError from "network/NextResponseError"
import NextResponseSuccess from "network/NextResponseSuccess"
import { NextRequest } from "next/server"
import IConfig from "interfaces/IConfig"
import Config from "classes/Config"

export const configFile = process.cwd()+"/data/config.json"

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(_: NextRequest) {
    var config = Config.emptyConfig()
    try{
        const data = fs.readFileSync(configFile)
        const json = JSON.parse(data.toString())
        const iconfig = json as IConfig
        config = new Config(iconfig)
    }catch(err){
        console.log(err)
    }
    return NextResponseSuccess(config)
    
}

export async function PUT(request: NextRequest) {
    try{
        // Note: request.json() actually gives an Object,
        // rather than JSON.
        const iconfig: IConfig = await request.json()
        const config: Config = new Config(iconfig)
        
        const data = JSON.stringify(config)

        // Write the stringified JSON to disk
        fs.writeFileSync(configFile, data)
        return NextResponseSuccess()
    }catch(err){
        console.error(err)
        return NextResponseError('Failed to write config file')
    }
}