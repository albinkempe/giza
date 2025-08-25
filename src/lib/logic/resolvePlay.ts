import type { Card, Player, GameState, ResourceType } from '$lib/types';

type Effect = Card['effect'];

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
}

export function canAfford(
	player: Player,
	cost?: Partial<Record<ResourceType, number>> & { coins?: number },
	altcost?: number
): boolean {
	if (!cost) return true;

	if (player.built.some((c) => c.id === altcost)) {
		return true;
	}

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
	if (!canAfford(player, card.cost, card.altcost)) {
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

export function endOfAgeResolve(game: GameState): void {
	const players = game.players;
	const n = players.length;

	let winPoints = 0;
	switch (game.age) {
		case 1:
			winPoints = 1;
			break;
		case 2:
			winPoints = 3;
			break;
		case 3:
			winPoints = 5;
			break;
		default:
			winPoints = 0;
	}

	for (let i = 0; i < n; i++) {
		const me = players[i];
		const left = players[(i + 1) % n]; // left neighbor
		const right = players[(i - 1 + n) % n]; // right neighbor

		// compare against left neighbor
		if ((me.military || 0) > (left.military || 0)) {
			me.score += winPoints;
		} else if ((me.military || 0) < (left.military || 0)) {
			me.score -= 1;
		}

		// compare against right neighbor
		if ((me.military || 0) > (right.military || 0)) {
			me.score += winPoints;
		} else if ((me.military || 0) < (right.military || 0)) {
			me.score -= 1;
		}

		const coffeeCount = me.resources['coffee'] || 0;
		me.score += coffeeCount;
		
		me.built = me.built.filter(card => !card.temporary);

		me.resources = { [me.wonder.baseResource]: 1 };

		me.military = me.built.reduce((sum, c) => sum + (c.effect.military || 0), 0);
		for (const c of me.built) {
			if (c.effect.resources) {
				for (const [res, val] of Object.entries(c.effect.resources)) {
					me.resources[res] = (me.resources[res] || 0) + (val || 0);
				}
			}
		}

		for (let i = 0; i < me.wonderStagesBuilt; i++) {
			const stageEffect = me.wonder.stages[i].effect;
			if (stageEffect.military) me.military += stageEffect.military;
			if (stageEffect.points) me.score += stageEffect.points;
			if (stageEffect.coins) me.coins += stageEffect.coins;
			if (stageEffect.resources) {
				for (const [res, val] of Object.entries(stageEffect.resources)) {
					me.resources[res] = (me.resources[res] || 0) + val;
				}
			}
		}
	}
}