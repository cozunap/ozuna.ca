import '../../public/assets/css/main.css';

export const metadata = {
  title: 'Carlos Ozuna | Senior Graphic Designer & Web Developer',
  description: 'Senior graphic designer & web developer based in Montreal, Canada specializing in premium digital experiences, brand identity, and scalable design systems.',
};

import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import { LanguageProvider } from '../lib/i18n/LanguageContext.jsx';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Raleway:wght@400;500;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body>
        <LanguageProvider>
          <SiteHeader />

          <main>
            {children}
          </main>

          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
