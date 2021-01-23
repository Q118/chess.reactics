export default interface Tactic {
    id: string;
    fen: string;
    blunderMove: string;
    solution: string[]
}
// fen is the starting position of tactic. blunderMove is chess san move, containes the wrong move that gives rise to a tactic
// solution is an array of san moves containeing the solution to tactic