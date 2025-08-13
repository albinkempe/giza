<script lang="ts">
	import { game } from '$lib/stores/game';
	import { botPick } from '$lib/logic/botDecision';
	import {
		resolvePlay,
		endOfAgeResolve,
		applyWonderEffect,
		canAfford
	} from '$lib/logic/resolvePlay';
	import type { Card } from '$lib/types';
	import wood from '$lib/assets/wood.png';
	import stone from '$lib/assets/stone.png';
	import ore from '$lib/assets/ore.png';
	import clay from '$lib/assets/clay.png';
	import glass from '$lib/assets/glass.png';
	import cloth from '$lib/assets/cloth.png';
	import papyrus from '$lib/assets/papyrus.png';
	import military1 from '$lib/assets/military.png';
	import coin3 from '$lib/assets/coin-3.png';
	import victory1 from '$lib/assets/victory-1.png';
	import victory2 from '$lib/assets/victory-2.png';
	import victory3 from '$lib/assets/victory-3.png';
	import victory4 from '$lib/assets/victory-4.png';
	import victory5 from '$lib/assets/victory-5.png';
	import victory6 from '$lib/assets/victory-6.png';
	import victory7 from '$lib/assets/victory-7.png';
	import victory8 from '$lib/assets/victory-8.png';
	import giza from '$lib/assets/giza.png';
	import babylon from '$lib/assets/babylon.png';
	import olympia from '$lib/assets/olympia.png';
	import ephesos from '$lib/assets/ephesos.png';
	import halicarnassos from '$lib/assets/halikarnassos.png';
	import rhodos from '$lib/assets/rhodos.png';
	import alexandria from '$lib/assets/alexandria.png';
	import { dealNewAge } from '$lib/utils/initialSetup';
	import age1 from '$lib/assets/age-1.png';
	import age2 from '$lib/assets/age-2.png';
	import age3 from '$lib/assets/age-3.png';

	const ageImages: Record<number, string> = {
		1: age1,
		2: age2,
		3: age3
	};

	const wonderImages: Record<number, string> = {
		1: giza,
		2: babylon,
		3: olympia,
		4: ephesos,
		5: halicarnassos,
		6: rhodos,
		7: alexandria
	};

	const resourceIcons: Record<string, string> = {
		wood,
		stone,
		ore,
		clay,
		glass,
		cloth,
		papyrus,
		military1,
		coin3,
		victory1,
		victory2,
		victory3,
		victory4,
		victory5,
		victory6,
		victory7,
		victory8
	};

	let message = 'Game started — Age I';

	// ...existing code...

	function pickCard(card: Card, action: 'build' | 'sell' | 'wonder') {
		game.update((current) => {
			const player = current.players[0];

			// Handle the chosen action
			if (action === 'build') {
				if (player.built.some((builtCard) => builtCard.name === card.name)) {
					message = `You already built "${card.name}", pick another card.`;
					return current;
				}
				if (!canAfford(player, card.cost)) {
					message = `You don't have enough resources to build "${card.name}". Pick another card.`;
					return current;
				}
				// Remove the card from the player's hand
				const cardIndex = player.hand.findIndex((c) => c.id === card.id);
				if (cardIndex < 0) return current;
				player.hand.splice(cardIndex, 1);
				resolvePlay(player, card);
			} else if (action === 'sell') {
				const cardIndex = player.hand.findIndex((c) => c.id === card.id);
				if (cardIndex < 0) return current;
				player.hand.splice(cardIndex, 1);
				player.coins += 3;
			} else if (action === 'wonder') {
				if (player.wonderStagesBuilt < player.wonder.stages.length) {
					const stage = player.wonder.stages[player.wonderStagesBuilt];
					if (!canAfford(player, stage.cost)) {
						message = "You don't have enough resources to build this wonder stage!";
						return current;
					}
					const cardIndex = player.hand.findIndex((c) => c.id === card.id);
					if (cardIndex < 0) return current;
					player.hand.splice(cardIndex, 1);
					player.wonderStagesBuilt++;
					const stageEffect = stage.effect;
					applyWonderEffect(player, stageEffect, stage.cost);
				} else {
					message = 'Your wonder is already complete!';
					return current;
				}
			}

			// Bots play (only build for now)
			for (let i = 1; i < current.players.length; i++) {
				const bot = current.players[i];
				const validChoices = bot.hand.filter(
					(c) => !bot.built.some((builtCard) => builtCard.name === c.name) && canAfford(bot, c.cost)
				);

				let choice: Card | undefined;
				if (validChoices.length > 0) {
					choice = botPick({ ...bot, hand: validChoices });
				}
				if (choice) {
					const botCardIndex = bot.hand.findIndex((c) => c.id === choice!.id);
					if (botCardIndex >= 0) {
						bot.hand.splice(botCardIndex, 1);
						resolvePlay(bot, choice);
					}
				}
				// If no valid choices, bot skips turn (could implement sell/wonder later)
			}

			// Rotate hands clockwise
			const hands = current.players.map((p) => p.hand);
			const rotated = [hands[hands.length - 1], ...hands.slice(0, hands.length - 1)];
			for (let i = 0; i < current.players.length; i++) {
				current.players[i].hand = rotated[i];
			}

			// End of age check
			const anyCardsLeft = current.players.some((p) => p.hand.length > 0);
			if (!anyCardsLeft) {
				endOfAgeResolve(current);

				if (current.age < 3) {
					current.age++;
					dealNewAge(current);
					message = `End of Age ${current.age - 1} finished. Scores updated. Age ${current.age} begins!`;
				} else {
					message = 'Game over! Final scores shown above.';
				}
			} else if (
				!message.startsWith('You already built') &&
				!message.startsWith("You don't have enough resources")
			) {
				message = 'Turn resolved. Next pick.';
			}

			return {
				...current,
				players: current.players.map((p) => ({
					...p,
					hand: [...p.hand],
					built: [...p.built]
				}))
			};
		});
	}
