/** @format */

import "./App.css";
import { useState } from "react";
import Tactic from "./types/Tactic";
import TacticBoard from "./components/TacticBoard";

const TACTICS: Tactic[] = [
	{
		id: "1",
		blunderMove: "f2",
		fen: "8/8/4p3/3pP3/3P4/5p2/1R1K4/5bk1 b - - 9 64",
		solution: ["Rb1", "Kg2", "Ke3", "Bd3", "Rb2", "Bf5", "Rxf2+"],
	},
	{
		id: "2",
		blunderMove: "Ka7",
		fen: "r1bq1b1r/6pp/pk3n2/3p4/5B2/1NQp4/PP3PPP/2R1R1K1 b - - 1 20",
		solution: ["Na5"],
	},
	{
		id: "3",
		blunderMove: "Qxd5",
		fen: "r5k1/ppp2rp1/3p3p/3P2q1/3N1p2/3Q4/PPP5/1K4RR b - - 3 26",
		solution: ["Rxh6", "Kf8", "Rh8+"],
	},
	{
		id: "4",
		blunderMove: "Bd7",
		fen: "rnbqkb1r/ppp1pppp/5n2/8/8/2N1BQ2/PPP3PP/3RKBNR b Kkq - 3 7",
		solution: ["Qxb7"],
	},
];

function App() {
	const [key, setKey] = useState(Date.now());
	const [tactics, setTactics] = useState<Tactic[]>([TACTICS[0]]);

	if (tactics.length === 0) {
		return <div className="overlay-loading">Loading...</div>;
	}

	const tactic = tactics[0];

	return (
		<div className="flex-center">
			<h1>Tactics Trainer</h1>
			<TacticBoard
				key={key}
				tactic={tactic}
				onCorrect={() => {
					console.log("onCorrect");
				}}
				onIncorrect={() => {
					console.log("onIncorrect");
				}}
				onSolve={() => {
					console.log("onSolve");
					const nextTactic =
						TACTICS[Math.floor(Math.random() * TACTICS.length)];
					setTactics(tactics.slice(1).concat(nextTactic));
					setKey(Date.now());
				}}
			/>
		</div>
	);
}

export default App;
