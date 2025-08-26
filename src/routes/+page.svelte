<script lang="ts">
	import { game } from '$lib/stores/game';
	import { ageImages } from '$lib/assets/ages';
	import type { Card, Player } from '$lib/types';
	import { pickCard } from '$lib/logic/playerActions';
	import PlayerSummary from '$lib/components/game/PlayerSummary.svelte';
	import HandCard from '$lib/components/game/HandCard.svelte';
	import { fade } from 'svelte/transition';

	let message = 'Game started - Age I';
	let winners: Player[] = [];

	function handlePick(card: Card, action: 'build' | 'sell' | 'wonder') {
		game.update((current) => {
			const {
				updatedGame,
				message: newMessage,
				winners: newWinners
			} = pickCard(current, card, action);
			message = newMessage;
			winners = newWinners;
			return updatedGame;
		});
	}
</script>

{#if $game}
	<h1>Definitely Not 7 Wonders</h1>
	{#if ageImages[$game.age]}
		<img
			src={ageImages[$game.age]}
			alt={'Age ' + $game.age}
			class="age-image"
			width="120"
			height="120"
		/>
	{/if}
	<p class="message">{message}</p>

	<div class="game-container">
		<div class="player-list">
			{#each $game.players as player, i}
				<PlayerSummary {player} {i} {winners} />
			{/each}
		</div>
		<div class="cards-container">
			{#each $game.players[0].hand as card}
				<HandCard {card} on:pick={(e) => handlePick(card, e.detail)} />
			{/each}
		</div>
	</div>
{:else}
	<p>Loading game...</p>
{/if}

<style>
	.age-image {
		display: block;
		margin: 0 auto 12px auto;
		border-radius: 50%;
		box-shadow: 0 2px 8px #0003;
	}

	.message {
		text-align: center;
	}

	.game-container {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		margin: 2rem auto;
	}

	.cards-container {
		display: flex;
		flex-wrap: wrap; /* single row */
		flex-direction: row;
		gap: 1rem;
		align-content: flex-start;
		overflow-x: auto; /* horizontal scroll if overflow */
		padding-bottom: 8px;
		width: 45vw;
		justify-content: space-between;
	}

	.player-list {
		display: flex;
		flex-wrap: wrap; /* single row */
		justify-content: space-between;
		padding-bottom: 8px;
		gap: 1rem;
		width: 45vw;
	}
</style>
