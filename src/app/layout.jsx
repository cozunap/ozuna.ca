import '../../public/assets/css/main.css';

export const metadata = {
  title: 'Carlos Ozuna | Premium Design Portfolio',
  description: 'Graphic designer & web developer specializing in premium digital experiences, brand identity, and scalable design systems.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <nav className="site-nav">
          <a href="/" className="logo"><span>Carlos </span>Ozuna</a>
          <div className="nav-links">
            <a href="/work">Work</a>
            <a href="/about">About</a>
          </div>
        </nav>

        <main>
          {children}
        </main>

        <footer className="site-footer">
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Let's create something beautiful.</h2>
          <p>&copy; {new Date().getFullYear()} Carlos Ozuna. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
