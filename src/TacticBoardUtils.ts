/** @format */

import { ChessInstance, ShortMove } from "chess.js";

const Chess = require("chess.js");

//given a fen below, get which side is to play the next move
export function getSideToPlayFromFen(fen: string) {
	const chess: ChessInstance = new Chess(fen);
	return chess.turn();
}

// given a fen and move type of strig or shortMove. makes the move on the fen and returns the fen after the move
export function makeMove(fen: string, move: ShortMove | string) {
	const chess: ChessInstance = new Chess(fen);
	const fullMove = chess.move(move);
	return fullMove ? { fullMove, fen: chess.fen() } : null;
}

//this is the function we will use to confirm the played moves it takes 3 arguments (fen, move, solution) and returns  next fen and remaining solution if the valid otherwise null
export function validateMove(
	fen: string,
	move: ShortMove | string,
	solution: string[]
): null | { solution: string[]; fen: string } {
	if (solution.length === 0) {
		return null;
	}

	const next = makeMove(fen, move);

	if (next && next.fullMove.san === solution[0]) {
		return {
			fen: next.fen,
			solution: solution.slice(1),
		};
	}

	return null;
}
