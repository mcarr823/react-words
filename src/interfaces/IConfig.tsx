/**
 * Interface representing the app's config file: data/config.json
 */
export default interface IConfig{

    // Number of attempts which the player is given to guess the word.
    attempts: number;

    // Number of letters in the word to guess.
    letters: number;

    // If true, color the keyboard differently for letters which
    // have already been guessed.
    // Set to false to make the game more difficult.
    keyColor: boolean;

    // If true, prompt the user for confirmation if they've already
    // tried to use a given letter.
    // This is in case they accidentally guess a letter which has
    // already been crossed off.
    warnAlreadyAttempted: boolean;

    // Type of database to use.
    // eg. MongoDB, Postgres, MySQL
    dbType: string;

    // IP address or hostname of the database host.
    // eg. 192.168.1.10, or pi.mydomain.com
    dbHost: string;

    // Port through which to connect to the database.
    // eg. 27017 for MongoDB
    dbPort: number;
}