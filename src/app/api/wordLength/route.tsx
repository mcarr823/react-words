import NextResponseError from "network/NextResponseError"
import NextResponseSuccess from "network/NextResponseSuccess"
import { NextRequest } from "next/server"
import JsonDriver from "database/json/JsonDriver"
import IWordLengthRequestResponse from "interfaces/IWordLengthRequestResponse"

export const localWordDir = process.cwd()+"/data/words"

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(_: NextRequest) {

    try{
        const driver = new JsonDriver()
        const lengths = await driver.getLengths()
        const returnData: IWordLengthRequestResponse = { lengths }
        return NextResponseSuccess(returnData)
    }catch(err){
        return NextResponseError("Failed to retrieve any lengths")
    }
    
}
