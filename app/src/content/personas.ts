// Persona photos for the avatar on Nearby and the account sheet (the same portraits as docs/discover/personas).
// Credits (Unsplash licence): Sam, Elizeu Dias, https://unsplash.com/photos/2EGNqazbAMk; Jess, Jake Nackos, https://unsplash.com/photos/IF9TK5Uy-KI.
import type { Persona } from '@/store/types';

import jess from '../../assets/images/personas/jess.jpg';
import sam from '../../assets/images/personas/sam.jpg';

export const personaPhotos: Record<Persona, number> = { sam, jess };
