/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { ROOT_DOMAIN, PORT } from './utils'
import { apiAuthPrefix } from './routes'
import { auth } from './auth'

export default async function middleware(req: NextRequest) {
    const { nextUrl } = req
    const session = await auth()

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

    if (isApiAuthRoute) return null

    const url = req.nextUrl
    let hostname = req.headers

        .get('host')!
        .replace(`.localhost:${PORT}`, `.${ROOT_DOMAIN}`)

    hostname = hostname.replace('www.', '')
    const searchParams = req.nextUrl.searchParams.toString()

    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''
        }`

    console.log('++++++++++++++++++++++++++++++++++++')
    console.log('HOSTNAME: ', hostname)
    console.log('PATHNAME: ', url.pathname)
    console.log('PATH: ', path)
    console.log('++++++++++++++++++++++++++++++++++++')

    console.log(session)


    return
}

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}