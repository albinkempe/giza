// src/lib/logic/resolvePlay.ts
import type { Card, Player, GameState, ResourceType } from '$lib/types';

// Reuse the card.effect shape for wonder-stage effects
type Effect = Card['effect'];

/** apply a generic effect (from a card or wonder stage) to a player */
function applyEffect(player: Player, effect?: Effect): void {
	if (!effect) return;

	if (effect.resources) {
		for (const [res, amt] of Object.entries(effect.resources)) {
			const n = amt ?? 0;
			player.resources[res] = (player.resources[res] || 0) + n;
		}
	}

	if (typeof effect.coins === 'number') {
		player.coins = (player.coins || 0) + effect.coins;
	}

	if (typeof effect.military === 'number') {
		player.military = (player.military || 0) + effect.military;
	}

	if (typeof effect.points === 'number') {
		player.score = (player.score || 0) + effect.points;
	}
}

function payCost(
	player: Player,
	cost?: Partial<Record<ResourceType, number>> & { coins?: number }
): void {
	if (!cost) return;

	if (cost.coins && cost.coins > 0) {
		player.coins = (player.coins || 0) - cost.coins;
	}
	/** 
 * for (const [res, amt] of Object.entries(cost)) {
		if (res === "coins") continue; // skip coins in resources loop
		if (amt && amt > 0) {
			player.resources[res as ResourceType] = (player.resources[res as ResourceType] || 0) - amt;
		}
	}
 */
}

export function canAfford(
	player: Player,
	cost?: Partial<Record<ResourceType, number>> & { coins?: number }
): boolean {
	if (!cost) return true;

	if (cost.coins && (player.coins || 0) < cost.coins) {
		return false;
	}

	for (const [res, amt] of Object.entries(cost)) {
		if (res === 'coins') continue;
		if ((player.resources[res as ResourceType] || 0) < (amt || 0)) {
			return false;
		}
	}
	return true;
}

export function resolvePlay(player: Player, card: Card): void {
	if (!canAfford(player, card.cost)) {
		console.warn(`${player.name} cannot afford ${card.name}`);
		return;
	}
	payCost(player, card.cost);
	applyEffect(player, card.effect);
	player.built.push(card);
}

export function applyWonderEffect(
	player: Player,
	effect?: Effect,
	cost?: Record<string, number>
): void {
	if (!canAfford(player, cost)) {
		console.warn(`${player.name} cannot afford this wonder stage`);
		return;
	}
	//payCost(player, cost);
	applyEffect(player, effect);
}

/** Simple end-of-age military resolution:
 *  award +1 point for each neighbor you beat (left & right).
 */
export function endOfAgeResolve(game: GameState): void {
	const players = game.players;
	const n = players.length;
	for (let i = 0; i < n; i++) {
		const me = players[i];
		const left = players[(i + 1) % n]; // left neighbor (clockwise)
		const right = players[(i - 1 + n) % n]; // right neighbor (counter-clockwise)

		let wins = 0;
		if ((me.military || 0) > (left.military || 0)) wins++;
		if ((me.military || 0) > (right.military || 0)) wins++;

		// award wins as points (simple rule)
		if (wins > 0) {
			me.score = (me.score || 0) + wins;
		}
	}
}
