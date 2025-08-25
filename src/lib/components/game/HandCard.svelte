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
    <div class="card-info">
        <h2>{card.name}</h2>
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
        {#if card.temporary}
            <p class="card-temporary">Temporary, removed after end of age</p>
        {/if}
    </div>

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

    {#if card.altcost}
        <div class="card-altcost">
            <p>{getCardNameById(card.altcost)}</p>
        </div>
    {/if}

	<!-- Actions -->
	<div class="card-actions">
		<button on:click={() => pick('build')}><strong>Build</strong></button>
		<button on:click={() => pick('sell')}><strong>Sell</strong></button>
		<button on:click={() => pick('wonder')}><strong>Wonder</strong></button>
	</div>
</div>


<style>
    .card-info {
        background-color: rgba(150, 150, 150, 0.322);
        width: 100%;
        border-radius: 8px 8px 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 1rem;
        border-bottom: 2px solid rgba(255, 255, 255, 0.6);
    }

	.card-cost img,
    .card-effect img {
		margin-right: 3%;
		width: 40px;
		height: 40px;
	}

	.card-altcost p {
		font-style: italic;
	}

	.card-buttons {
		display: flex;
		flex-direction: column;
        align-items: center;
		border-radius: 8px;
		box-shadow: 0 2px 6px #0001;
		transition: background 0.2s;
		min-height: 320px;
		color: white;
		height: fit-content;
		justify-content: space-between;
		width: 30%;
	}

    .card-effect {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

    .card-cost,
    .card-altcost {
		display: flex;
		flex-direction: row;
		align-items: center;
        line-height: 0.5em;
	}

	.card-actions {
		display: flex;
        flex-direction: row;
        width: 90%;
		gap: 8px;
		margin: 8px 0;
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
</style>