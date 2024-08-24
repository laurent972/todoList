import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose';

const protectedRoutes = ['/tasks']
const publicRoutes = ['/', '/signup']

export async function  middleware (request){

    const path = request.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const secretUint8Array = new TextEncoder().encode(process.env.TOKEN_SECRET);

    const cookie = cookies().get('jwt')?.value

     if(path.includes('/tasks')){
        if(cookie === undefined){
            return NextResponse.rewrite(new URL('/', request.url))
        }
        try{
            const { payload } = await jwtVerify(cookie, secretUint8Array);
            return NextResponse.next()
        }catch (e){
            console.log(e);
            return NextResponse.rewrite(new URL('/', request.url))
        }
     }
    
     

    return NextResponse.next()
    
}

export const config = {
    matcher: ['/tasks']
}