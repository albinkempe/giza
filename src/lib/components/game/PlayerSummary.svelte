<script lang="ts">
	import type { Player } from '$lib/types';
	import { wonderImages } from '$lib/assets/wonders';
	import { resourceIcons } from '$lib/assets/icons';
	import WonderStages from './WonderStages.svelte';

	export let player: Player;
	export let i: number;
	export let winners: Player[];
</script>

<div class="player-summary" class:current={i === 0} class:winner={winners.some(w => w.name === player.name)}>
    <div class="wonder">
        {#if player.wonder && player.wonder.id && wonderImages[player.wonder.id]}
            <img
                src={wonderImages[player.wonder.id]}
                alt={player.wonder.name}
                title={player.wonder.name}
            />
        {/if}
        <div class="wonder-name">{player.wonder?.name}</div>

        <div class="wonder-progress">
            <WonderStages {player} />
        </div>
    </div> 

    <div class="player-info">
        
        <div class="stats">
            <div class="resource">
                <img src={resourceIcons['coin']} alt="coin" />
                <span>{player.coins}</span>
            </div>
            <div class="resource">
                <img src={resourceIcons['military']} alt="military" />
                <span>{player.military}</span>
            </div>
            <div class="resource">
                <img src={resourceIcons['victory']} alt="score" />
                <span>{player.score}</span>
            </div>
        </div>

        <h3>Resources</h3>
        <div class="resources">
            {#each Object.entries(player.resources) as [res, count]}
                <div class="resource">
                    <img src={resourceIcons[res]} alt={res} />
                    <span>{count}</span>
                </div>
            {/each}
        </div>

        <h3>Buildings</h3>
        <div class="built-cards">
            {#if player.built.length === 0}
                <em>None</em>
            {:else}
                <ul>
                    {#each player.built as builtCard}
                        <li>{builtCard.name}</li>
                    {/each}
                </ul>
            {/if}
        </div>
    </div>
</div>

<style>
	.stats .resource {
		font-size: x-large;
		font-weight: bold;
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

	.player-info {
		padding: 1rem;
	}

	.stats {
		display: flex;
		justify-content: space-around;
	}
</style>