import { NextRequest, NextResponse } from 'next/server'
import { ROOT_DOMAIN, PORT } from './utils'
import { apiAuthPrefix } from './routes'

export default async function middleware(req: NextRequest) {
    const { nextUrl } = req

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

    //rewrites for app pages
    if (hostname == `app.${ROOT_DOMAIN}`) {
        return NextResponse.rewrite(
            new URL(`/app${path === '/' ? '/' : path}`, req.url)
        )
    }

    return
}

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}