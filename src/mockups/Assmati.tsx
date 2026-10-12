import './mockup.css';
import './Assmati.css';
import { StatusBar } from './shared';

/*
 * Écrans de l'application Assmati (réalisation réelle), reconstitués à partir du code source :
 * mêmes couleurs, typographies (Fraunces + Inter), composants et libellés que l'application.
 * Les prénoms, la MAM et les chiffres sont des données de démonstration.
 */

const P: Record<string, string[]> = {
  utensils: ['M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2', 'M7 2v20', 'M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7'],
  moon: ['M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'],
  heart: [
    'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z',
    'M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27',
  ],
  sparkles: [
    'M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z',
    'M20 3v4',
    'M22 5h-4',
  ],
  camera: ['M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z', 'M9 13a3 3 0 1 0 6 0a3 3 0 1 0-6 0'],
  home: ['M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8', 'M3 10a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'],
  users: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M5 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  calendar: ['M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M16 2v4', 'M8 2v4', 'M3 10h18', 'M17 14h-6', 'M13 18H7'],
  megaphone: ['m3 11 18-5v12L3 14v-3z', 'M11.6 16.8a3 3 0 1 1-5.8-1.6'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  user: ['M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', 'M8 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0'],
  file: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M16 13H8', 'M16 17H8'],
  plus: ['M5 12h14', 'M12 5v14'],
  chevron: ['m9 18 6-6-6-6'],
  bell: ['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M10.3 21a1.94 1.94 0 0 0 3.4 0'],
  logout: ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'm16 17 5-5-5-5', 'M21 12H9'],
  clock: ['M2 12a10 10 0 1 0 20 0a10 10 0 1 0-20 0', 'M12 6v6l4 2'],
  login: ['M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4', 'm10 17 5-5-5-5', 'M15 12H3'],
  check: ['M20 6 9 17l-5-5'],
};

