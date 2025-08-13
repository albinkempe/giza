import { writable } from 'svelte/store';
import type { GameState } from '$lib/types';
import { setupGame } from '$lib/utils/initialSetup';

export const game = writable<GameState>(setupGame());
