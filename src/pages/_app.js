import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import '../styles/globals.css'

const publicPages = ['/'];

function MyApp({ Component, pageProps }) {
  // Get the pathname
  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);

  // If the current route is listed as public, render it directly
  // Otherwise, use Clerk to require authentication
  return (
    <ClerkProvider {...pageProps}>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut> 
        </>
      )}
    </ClerkProvider>
  );
}

export default MyApp;