</script>

{#if $game}
	<h1>7 Wonders</h1>
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
				<div class="player-summary" class:current={i === 0}>
					<div class="wonder">
						{#if player.wonder && player.wonder.id && wonderImages[player.wonder.id]}
							<img
								src={wonderImages[player.wonder.id]}
								alt={player.wonder.name}
								title={player.wonder.name}
								width="400"
								height="200"
							/>
						{/if}
						<div class="wonder-name">{player.wonder?.name}</div>

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
					</div>

					<h3>{player.name} {i === 0 ? '(You)' : ''}</h3>
					<p>Coins: {player.coins}</p>
					<p>Military: {player.military}</p>
					<p>Score: {player.score}</p>

					<div class="resources">
						{#each Object.entries(player.resources) as [res, count]}
							<div class="resource">
								<img src={resourceIcons[res]} alt={res} />
								<span>{count}</span>
							</div>
						{/each}
					</div>

					<div class="built-cards">
						<strong>Built:</strong>
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
			{/each}
		</div>
		<div class="cards-container">
			{#each $game.players[0].hand as card}
				<div class="card-buttons card-type-{card.type}">
					<strong>{card.name}</strong>
					<div class="card-cost">
						Cost:
						{#if card.cost && Object.keys(card.cost).length > 0}
							{#each Object.entries(card.cost) as [res, qty]}
								<span class="resource">{qty} {res}</span>
							{/each}
						{:else}
							<em>Free</em>
						{/if}
					</div>
					<div class="card-actions">
						<button on:click={() => pickCard(card, 'build')}>
							<strong>Build</strong>
						</button>
						<button on:click={() => pickCard(card, 'sell')}>
							<strong>Sell</strong>
						</button>
						<button on:click={() => pickCard(card, 'wonder')}>
							<strong>Wonder</strong>
						</button>
					</div>
					<div class="card-effect">
						{#if card.effect.resources}
							{#each Object.entries(card.effect.resources) as [res, qty]}
								<img src={resourceIcons[res]} alt={res} />
							{/each}
						{/if}
						{#if card.effect.coins}
							<img
								src={resourceIcons['coin' + card.effect.coins]}
								alt={'coin' + card.effect.coins}
							/>
						{/if}
						{#if card.effect.military}
							{#each Array(card.effect.military) as _, i}
								<img src={resourceIcons['military1']} alt="military" />
							{/each}
						{/if}
						{#if card.effect.points}
							<img
								src={resourceIcons['victory' + card.effect.points]}
								alt={'victory' + card.effect.points}
							/>
						{/if}
					</div>
				</div>
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

	button {
		margin: 8px 0;
		padding: 12px 20px;
		width: 260px;
		display: block;
		text-align: left;
		background: linear-gradient(135deg, #3a3a3a, #252525);
		color: #fff;
		border: none;
		border-radius: 8px;
		cursor: pointer;
	}

	.message {
		text-align: center;
	}

	.card-effect {
		margin-top: 4px;
		background-color: #ffffff;
		height: 40px;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card-effect img {
		width: 30px;
		height: 30px;
	}

	.resource {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 2px 4px;
		border-radius: 5px;
		margin-right: 4px;
		margin-bottom: 4px;
		background-color: rgb(255, 255, 255);
		color: rgb(26, 26, 26);
	}

	.resource img {
		margin-left: 5px;
		width: 30px;
		height: 30px;
	}

	.resources {
		display: flex;
		gap: 8px;
		margin: 6px 0;
		background-color: white;
		border-radius: 5px;
	}

	.wonder {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 12px;
	}

	.wonder img {
		border-radius: 8px;
	}

	.wonder-name {
		margin-top: 4px;
		font-weight: 600;
		text-align: center;
		font-size: 0.9rem;
	}

	.game-container {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		margin: 0 auto;
		gap: 24px;
	}

	/* cards on hand */

	.cards-container {
		display: flex;
		flex-wrap: wrap; /* single row */
		flex-direction: row;
		align-content: flex-start;
		overflow-x: auto; /* horizontal scroll if overflow */
		padding-bottom: 8px;
		width: 45vw;
		gap: 10px;
	}

	.card-buttons {
		border-radius: 8px;
		box-shadow: 0 2px 6px #0001;
		padding: 8px;
		transition: background 0.2s;
		color: white;
		height: fit-content;
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

	/* players */

	.player-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap; /* single row */
		padding-bottom: 8px;
		width: 45vw;
	}

	.player-summary {
		border: 2px solid #252525;
		padding: 12px;
		background: #3d3d3d;
		border-radius: 6px;
		margin-bottom: 1rem;
		flex-grow: 1;
	}

	.player-summary.current {
		background: rgb(60, 68, 77);
		border-color: #69c;
		flex-grow: 3;
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
		min-width: 110px;
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
