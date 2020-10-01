# memory-game
A web application: “Memory Game” for one player.

“Memory game”
Beginning of the game: a player received two sets of identical cards in random order on a table.
With the first card lift, a timer starts ticking, and a player’s error score is set to 0.
Game round: Each round the player lifts two cards from the table. If both cards match - the
cards disappear from the table. If the cards are different the player’s error score increases by 1.
The player continues to guess card matches until the table is clear.
End of the game: The player is rated by the time elapsed from the beginning of the game and
the error score.

GAME START::
The game starts with selecting the difficulty of the game:
Easy (5 cards per set), medium (10 cards per set), hard (25 cards per set)
The client should display board with all cards in a closed state.


PROCESS:
At each round the player selects the first card - the card should reveal itself.
And then a player selects the second card - the card should reveal itself for 3 seconds.
If the cards match they should disappear.
If the cards don’t match, the card’s content should hide.
Once all tiles are guessed, a REST API is called to store details on the server.

OUTPUT:
The game ends when all cards are matched. Show clearly to the player the elapsed time since
the game started and the player’s error score.


● Stack for implementation
○ Client: React.JS
○ Server: C# ASP.NET Core

# memory-game features demo
![Workflow](https://github.com/namratabafna/memory-game/blob/master/MemoryGame.gif)

# memory-game responsive UI demo
![Responsive UI](https://github.com/namratabafna/memory-game/blob/master/MemoryGame-Responsive.gif)

