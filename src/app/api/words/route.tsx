import fs from "node:fs"
import NextResponseError from "network/NextResponseError"
import NextResponseSuccess from "network/NextResponseSuccess"
import { NextRequest } from "next/server"
import IWordRequest from "interfaces/IWordRequest"
import IWordRequestResponse from "interfaces/IWordRequestResponse"
import IWordFile from "interfaces/IWordFile"
import WordFile from "classes/WordFile"

export const localWordDir = process.cwd()+"/data/words"

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: NextRequest) {
    const returnData: IWordRequestResponse = {}
    try{
        const wordReq: IWordRequest = await request.json()

        const length = wordReq.length
        const all = wordReq.all
        
        // If a length is specified, then we want to grab
        // words of the given length.
        // eg. If length is 4, then we want one or more
        // 4-letter words.
        if (length){

            // Read the local file which contains words of
            // the given length.
            const file = `${localWordDir}/${length}.json`
            const data = fs.readFileSync(file)
            const json = JSON.parse(data.toString())

            // Parse the file and make sure it adheres to
            // the expected format.
            const arr = json as IWordFile
            const wordFile = new WordFile(arr)

            // If `all` is true, return all of the words.
            // If not, pick one at random.
            if (all){
                returnData.words = wordFile.words
            }else{
                returnData.words = wordFile.random()
            }

        }else{

            // Read all of the files from the directory and
            // filter out any which aren't JSON files.
            const files = fs.readdirSync(localWordDir)
                            .filter(f => f.endsWith('.json'))

            // For each of those files, remove the suffix and
            // convert the name into an int.
            // eg. Convert 4.json into 4
            returnData.lengths = files.map(f => f.substring(0, f.length - 5))
                                        .map(f => parseInt(f))

        }
    }catch(err){
        console.log(err)
    }

    return NextResponseSuccess(returnData)
    
}

export async function DELETE(request: NextRequest) {
    
    try{
        const wordReq: IWordRequest = await request.json()

        const length = wordReq.length
        const all = wordReq.all
        const wordsToDelete = wordReq.words

        // This request requires all parameters to be explicitly
        // set just to be safe, since we're deleting data.
        if (
            typeof length === 'undefined' ||
            typeof all === 'undefined' ||
            typeof wordsToDelete === 'undefined'
        ){
            return NextResponseError('Invalid request')
        }
        
        // Define the local file which contains words of
        // the given length.
        const file = `${localWordDir}/${length}.json`

        // If `all` is true, just delete the file.
        if (all){
            fs.unlinkSync(file)
            return NextResponseSuccess()
        }

        // If not, check if there are any words to delete.
        if (wordsToDelete.length === 0){
            return NextResponseError('Word does not exist in the system')
        }

        // If at least one word is defined, read the file and
        // remove the word(s) that we want to delete.
        const data = fs.readFileSync(file)
        const json = JSON.parse(data.toString())
        const arr = json as IWordFile
        const wordFile = new WordFile(arr)
        const newFile = wordFile.filter(wordsToDelete)

        // Write the stringified JSON to disk
        const newFileAsString = JSON.stringify(newFile)
        fs.writeFileSync(file, newFileAsString)
        return NextResponseSuccess()

    }catch(err){
        
        console.log(err)
        return NextResponseError('Failed to delete word(s)')

    }
    
}

// Update an existing file: PATCH
// New file: PUT