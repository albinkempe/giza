import type { Card } from '$lib/types';

export function makeDeckAge2(): Card[] {
	return [
		// Resource cards
		{
			id: 22,
			name: 'Sawmill',
			type: 'resource',
			cost: { coins: 1 },
			effect: { resources: { wood: 2 } }
		},
		{
			id: 23,
			name: 'Quarry',
			type: 'resource',
			cost: { coins: 1 },
			effect: { resources: { stone: 2 } }
		},
		{
			id: 24,
			name: 'Brickyard',
			type: 'resource',
			cost: { coins: 1 },
			effect: { resources: { clay: 2 } }
		},
		{
			id: 25,
			name: 'Foundry',
			type: 'resource',
			cost: { coins: 1 },
			effect: { resources: { ore: 2 } }
		},
		{ id: 26, name: 'Glassworks', type: 'resource', effect: { resources: { glass: 1 } } },
		{ id: 27, name: 'Press', type: 'resource', effect: { resources: { papyrus: 1 } } },
		{ id: 28, name: 'Loom', type: 'resource', effect: { resources: { cloth: 1 } } },

		// Military cards
		{
			id: 29,
			name: 'Stables',
			type: 'military',
			cost: { wood: 1, clay: 1, ore: 1 },
			altcost: 10,
			effect: { military: 2 }
		},
		{
			id: 30,
			name: 'Archery Range',
			type: 'military',
			cost: { wood: 2, ore: 1 },
			effect: { military: 2 }
		},
		{ id: 31, name: 'Walls', type: 'military', cost: { stone: 3 }, effect: { military: 2 } },
		{
			id: 32,
			name: 'Free Company',
			type: 'military',
			temporary: true,
			cost: { coins: 5 },
			effect: { military: 3 }
		},

		// Civilian cards
		{
			id: 33,
			name: 'Temple',
			type: 'civilian',
			cost: { wood: 1, clay: 1, glass: 1 },
			effect: { points: 4 }
		},
		{
			id: 34,
			name: 'Statue',
			type: 'civilian',
			cost: { ore: 2, wood: 1 },
			altcost: 11,
			effect: { points: 4 }
		},
		{ id: 35, name: 'Aqueduct', type: 'civilian', cost: { stone: 3 }, effect: { points: 5 } },
		{
			id: 36,
			name: 'Courthouse',
			type: 'civilian',
			cost: { clay: 2, cloth: 1 },
			effect: { points: 4 }
		},

		// Commerce cards
		{
			id: 37,
			name: 'Forum',
			type: 'commerce',
			cost: { clay: 2 },
			effect: { coins: 3, resources: { glass: 1, papyrus: 1 } }
		},
		{
			id: 38,
			name: 'Caravansery',
			type: 'commerce',
			cost: { wood: 2 },
			effect: { coins: 3, resources: { wood: 1, stone: 1, clay: 1, ore: 1 } }
		},
		{
			id: 39,
			name: 'Roastery',
			type: 'resource',
			cost: { clay: 2 },
			effect: { resources: { coffee: 1 } }
		},
		{ id: 40, name: 'Bazar', type: 'commerce', effect: { coins: 3 } },

		// More resource and civilian cards for balance
		{
			id: 41,
			name: 'Spice Market',
			type: 'resource',
			cost: { wood: 1, cloth: 1 },
			effect: { resources: { spice: 1 } }
		},
		{
			id: 42,
			name: 'Library',
			type: 'civilian',
			cost: { stone: 2, glass: 1 },
			effect: { points: 4 }
		}
	];
}
