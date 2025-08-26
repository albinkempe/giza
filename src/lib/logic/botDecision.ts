import type { Card, Player } from '$lib/types';

export function botPick(player: Player): Card | undefined {
	if (player.hand.length === 0) return undefined;

	return player.hand.reduce((best, card) => {
		const bestRes = totalResources(best);
		const cardRes = totalResources(card);
		return cardRes > bestRes ? card : best;
	});

	//return player.hand[0];
}

function totalResources(card: Card): number {
	if (!card.effect.resources) return 0;
	return Object.values(card.effect.resources).reduce((sum, qty) => sum + (qty ?? 0), 0);
}
