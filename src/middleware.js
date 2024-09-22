import { NextResponse } from 'next/server'


export function middleware(request) {
  try {
    const url = new URL(request.url);
    const authError = url.searchParams.get('error');
    const errorDescription = url.searchParams.get('error_description');

    if (authError) {
      console.error(`Error from Auth0: ${authError} - ${errorDescription}`);

      if (authError === 'access_denied' && errorDescription.includes('verifica tu email')) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN}/unauthorized`);
      } else {
        return NextResponse.redirect('/error');
      }
    }

    return NextResponse.next();

  } catch (err) {
    console.error('Error in middleware:', err);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN}/error`);
  }
}