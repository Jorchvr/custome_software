import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ravaku — Software personalizado',
  description:
    'Desarrollo de software a la medida: gestión de gimnasios, biometría, puntos de venta, sitios web informativos y asistentes chatbot.',
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
              <span className="brand-mark">R</span>
              Ravaku
            </Link>
            <nav className="nav-links">
              <Link href="/#servicios">Servicios</Link>
              <Link href="/#proyectos">Proyectos</Link>
              <Link href="/contacto">Contacto</Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <span className="founders-label">Fundadores</span>
            <div className="founders">Jorge Vargas · Miguel Ramos</div>
            <div className="copyright">
              © {new Date().getFullYear()} Ravaku. Software hecho a la medida.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
