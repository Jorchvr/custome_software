import Link from 'next/link';
import Image from 'next/image';

type Project = {
  id: string;
  name: string;
  location: string;
  image: string;
  imageAlt: string;
  summary: string;
  features: string[];
  tags: string[];
};

const projects: Project[] = [
  {
    id: '45fitness-pos',
    name: '45 Minutes Life Fitness — Sistema de gestión',
    location: 'Los Cabos, Baja California Sur',
    image: '/portfolio/45fitness-pos.png',
    imageAlt: 'Panel de administración de 45 Minutes Life Fitness',
    summary:
      'Sistema integral de gestión de gimnasio con control de acceso biométrico y punto de venta en la misma plataforma.',
    features: [
      'Apertura de chapa magnética por huella digital',
      'Torniquete de acceso con verificación por huella',
      'Punto de venta con inventario en tiempo real',
      'Gestión de clientes, membresías y renovaciones',
      'Panel de caja diario: efectivo, transferencia, tarjeta y dólares',
      'Backoffice completo para administración',
    ],
    tags: ['Biometría', 'POS', 'Gestión de gym', 'Backoffice'],
  },
  {
    id: '45fitness-web',
    name: '45 Life Fitness — Sitio web',
    location: 'Los Cabos, Baja California Sur',
    image: '/portfolio/45fitness-web.png',
    imageAlt: 'Página web de 45 Life Fitness',
    summary:
      'Sitio informativo moderno con asistente chatbot para atención al cliente 24/7.',
    features: [
      'Información de membresías y precios',
      'Ubicación e instalaciones',
      'Horarios y disponibilidad de clases',
      'Asistente chatbot integrado',
      'Contacto directo por WhatsApp',
    ],
    tags: ['Web informativa', 'Chatbot IA', 'WhatsApp'],
  },
  {
    id: 'powergym-hunucma',
    name: 'PowerGym Hunucmá',
    location: 'Hunucmá, Yucatán',
    image: '/portfolio/powergym-hunucma.png',
    imageAlt: 'PowerGym Hunucmá',
    summary:
      'Gestión de gimnasio con acceso exclusivo por huella digital y punto de venta integrado.',
    features: [
      'Entrada única y exclusiva por huella digital',
      'Gestión de clientes y membresías',
      'Punto de venta con control de inventario',
      'Reportes de caja y ventas',
    ],
    tags: ['Biometría', 'POS', 'Gestión de gym'],
  },
  {
    id: 'powergym-kinchil',
    name: 'PowerGym Kinchil',
    location: 'Kinchil, Yucatán',
    image: '/portfolio/powergym-kinchil.png',
    imageAlt: 'PowerGym Kinchil',
    summary:
      'Misma plataforma que PowerGym Hunucmá, adaptada para una segunda sucursal.',
    features: [
      'Entrada única y exclusiva por huella digital',
      'Gestión de clientes y membresías',
      'Punto de venta con control de inventario',
      'Reportes de caja y ventas',
    ],
    tags: ['Biometría', 'POS', 'Gestión de gym'],
  },
  {
    id: 'blackmamba',
    name: 'Black Mamba Gym',
    location: 'Mérida, Yucatán',
    image: '/portfolio/blackmamba.png',
    imageAlt: 'Black Mamba Gym',
    summary:
      'Sistema completo para gimnasio mixto con acceso biométrico y punto de venta.',
    features: [
      'Entrada única y exclusiva por huella digital',
      'Gestión de clientes y membresías',
      'Punto de venta con control de inventario',
      'Reportes de caja y ventas',
    ],
    tags: ['Biometría', 'POS', 'Gestión de gym'],
  },
  {
    id: 'saarq',
    name: 'SAARQ Bienes Raíces',
    location: 'Monterrey, Nuevo León',
    image: '/portfolio/saarq-1.png',
    imageAlt: 'SAARQ Bienes Raíces',
    summary:
      'Portal inmobiliario con catálogo de propiedades y asistente chatbot para calificar prospectos.',
    features: [
      'Catálogo de propiedades en venta y renta',
      'Búsqueda por tipo, ubicación y precio',
      'Fichas técnicas por propiedad',
      'Asistente chatbot para atención automatizada',
      'Contacto directo por WhatsApp y correo',
    ],
    tags: ['Portal inmobiliario', 'Chatbot IA', 'Catálogo dinámico'],
  },
  {
    id: 'optima',
    name: 'Óptima Solución — Ingeniería y Arquitectura',
    location: 'Mérida, Yucatán',
    image: '/portfolio/optima-1.png',
    imageAlt: 'Óptima Solución',
    summary:
      'Sitio corporativo para empresa de ingeniería en telecomunicaciones con presentación de proyectos y chatbot.',
    features: [
      'Presentación de servicios y diseños',
      'Portafolio interactivo de proyectos',
      'Sección de presencia nacional',
      'Formulario de contacto y chatbot integrado',
      'Diseño enfocado en clientes B2B',
    ],
    tags: ['Web corporativa', 'Portafolio', 'Chatbot IA'],
  },
];

