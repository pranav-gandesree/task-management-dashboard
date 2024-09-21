// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: { cookies: { get: (arg0: string) => any; }; url: string | URL | undefined; }) {
    const token = request.cookies.get('token'); // Adjust according to how you store the token

    if (!token) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next();
}

// Apply to specific routes
export const config = {
    matcher: ['/tasks', '/dashboard', ], // Protect the tasks page
};
