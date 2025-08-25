<script lang="ts">
  import type { Player } from '$lib/types';

  export let player: Player;
</script>

<div class="wonder-progress">
  <div class="stages">
    {#each player.wonder.stages as stage, idx}
      <div class="stage {idx < player.wonderStagesBuilt ? 'built' : ''}">
        <div class="stage-index">Stage {idx + 1}</div>

        <div class="stage-cost">
          Cost:
          {#if stage.cost}
            {#each Object.entries(stage.cost) as [res, qty]}
              <span class="resource">{qty} {res}</span>
            {/each}
          {:else}
            <em>Free</em>
          {/if}
        </div>

        <div class="stage-effect">
          Effect:
          {#if stage.effect.points}
            +{stage.effect.points} Points
          {/if}
          {#if stage.effect.coins}
            +{stage.effect.coins} Coins
          {/if}
          {#if stage.effect.military}
            +{stage.effect.military} Military
          {/if}
          {#if stage.effect.resources}
            {#each Object.entries(stage.effect.resources) as [res, qty]}
              <span class="resource">{qty} {res}</span>
            {/each}
          {/if}
          {#if !stage.effect.points && !stage.effect.coins && !stage.effect.military && !stage.effect.resources}
            <em>Special</em>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
	.resource {
		display: flex;
		align-items: center;
		gap: 5px;
		margin-bottom: 4px;
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
</style>