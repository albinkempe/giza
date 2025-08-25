<script lang="ts">
	import type { Card } from '$lib/types';
	import { resourceIcons } from '$lib/assets/icons';
	import { getCardNameById } from '$lib/utils/cards';
	import { createEventDispatcher } from 'svelte';

	export let card: Card;
	const dispatch = createEventDispatcher();

	function pick(action: "build" | "sell" | "wonder") {
		dispatch("pick", action);
	}
</script>

<div class="card-buttons card-type-{card.type}">
	<h2>{card.name}</h2>
	{#if card.temporary}
		<p class="card-temporary">Temporary, removed after end of age</p>
	{/if}

	<!-- Costs -->
	<h4>Cost</h4>
	<div class="card-cost">
		{#if card.cost && Object.keys(card.cost).length > 0}
			{#each Object.entries(card.cost) as [res, qty]}
				{#if res === 'coins'}
					<img src={resourceIcons['coin' + qty]} alt={'coin' + qty} />
				{:else}
					{#each Array(qty) as _, i}
						<img src={resourceIcons[res]} alt={res} />
					{/each}
				{/if}
			{/each}
		{:else}
			<em>Free</em>
		{/if}
	</div>

	<!-- Alt cost -->
	{#if card.altcost}
		<div class="card-altcost"><p>{getCardNameById(card.altcost)}</p></div>
	{/if}

	<!-- Effects -->
	<h4>Production</h4>
	<div class="card-effect">
		{#if card.effect.resources}
			{#each Object.entries(card.effect.resources) as [res, qty]}
				{#each Array(qty) as _, i}
					<img src={resourceIcons[res]} alt={res} />
				{/each}
			{/each}
		{/if}
		{#if card.effect.coins}
			<img src={resourceIcons['coin' + card.effect.coins]} alt={'coin' + card.effect.coins} />
		{/if}
		{#if card.effect.military}
			{#each Array(card.effect.military) as _, i}
				<img src={resourceIcons['military']} alt="military" />
			{/each}
		{/if}
		{#if card.effect.points}
			<img src={resourceIcons['victory' + card.effect.points]} alt={'victory' + card.effect.points} />
		{/if}
	</div>

	<!-- Actions -->
	<div class="card-actions">
		<button on:click={() => pick('build')}><strong>Build</strong></button>
		<button on:click={() => pick('sell')}><strong>Sell</strong></button>
		<button on:click={() => pick('wonder')}><strong>Wonder</strong></button>
	</div>
</div>


<style>
	.age-image {
		display: block;
		margin: 0 auto 12px auto;
		border-radius: 50%;
		box-shadow: 0 2px 8px #0003;
	}

	button {
		padding: 12px 20px;
		display: block;
		background: #222222;
		color: #fff;
		border: 1px solid #505050;
		border-radius: 8px;
		cursor: pointer;
	}

	.message {
		text-align: center;
	}

	.card-effect {
		margin-top: 4px;
		height: 40px;
		border-radius: 5px;
		display: flex;
	}

	.card-effect img {
		width: 30px;
		height: 30px;
		margin-right: 3px;
	}

	.resource {
		display: flex;
		align-items: center;
		gap: 5px;
		margin-bottom: 4px;
	}

	.resource img {
		margin-left: 5px;
		width: 25px;
		height: 25px;
	}

	.card-cost img {
		margin-left: 5px;
		width: 30px;
		height: 30px;
	}

	.card-altcost p {
		font-style: italic;
	}

	.resources {
		display: flex;
		gap: 8px;
		margin: 6px 0;
		border-radius: 5px;
	}

	.wonder {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 12px;
	}

	.wonder img {
		border-radius: 6px 6px 0 0;
		width: 100%;
		height: 20%;
	}

	.wonder-name {
		margin-top: 4px;
		font-weight: 600;
		text-align: center;
		font-size: 1.2rem;
	}

	.game-container {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		margin: 2rem auto;
	}

	/* cards on hand */

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

	.card-buttons {
		display: flex;
		flex-direction: column;
		border-radius: 8px;
		box-shadow: 0 2px 6px #0001;
		padding: 0.5rem;
		transition: background 0.2s;
		min-height: 320px;
		color: white;
		height: fit-content;
		justify-content: space-between;
		width: 30%;
	}

	.card-actions {
		display: flex;
		gap: 8px;
		margin: 8px 0;
	}

	.card-actions button {
		width: auto;
		flex: 1 1 0;
		padding: 8px 10px;
		font-size: 0.95em;
		text-align: center;
	}

	/* Card type backgrounds */
	.card-type-resource {
		background: #424b42;
	}
	.card-type-civilian {
		background: #424555;
	}
	.card-type-military {
		background: #3b2c2c;
	}
	.card-type-commerce {
		background: #494537;
	}

	.card-temporary {
		font-style: italic;
	}

	/* players */

	.player-list {
		display: flex;
		flex-wrap: wrap; /* single row */
		padding-bottom: 8px;
		gap: 1rem;
		width: 45vw;
	}

	.player-summary {
		border: 2px solid #252525;
		background: #3d3d3d;
		border-radius: 6px;
		flex: 0 0 calc(50% - 0.8rem);
	}

	.player-summary.current {
		background: rgb(60, 68, 77);
		border-color: #69c;
		flex: 0 0 100%;
	}

	.player-summary.winner {
		background: rgb(77, 74, 60) !important;
		border-color: rgb(204, 177, 102) !important;
	}

	.wonder-progress {
		margin: 10px 0 16px 0;
	}

	.stages {
		display: flex;
		gap: 10px;
	}

	.stage {
		border: 2px dashed #bbb;
		border-radius: 6px;
		padding: 6px 10px;
		background: #747474;
		color: white;
		min-width: 100px;
		min-height: 100px;
		opacity: 0.7;
		transition:
			background 0.2s,
			border-color 0.2s,
			opacity 0.2s;
	}

	.stage.built {
		border: 2px solid #4caf50;
		background: #d0f5d0;
		opacity: 1;
		color: #252525;
	}

	.stage-index {
		font-weight: bold;
		margin-bottom: 2px;
	}

	.stage-cost,
	.stage-effect {
		font-size: 0.85em;
		margin-bottom: 2px;
	}

	.player-info {
		padding: 1rem;
	}

	.stats {
		display: flex;
		justify-content: space-around;
	}
</style>