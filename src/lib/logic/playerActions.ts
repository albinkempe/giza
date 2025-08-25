// src/lib/logic/playerActions.ts
import { botPick } from "./botDecision";
import { resolvePlay, endOfAgeResolve, applyWonderEffect, canAfford } from "./resolvePlay";
import { dealNewAge } from "$lib/utils/initialSetup";
import type { Card, GameState, Player } from "$lib/types";

export function pickCard(
  game: GameState,
  card: Card,
  action: "build" | "sell" | "wonder"
): { updatedGame: GameState; message: string; winners: Player[] } {
  let message = "";
  let winners: Player[] = [];

  const current = structuredClone(game); // clone so we don’t mutate input
  const player = current.players[0];

  // Handle human player action
  if (action === "build") {
    if (player.built.some((builtCard) => builtCard.name === card.name)) {
      message = `You already built "${card.name}", pick another card.`;
      return { updatedGame: current, message, winners };
    }
    if (!canAfford(player, card.cost, card.altcost)) {
      message = `You don't have enough resources to build "${card.name}". Pick another card.`;
      return { updatedGame: current, message, winners };
    }

    const cardIndex = player.hand.findIndex((c) => c.id === card.id);
    if (cardIndex < 0) return { updatedGame: current, message, winners };

    player.hand.splice(cardIndex, 1);
    resolvePlay(player, card);
  } else if (action === "sell") {
    const cardIndex = player.hand.findIndex((c) => c.id === card.id);
    if (cardIndex < 0) return { updatedGame: current, message, winners };

    player.hand.splice(cardIndex, 1);
    player.coins += 3;
  } else if (action === "wonder") {
    if (player.wonderStagesBuilt < player.wonder.stages.length) {
      const stage = player.wonder.stages[player.wonderStagesBuilt];
      if (!canAfford(player, stage.cost)) {
        message = "You don't have enough resources to build this wonder stage!";
        return { updatedGame: current, message, winners };
      }

      const cardIndex = player.hand.findIndex((c) => c.id === card.id);
      if (cardIndex < 0) return { updatedGame: current, message, winners };

      player.hand.splice(cardIndex, 1);
      player.wonderStagesBuilt++;
      applyWonderEffect(player, stage.effect, stage.cost);
    } else {
      message = "Your wonder is already complete!";
      return { updatedGame: current, message, winners };
    }
  }

  // Bot turns
  for (let i = 1; i < current.players.length; i++) {
    const bot = current.players[i];
    const validChoices = bot.hand.filter(
      (c) => !bot.built.some((builtCard) => builtCard.name === c.name) && canAfford(bot, c.cost)
    );

    let choice: Card | undefined;
    let botAction: "build" | "sell" | "wonder" = "build";

    if (validChoices.length > 0) {
      choice = botPick({ ...bot, hand: validChoices });
      botAction = "build";
    } else {
      if (bot.wonderStagesBuilt < bot.wonder.stages.length) {
        const stage = bot.wonder.stages[bot.wonderStagesBuilt];
        if (canAfford(bot, stage.cost)) {
          choice = bot.hand[0];
          botAction = "wonder";
        }
      }
      if (!choice && bot.hand.length > 0) {
        choice = bot.hand[0];
        botAction = "sell";
      }
    }

    if (choice) {
      const botCardIndex = bot.hand.findIndex((c) => c.id === choice!.id);
      if (botCardIndex >= 0) {
        bot.hand.splice(botCardIndex, 1);
        console.log("picked", choice.name, "to", botAction, "for bot", bot.name);

        if (botAction === "build") {
          resolvePlay(bot, choice);
        } else if (botAction === "sell") {
          bot.coins += 3;
        } else if (botAction === "wonder") {
          const stage = bot.wonder.stages[bot.wonderStagesBuilt];
          bot.wonderStagesBuilt++;
          applyWonderEffect(bot, stage.effect, stage.cost);
        }
      }
    }
  }

  // Rotate hands clockwise
  const hands = current.players.map((p) => p.hand);
  const rotated = [hands[hands.length - 1], ...hands.slice(0, hands.length - 1)];
  for (let i = 0; i < current.players.length; i++) {
    current.players[i].hand = rotated[i];
    console.log(current.players[i].name, "s hand:", current.players[i].hand);
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
      const maxScore = Math.max(...current.players.map((p) => p.score));
      winners = current.players.filter((p) => p.score === maxScore);
      message = `Game over! ${winners.map((p) => p.wonder.name).join(", ")} won with ${maxScore} points!`;

      console.log(
        "Final scores:",
        current.players.map((p) => ({ name: p.name, score: p.score }))
      );
      console.log("Winners:", winners);
    }
  } else if (
    !message.startsWith("You already built") &&
    !message.startsWith("You don't have enough resources")
  ) {
    message = "Turn resolved. Next pick.";
  }

  return {
    updatedGame: {
        ...current,
        players: current.players.map((p) => ({
        ...p,
        hand: [...p.hand],
        built: [...p.built],
        })),
    },
    message,
    winners,
  };
}
