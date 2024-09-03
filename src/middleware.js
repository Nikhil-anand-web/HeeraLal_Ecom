import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import inputcleaner from './lib/inputcleaner'

export { default } from 'next-auth/middleware'


export async function middleware(request) {
   
 
  inputcleaner(request)

    const token = await getToken({ req: request, secret: process.env.SECRET_KEY })

    const url = request.nextUrl

 
    if ( token && token.role!==3 && token.status!==1 && !url.pathname.startsWith('/wah-control-center/suspendedAccount') ) {
       
      
        return NextResponse.redirect(new URL('/wah-control-center/suspendedAccount', request.url))
        
    }
      
     if (token && url.pathname.startsWith('/api/v1/createUser') && token.role!==1 ) {
        
        return NextResponse.json({
            success :false,
            message:"Unauthorised access please contact admin "
        },{status:400})
        
     }
    if (url.pathname.startsWith('/wah-control-center') && !url.pathname.startsWith('/wah-control-center/sign-in')) {
        
        if (!token || !(token.role == 1 || token.role == 2)) {
           
            return NextResponse.redirect(new URL('/wah-control-center/sign-in', request.url))
            
        }
        if (token && !(token.role == 1 || token.role == 2)) {
            return NextResponse.redirect(new URL('/', request.url))
            
        }
        
        
     }
    if (token && (token.role === 1 || token.role === 2) && url.pathname.startsWith('/wah-control-center/sign-in')) {
        return NextResponse.redirect(new URL('/wah-control-center/', request.url))
        
     }
     if(token && token.role ===3 && url.pathname.startsWith('/sign-in')){
        return NextResponse.redirect(new URL('/account/dashboard', request.url))
     }
     if ((!token || token.role !==3)&&url.pathname.startsWith('/account/')) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
        
     }
   
    return NextResponse.next()
}

// Configure matching paths
export const config = {
    matcher: [
        
        '/wah-control-center/:path*',
        '/api/v1/:path*',
         '/sign-in',
         '/account/:path*',
         
        
    ]
}
