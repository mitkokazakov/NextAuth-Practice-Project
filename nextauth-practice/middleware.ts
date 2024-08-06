
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt";

const registeredUsersRoutes = ['/login', '/register'];

const unregisteredUsersRoutes = ['/protected'];

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {

  const token = await getToken({ req: request, secret: process.env.SECRET });

  console.log("From midd", token?.role);
  

  //const sessionToken = request.cookies.get("next-auth.session-token")?.value;

  const {pathname} = request.nextUrl;

  if(registeredUsersRoutes.some((route) => pathname.startsWith(route)) && token){

    return NextResponse.redirect(new URL('/', request.url))
  }

  if(unregisteredUsersRoutes.some((route) => pathname.startsWith(route)) && !token){

    return NextResponse.redirect(new URL('/login', request.url))
  }

  // if(request.nextUrl.pathname.startsWith('/login' || '/register') && sessionToken){
   
  //   return NextResponse.redirect(new URL('/', request.url))
  // }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}