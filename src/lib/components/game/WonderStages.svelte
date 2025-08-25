<script lang="ts">
  import type { Player } from '$lib/types';
  import { resourceIcons } from '$lib/assets/icons';

  export let player: Player;
</script>

<div class="wonder-progress">
  <div class="stages">
    {#each player.wonder.stages as stage, idx}
      <div class="stage {idx < player.wonderStagesBuilt ? 'built' : ''}">
        <div class="stage-index">Stage {idx + 1}</div>

        <!-- Stage Cost -->
        {#if idx >= player.wonderStagesBuilt}
            <div class="stage-cost">
                {#if stage.cost}
                {#each Object.entries(stage.cost) as [res, qty]}
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
        {/if}


        <!-- Stage Effect -->
        <div class="stage-effect {idx < player.wonderStagesBuilt ? 'built' : ''}">
          {#if stage.effect.resources}
            {#each Object.entries(stage.effect.resources) as [res, qty]}
              {#each Array(qty) as _, i}
                <img src={resourceIcons[res]} alt={res} />
              {/each}
            {/each}
          {/if}
          {#if stage.effect.coins}
            <img src={resourceIcons['coin' + stage.effect.coins]} alt={'coin' + stage.effect.coins} />
          {/if}
          {#if stage.effect.military}
            {#each Array(stage.effect.military) as _, i}
              <img src={resourceIcons['military']} alt="military" />
            {/each}
          {/if}
          {#if stage.effect.points}
            <img src={resourceIcons['victory' + stage.effect.points]} alt={'victory' + stage.effect.points} />
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
  .stage-effect img,
  .stage-cost img {
    width: 25px;
    height: 25px;
    margin-right: 2px;
  }

  .wonder-progress {
    margin: 10px 0 16px 0;
  }

  .stages {
    display: flex;
    gap: 10px;
  }

  .stage {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
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
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
  }

  .stage-cost {
    padding-bottom: 0.5rem;
    border-bottom: 2px solid rgb(175, 175, 175);
  }

  .stage-effect.built img {
    width: 50px;
    height: 50px;
    margin-right: 2px;
  }
</style>
