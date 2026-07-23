import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Bienvenido a nuestro sitio</h1>
          <p>
            Somos una organización comprometida con ofrecer información clara y
            soluciones a la medida. Conoce lo que hacemos y ponte en contacto
            con nosotros.
          </p>
          <Link href="/contacto" className="cta">
            Contáctanos
          </Link>
        </div>
      </section>

      <section>
        <div className="container">
          <h2>¿Qué ofrecemos?</h2>
          <div className="grid">
            <div className="card">
              <h3>Información clara</h3>
              <p>Contenido organizado y fácil de entender sobre lo que hacemos.</p>
            </div>
            <div className="card">
              <h3>Atención personalizada</h3>
              <p>Escuchamos tus necesidades y respondemos con soluciones concretas.</p>
            </div>
            <div className="card">
              <h3>Experiencia comprobada</h3>
              <p>Trayectoria y confianza avalada por nuestros clientes.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
