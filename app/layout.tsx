import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sitio Informativo',
  description: 'Página informativa y de contacto',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <header className="site-header">
          <div className="container nav">
            <Link href="/" className="brand">
              Sitio Informativo
            </Link>
            <nav className="nav-links">
              <Link href="/">Inicio</Link>
              <Link href="/nosotros">Nosotros</Link>
              <Link href="/servicios">Servicios</Link>
              <Link href="/contacto">Contacto</Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            © {new Date().getFullYear()} Sitio Informativo. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
