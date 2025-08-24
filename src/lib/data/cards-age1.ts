import type { Card } from '$lib/types';

export function makeDeckAge1(): Card[] {
	return [
		{ id: 1, name: 'Lumber Yard', type: 'resource', effect: { resources: { wood: 1 } } },
		{ id: 2, name: 'Stone Pit', type: 'resource', effect: { resources: { stone: 1 } } },
		{ id: 3, name: 'Barracks', type: 'military', effect: { military: 1 } },
		{ id: 4, name: 'Theater', type: 'civilian', effect: { points: 3 } },
		{ id: 5, name: 'Marketplace', type: 'commerce', effect: { coins: 3 } },
		{ id: 6, name: 'Clay Pool', type: 'resource', effect: { resources: { clay: 1 } } },
		{ id: 7, name: 'Ore Vein', type: 'resource', effect: { resources: { ore: 1 } } },
		{ id: 8, 
			name: 'Timber Yard', 
			type: 'resource', 
			cost: { coins: 1 },
			effect: { resources: { wood: 2 } } },
		{ id: 9, name: 'Stone Pit', type: 'resource', effect: { resources: { stone: 1 } } },
		{ id: 10, name: 'Guard Tower', type: 'military', effect: { military: 1 } },
		{ id: 11, name: 'Altar', type: 'civilian', effect: { points: 3 } },
		{ id: 12, name: 'Marketplace', type: 'commerce', effect: { coins: 3 } },
		{ id: 13, name: 'Clay Pit', type: 'resource', cost: { coins: 1 }, effect: { resources: { clay: 2 } } },
		{ id: 14, name: 'Ore Vein', type: 'resource', effect: { resources: { ore: 1 } } },
		{ id: 15, name: 'Lumber Yard', type: 'resource', effect: { resources: { wood: 1 } } },
		{ id: 16, name: 'Excavation', type: 'resource', cost: { coins: 1 }, effect: { resources: { stone: 2 } } },
		{ id: 17, name: 'Stockade', type: 'military', effect: { military: 1 } },
		{ id: 18, name: 'Baths', type: 'civilian', effect: { points: 3 } },
		{ id: 19, name: 'Marketplace', type: 'commerce', effect: { coins: 3 } },
		{ id: 20, name: 'Clay Pool', type: 'resource', effect: { resources: { clay: 1 } } },
		{ id: 21, name: 'Mine', type: 'resource', cost: { coins: 1 }, effect: { resources: { ore: 2 } } }
	];
}
