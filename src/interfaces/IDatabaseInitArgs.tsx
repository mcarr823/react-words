/**
 * Interface representing the common arguments which
 * any database implementation is likely to accept.
 */
export interface IDatabaseInitArgs{
    username: string;
    database: string;
    password: string;
    host: string;
    port: number;
}