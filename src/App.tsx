import { useEffect, useState } from 'react'
import logoLight from './assets/cracktivelab-logo-light.png'
import logoBlancoVerde from './assets/cracktivelab-blanco-verde.png'
import crackvibesBg from './assets/crackvibes_bg.jpg'
import gamejamplusBg from './assets/crackvibes_bg2.jpg'
import logoCuc from './assets/cuc-white.png'
import logoEquinoxio from './assets/equinoxiolab.webp'
import logoIditek from './assets/iditek-new.png'
import logoIgda from './assets/igda.png'
import logoAventuras from './assets/aventuras-bonitas.png'
import logoCracktiveVariant from './assets/cracktivelab-variant.png'
import logoFirstFlame from './assets/first-flame.png'
import logoFrecuencia from './assets/frecuencia-gamer.png'
import logoMaleiwa from './assets/maleiwa.png'
import logoMito from './assets/mito.png'
import logoOp from './assets/op.png'
import logoRival from './assets/rival-arts.png'

/* ---------------------------------------------------------------- */
/* Countdown                                                         */
/* ---------------------------------------------------------------- */

const TARGET = new Date('2026-10-16T09:00:00-05:00').getTime()

function useCountdown() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, TARGET - now)
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
  }
}

function CountdownCard() {
  const { days, hours, minutes } = useCountdown()
  const units = [
    { label: 'DÍAS', value: days },
    { label: 'HORAS', value: hours },
    { label: 'MIN', value: minutes },
  ]
  return (
    <div className="relative rounded-2xl border-2 border-mint bg-void/90 p-6 backdrop-blur-md shadow-[0_0_45px_-8px_rgba(34,225,157,0.65)]">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-mint" />
        <span className="font-pixel text-[9px] tracking-wider text-mint">CUENTA REGRESIVA</span>
      </div>
      <div className="flex gap-3">
        {units.map((u) => (
          <div key={u.label} className="flex-1 rounded-xl border border-white/10 bg-grape/30 px-2 py-4 text-center">
            <div className="font-display text-4xl font-bold tabular-nums text-white sm:text-5xl">
              {String(u.value).padStart(2, '0')}
            </div>
            <div className="mt-2 font-pixel text-[8px] tracking-widest text-lavender">{u.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Building blocks                                                   */
/* ---------------------------------------------------------------- */

function PixelBadge({ children, tone = 'mint' }: { children: React.ReactNode; tone?: 'mint' | 'purple' }) {
  const cls = tone === 'mint' ? 'bg-mint text-void' : 'bg-grape text-white'
  return (
    <span
      className={`inline-block px-2 py-1 font-pixel text-[8px] leading-none tracking-wider ${cls} [clip-path:polygon(0_4px,4px_4px,4px_0,calc(100%-4px)_0,calc(100%-4px)_4px,100%_4px,100%_calc(100%-4px),calc(100%-4px)_calc(100%-4px),calc(100%-4px)_100%,4px_100%,4px_calc(100%-4px),0_calc(100%-4px))]`}
    >
      {children}
    </span>
  )
}

function PrimaryButton({
  children,
  className = '',
  href = '#inscribete',
}: {
  children: React.ReactNode
  className?: string
  href?: string
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-mint px-7 py-3.5 font-display text-base font-bold text-void transition-all duration-200 hover:shadow-[0_0_35px_-4px_rgba(34,225,157,0.85)] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint ${className}`}
    >
      {children}
      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
    </a>
  )
}

function FloatingSticker({
  src,
  alt,
  className = '',
  rotate = '-6deg',
  slow = false,
  label,
}: {
  src: string
  alt: string
  className?: string
  rotate?: string
  slow?: boolean
  label?: string
}) {
  return (
    <figure
      className={`absolute ${slow ? 'animate-float-slower' : 'animate-float-slow'} ${className}`}
      style={{ transform: `rotate(${rotate})` }}
    >
      <div className="overflow-hidden rounded-xl border-4 border-white bg-grape shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)]">
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </div>
      {label && (
        <figcaption className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <PixelBadge>{label}</PixelBadge>
        </figcaption>
      )}
    </figure>
  )
}

/* ---------------------------------------------------------------- */
/* Nav + Hero — Dark                                                 */
/* ---------------------------------------------------------------- */

const NAV_LINKS = [
  { label: 'Inicio', href: '#top' },
  { label: '¿Qué es?', href: '#sobre' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'GameJamPlus', href: '#gamejamplus' },
  { label: 'Preguntas', href: '#preguntas' },
]

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-void/85 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <a href="#top" className="flex items-center">
          <img src={logoLight} alt="CracktiveLab" className="h-9 w-auto" />
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="font-display text-sm font-medium text-lavender transition-colors hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <PrimaryButton
          href="https://holafomo.com"
          className="rounded-full px-5 py-2.5 text-sm"
        >
          Inscríbete · $35.000
        </PrimaryButton>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-void">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-grape/50 blur-[120px]" />
        <div className="absolute right-[8%] top-[30%] h-72 w-72 rounded-full bg-mint/20 blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.12] animate-[grid-pan_6s_linear_infinite]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(209,179,224,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(209,179,224,0.5) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-mint/40 bg-grape/30 px-4 py-1.5 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_10px_2px_rgba(34,225,157,0.9)]" />
            <span className="text-xs font-medium text-lavender sm:text-sm">
              16, 17 y 18 DE OCTUBRE 2026 · UNIVERSIDAD DE LA COSTA · BARRANQUILLA
            </span>
          </div>

          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            CARIBE
            <br />
            <span className="text-mint [text-shadow:0_0_25px_rgba(34,225,157,0.5)]">GAME JAM</span>
            <br />
            2026
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-lavender sm:text-lg">
            48 horas para crear, aprender y llevar una idea a videojuego. Tres días para crear en equipo,
            aprender haciendo, conectarte con otros talentos y convertir una idea en un videojuego jugable.
          </p>

          <div className="mt-7 inline-flex items-center gap-2 rounded-xl border border-mint/40 bg-mint/10 px-4 py-2">
            <span className="font-pixel text-[9px] tracking-wider text-mint">INSCRIPCIÓN</span>
            <span className="font-display text-sm font-bold text-white">$35.000 COP</span>
            <span className="text-mint">·</span>
            <span className="text-xs font-medium text-lavender">Cupos Limitados</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <PrimaryButton href="https://holafomo.com" className="px-9 py-4 text-lg">
              INSCRÍBETE AQUÍ
            </PrimaryButton>
            <a
              href="#sobre"
              className="inline-flex items-center justify-center rounded-xl border border-lavender/40 px-7 py-3.5 font-display text-base font-bold text-white transition-colors hover:border-mint hover:text-mint"
            >
              ¿Qué es?
            </a>
          </div>
          <p className="mt-4 text-xs text-lavender/70">Asegura tu cupo en HolaFOMO.</p>
        </div>

        {/* Visual: photo collage + floating stickers + countdown */}
        <div className="relative h-[460px] sm:h-[520px]">
          <div className="absolute inset-0 rotate-2 rounded-3xl border border-white/10 bg-grape/20" />
          <div className="absolute inset-0 -rotate-1 overflow-hidden rounded-3xl border border-mint/30">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=1000&fit=crop&auto=format"
              alt="Equipo de desarrolladores colaborando durante una game jam"
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
          </div>

          <FloatingSticker
            src="https://images.unsplash.com/photo-1637073849667-91120a924221?w=280&h=200&fit=crop&auto=format"
            alt="Devs programando en equipo"
            className="left-[-6%] top-[6%] h-28 w-40 sm:h-32 sm:w-48"
            rotate="-8deg"
            label="TEAM UP"
          />
          <FloatingSticker
            src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=240&h=200&fit=crop&auto=format"
            alt="Desarrollador enfocado en su código"
            className="right-[-4%] top-[18%] h-24 w-32 sm:h-28 sm:w-40"
            rotate="7deg"
            slow
            label="CODE ON"
          />

          <div className="absolute bottom-[-4%] left-1/2 w-[92%] -translate-x-1/2">
            <CountdownCard />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Ribbon de métricas — Dark                                         */
/* ---------------------------------------------------------------- */

const METRICS = [
  {
    stat: '3 Días',
    desc: 'Una experiencia intensiva para llevar una idea desde el concepto hasta un prototipo jugable.',
  },
  {
    stat: '48 Horas de Creación',
    desc: 'Trabajo colaborativo: desarrollo, diseño, arte, narrativa y pruebas.',
  },
  {
    stat: 'Mentorías',
    desc: 'Acompañamiento de profesionales y actores de la industria durante todo el proceso.',
  },
  {
    stat: 'Premios',
    desc: 'Reconocimientos y oportunidades para los proyectos destacados.',
  },
]

function MetricsRibbon() {
  return (
    <section className="border-y border-white/10 bg-void">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m) => (
          <div
            key={m.stat}
            className="rounded-2xl border border-white/10 bg-grape/15 p-6 transition-colors hover:border-mint/50"
          >
            <div className="font-display text-2xl font-bold text-mint">{m.stat}</div>
            <p className="mt-2 text-sm leading-relaxed text-lavender">{m.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Section 2 — ¿Qué es? — Light                                      */
/* ---------------------------------------------------------------- */

const INFO_CARDS = [
  { q: '¿Cuándo?', a: '16 al 18 de octubre de 2026.' },
  { q: '¿Dónde?', a: 'Universidad de la Costa – Barranquilla.' },
  {
    q: '¿A quién está dirigida?',
    a: 'Desarrolladores, artistas 2D/3D, diseñadores, músicos, escritores, estudiantes y entusiastas.',
  },
  {
    q: '¿Cuál es el reto?',
    a: 'Construir en equipo un videojuego funcional durante la Jam con creatividad y trabajo colaborativo.',
  },
]

function WhatIs() {
  return (
    <section id="sobre" className="bg-[#F8F9FA] text-void">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-6 py-24 lg:grid-cols-2">
        <div>
          <div className="mb-5">
            <PixelBadge tone="purple">SOBRE EL EVENTO</PixelBadge>
          </div>
          <h2 className="font-display text-4xl font-bold text-void sm:text-5xl">
            ¿Qué es la <span className="text-grape">Caribe Game Jam</span>?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-void/70">
            Una experiencia intensiva que reúne a desarrolladores, artistas, diseñadores, músicos y creadores para
            construir videojuegos en equipo. La temática es secreta y se revela al inicio del evento.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-void/70">
            No necesitas tener un equipo previo ni ser experto: aquí aprendes haciendo, con el acompañamiento de
            mentores de la industria.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {INFO_CARDS.map((c) => (
            <article
              key={c.q}
              className="rounded-2xl border border-void/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-grape/40 hover:shadow-[0_20px_50px_-24px_rgba(89,12,139,0.5)]"
            >
              <h3 className="font-display text-lg font-bold text-grape">{c.q}</h3>
              <p className="mt-2 leading-relaxed text-void/60">{c.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Section — ¿Qué incluye tu inscripción? — White                   */
/* ---------------------------------------------------------------- */

const MEALS = [
  { day: 'Viernes', items: 'Cena' },
  { day: 'Sábado', items: 'Desayuno · Almuerzo · Cena' },
  { day: 'Domingo', items: 'Desayuno · Almuerzo' },
]

const BENEFITS = [
  'Camiseta oficial de la Caribe Game Jam 2026.',
  'Identificación oficial del evento.',
  'Acceso a mentorías y acompañamiento continuo.',
  'Actividades exclusivas de networking.',
  'Participación en premios e incentivos.',
  'Showcase final de videojuegos.',
  'Conexión con la comunidad de desarrollo del Caribe.',
  'Ruta de crecimiento a través de GameJamPlus.',
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" stroke="#22E19D" strokeWidth="3" aria-hidden>
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Inscription() {
  return (
    <section id="beneficios" className="bg-white text-void">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-5 flex justify-center">
            <PixelBadge tone="purple">TU INSCRIPCIÓN</PixelBadge>
          </div>
          <h2 className="font-display text-3xl font-bold text-void sm:text-4xl">
            Por solo <span className="text-grape">$35.000</span> tendrás acceso a toda la experiencia Caribe Game
            Jam 2026
          </h2>
        </div>

        <div className="overflow-hidden rounded-3xl border-2 border-void/10 shadow-[0_30px_80px_-40px_rgba(89,12,139,0.5)]">
          <div className="grid lg:grid-cols-2">
            {/* Área A — Alimentación */}
            <div className="border-b-2 border-dashed border-void/10 bg-void p-8 text-white lg:border-b-0 lg:border-r-2">
              <div className="mb-6 flex items-center gap-3">
                <span className="font-pixel text-[9px] tracking-wider text-mint">ALIMENTACIÓN COMPLETA</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Incluida durante los 3 días</h3>
              <ul className="mt-6 space-y-4">
                {MEALS.map((m) => (
                  <li
                    key={m.day}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-grape/25 px-5 py-4"
                  >
                    <span className="font-display font-bold text-mint">{m.day}</span>
                    <span className="text-sm text-lavender">{m.items}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Área B — Checklist */}
            <div className="bg-[#F8F9FA] p-8">
              <h3 className="font-display text-2xl font-bold text-void">Todo lo que incluye tu cupo</h3>
              <ul className="mt-6 space-y-3">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-void/70">
                    <CheckIcon />
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <PrimaryButton href="https://holafomo.com" className="w-full rounded-full">
                  INSCRÍBETE AQUÍ · Cupos limitados
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Section — GameJamPlus — Deep Purple                               */
/* ---------------------------------------------------------------- */

const GJP_STEPS = ['Crea', 'Valida', 'Conecta', 'Continúa']

function GameJamPlus() {
  return (
    <section id="gamejamplus" className="relative overflow-hidden bg-grape text-white">
      <img
        src={gamejamplusBg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-grape/70 via-grape/60 to-void/75 mix-blend-multiply" />
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-mint/15 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="mb-5">
            <PixelBadge>CARIBE GAME JAM + GAMEJAMPLUS</PixelBadge>
          </div>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
            De la Jam al <span className="text-mint">Siguiente Nivel</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-lavender">
            Este año queremos que los proyectos no terminen cuando termine la Jam. La Caribe Game Jam estará
            conectada con GameJamPlus, una iniciativa internacional que permite que proyectos destacados continúen su
            desarrollo mediante mentoría, networking, incubación, aceleración y conexión con un circuito
            internacional de videojuegos.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GJP_STEPS.map((step, i) => (
            <div key={step} className="relative">
              <div className="rounded-2xl border border-mint/30 bg-white/5 p-7 backdrop-blur-md transition-colors hover:border-mint/70">
                <div className="font-pixel text-[10px] text-mint">0{i + 1}</div>
                <div className="mt-4 font-display text-2xl font-bold text-white">{step}</div>
              </div>
              {i < GJP_STEPS.length - 1 && (
                <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 font-display text-2xl font-bold text-mint lg:block">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Section — Agenda / Cronograma — Purple dark                       */
/* ---------------------------------------------------------------- */

const AGENDA = [
  {
    day: 'DÍA 1',
    date: 'Viernes 16 de Octubre',
    items: [
      '4:30 p.m. — Ingreso, registro y acreditación.',
      'Apertura Caribe Game Jam: bienvenida, reglas y aliados.',
      'Revelación del reto secreto.',
      'Formación de equipos y comienzo de la Jam.',
      'Cena incluida.',
      '10:00 p.m. — Cierre de la jornada.',
    ],
  },
  {
    day: 'DÍA 2',
    date: 'Sábado 17 de Octubre',
    items: [
      '7:00 a.m. — Apertura.',
      'Desarrollo intensivo de proyectos.',
      'Mentorías, playtesting, networking y acompañamiento de expertos.',
      'Desayuno, almuerzo y cena incluidos.',
      '10:00 p.m. — Cierre de la jornada.',
    ],
  },
  {
    day: 'DÍA 3',
    date: 'Domingo 18 de Octubre',
    items: [
      '7:00 a.m. — Apertura.',
      'Última etapa de desarrollo y preparación de entregas.',
      'Entrega de proyectos, showcase y evaluación.',
      'Premiación y cierre.',
      'Desayuno y almuerzo incluidos.',
      '5:00 p.m. — Finalización del evento.',
    ],
  },
]

function Agenda() {
  const [active, setActive] = useState(0)
  return (
    <section id="agenda" className="bg-void text-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex flex-col items-start gap-4">
          <PixelBadge>CRONOGRAMA</PixelBadge>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">Agenda Oficial</h2>
          <p className="max-w-xl text-lavender">Tres días de creación intensiva, mentorías y comunidad.</p>
        </div>

        {/* Tabs — mobile */}
        <div className="mb-6 flex gap-2 lg:hidden">
          {AGENDA.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setActive(i)}
              className={`flex-1 rounded-xl border px-3 py-2 font-display text-sm font-bold transition-colors ${
                active === i ? 'border-mint bg-mint text-void' : 'border-white/10 bg-grape/20 text-lavender'
              }`}
            >
              {d.day}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {AGENDA.map((d, i) => (
            <article
              key={d.day}
              className={`rounded-2xl border border-mint/30 bg-grape/15 p-7 ${active === i ? 'block' : 'hidden'} lg:block`}
            >
              <div className="font-pixel text-[10px] tracking-wider text-mint">{d.day}</div>
              <h3 className="mt-3 font-display text-xl font-bold text-white">{d.date}</h3>
              <ul className="mt-5 space-y-3">
                {d.items.map((it) => (
                  <li key={it} className="flex gap-3 text-sm leading-relaxed text-lavender">
                    <span className="mt-2 h-1.5 w-1.5 flex-none bg-mint" />
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Section 3 — Categorías — Deep Purple                              */
/* ---------------------------------------------------------------- */

const CATEGORIES = [
  {
    tag: 'CODE',
    title: 'Programación & Mecánicas',
    bullets: ['Prototipado en Unity / Godot', 'Gameplay y sistemas', 'Optimización y build final'],
    icon: (
      <>
        <rect x="6" y="14" width="10" height="10" />
        <rect x="16" y="14" width="10" height="10" />
        <rect x="26" y="14" width="10" height="10" />
        <rect x="16" y="24" width="10" height="10" />
        <rect x="16" y="4" width="10" height="10" />
      </>
    ),
  },
  {
    tag: 'ART',
    title: 'Arte & Narrativa',
    bullets: ['Pixel art y sprites', 'Modelado low-poly', 'Worldbuilding e historia'],
    icon: (
      <>
        <rect x="6" y="6" width="8" height="8" />
        <rect x="14" y="14" width="8" height="8" />
        <rect x="22" y="6" width="8" height="8" />
        <rect x="6" y="22" width="8" height="8" />
        <rect x="26" y="22" width="8" height="8" />
      </>
    ),
  },
  {
    tag: 'AUDIO',
    title: 'Diseño Sonoro & Música',
    bullets: ['Bandas sonoras chiptune', 'Efectos de sonido', 'Ambientes inmersivos'],
    icon: (
      <>
        <rect x="6" y="18" width="6" height="6" />
        <rect x="14" y="10" width="6" height="22" />
        <rect x="22" y="4" width="6" height="34" />
        <rect x="30" y="14" width="6" height="14" />
      </>
    ),
  },
]

function Categories() {
  return (
    <section id="categorias" className="bg-grape text-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 flex flex-col items-start gap-4">
          <PixelBadge>CATEGORÍAS</PixelBadge>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">Categorías y Desafíos</h2>
          <p className="max-w-xl text-lavender">
            Arma tu equipo y compite en los tres frentes que definen un gran videojuego.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <article
              key={c.title}
              className="group rounded-2xl border border-mint/40 bg-void p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_45px_-12px_rgba(34,225,157,0.8)]"
            >
              <div className="mb-6 inline-flex rounded-xl border border-mint/30 bg-grape/30 p-3">
                <svg viewBox="0 0 42 42" className="h-10 w-10" fill="#22E19D" aria-hidden>
                  {c.icon}
                </svg>
              </div>
              <div className="mb-3">
                <PixelBadge>{c.tag}</PixelBadge>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">{c.title}</h3>
              <ul className="mt-4 space-y-2">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-lavender">
                    <span className="h-1.5 w-1.5 flex-none bg-mint" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Section — Road to Caribe Game Jam · CrackVibes & Mentores — White */
/* ---------------------------------------------------------------- */

const MENTORS = [
  { name: 'Laura Restrepo', role: 'Game Designer', studio: 'Efecto Studios', img: 'photo-1573497019940-1c28c88b4f3e' },
  { name: 'Andrés Molina', role: 'Gameplay Programmer', studio: 'Brainz', img: 'photo-1500648767791-00dcc994a43e' },
  { name: 'Valentina Ríos', role: 'Art Director 2D/3D', studio: 'Teravision', img: 'photo-1544005313-94ddf0286df2' },
  { name: 'Camilo Duarte', role: 'Sound Designer', studio: 'Freelance', img: 'photo-1507003211169-0a1dd7228f2d' },
  { name: 'Daniela Pérez', role: 'Narrative Designer', studio: 'Indie', img: 'photo-1580489944761-15a19d654956' },
  { name: 'Sergio Vargas', role: 'Producer', studio: 'CracktiveLab', img: 'photo-1519085360753-af0119f7cbe7' },
]

function CrackVibes() {
  return (
    <section className="bg-white text-void">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-stretch gap-0 overflow-hidden rounded-3xl border-2 border-grape/20 shadow-[0_30px_80px_-40px_rgba(89,12,139,0.5)] lg:grid-cols-2">
          <div className="bg-gradient-to-br from-[#F8F9FA] to-white p-8 sm:p-12">
            <div className="mb-4">
              <PixelBadge tone="purple">ROAD TO CARIBE GAME JAM</PixelBadge>
            </div>
            <h2 className="font-display text-3xl font-bold text-void sm:text-4xl">CrackVibes</h2>
            <p className="mt-4 text-lg leading-relaxed text-void/70">
              Antes de la Jam, nuestra comunidad se prepara. A través de CrackVibes desarrollamos encuentros de
              aprendizaje y conexión con profesionales de la industria para fortalecer habilidades y llegar mejor
              preparados.
            </p>
          </div>
          <div className="relative min-h-[260px] overflow-hidden lg:min-h-full">
            <img
              src={crackvibesBg}
              alt="Comunidad CrackVibes reunida en un encuentro previo a la Caribe Game Jam"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-grape/40 via-transparent to-transparent" />
          </div>
        </div>

        <div className="mt-16">
          <h3 className="mb-8 font-display text-2xl font-bold text-void">Mentores Confirmados</h3>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {MENTORS.map((m) => (
              <article key={m.name} className="group text-center">
                <div className="mx-auto aspect-square w-full overflow-hidden rounded-2xl border border-void/10 bg-[#F8F9FA]">
                  <img
                    src={`https://images.unsplash.com/${m.img}?w=300&h=300&fit=crop&auto=format`}
                    alt={m.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h4 className="mt-3 font-display text-sm font-bold text-void">{m.name}</h4>
                <p className="text-xs text-void/60">{m.role}</p>
                <p className="text-xs font-semibold text-grape">{m.studio}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Section — Patrocinadores y Aliados — Light                        */
/* ---------------------------------------------------------------- */

type Logo = { name: string; src?: string; dark?: boolean }

const SPONSORS: Logo[] = [
  { name: 'Universidad de la Costa', src: logoCuc, dark: true },
  { name: 'EquinoxioLab', src: logoEquinoxio, dark: true },
  { name: 'IDITEK', src: logoIditek, dark: true },
  { name: 'OP', src: logoOp, dark: true },
  { name: 'Mito', src: logoMito, dark: true },
]

const ALLIES: Logo[] = [
  { name: 'IGDA Colombia', src: logoIgda, dark: true },
  { name: 'Frecuencia Gamer', src: logoFrecuencia, dark: true },
  { name: 'First Flame', src: logoFirstFlame, dark: true },
]

const DIFFUSION: Logo[] = [
  { name: 'Maleiwa Studio', src: logoMaleiwa, dark: true },
  { name: 'Aventuras Bonitas', src: logoAventuras, dark: true },
  { name: 'Rival Arts', src: logoRival, dark: true },
]

function LogoCard({ logo, height, imgMax }: { logo: Logo; height: string; imgMax: string }) {
  if (!logo.src) {
    return (
      <div
        className={`flex ${height} items-center justify-center rounded-2xl border border-dashed border-void/15 bg-white px-4 text-center text-sm font-semibold text-void/25`}
      >
        {logo.name}
      </div>
    )
  }
  return (
    <div
      className={`flex ${height} items-center justify-center rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md ${
        logo.dark ? 'border-void bg-void' : 'border-void/10 bg-white'
      }`}
    >
      <img src={logo.src} alt={logo.name} className={`${imgMax} w-auto object-contain`} loading="lazy" />
    </div>
  )
}

function Partners() {
  return (
    <section className="bg-[#F8F9FA] text-void">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-5 flex justify-center">
            <PixelBadge tone="purple">ALIADOS</PixelBadge>
          </div>
          <h2 className="font-display text-3xl font-bold text-void sm:text-4xl">
            Juntos fortalecemos el ecosistema de videojuegos del Caribe colombiano
          </h2>
        </div>

        {/* Organizador principal */}
        <div className="mx-auto mb-14 flex max-w-md flex-col items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-grape">Organizador principal</span>
          <div className="flex h-28 w-full items-center justify-center rounded-2xl border border-void bg-void px-10 shadow-sm">
            <img src={logoCracktiveVariant} alt="CracktiveLab" className="max-h-12 w-auto max-w-[80%] object-contain" />
          </div>
        </div>

        {/* Nivel 1 — Patrocinadores */}
        <div className="mb-12">
          <p className="mb-5 text-center font-pixel text-[9px] tracking-widest text-grape">PATROCINADORES</p>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {SPONSORS.map((s) => (
              <LogoCard key={s.name} logo={s} height="h-28" imgMax="max-h-14 max-w-[80%]" />
            ))}
          </div>
        </div>

        {/* Nivel 2 — Aliados */}
        <div className="mb-12">
          <p className="mb-5 text-center font-pixel text-[9px] tracking-widest text-grape">ALIADOS</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ALLIES.map((a) => (
              <LogoCard key={a.name} logo={a} height="h-24" imgMax="max-h-12 max-w-[70%]" />
            ))}
          </div>
        </div>

        {/* Nivel 3 — Aliados de difusión */}
        <div>
          <p className="mb-5 text-center font-pixel text-[9px] tracking-widest text-grape">ALIADOS DE DIFUSIÓN</p>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {DIFFUSION.map((d) => (
              <LogoCard key={d.name} logo={d} height="h-20" imgMax="max-h-10 max-w-[70%]" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Section — FAQ acordeón — Dark                                     */
/* ---------------------------------------------------------------- */

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: '¿Qué incluye el valor de la inscripción?',
    a: 'Incluye alimentación completa durante los 3 días, camiseta e identificación oficial, acceso a mentorías y acompañamiento continuo, actividades de networking, participación en premios, showcase final y conexión con la comunidad y GameJamPlus.',
  },
  {
    q: '¿Quiénes pueden participar?',
    a: 'Perfiles abiertos: desarrolladores, artistas 2D/3D, músicos, diseñadores, narrativa y más. Todos los talentos son bienvenidos.',
  },
  {
    q: '¿Tengo que saber programar, dibujar o hacer audio?',
    a: 'No necesitas ser experto. Habrá mentores que te acompañarán y aprenderás haciendo junto a tu equipo.',
  },
  {
    q: '¿Necesito tener un equipo antes de inscribirme?',
    a: 'Puedes participar de forma individual o en grupo. Habrá dinámicas de integración para conformar equipos multidisciplinarios.',
  },
  {
    q: '¿Pueden participar menores de edad?',
    a: (
      <div className="space-y-4">
        <p>Sí, mediante un adulto responsable y consentimiento informado.</p>
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full bg-mint px-5 py-2.5 font-display text-sm font-bold text-void transition-all hover:shadow-[0_0_25px_-4px_rgba(34,225,157,0.85)]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Descargar Formato de Consentimiento Informado (PDF)
        </a>
      </div>
    ),
  },
  {
    q: '¿Debo llevar computador?',
    a: 'Sí, debes traer tu laptop personal y las herramientas de trabajo que necesites.',
  },
  {
    q: '¿Cómo se conformarán los equipos?',
    a: 'A través de una dinámica de formación multidisciplinaria al inicio del evento.',
  },
  {
    q: '¿La Caribe Game Jam está conectada con GameJamPlus?',
    a: 'Sí. Los proyectos destacados pueden continuar su desarrollo mediante mentoría, incubación y aceleración dentro del circuito internacional de GameJamPlus.',
  },
  {
    q: '¿Puedo quedarme a dormir en el lugar del evento?',
    a: 'No. El evento tiene horarios estrictos de apertura y cierre cada día.',
  },
]

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="preguntas" className="bg-void text-white">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-12 flex flex-col items-start gap-4">
          <PixelBadge>PREGUNTAS FRECUENTES</PixelBadge>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">Preguntas Frecuentes</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                key={f.q}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#150522] transition-colors hover:border-mint/40"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-bold text-white sm:text-lg">{f.q}</span>
                  <span
                    className={`flex-none font-display text-2xl text-mint transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                  >
                    +
                  </span>
                </button>
                {isOpen && <div className="px-6 pb-6 leading-relaxed text-lavender">{f.a}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Section — Institucional CracktiveLab                              */
/* ---------------------------------------------------------------- */

const CRACK_PILLARS = [
  {
    title: 'Emprendimiento',
    desc: 'Crecimiento de nuevos estudios y proyectos digitales.',
    icon: (
      <>
        <rect x="16" y="4" width="10" height="10" />
        <rect x="16" y="16" width="10" height="10" />
        <rect x="16" y="28" width="10" height="10" />
      </>
    ),
  },
  {
    title: 'Aprendizaje',
    desc: 'Fortalecimiento de capacidades técnicas y creativas.',
    icon: (
      <>
        <rect x="6" y="14" width="10" height="10" />
        <rect x="16" y="14" width="10" height="10" />
        <rect x="26" y="14" width="10" height="10" />
      </>
    ),
  },
  {
    title: 'Comunidad',
    desc: 'Espacios de encuentro, colaboración y visibilidad.',
    icon: (
      <>
        <rect x="6" y="8" width="10" height="10" />
        <rect x="26" y="8" width="10" height="10" />
        <rect x="16" y="24" width="10" height="10" />
      </>
    ),
  },
]

function Institutional() {
  return (
    <section className="bg-void">
      <div className="mx-auto max-w-7xl px-6 pb-4 pt-8">
        <div className="overflow-hidden rounded-3xl border border-mint/20 bg-gradient-to-br from-grape/70 via-grape/30 to-void p-8 sm:p-12">
          <div className="max-w-2xl">
            <PixelBadge>CRACKTIVELAB</PixelBadge>
            <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
              Epicentro de industrias digitales
            </h2>
            <p className="mt-4 leading-relaxed text-lavender">
              Entidad sin ánimo de lucro que dinamiza la industria de videojuegos y contenidos digitales en el Caribe
              colombiano.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {CRACK_PILLARS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-white/10 bg-void/40 p-6 backdrop-blur">
                <div className="mb-4 inline-flex rounded-xl border border-mint/30 bg-grape/30 p-3">
                  <svg viewBox="0 0 42 42" className="h-8 w-8" fill="#22E19D" aria-hidden>
                    {p.icon}
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-lavender">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Section 5 — Final CTA — Dark                                      */
/* ---------------------------------------------------------------- */

function FinalCta() {
  return (
    <section id="inscribete" className="bg-void">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl border-2 border-mint bg-gradient-to-br from-grape/60 via-void to-void px-8 py-16 text-center shadow-[0_0_80px_-20px_rgba(34,225,157,0.7)] sm:px-16">
          <div className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-mint/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-grape/60 blur-3xl" />
          <div className="relative">
            <div className="mb-6 flex justify-center">
              <PixelBadge>READY? PRESS START</PixelBadge>
            </div>
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              48 horas para hacer historia. ¿Estás listo para crear tu <span className="text-mint">videojuego</span>?
            </h2>
            <div className="mt-9 flex justify-center">
              <PrimaryButton href="https://holafomo.com" className="px-9 py-4 text-lg">
                Inscríbete en HolaFOMO
              </PrimaryButton>
            </div>
            <p className="mt-6 text-sm text-lavender">
              Organizado por CracktiveLab (
              <a href="https://cracktivelab.com" className="text-mint underline-offset-2 hover:underline">
                cracktivelab.com
              </a>
              ).
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Footer — Charcoal                                                 */
/* ---------------------------------------------------------------- */

const SOCIALS = [
  {
    name: 'Discord',
    href: '#',
    icon: (
      <path d="M19.5 5.5A16 16 0 0 0 15.5 4l-.3.5a13 13 0 0 1 3.6 1.6 12 12 0 0 0-10.6 0A13 13 0 0 1 11.8 4.5L11.5 4A16 16 0 0 0 7.5 5.5C5 9.2 4.3 12.8 4.6 16.4A16 16 0 0 0 9.5 19l.7-1.2a10 10 0 0 1-1.7-.8l.4-.3a11.5 11.5 0 0 0 9.8 0l.4.3c-.5.3-1.1.6-1.7.8L18 19a16 16 0 0 0 4.9-2.6c.4-4.3-.6-7.9-3.4-10.9ZM9.7 14.5c-.8 0-1.4-.7-1.4-1.6s.6-1.6 1.4-1.6 1.4.7 1.4 1.6-.6 1.6-1.4 1.6Zm4.6 0c-.8 0-1.4-.7-1.4-1.6s.6-1.6 1.4-1.6 1.4.7 1.4 1.6-.6 1.6-1.4 1.6Z" />
    ),
  },
  {
    name: 'X',
    href: '#',
    icon: <path d="M17.5 4h2.6l-5.7 6.5L21 20h-5.3l-4.1-5.4L6.8 20H4.2l6.1-7L4 4h5.4l3.7 4.9L17.5 4Zm-.9 14.5h1.4L8.5 5.4H7L16.6 18.5Z" />,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <path d="M12 7.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5Zm0 7.4A2.9 2.9 0 1 1 14.9 12 2.9 2.9 0 0 1 12 14.9Zm5.8-7.6a1.05 1.05 0 1 1-1.05-1.05A1.05 1.05 0 0 1 17.8 7.3ZM20.9 8.4a5.2 5.2 0 0 0-1.4-3.7 5.2 5.2 0 0 0-3.7-1.4C14.3 3.2 9.7 3.2 8.2 3.3A5.2 5.2 0 0 0 4.5 4.7 5.2 5.2 0 0 0 3.1 8.4C3 9.9 3 14.5 3.1 16a5.2 5.2 0 0 0 1.4 3.7 5.2 5.2 0 0 0 3.7 1.4c1.5.1 6.1.1 7.6 0a5.2 5.2 0 0 0 3.7-1.4 5.2 5.2 0 0 0 1.4-3.7c.1-1.5.1-6.1 0-7.6Zm-1.9 9.2a2.9 2.9 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4a2.9 2.9 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3a2.9 2.9 0 0 1 1.7-1.7c1.2-.5 4-.4 5.3-.4s4.1-.1 5.3.4a2.9 2.9 0 0 1 1.7 1.7c.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3Z" />
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/cracktivelab',
    icon: (
      <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5v-9h3ZM6.5 8.25A1.75 1.75 0 1 1 8.25 6.5 1.75 1.75 0 0 1 6.5 8.25ZM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66Z" />
    ),
  },
]

function Footer() {
  return (
    <footer className="bg-[#09020D]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-14 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <img src={logoBlancoVerde} alt="CracktiveLab" className="h-8 w-auto" />
          <p className="font-pixel text-[9px] leading-relaxed text-lavender">CARIBE GAME JAM 2026</p>
          <a href="https://cracktivelab.com" className="text-sm text-lavender/70 transition-colors hover:text-mint">
            cracktivelab.com
          </a>
        </div>

        <div className="flex items-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              aria-label={s.name}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-grape/20 text-lavender transition-all hover:border-mint hover:text-mint"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                {s.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-white/5 px-6 py-5">
        <p className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center text-xs text-lavender/60 md:flex-row md:text-left">
          <span>© 2026 CracktiveLab. Todos los derechos reservados.</span>
          <span className="flex gap-4">
            <a href="#" className="hover:text-mint">Términos</a>
            <a href="#" className="hover:text-mint">Privacidad</a>
          </span>
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-void">
      <Nav />
      <main>
        <Hero />
        <MetricsRibbon />
        <WhatIs />
        <Inscription />
        <GameJamPlus />
        <Agenda />
        <Categories />
        <CrackVibes />
        <Partners />
        <Faq />
        <Institutional />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
