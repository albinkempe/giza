<script lang="ts">
	import type { Player } from '$lib/types';
	import { resourceIcons } from '$lib/assets/icons';
	import Tooltip from '../ui/Tooltip.svelte';
	import { resourceDescriptions } from '$lib/data/resourceDescriptions';

	export let player: Player;
</script>

<div class="wonder-progress">
	<div class="stages">
		{#each player.wonder.stages as stage, idx}
			<div class="stage {idx < player.wonderStagesBuilt ? 'built' : ''} {idx === player.wonderStagesBuilt ? 'next' : ''}">
				<div class="stage-info {idx < player.wonderStagesBuilt ? 'built' : ''}">
					<div class="stage-index">Stage {idx + 1}</div>
					<!-- Stage Effect -->
					<div class="stage-effect {idx < player.wonderStagesBuilt ? 'built' : ''}">
						{#if stage.effect.resources}
							{#each Object.entries(stage.effect.resources) as [res, qty]}
								{#each Array(qty) as _, i}
									<Tooltip text={resourceDescriptions[res]}>
										<img src={resourceIcons[res]} alt={res} />
									</Tooltip>
								{/each}
							{/each}
						{/if}
						{#if stage.effect.coins}
							<Tooltip text={resourceDescriptions['coin' + stage.effect.coins]}>
								<img
									src={resourceIcons['coin' + stage.effect.coins]}
									alt={'coin' + stage.effect.coins}
								/>
							</Tooltip>
						{/if}
						{#if stage.effect.military}
							{#each Array(stage.effect.military) as _, i}
								<Tooltip text={resourceDescriptions['military']}>
									<img src={resourceIcons['military']} alt="military" />
								</Tooltip>
							{/each}
						{/if}
						{#if stage.effect.points}
							<Tooltip text={resourceDescriptions['victory' + stage.effect.points]}>
								<img
									src={resourceIcons['victory' + stage.effect.points]}
									alt={'victory' + stage.effect.points}
								/>
							</Tooltip>
						{/if}
						{#if !stage.effect.points && !stage.effect.coins && !stage.effect.military && !stage.effect.resources}
							<em>Special</em>
						{/if}
					</div>
				</div>

				<!-- Stage Cost -->
				{#if idx >= player.wonderStagesBuilt}
					<div class="stage-cost">
						{#if stage.cost}
							{#each Object.entries(stage.cost) as [res, qty]}
								{#if res === 'coins'}
									<Tooltip text={resourceDescriptions['coin' + qty]}>
										<img src={resourceIcons['coin' + qty]} alt={'coin' + qty} />
									</Tooltip>
								{:else}
									{#each Array(qty) as _, i}
										<Tooltip text={resourceDescriptions[res]}>
											<img src={resourceIcons[res]} alt={res} />
										</Tooltip>
									{/each}
								{/if}
							{/each}
						{:else}
							<em>Free</em>
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.stages {
		display: flex;
		gap: 0.5rem;
	}

	.stage {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
		justify-content: start;
		border-radius: 6px;
		background: #1a1a1a;
		color: white;
		min-width: 100px;
		min-height: 100px;
		opacity: 0.6;
		transition:
			background 0.2s,
			border-color 0.2s,
			opacity 0.2s;
	}

	.stage.next {
		opacity: 1;
	}

	.stage.built {
		opacity: 1;
	}

	.stage-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: rgb(44, 44, 44);
		width: 100%;
		border-radius: 6px 6px 0 0;
	}

  .stage-info.built {
    background-color: rgb(77, 74, 60);
    border: 2px solid rgb(204, 177, 102);
    height: 100%;
    border-radius: 6px;
  }

	.stage-index {
		font-weight: bold;
    margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.stage-cost,
	.stage-effect {
		font-size: 0.85em;
		margin-bottom: 2px;
		display: flex;
		flex-wrap: wrap;
		gap: 2px;
	}

  .stage-effect {
		margin-bottom: 0.5rem;
	}

	.stage-cost {
		margin-bottom: 0.5rem;
    padding: 0 0.5rem;
	}

	.stage-effect img,
	.stage-cost img {
		width: 25px;
		height: 25px;
		margin-right: 2px;
	}

	.stage-effect.built img {
		width: 50px;
		height: 50px;
		margin-right: 2px;
	}
</style>
