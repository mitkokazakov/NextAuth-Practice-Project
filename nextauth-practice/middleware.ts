import { getToken } from 'next-auth/jwt';
import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from './app/api/auth/[...nextauth]/route';
import nextAuth from 'next-auth'; 
import NextAuth from 'next-auth/next';

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {

  

  // const {auth} = NextAuth(authOptions)

  // const session = await auth();

  // console.log(session);

  const token = await getToken({req: request});

  console.log(`midd --- ${request}`);
  

  // const isAuth = !!token;

  // if(request.nextUrl.pathname.startsWith('/login') && isAuth){
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  // const authMiddleware = await withAuth({
  //   pages: {
  //     signIn: `/login`,
  //   },
  // });

  return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/protected'],
}