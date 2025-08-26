import type { Wonder } from './data/wonders';

export type ResourceType =
	| 'wood'
	| 'stone'
	| 'clay'
	| 'ore'
	| 'cloth'
	| 'glass'
	| 'papyrus'
	| 'coffee'
	| 'spice';

export type CardType = 'resource' | 'civilian' | 'military' | 'commerce';

export interface Card {
	id: number;
	name: string;
	type: CardType;
	temporary?: boolean;
	cost?: Partial<Record<ResourceType, number>> & { coins?: number };
	altcost?: number; // id of another card
	effect: {
		resources?: Partial<Record<ResourceType, number>>;
		coins?: number;
		military?: number;
		points?: number;
	};
}

export interface Player {
	name: string;
	coins: number;
	military: number;
	score: number;
	resources: Record<string, number>;
	hand: Card[];
	built: Card[];
	wonder: Wonder;
	wonderStagesBuilt: number; // how many stages completed (0–3)
}

export interface GameState {
	players: Player[];
	discard: Card[];
	age: number; // 1, 2, or 3
}
