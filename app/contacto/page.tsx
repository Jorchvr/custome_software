export const metadata = {
  title: 'Contacto — Ravaku',
};

export default function ContactoPage() {
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <h2>Contáctanos</h2>
          <p>
            Escríbenos y hablemos sobre tu proyecto. Respondemos en horario
            laboral.
          </p>
        </div>

        <div className="contact-info">
          <div className="info-card">
            <h3>Correo</h3>
            <p>
              <a href="mailto:serviciosravaku@gmail.com">
                serviciosravaku@gmail.com
              </a>
            </p>
          </div>
          <div className="info-card">
            <h3>WhatsApp</h3>
            <p>
              <a
                href="https://wa.me/528128641405"
                target="_blank"
                rel="noopener noreferrer"
              >
                +52 812 864 1405
              </a>
            </p>
          </div>
          <div className="info-card">
            <h3>Zonas de trabajo</h3>
            <p>México — remoto y presencial</p>
          </div>
        </div>

        <h3 style={{ marginTop: '2rem' }}>Envíanos un mensaje</h3>
        <form
          className="form"
          action="mailto:serviciosravaku@gmail.com"
          method="post"
          encType="text/plain"
        >
          <div className="field">
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" type="text" required />
          </div>
          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="field">
            <label htmlFor="proyecto">¿Qué tipo de proyecto necesitas?</label>
            <input
              id="proyecto"
              name="proyecto"
              type="text"
              placeholder="Ej. sistema de gym, sitio web, chatbot..."
            />
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