function I({ n, w = 1.75 }: { n: keyof typeof P; w?: number }) {
  return (
    <svg className="as-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[n].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function Mam() {
  return (
    <span className="as-mam">
      <I n="home" w={2} />
      MAM Les Petits Pas
    </span>
  );
}

function Avatar({ e, tone, size = 'md' }: { e: string; tone: string; size?: 'md' | 'lg' }) {
  return (
    <span className={`as-av as-av--${size} as-t-${tone}`} role="img" aria-hidden="true">
      {e}
    </span>
  );
}

function TopIcons() {
  return (
    <span className="as-topi">
      <I n="bell" />
      <I n="logout" />
    </span>
  );
}

const KIDS = [
  { name: 'Jade', e: '🐰', tone: 'sage', last: 'Alimentation · 12:10', n: 3 },
  { name: 'Léo', e: '🦊', tone: 'terra', last: 'Sieste · 13:05', n: 4 },
  { name: 'Nina', e: '🐻', tone: 'mustard', last: 'Activité · 10:30', n: 2 },
  { name: 'Tom', e: '🐸', tone: 'sky', last: 'Soins · 11:45', n: 2 },
];

/** Accueil de l'assistante maternelle. */
export function AssmatiAssistante() {
  return (
    <div className="mk as" data-variant="mobile">
      <StatusBar />
      <header className="as-head">
        <div>
          <p className="as-date">mardi 14 octobre</p>
          <p className="as-h1">Bonjour Camille</p>
          <Mam />
        </div>
        <TopIcons />
      </header>

      <div className="as-stats">
        <div className="as-stat as-t-sage">
          <b>4</b>
          <span>Enfants présents</span>
        </div>
        <div className="as-stat as-t-mustard">
          <b>11</b>
          <span>Événements du jour</span>
        </div>
      </div>

      <div className="as-sec">
        <p className="as-h2">Les enfants</p>
        <span className="as-xs">4 aujourd'hui</span>
      </div>
      <ul className="as-kids">
        {KIDS.map((k) => (
          <li key={k.name} className="as-card as-kid">
            <Avatar e={k.e} tone={k.tone} />
            <span className="as-kid-txt">
              <b>{k.name}</b>
              <span>{k.last}</span>
            </span>
            <span className="as-count">{k.n}</span>
            <span className="as-chev">
              <I n="chevron" />
            </span>
            <span className="as-plus">
              <I n="plus" w={2} />
            </span>
          </li>
        ))}
      </ul>

      <p className="as-h3">Raccourcis</p>
      <div className="as-card as-short">
        <span className="as-plus as-plus--lg">
          <I n="users" />
        </span>
        <span>
          <b>Saisie groupée</b>
          <span>Plusieurs enfants en un coup</span>
        </span>
      </div>

      <nav className="as-nav">
        {(
          [
            ['home', 'Accueil'],
            ['users', 'Enfants'],
            ['calendar', 'Agenda'],
            ['megaphone', 'Actus'],
            ['message', 'Messages'],
            ['user', 'Profil'],
          ] as const
        ).map(([n, l], i) => (
          <span key={l} className={i === 0 ? 'on' : undefined}>
            <I n={n} w={i === 0 ? 2.25 : 1.75} />
            {l}
          </span>
        ))}
      </nav>
    </div>
  );
}

const CHIPS = [
  { n: 'moon', l: 'Siestes', v: '1 · 1h40', t: 'sage' },
  { n: 'utensils', l: 'Repas', v: '2', t: 'mustard' },
  { n: 'heart', l: 'Soins', v: '1', t: 'blush' },
  { n: 'sparkles', l: 'Activités', v: '1', t: 'sky' },
  { n: 'camera', l: 'Photos', v: '1', t: 'cream' },
] as const;

/** Accueil du parent : la journée de l'enfant. */
export function AssmatiParent() {
  return (
    <div className="mk as" data-variant="mobile">
      <StatusBar />
      <header className="as-head as-head--parent">
        <Mam />
        <TopIcons />
      </header>
      <div className="as-child">
        <Avatar e="🦊" tone="terra" size="lg" />
        <div>
          <p className="as-h1">Léo</p>
          <p className="as-xs">Avec Camille · mis à jour il y a 2 minutes</p>
        </div>
      </div>

      <p className="as-h2 as-h2--today">Aujourd'hui</p>

      <div className="as-card as-att">
        <p className="as-att-title">
          <span className="as-sage">
            <I n="clock" w={2} />
          </span>
          Présence du jour
        </p>
        <div className="as-att-grid">
          <div className="as-tb">
            <span className="as-tb-l">
              <span className="as-sage">
                <I n="login" w={2} />
              </span>
              Arrivée
              <span className="as-sage as-tb-ok">
                <I n="check" w={2.5} />
              </span>
            </span>
            <span className="as-tb-v">08:15</span>
          </div>
          <div className="as-tb">
            <span className="as-tb-l">
              <span className="as-terra">
                <I n="logout" w={2} />
              </span>
              Départ
            </span>
            <span className="as-tb-v as-tb-v--empty">--:--</span>
          </div>
        </div>
        <p className="as-att-foot">
          <span>Non terminé</span>
          <span>
            Mois · <b>9 j · 76,5 h</b>
          </span>
        </p>
      </div>

      <div className="as-card as-chips">
        <p className="as-over">Récap du jour</p>
        <ul>
          {CHIPS.map((c) => (
            <li key={c.l} className={`as-t-${c.t}`}>
              <I n={c.n} w={2} />
              <span>
                <small>{c.l}</small>
                <b>{c.v}</b>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="as-card as-detail">
        <span>Détail de la journée</span>
        <span className="as-xs">Voir tout</span>
      </div>

      <nav className="as-nav as-nav--parent">
        {(
          [
            ['home', 'Accueil'],
            ['calendar', 'Histo.'],
            ['calendar', 'Agenda'],
            ['megaphone', 'Actus'],
            ['file', 'Décl.'],
            ['message', 'Msg'],
            ['user', 'Profil'],
          ] as const
        ).map(([n, l], i) => (
          <span key={l} className={i === 0 ? 'on' : undefined}>
            <I n={n} w={i === 0 ? 2.25 : 1.75} />
            {l}
          </span>
        ))}
      </nav>
    </div>
  );
}
