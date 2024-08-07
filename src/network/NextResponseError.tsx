import { INextResponse } from 'interfaces/INextResponse';
import { NextResponse } from 'next/server'

/**
 * Represents an unsuccessful HTTP request.
 * 
 * Sends back an error message in JSON.
 * 
 * @param error Error message to return with the HTTP response
 * @param statusCode Status code of the response. Defaults to a 500 error
 * @returns NextResponse
 */
export default function NextResponseError(
    error: string,
    statusCode: number = 500
): NextResponse<INextResponseError>{
    const json: INextResponseError = { success:false, error }
    return NextResponse.json(json, { status: statusCode })
}

export interface INextResponseError extends INextResponse{
    error: string;
}