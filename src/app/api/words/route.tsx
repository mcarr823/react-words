import fs from "node:fs"
import NextResponseError from "network/NextResponseError"
import NextResponseSuccess, { INextResponseSuccess } from "network/NextResponseSuccess"
import { NextRequest } from "next/server"
import IWordsRequestResponse from "interfaces/IWordsRequestResponse"
import IWordsRequest from "interfaces/IWordsRequest"
import IDeleteWordsRequest from "interfaces/IDeleteWordsRequest"
import {GET as getConfig} from "../config/route"
import DatabaseDriverBuilder from "database/DatabaseDriverBuilder"
import IConfig from "interfaces/IConfig"

export const localWordDir = process.cwd()+"/data/words"

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: NextRequest) {

    try{
        const configResponse = await getConfig(request)
        const nextResponseSuccess: INextResponseSuccess = await configResponse.json()
        const config: IConfig = nextResponseSuccess.data

        const wordReq: IWordsRequest = await request.json()
        const length = wordReq.length

        const driver = DatabaseDriverBuilder(config)
        const words = await driver.getWords(length)
        const returnData: IWordsRequestResponse = { words }
        return NextResponseSuccess(returnData)
    }catch(err){
        return NextResponseError("Failed to retrieve words")
    }
    
}

export async function DELETE(request: NextRequest) {
    
    try{
        const wordReq: IDeleteWordsRequest = await request.json()

        const length = wordReq.length

        // This request requires all parameters to be explicitly
        // set just to be safe, since we're deleting data.
        if (typeof length === 'undefined'){
            return NextResponseError('Invalid request')
        }
        
        // Define the local file which contains words of
        // the given length.
        const file = `${localWordDir}/${length}.json`

        fs.unlinkSync(file)
        return NextResponseSuccess()

    }catch(err){
        
        console.log(err)
        return NextResponseError('Failed to delete word(s)')

    }
    
}

// Update an existing file: PATCH
// New file: PUT