import { useEffect, useRef, useState, type FormEvent } from 'react';
import { site } from '../../config/site';
import { paths, PREVIEW } from '../../lib/routes';
import { Icon } from '../ui/Icon';
import { useContact } from './ContactContext';

const TYPES = ['Site vitrine', 'Landing page', 'E-commerce', 'Refonte', 'Site sur mesure', 'Je ne sais pas encore'];
const STRUCTURES = ['Indépendant', 'TPE', 'PME', 'Startup', 'ETI ou grand groupe', 'Association'];

type Status = 'idle' | 'sending' | 'success' | 'error' | 'preview';

export function ContactDialog() {
  const { isOpen, preset, close } = useContact();
  const ref = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [closing, setClosing] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [type, setType] = useState('');
  const [structure, setStructure] = useState('');

  const isQuote = preset.intent === 'devis';

  // ouverture / fermeture du <dialog> natif (focus piégé, touche Échap, fond inerte)
  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (isOpen && !dlg.open) {
      setStatus('idle');
      setType(preset.type ?? '');
      setClosing(false);
      dlg.showModal();
      requestAnimationFrame(() => titleRef.current?.focus());
    }
  }, [isOpen, preset]);

  const requestClose = () => {
    const dlg = ref.current;
    if (!dlg || !dlg.open) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      dlg.close();
      return;
    }
    setClosing(true);
    window.setTimeout(() => {
      dlg.close();
      setClosing(false);
    }, 320);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    if (PREVIEW) {
      setStatus('preview');
      return;
    }
    setStatus('sending');
    const data = new FormData(form);
    const body = new URLSearchParams();
    data.forEach((v, k) => body.append(k, String(v)));

    // 1) Netlify Forms : archive de toutes les demandes dans le tableau de bord.
    const toNetlify = fetch(site.form.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json, text/html' },
      body: body.toString(),
    }).then((r) => r.ok);

    // 2) Email immédiat via le relais configuré.
    const get = (k: string) => String(data.get(k) ?? '').trim();
    const toEmail =
      site.form.emailRelay && !get('bot-field')
        ? fetch(site.form.emailRelay, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              _subject: `Nouvelle demande OcciBoost — ${get('nom') || 'Prospect'}${get('entreprise') ? ` (${get('entreprise')})` : ''}`,
              _template: 'table',
              _captcha: 'false',
              _replyto: get('email'),
              Demande: get('intention'),
              'Type de site': get('type-de-site'),
              Structure: get('structure'),
              Secteur: get('secteur'),
              Nom: get('nom'),
              Entreprise: get('entreprise'),
              Email: get('email'),
              Téléphone: get('telephone'),
              Message: get('message'),
            }),
          }).then((r) => r.ok)
        : Promise.resolve(false);

    try {
      const [netlify, email] = await Promise.allSettled([toNetlify, toEmail]);
      const ok = (r: PromiseSettledResult<boolean>) => r.status === 'fulfilled' && r.value;
      if (!ok(netlify) && !ok(email)) throw new Error('send failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const done = status === 'success' || status === 'preview';

  return (
    <dialog
      ref={ref}
      className="cdialog"
      aria-labelledby="cd-title"
      data-closing={closing ? '' : undefined}
      onClose={close}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) requestClose();
      }}
    >
      <div className="cd-panel">
        <div className="cd-head">
          <div>
            <h2 id="cd-title" ref={titleRef} tabIndex={-1}>
              {done ? 'Merci !' : isQuote ? 'Demander un devis' : 'Parlons de votre projet'}
            </h2>
            {!done && (
              <p>
                {isQuote
                  ? 'Décrivez votre besoin en quelques lignes : nous revenons vers vous avec une proposition adaptée.'
                  : 'Quelques informations suffisent. Nous revenons vers vous pour en discuter.'}
              </p>
            )}
          </div>
          <button type="button" className="cd-close" onClick={requestClose} aria-label="Fermer le formulaire">
            <Icon name="close" />
          </button>
        </div>

        {done ? (
          <div className="cd-done" role="status">
            <span className="cd-done-icon">
              <Icon name="check" strokeWidth={2.2} />
            </span>
            {status === 'success' ? (
              <>
                <p className="cd-done-title">Votre demande est bien envoyée.</p>
                <p>Nous vous recontactons pour parler de votre projet.</p>
              </>
            ) : (
              <>
                <p className="cd-done-title">Formulaire prêt, envoi désactivé dans cet aperçu.</p>
                <p>
                  Une fois le site en ligne, les demandes vous parviennent automatiquement. En attendant, appelez-nous au{' '}
                  <strong className="cd-phone">{site.contact.phone}</strong>.
                </p>
              </>
            )}
            <button type="button" className="btn btn-secondary" onClick={requestClose}>
              Fermer
            </button>
          </div>
        ) : (
          <form
            className="cd-form"
            name={site.form.name}
            method="POST"
            onSubmit={onSubmit}
          >
            <input type="hidden" name="form-name" value={site.form.name} />
            <input type="hidden" name="intention" value={isQuote ? 'Demande de devis' : 'Projet'} />
            {preset.sector && <input type="hidden" name="secteur" value={preset.sector} />}
            <p className="cd-hp" aria-hidden="true">
              <label>
                Ne pas remplir <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <fieldset className="cd-group">
              <legend>Quel type de site ?</legend>
              <div className="cd-chips">
                {TYPES.map((t) => (
                  <label key={t} className="cd-chip">
                    <input type="radio" name="type-de-site" value={t} checked={type === t} onChange={() => setType(t)} />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="cd-group">
              <legend>Votre structure</legend>
              <div className="cd-chips">
                {STRUCTURES.map((t) => (
                  <label key={t} className="cd-chip">
                    <input type="radio" name="structure" value={t} checked={structure === t} onChange={() => setStructure(t)} />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="cd-fields">
              <div className="cd-field">
                <label htmlFor="cd-nom">Nom et prénom</label>
                <input id="cd-nom" name="nom" autoComplete="name" required />
              </div>
              <div className="cd-field">
                <label htmlFor="cd-entreprise">
                  Entreprise <span>facultatif</span>
                </label>
                <input id="cd-entreprise" name="entreprise" autoComplete="organization" />
              </div>
              <div className="cd-field">
                <label htmlFor="cd-email">Email</label>
                <input id="cd-email" name="email" type="email" autoComplete="email" inputMode="email" required />
              </div>
              <div className="cd-field">
                <label htmlFor="cd-tel">
                  Téléphone <span>facultatif</span>
                </label>
                <input id="cd-tel" name="telephone" type="tel" autoComplete="tel" inputMode="tel" />
              </div>
              <div className="cd-field cd-field--full">
                <label htmlFor="cd-message">Votre projet en quelques mots</label>
                <textarea
                  id="cd-message"
                  name="message"
                  rows={3}
                  placeholder="Votre activité, vos objectifs, un site actuel à refaire, une échéance…"
                />
              </div>
            </div>

            {status === 'error' && (
              <p className="cd-error" role="alert">
                La demande n’a pas pu être envoyée. Vérifiez votre connexion puis réessayez, ou appelez-nous au{' '}
                {site.contact.phone}.
              </p>
            )}

            <div className="cd-foot">
              <p className="cd-legal">
                Vos informations servent uniquement à répondre à votre demande.{' '}
                <a href={paths.confidentialite}>Politique de confidentialité</a>
              </p>
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Envoi en cours…' : isQuote ? 'Envoyer ma demande de devis' : 'Envoyer ma demande'}
              </button>
            </div>
          </form>
        )}

        {!done && (
          <p className="cd-alt">
            <Icon name="phone" />
            <span>
              Vous préférez en parler de vive voix ?{' '}
              <a href={`tel:${site.contact.phoneHref}`}>{site.contact.phone}</a>
            </span>
          </p>
        )}
      </div>
    </dialog>
  );
}
