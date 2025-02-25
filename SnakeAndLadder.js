class Board {
    constructor(size = 100, snakes = {}, ladders = {}) {
        this.size = size;
        this.snakes = snakes;
        this.ladders = ladders;
    }

    /**
     * Get the final position of the player after checking snakes and ladders.
     * @param {number} position - Current position before checking rules
     * @returns {number} - Updated position after applying rules
     */
    getFinalPosition(position) {
        if (this.snakes[position]) return this.snakes[position];
        if (this.ladders[position]) return this.ladders[position];
        return position;
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.position = 1;
    }

    /**
     * Moves the player based on dice roll and board rules.
     * @param {number} diceRoll - Number rolled on dice
     * @param {Board} board - The game board
     */
    move(diceRoll, board) {
        let newPosition = this.position + diceRoll;
        if (newPosition <= board.size) {
            this.position = board.getFinalPosition(newPosition);
        }
    }
}

class SnakeLadderGame {
    constructor(players, size = 100, snakes = {}, ladders = {}) {
        this.board = new Board(size, snakes, ladders);
        this.players = players.map(name => new Player(name));
    }

    /**
     * Rolls the dice and moves the player.
     * @param {number} playerIndex - Index of player in players array
     */
    rollDice(playerIndex) {
        // Check if the playerIndex is valid
        if (playerIndex < 0 || playerIndex >= this.players.length) {
            throw new Error("Player index out of range");
        }

        const diceRoll = Math.floor(Math.random() * 6) + 1;
        this.players[playerIndex].move(diceRoll, this.board);
        console.log(`${this.players[playerIndex].name} rolled ${diceRoll} and moved to ${this.players[playerIndex].position}`);
    }

    /**
     * Displays the current positions of all players.
     */
    showPositions() {
        this.players.forEach(player => console.log(`${player.name} is at position ${player.position}`));
    }
}

// Unit Testing with console.assert
console.assert(new Board(100, { 16: 6 }, {}).getFinalPosition(16) === 6, "Test Case 1 Failed: Snake at position 16");
console.assert(new Board(100, {}, { 3: 22 }).getFinalPosition(3) === 22, "Test Case 2 Failed: Ladder at position 3");

let player1 = new Player("Ajay");
let board1 = new Board(100);
player1.move(4, board1);
console.assert(player1.position === 5, "Test Case 3 Failed: Player should be at position 5 after rolling 4");

let player2 = new Player("Pavan");
player2.move(200, board1);  // Invalid move beyond board size
console.assert(player2.position === 1, "Test Case 4 Failed: Player should stay at position 1 after invalid move");

let game = new SnakeLadderGame(["Ajay", "Pavan"], 100, { 16: 6 }, { 3: 22 });
game.rollDice(0);  // Alice rolls the dice
console.assert(game.players[0].position >= 2, "Test Case 5 Failed: Alice should have moved after rolling the dice");

game.rollDice(1);  // Bob rolls the dice
console.assert(game.players[1].position >= 2, "Test Case 6 Failed: Bob should have moved after rolling the dice");

// Test invalid player index
try {
    game.rollDice(5);  // Invalid player index
    console.assert(false, "Test Case 7 Failed: Should have thrown an error for invalid player index");
} catch (error) {
    console.assert(error.message === "Player index out of range", "Test Case 7 Failed: Error message mismatch");
}

// Test custom board size with player movement
let board2 = new Board(150);  // Custom board size
let player3 = new Player("Charlie");
player3.move(100, board2);
console.assert(player3.position === 101, "Test Case 8 Failed: Player should be at position 101 after moving 100 steps");

// Final Check for All Test Cases
console.log("All test cases passed!");

// Game Simulation
const gameSimulation = new SnakeLadderGame(
  ["Ajay", "Pavan"],
  100,
  { 16: 6, 47: 26, 49: 11 },
  { 3: 22, 5: 8, 20: 29 }
);
gameSimulation.rollDice(0);
gameSimulation.rollDice(1);
gameSimulation.showPositions();
