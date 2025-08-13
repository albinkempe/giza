export interface WonderStage {
	cost: Record<string, number>; // e.g., { stone: 2, wood: 1 }
	effect: {
		points?: number;
		coins?: number;
		military?: number;
		resources?: Record<string, number>;
		// Extend later for special effects if needed
	};
}

export interface Wonder {
	id: number;
	name: string;
	baseResource: string; // e.g., "stone", "wood", "clay", etc.
	stages: WonderStage[];
}

export const wonders: Wonder[] = [
	{
		id: 1,
		name: 'The Great Pyramid of Giza',
		baseResource: 'stone',
		stages: [
			{ cost: { wood: 2 }, effect: { points: 3 } },
			{ cost: { clay: 2, cloth: 1 }, effect: { points: 5 } },
			{ cost: { stone: 4 }, effect: { points: 7 } }
		]
	},
	{
		id: 2,
		name: 'Hanging Gardens of Babylon',
		baseResource: 'wood',
		stages: [
			{ cost: { clay: 2 }, effect: { points: 3 } },
			{ cost: { ore: 2, cloth: 1 }, effect: { coins: 6 } },
			{ cost: { wood: 4 }, effect: { points: 7 } }
		]
	},
	{
		id: 3,
		name: 'Statue of Zeus at Olympia',
		baseResource: 'clay',
		stages: [
			{ cost: { stone: 2 }, effect: { points: 3 } },
			{ cost: { wood: 2 }, effect: { military: 1 } },
			{ cost: { clay: 3 }, effect: { points: 7 } }
		]
	},
	{
		id: 4,
		name: 'Temple of Artemis at Ephesus',
		baseResource: 'papyrus',
		stages: [
			{ cost: { clay: 2 }, effect: { points: 3 } },
			{ cost: { wood: 2 }, effect: { coins: 9 } },
			{ cost: { ore: 2, glass: 1 }, effect: { points: 7 } }
		]
	},
	{
		id: 5,
		name: 'Mausoleum at Halicarnassus',
		baseResource: 'cloth',
		stages: [
			{ cost: { ore: 2 }, effect: { points: 3 } },
			{ cost: { glass: 1, papyrus: 1 }, effect: { coins: 9 } },
			{ cost: { stone: 3 }, effect: { points: 7 } }
		]
	},
	{
		id: 6,
		name: 'Colossus of Rhodes',
		baseResource: 'ore',
		stages: [
			{ cost: { wood: 2 }, effect: { points: 3 } },
			{ cost: { clay: 3 }, effect: { military: 2 } },
			{ cost: { ore: 4 }, effect: { points: 7 } }
		]
	},
	{
		id: 7,
		name: 'Lighthouse of Alexandria',
		baseResource: 'glass',
		stages: [
			{ cost: { stone: 2 }, effect: { resources: { glass: 1 } } },
			{ cost: { ore: 2 }, effect: { points: 5 } },
			{ cost: { papyrus: 1, cloth: 1 }, effect: { points: 7 } }
		]
	}
];
