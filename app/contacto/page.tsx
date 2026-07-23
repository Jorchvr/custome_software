export const metadata = {
  title: 'Contacto — Sitio Informativo',
};

export default function ContactoPage() {
  return (
    <section>
      <div className="container">
        <h2>Contáctanos</h2>
        <p style={{ marginBottom: '2rem' }}>
          Estamos disponibles para responder tus dudas. Escríbenos por el medio
          que prefieras.
        </p>

        <div className="contact-info">
          <div className="card">
            <h3>Correo</h3>
            <p>
              <a href="mailto:contacto@ejemplo.com">contacto@ejemplo.com</a>
            </p>
          </div>
          <div className="card">
            <h3>Teléfono</h3>
            <p>
              <a href="tel:+520000000000">+52 000 000 0000</a>
            </p>
          </div>
          <div className="card">
            <h3>Dirección</h3>
            <p>Calle Ejemplo 123, Ciudad, País</p>
          </div>
        </div>

        <h3 style={{ marginTop: '2rem' }}>Envíanos un mensaje</h3>
        <form className="form" action="mailto:contacto@ejemplo.com" method="post" encType="text/plain">
          <div className="field">
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" type="text" required />
          </div>
          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="field">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea id="mensaje" name="mensaje" required />
          </div>
          <button type="submit" className="cta">
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}
