import React, { useState, useEffect } from "react";

function Snake() {
  const [snakeDots, setSnakeDots] = useState([[0, 0]]);
  const [direction, setDirection] = useState("RIGHT");
  const [apple, setApple] = useState([0, 0]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(moveSnake, 200);
      return () => clearInterval(interval);
    }
  }, [snakeDots, gameOver]);

  useEffect(() => {
    spawnApple();
    const appleTimeout = setTimeout(spawnApple, 10000); // Apple will respawn every 10 seconds
    return () => clearTimeout(appleTimeout);
  }, []);

  const spawnApple = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    setApple([x, y]);
  };

  const checkCollision = (head, array) => {
    for (let i = 0; i < array.length; i++) {
      if (head[0] === array[i][0] && head[1] === array[i][1]) {
        return true;
      }
    }
    return false;
  };

  const moveSnake = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }

    // Check if the snake has hit the wall
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      setGameOver(true);
      return;
    }

    // Check if the snake has hit itself
    if (checkCollision(head, dots)) {
      setGameOver(true);
      return;
    }

    if (head[0] === apple[0] && head[1] === apple[1]) {
      // If the snake eats the apple
      dots.push(head); // Add a new dot to the snake
      spawnApple(); // Spawn a new apple
    } else {
      dots.push(head);
      dots.shift(); // Remove the last dot to keep the snake the same length
    }

    setSnakeDots(dots);
  };

  useEffect(() => {
    window.addEventListener("keydown", onkeydown);
    return () => {
      window.removeEventListener("keydown", onkeydown);
    };
  }, []);

  const onkeydown = (e: { keyCode: any }) => {
    switch (e.keyCode) {
      case 87: // W
        setDirection("UP");
        break;
      case 83: // S
        setDirection("DOWN");
        break;
      case 65: // A
        setDirection("LEFT");
        break;
      case 68: // D
        setDirection("RIGHT");
        break;
    }
  };

  return (
    <div>
      <div className="game-area">
        {snakeDots.map((dot, i) => {
          const style = {
            left: `${dot[0]}%`,
            top: `${dot[1]}%`,
          };
          return <div className="dot" key={i} style={style}></div>;
        })}
        <div
          className="apple"
          style={{ left: `${apple[0]}%`, top: `${apple[1]}%` }}
        ></div>
      </div>
      {gameOver && <div className="game-over">Game Over</div>}
    </div>
  );
}

export default Snake;
