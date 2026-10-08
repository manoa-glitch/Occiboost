import { Hero } from '../components/sections/Hero';
import { Work } from '../components/sections/Work';
import { Services } from '../components/sections/Services';
import { Sectors } from '../components/sections/Sectors';
import { Benefits } from '../components/sections/Benefits';
import { Method } from '../components/sections/Method';
import { Faq } from '../components/sections/Faq';
import { FinalCta } from '../components/sections/FinalCta';

/**
 * Parcours : comprendre (Hero) → voir (Travail) → se projeter (Services, Secteurs)
 * → être rassuré (Pourquoi, Méthode, FAQ) → agir (CTA final).
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <Services />
      <Sectors />
      <Benefits />
      <Method />
      <Faq />
      <FinalCta />
    </>
  );
}
