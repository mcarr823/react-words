import fs from "node:fs"
import NextResponseError from "network/NextResponseError"
import NextResponseSuccess, { INextResponseSuccess } from "network/NextResponseSuccess"
import { NextRequest } from "next/server"
import IWordRequestResponse from "interfaces/IWordRequestResponse"
import IWordFile from "interfaces/IWordFile"
import WordFile from "classes/WordFile"
import JsonDriver from "database/json/JsonDriver"
import IDeleteWordRequest from "interfaces/IDeleteWordRequest"
import IConfig from "interfaces/IConfig"
import {GET as getConfig} from "../config/route"

export const localWordDir = process.cwd()+"/data/words"

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(_: NextRequest) {
    
    try{
        const configResponse = await getConfig(_)
        const nextResponseSuccess: INextResponseSuccess = await configResponse.json()
        const wordReq: IConfig = nextResponseSuccess.data

        const length = wordReq.letters

        // TODO get different driver depending on IConfig parameter
        const driver = new JsonDriver()
        
        const word = await driver.getWordRandom(length)
        if (word){
            const returnData: IWordRequestResponse = { word }
            return NextResponseSuccess(returnData)
        }
    }catch(err){
        console.log(err)
    }

    return NextResponseError('Failed to get word')
    
}

export async function DELETE(request: NextRequest) {
    
    try{
        const wordReq: IDeleteWordRequest = await request.json()

        const wordToDelete = wordReq.word

        // This request requires all parameters to be explicitly
        // set just to be safe, since we're deleting data.
        if (typeof wordToDelete === 'undefined'){
            return NextResponseError('Invalid request')
        }
        
        // Define the local file which contains words of
        // the given length.
        const file = `${localWordDir}/${length}.json`

        // If at least one word is defined, read the file and
        // remove the word(s) that we want to delete.
        const data = fs.readFileSync(file)
        const json = JSON.parse(data.toString())
        const arr = json as IWordFile
        const wordFile = new WordFile(arr)
        const newFile = wordFile.filter([wordToDelete])

        // Write the stringified JSON to disk
        const newFileAsString = JSON.stringify(newFile)
        fs.writeFileSync(file, newFileAsString)
        return NextResponseSuccess()

    }catch(err){
        
        console.log(err)
        return NextResponseError('Failed to delete word')

    }
    
}

// Update an existing file: PATCH
// New file: PUT