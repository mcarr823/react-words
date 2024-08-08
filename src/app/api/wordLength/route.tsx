import NextResponseError from "network/NextResponseError"
import NextResponseSuccess, { INextResponseSuccess } from "network/NextResponseSuccess"
import { NextRequest } from "next/server"
import IWordLengthRequestResponse from "interfaces/IWordLengthRequestResponse"
import {GET as getConfig} from "../config/route"
import DatabaseDriverBuilder from "database/DatabaseDriverBuilder"
import IConfig from "interfaces/IConfig"

export const localWordDir = process.cwd()+"/data/words"

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(_: NextRequest) {

    try{
        const configResponse = await getConfig(_)
        const nextResponseSuccess: INextResponseSuccess = await configResponse.json()
        const config: IConfig = nextResponseSuccess.data

        const driver = DatabaseDriverBuilder(config)
        const lengths = await driver.getLengths()
        const returnData: IWordLengthRequestResponse = { lengths }
        return NextResponseSuccess(returnData)
    }catch(err){
        return NextResponseError("Failed to retrieve any lengths")
    }
    
}
