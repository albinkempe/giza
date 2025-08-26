import type { Card } from '$lib/types';

import { makeDeckAge1 } from '../data/cards-age1';
import { makeDeckAge2 } from '../data/cards-age2';
import { makeDeckAge3 } from '../data/cards-age3';

export const allCards: Card[] = [...makeDeckAge1(), ...makeDeckAge2(), ...makeDeckAge3()];

export function getCardNameById(id: number): string | undefined {
	return allCards.find((c) => c.id === id)?.name;
}
