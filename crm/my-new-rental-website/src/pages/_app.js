import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Only check auth for protected routes
    const protectedRoutes = ['/dashboard', '/staff-dashboard'];
    
    if (protectedRoutes.some(route => router.pathname.startsWith(route))) {
      const token = localStorage.getItem('token');
      const staffToken = localStorage.getItem('staffToken');
      
      if (!token && !staffToken) {
        router.push('/login');
        return;
      }

      // Verify token if exists
      const checkAuth = async () => {
        try {
          const response = await fetch('/api/verify-token', {
            headers: {
              Authorization: `Bearer ${token || staffToken}`,
            },
          });
          
          if (!response.ok) {
            throw new Error('Token invalid');
          }
        } catch (error) {
          console.error('Auth error:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('staffToken');
          router.push('/login');
        }
      };

      checkAuth();
    }
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>OmSmartStay</title>
        <meta name="description" content="OmSmartStay - Your Perfect Stay" />
        
        {/* Favicon */}
        <link rel="icon" href="/images/Logo.jpeg" />
        <link rel="apple-touch-icon" href="/images/Logo.jpeg" />
        <link rel="shortcut icon" href="/images/Logo.jpeg" />
        
        {/* Additional meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}