const services = [
  {
    icon: '🏋️',
    title: 'Gestión de gimnasios',
    desc: 'Membresías, clientes, renovaciones y reportes en un solo panel.',
  },
  {
    icon: '🖐️',
    title: 'Control de acceso biométrico',
    desc: 'Huella digital para chapas magnéticas, torniquetes y accesos exclusivos.',
  },
  {
    icon: '🧾',
    title: 'Punto de venta',
    desc: 'POS con inventario, múltiples métodos de pago y corte de caja.',
  },
  {
    icon: '🌐',
    title: 'Sitios web informativos',
    desc: 'Landing pages y sitios corporativos rápidos, modernos y responsivos.',
  },
  {
    icon: '🤖',
    title: 'Asistentes chatbot con IA',
    desc: 'Atención 24/7 integrada al sitio o a WhatsApp.',
  },
  {
    icon: '⚙️',
    title: 'Software a la medida',
    desc: 'Todo desarrollado a la necesidad exacta de tu negocio.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="eyebrow">Software a la medida</span>
          <h1>
            Construimos <span className="accent">software personalizado</span>
            <br />
            para tu negocio
          </h1>
          <p className="lead">
            Desarrollamos sistemas completos: gestión de gimnasios con acceso
            biométrico y punto de venta, sitios web informativos, portales y
            asistentes con inteligencia artificial. Cada solución está hecha a
            la medida de tu operación.
          </p>
          <div className="cta-row">
            <Link href="/contacto" className="cta">
              Solicita una cotización
            </Link>
            <Link href="#proyectos" className="cta cta-secondary">
              Ver proyectos
            </Link>
          </div>
        </div>
      </section>

      <section id="servicios">
        <div className="container">
          <div className="section-head">
            <h2>Lo que hacemos</h2>
            <p>
              Un solo equipo que cubre desde el hardware biométrico hasta el
              sitio web y el asistente que atiende a tus clientes.
            </p>
          </div>
          <div className="services">
            {services.map((s) => (
              <div className="service" key={s.title}>
                <div className="icon" aria-hidden>
                  {s.icon}
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="proyectos">
        <div className="container">
          <div className="section-head">
            <h2>Han confiado en nosotros</h2>
            <p>
              Proyectos entregados en Los Cabos, Yucatán y Nuevo León. Aquí
              algunos ejemplos.
            </p>
          </div>

          <div className="projects">
            {projects.map((p, i) => (
              <article
                key={p.id}
                className={`project ${i % 2 === 1 ? 'reverse' : ''}`}
              >
                <div className="project-media">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    width={800}
                    height={500}
                    priority={i < 2}
                  />
                </div>
                <div className="project-body">
                  <span className="project-loc">
                    <span aria-hidden>📍</span> {p.location}
                  </span>
                  <h3>{p.name}</h3>
                  <p className="summary">{p.summary}</p>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-section">
            <h2>¿Tienes un proyecto en mente?</h2>
            <p>
              Cuéntanos qué necesitas y te proponemos la solución más adecuada
              para tu negocio.
            </p>
            <Link href="/contacto" className="cta">
              Contactar ahora
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
