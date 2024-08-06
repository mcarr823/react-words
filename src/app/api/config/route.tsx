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
    
    if (process.env.CONFIG_USE_ENVIRONMENT_VARIABLES){
        if (process.env.CONFIG_ATTEMPTS){
            config.attempts = parseInt(process.env.CONFIG_ATTEMPTS)
        }
        if (process.env.CONFIG_LETTERS){
            config.letters = parseInt(process.env.CONFIG_LETTERS)
        }
        if (process.env.CONFIG_KEY_COLOR){
            config.keyColor = process.env.CONFIG_KEY_COLOR === "true"
        }
        if (process.env.CONFIG_WARN_ALREADY_ATTEMPTED){
            config.warnAlreadyAttempted = process.env.CONFIG_WARN_ALREADY_ATTEMPTED === "true"
        }
        if (process.env.CONFIG_DB_TYPE){
            config.dbType = process.env.CONFIG_DB_TYPE
        }
        if (process.env.CONFIG_DB_HOST){
            config.dbHost = process.env.CONFIG_DB_HOST
        }
        if (process.env.CONFIG_DB_PORT){
            config.dbPort = parseInt(process.env.CONFIG_DB_PORT)
        }
    }

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

    if (process.env.LOCK_CONFIG){
        return NextResponseError('Permission denied')
    }

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