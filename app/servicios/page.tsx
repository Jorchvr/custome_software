export const metadata = {
  title: 'Servicios — Sitio Informativo',
};

export default function ServiciosPage() {
  return (
    <section>
      <div className="container">
        <h2>Servicios</h2>
        <p>Estos son algunos de los servicios que ofrecemos.</p>

        <div className="grid" style={{ marginTop: '2rem' }}>
          <div className="card">
            <h3>Servicio 1</h3>
            <p>Descripción breve del primer servicio.</p>
          </div>
          <div className="card">
            <h3>Servicio 2</h3>
            <p>Descripción breve del segundo servicio.</p>
          </div>
          <div className="card">
            <h3>Servicio 3</h3>
            <p>Descripción breve del tercer servicio.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
