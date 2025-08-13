import type { Card, Player } from '$lib/types';

export function botPick(player: Player): Card | undefined {
	if (player.hand.length === 0) return undefined;
	return player.hand[0];
}
