import type { Card } from '$lib/types';

export function makeDeckAge3(): Card[] {
	return [
		// Resource cards
		{
			id: 43,
			name: 'Arsenal',
			type: 'resource',
			cost: { coins: 3 },
			effect: { resources: { wood: 2, ore: 1 } }
		},
		{
			id: 44,
			name: 'Palace Gardens',
			type: 'resource',
			cost: { coins: 3 },
			effect: { resources: { stone: 2, clay: 1 } }
		},
		{
			id: 45,
			name: 'Pantheon',
			type: 'resource',
			cost: { coins: 3 },
			effect: { resources: { glass: 1, papyrus: 1, cloth: 1 } }
		},

		// Military cards
		{
			id: 46,
			name: 'Fortifications',
			type: 'military',
			cost: { stone: 2, ore: 2 },
			effect: { military: 3 }
		},
		{
			id: 47,
			name: 'Siege Workshop',
			type: 'military',
			cost: { wood: 2, clay: 1, ore: 1 },
			effect: { military: 3 }
		},
		{
			id: 48,
			name: 'Circus',
			type: 'military',
			cost: { stone: 3, ore: 1 },
			effect: { military: 3 }
		},
		{
			id: 49,
			name: 'Arsenal',
			type: 'military',
			cost: { wood: 2, ore: 2, cloth: 1 },
			effect: { military: 3 }
		},

		// Civilian cards
		{
			id: 50,
			name: 'Palace',
			type: 'civilian',
			cost: { wood: 1, stone: 1, clay: 1, ore: 1, glass: 1, papyrus: 1, cloth: 1 },
			effect: { points: 8 }
		},
		{
			id: 51,
			name: 'Town Hall',
			type: 'civilian',
			cost: { stone: 2, ore: 1, glass: 1 },
			effect: { points: 6 }
		},
		{
			id: 52,
			name: 'Pantheon',
			type: 'civilian',
			cost: { clay: 2, papyrus: 1, glass: 1 },
			effect: { points: 7 }
		},
		{
			id: 53,
			name: 'Gardens',
			type: 'civilian',
			cost: { clay: 2, wood: 1 },
			effect: { points: 5 }
		},
		{
			id: 54,
			name: 'Senate',
			type: 'civilian',
			cost: { stone: 2, wood: 1, cloth: 1 },
			effect: { points: 6 }
		},
		{
			id: 55,
			name: 'Obelisk',
			type: 'civilian',
			cost: { stone: 2, ore: 1 },
			effect: { points: 5 }
		},

		// Commerce cards
		{
			id: 56,
			name: 'Chamber of Commerce',
			type: 'commerce',
			cost: { clay: 2, papyrus: 1 },
			effect: { coins: 5 }
		},
		{
			id: 57,
			name: 'Supply Yard',
			type: 'resource',
			cost: { stone: 1, coins: 5 },
			effect: { resources: { wood: 1, ore: 1, clay: 1 } }
		},
		{
			id: 58,
			name: 'Lighthouse',
			type: 'commerce',
			cost: { stone: 1, glass: 1 },
			effect: { coins: 4 }
		},
		{
			id: 59,
			name: 'Arena',
			type: 'commerce',
			cost: { stone: 1, ore: 1, papyrus: 1 },
			effect: { coins: 5 }
		},
		{
			id: 60,
			name: 'Stock Exchange',
			type: 'commerce',
			cost: { ore: 2, cloth: 1 },
			effect: { coins: 5 }
		},
		{
			id: 61,
			name: 'Harbor',
			type: 'commerce',
			cost: { wood: 1, glass: 1 },
			effect: { coins: 5 }
		},
		{
			id: 62,
			name: 'Customs House',
			type: 'commerce',
			cost: { clay: 1, papyrus: 1 },
			effect: { coins: 4 }
		},
		{
			id: 63,
			name: 'Grand Bazaar',
			type: 'commerce',
			cost: { coffee: 1, spice: 1, cloth: 1 },
			effect: { coins: 5, points: 8 }
		}
	];
}
