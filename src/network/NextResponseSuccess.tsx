import { INextResponse } from 'interfaces/INextResponse';
import { NextResponse } from 'next/server'

/**
 * Represents a successful HTTP request.
 * 
 * Used to send back JSON data to a client inside of a HTTP 200 response.
 * 
 * @param data Optional data to send back to the client along with the
 * success message
 * @returns NextResponse
 */
export default function NextResponseSuccess(
    data?: any
): NextResponse<INextResponseSuccess> {
    var json: INextResponseSuccess
    if (data){
        json = { success:true, data }
    }else{
        json = { success:true }
    }
    return NextResponse.json(json)
}

export interface INextResponseSuccess extends INextResponse{
    data?: any;
}