import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createOpenAI, } from '@ai-sdk/openai';



/**
 * Combines a list of class names into a single string, merging and cleaning up any conflicts using `clsx` and `tailwind-merge`.
 *
 * @param {ClassValue[]} inputs - The class names or objects to be combined.
 * @returns {string} The combined and cleaned class name string.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
})



/**
 * Checks if the current environment is development.
 * This is useful to conditionally apply development-specific logic.
 *
 * @returns {boolean} True if the environment is 'development', otherwise false.
 */
export const inDevEnvironment =
    !!process && process.env.NODE_ENV === 'development'





/**
 * The root domain of the application for production environments.
 * This is used to configure URLs and other domain-specific logic.
 *
 * @constant {string} ROOT_DOMAIN - The main domain for the app in production.
 */
export const ROOT_DOMAIN = inDevEnvironment ? "localhost:3000" : process.env.ROOT_DOMAIN ?? 'forwardliveconference.org'

/**
 * The port on which the application is running.
 * Defaults to 3000 if no environment variable is set.
 *
 * @constant {number|string} PORT - The port number the app listens to.
 */
export const PORT = process.env.PORT || 3000


/**
* Checks if the current device is a mobile device.
* This is useful to conditionally apply mobile-specific styles or behaviors.
*
* @returns {boolean} True if the device is a mobile device, otherwise false.
*
*/
export const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator?.userAgent
    )
}

/**
 * Returns an Encrypted a string .
 * @function encryptString - Encodes or encrypts a string using a base64 Buffer
 * @returns A encoded string .
 */
export const encryptString = (str: string): string => {
    const buffer = Buffer.from(str)
    return buffer.toString('base64')
}

/**
 * Decodes and Returns a string .
 * @function decryptString - Decodes or decrypts an encrypted string Buffer
 * @returns A decoded string .
 */

export const decryptString = (str: string): string => {
    const buffer = Buffer.from(str, 'base64')
    return buffer.toString()
}

/**
 * Shrink a string to a specified length(len).
 * @function shrinkString
 * @param {string} str
 * @param {number} len
 * @returns {string}
 */
export const shrinkString = ({
    str,
    len,
}: {
    str: string
    len: number
}): string => {
    if (!str) return ''
    if (str.length > len) {
        return str.substring(0, len) + '...'
    }
    return str
}