import type { Card, Player, GameState } from '$lib/types';
import { wonders, type Wonder } from '$lib/data/wonders';
import { makeDeckAge1 } from '$lib/data/cards-age1';
import { makeDeckAge2 } from '$lib/data/cards-age2';
import { makeDeckAge3 } from '$lib/data/cards-age3';

function shuffleDeck(deck: Card[]): Card[] {
	return deck
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);
}

// Helper to shuffle wonders and assign unique ones
function getUniqueWonders(count: number) {
	const shuffled = wonders
		.map((w) => ({ w, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ w }) => w);
	return shuffled.slice(0, count);
}

export function makePlayer(name: string, wonder: Wonder): Player {
	return {
		name,
		coins: 3,
		military: 0,
		score: 0,
		resources: { [wonder.baseResource]: 1 }, // base resource from wonder
		hand: [],
		built: [],
		wonder,
		wonderStagesBuilt: 0 // progress tracker
	};
}

export function setupGame(): GameState {
	const playerNames = ['You', 'Bot A', 'Bot B'];
	const uniqueWonders = getUniqueWonders(playerNames.length);

	const players: Player[] = playerNames.map((name, i) => makePlayer(name, uniqueWonders[i]));

	const deck = shuffleDeck(makeDeckAge1());

	for (let i = 0; i < players.length; i++) {
		players[i].hand = deck.splice(0, 7);
	}

	return { players, discard: [], age: 1 };
}

export function dealNewAge(game: GameState) {
	let deck: Card[];
	if (game.age === 2) {
		deck = shuffleDeck(makeDeckAge2());
	} else if (game.age === 3) {
		deck = shuffleDeck(makeDeckAge3());
	} else {
		deck = shuffleDeck(makeDeckAge1());
	}
	for (let i = 0; i < game.players.length; i++) {
		game.players[i].hand = deck.splice(0, 7);
	}
}
