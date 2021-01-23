import React, { useState, useEffect } from "react";
import { ShortMove } from "chess.js";
import Chessboard from "chessboardjsx";
import Tactic from "../types/Tactic";
import { getSideToPlayFromFen, makeMove, validateMove } from "../utils";

//we have four props
//tactic-object to play on the board
//onINcorrect is a callback to call if played move was incorrect
//onCorrect is a callback to call if played move was correct
//onsolve is a callback to call if the tactic solved

interface Props {
  tactic: Tactic;
  onIncorrect: () => void;
  onCorrect: () => void;
  onSolve: () => void;
}

const TacticBoard: React.FC<Props> = ({
  tactic,
  onIncorrect,
  onCorrect,
  onSolve,
}) => {
  const [fen, setFen] = useState(tactic.fen);
  const [solution, setSolution] = useState(tactic.solution);
// fen holds initial position of the tactic and gets updated whenever a played move is correct or tactic solved
// solution will hold the state of the tactic. as the tactic is being solved, we keep removing the first item of solution. 
    //once the solution is empty, the tactic is solved

//we are using useEffect hook to play the blunderMove and update the fen when component gets mounted
  useEffect(() => {
    setTimeout(() => {
      const next = makeMove(tactic.fen, tactic.blunderMove);
      if (next) {
        setFen(next.fen);
      }
    }, 100);
  }, [tactic]);

  //handleMove is called when user plays a move on the board. 
  //the first thing we do in handleMove is checkiif the played move was valid and update fen and solution.
  //then call onCorrect, or else call on Incorrect as the played mpve was incorrect
  const handleMove = (move: ShortMove) => {
    const next = validateMove(fen, move, solution);

    if (next) {
      setFen(next.fen);
      setSolution(next.solution);

      if (next.solution.length > 0) {
        onCorrect();

        const autoNext = validateMove(
          next.fen,
          next.solution[0],
          next.solution
        );

        if (autoNext) {
          setFen(autoNext.fen);
          setSolution(autoNext.solution);
        }
      } else {
        onSolve();
      }
    } else {
      onIncorrect();
    }
  };

  return (
    <Chessboard
      transitionDuration={200}
      position={fen}
      width={400}
      orientation={getSideToPlayFromFen(tactic.fen) === "b" ? "white" : "black"}
      onDrop={(move) =>
        handleMove({
          from: move.sourceSquare,
          to: move.targetSquare,
          promotion: "q",
        })
      }
    />
  );
};

export default TacticBoard;