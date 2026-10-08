import type { ReactNode } from 'react';
import { site } from '../config/site';
import { paths } from '../lib/routes';

/** Affiche la valeur configurée ou un emplacement « à renseigner » clairement visible. */
function Field({ value, label }: { value: string; label: string }) {
  return value ? <>{value}</> : <em className="placeholder-info">{label} à renseigner</em>;
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="legal-block">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Mentions() {
  const l = site.legal;
  return (
    <>
      <Block title="Éditeur du site">
        <p>
          Le site OcciBoost est édité par <Field value={l.publisher} label="Nom ou raison sociale" />,{' '}
          <Field value={l.status} label="Statut juridique" />.
        </p>
        <ul>
          <li>
            Adresse : <Field value={l.address} label="Adresse" />
          </li>
          <li>
            SIRET : <Field value={l.siret} label="Numéro SIRET" />
          </li>
          {l.vat && <li>TVA intracommunautaire : {l.vat}</li>}
          <li>Téléphone : {site.contact.phone}</li>
          <li>
            Email : <Field value={site.contact.email} label="Email" />
          </li>
        </ul>
      </Block>
      <Block title="Directeur de la publication">
        <p>
          <Field value={l.director} label="Nom du directeur de la publication" />
        </p>
      </Block>
      <Block title="Hébergement">
        <p>
          <Field value={l.host} label="Nom de l’hébergeur" /> — <Field value={l.hostAddress} label="Adresse de l’hébergeur" />
        </p>
      </Block>
      <Block title="Propriété intellectuelle">
        <p>
          L’ensemble des contenus de ce site (textes, visuels, logo, mise en page) est la propriété d’OcciBoost, sauf mention
          contraire. Toute reproduction ou réutilisation sans autorisation écrite préalable est interdite.
        </p>
        <p>
          Les sites présentés à titre d’exemple (Sauge &amp; Sel, Atelier Fil du Bois, Kelvia, Rivage Immobilier et les
          maquettes de la section Services) sont des concepts créés par OcciBoost pour des entreprises fictives. Assmati est
          une réalisation réelle.
        </p>
      </Block>
      <Block title="Données personnelles et cookies">
        <p>
          Les informations transmises via le formulaire de contact sont traitées conformément à notre{' '}
          <a href={paths.confidentialite}>politique de confidentialité</a>. Ce site n’utilise aucun cookie publicitaire ni
          aucun outil de mesure d’audience.
        </p>
      </Block>
      <Block title="Crédits">
        <p>
          Conception et réalisation : OcciBoost. Typographies Mona Sans, Young Serif, IBM Plex Sans et Cormorant Garamond,
          distribuées sous licence SIL Open Font License.
        </p>
      </Block>
    </>
  );
}

function Privacy() {
  const l = site.legal;
  return (
    <>
      <Block title="Responsable du traitement">
        <p>
          <Field value={l.publisher} label="Nom ou raison sociale" />, éditeur du site OcciBoost, est responsable du
          traitement des données collectées sur ce site.
        </p>
      </Block>
      <Block title="Données collectées">
        <p>Nous collectons uniquement les informations que vous saisissez dans le formulaire de contact :</p>
        <ul>
          <li>nom et prénom, adresse email ;</li>
          <li>nom de l’entreprise et numéro de téléphone, s’ils sont renseignés ;</li>
          <li>type de projet, type de structure et message.</li>
        </ul>
      </Block>
      <Block title="Finalités et base légale">
        <p>
          Ces données servent à répondre à votre demande, à échanger sur votre projet et, le cas échéant, à établir un devis.
          Ce traitement repose sur les mesures précontractuelles prises à votre demande (article 6.1.b du RGPD).
        </p>
      </Block>
      <Block title="Destinataires">
        <p>
          Vos données sont destinées exclusivement à OcciBoost. Elles ne sont ni vendues ni cédées. Elles sont hébergées par
          notre prestataire technique (<Field value={l.host} label="Hébergeur" />
          ), et transmises par email via le service FormSubmit (formsubmit.co), qui agissent en tant que sous-traitants. Si
          un prestataire est situé hors de l’Union européenne, les transferts sont
          encadrés par les garanties prévues par le RGPD.
        </p>
      </Block>
      <Block title="Durée de conservation">
        <p>
          Les données sont conservées pendant 3 ans à compter de notre dernier échange, puis supprimées, sauf si une relation
          contractuelle est engagée.
        </p>
      </Block>
      <Block title="Vos droits">
        <p>
          Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos
          données. Pour l’exercer, contactez-nous par email (<Field value={site.contact.email} label="Email" />) ou par
          téléphone au {site.contact.phone}.
        </p>
        <p>
          Vous pouvez également adresser une réclamation à la CNIL (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            www.cnil.fr
          </a>
          ).
        </p>
      </Block>
      <Block title="Cookies">
        <p>
          Ce site n’utilise aucun cookie publicitaire ni aucun outil de mesure d’audience. Les polices de caractères sont
          hébergées sur notre propre serveur : aucune donnée n’est transmise à un service tiers lors de votre visite.
        </p>
      </Block>
    </>
  );
}

export function LegalPage({ kind }: { kind: 'mentions' | 'confidentialite' }) {
  const title = kind === 'mentions' ? 'Mentions légales' : 'Politique de confidentialité';
  return (
    <article className="section legal-hero">
      <div className="container-site legal">
        <p className="section-label">Informations légales</p>
        <h1 className="t-h2">{title}</h1>
        <p className="t-small">Dernière mise à jour : {site.legal.lastUpdate}</p>
        <div className="legal-body">{kind === 'mentions' ? <Mentions /> : <Privacy />}</div>
      </div>
    </article>
  );
}
