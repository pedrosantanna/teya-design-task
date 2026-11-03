// Persona photos for the avatar on Nearby and the account sheet (the same portraits as docs/discover/personas).
import type { Persona } from '@/store/types';

import jess from '../../assets/images/personas/jess.jpg';
import sam from '../../assets/images/personas/sam.jpg';

export const personaPhotos: Record<Persona, number> = { sam, jess };
