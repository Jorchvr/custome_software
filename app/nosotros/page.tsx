export const metadata = {
  title: 'Nosotros — Sitio Informativo',
};

export default function NosotrosPage() {
  return (
    <section>
      <div className="container">
        <h2>Sobre nosotros</h2>
        <p>
          Descripción breve de la organización, su historia y su misión.
          Reemplaza este texto con la información real.
        </p>

        <div className="grid" style={{ marginTop: '2rem' }}>
          <div className="card">
            <h3>Misión</h3>
            <p>Describe la razón de ser de la organización.</p>
          </div>
          <div className="card">
            <h3>Visión</h3>
            <p>Describe hacia dónde se dirige la organización.</p>
          </div>
          <div className="card">
            <h3>Valores</h3>
            <p>Enumera los principios que guían el trabajo diario.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
