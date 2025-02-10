import { NextRequest, NextResponse } from 'next/server'
import { apiAuthPrefix, authRoutePrefix, protectedRoutePrefixes } from './routes'
import { auth } from './auth'

export default async function middleware(req: NextRequest) {
    const { nextUrl } = req
    const session = await auth()
    const isLoggedIn = Boolean(session?.user)
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const pathname = nextUrl.pathname
    const isProtectedRoute = protectedRoutePrefixes.some(prefix => pathname.includes(prefix))
    const isAuthRoute = pathname.startsWith(authRoutePrefix)

    console.log(pathname, isAuthRoute, isProtectedRoute, isLoggedIn)

    if (isApiAuthRoute) return null
    if (isApiAuthRoute || !isProtectedRoute) {
        return NextResponse.next()
    }
    if (isAuthRoute) {
        return isLoggedIn
            ? NextResponse.redirect(new URL(`/teacher/dashboard`, nextUrl))
            : NextResponse.next()
    }
    if (!isLoggedIn && isProtectedRoute) {
        return NextResponse.redirect(new URL(`/auth/sign-in`, nextUrl))
    }
    return NextResponse.next()



    return
}



// export default auth(async (req) => {
//     const { nextUrl } = req
//     const session = await auth()
//     const isLoggedIn = Boolean(req.auth)
//     const pathname = nextUrl.pathname
//     const isApiAuthRoute = pathname.startsWith(apiAuthPrefix)
//     const isProtectedRoute = protectedRoutePrefixes.some(prefix => pathname.includes(prefix))
//     const isAuthRoute = pathname.startsWith(authRoutePrefix)





//     if (isAuthRoute) {
//         return isLoggedIn
//             ? NextResponse.redirect(new URL("/teacher/dashboard", nextUrl))
//             : NextResponse.next()
//     }

//     if (!isLoggedIn && isProtectedRoute) {
//         return NextResponse.redirect(new URL('/auth/sign-in', nextUrl))
//     }



//     return NextResponse.next()

// })




// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}