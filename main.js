const game = document.querySelector(".gamecard");
const gamemenu = document.querySelector(".menu");
const winmenu = document.querySelector(".gamewinmenu");
const wintext = document.createElement("div");
wintext.classList.add("wintext");
winmenu.insertBefore(wintext, winmenu.firstChild);

const gravity = 0.4;

let camerax = 0;
let scrollthreshhold = window.innerWidth / 2;
const ball = {
  x: 30,
  y: 300,
  color: "red",
  height: 40,
  width: 40,
  vx: 0,
  vy: 0,
  onground: false,
};
let gamerunning = false;

let score = 0;
let leveldisp = 1 + "/3";
//let spikehit = false;
const game_screen_width = window.innerWidth;
const game_screen = { width: 500, height: 500 };
const game_world = document.createElement("div");

const level = {
  level_width: 2000,
  ground: { x: 0, y: 420, width: 2000, height: 80, color: "#f8d7da" },
  windoor: { x: 1900, y: 380, width: 100, height: 40, color: "purple" },
  platforms: [
    { x: 100, y: 310, width: 110, height: 60, color: "#aed6f1" },
    { x: 260, y: 310, width: 120, height: 60, color: "#aed6f1" },
    { x: 390, y: 210, width: 100, height: 55, color: "#aed6f1" },
    { x: 540, y: 330, width: 100, height: 60, color: "#aed6f1" },
    { x: 700, y: 280, width: 90, height: 55, color: "#aed6f1" },
    { x: 850, y: 330, width: 100, height: 60, color: "#aed6f1" },
    { x: 1000, y: 280, width: 90, height: 55, color: "#aed6f1" },
    { x: 1140, y: 230, width: 100, height: 55, color: "#aed6f1" },
    { x: 1290, y: 280, width: 90, height: 55, color: "#aed6f1" },
    { x: 1430, y: 330, width: 100, height: 60, color: "#aed6f1" },
    { x: 1580, y: 280, width: 90, height: 55, color: "#aed6f1" },
    { x: 1720, y: 240, width: 120, height: 55, color: "#aed6f1" },
    { x: 1880, y: 200, width: 110, height: 55, color: "#aed6f1" },
  ],
  coins: [
    { x: 155, y: 270, isCollected: false, height: 20, width: 20 },
    { x: 295, y: 270, isCollected: false, height: 20, width: 20 },
    { x: 325, y: 270, isCollected: false, height: 20, width: 20 },
    { x: 420, y: 185, isCollected: false, height: 20, width: 20 },
    { x: 1800, y: 200, isCollected: false, height: 20, width: 20 },
    { x: 585, y: 290, isCollected: false, height: 20, width: 20 },
    { x: 735, y: 240, isCollected: false, height: 20, width: 20 },
    { x: 895, y: 290, isCollected: false, height: 20, width: 20 },
    { x: 1040, y: 240, isCollected: false, height: 20, width: 20 },
    { x: 1180, y: 190, isCollected: false, height: 20, width: 20 },
    { x: 1325, y: 240, isCollected: false, height: 20, width: 20 },
    { x: 1470, y: 290, isCollected: false, height: 20, width: 20 },
    { x: 1615, y: 240, isCollected: false, height: 20, width: 20 },
    { x: 1925, y: 160, isCollected: false, height: 20, width: 20 },
  ],
  spikes: [
    { x: 211, y: 400, width: 20, height: 20 },
    { x: 232, y: 400, width: 20, height: 20 },
    { x: 385, y: 400, width: 20, height: 20 },
    { x: 406, y: 400, width: 20, height: 20 },
    { x: 660, y: 400, width: 20, height: 20 },
    { x: 680, y: 400, width: 20, height: 20 },
    { x: 810, y: 400, width: 20, height: 20 },
    { x: 830, y: 400, width: 20, height: 20 },
    { x: 960, y: 400, width: 20, height: 20 },
    { x: 980, y: 400, width: 20, height: 20 },
    { x: 1100, y: 400, width: 20, height: 20 },
    { x: 1120, y: 400, width: 20, height: 20 },
    { x: 1250, y: 400, width: 20, height: 20 },
    { x: 1270, y: 400, width: 20, height: 20 },
    { x: 1390, y: 400, width: 20, height: 20 },
    { x: 1410, y: 400, width: 20, height: 20 },
    { x: 1540, y: 400, width: 20, height: 20 },
    { x: 1560, y: 400, width: 20, height: 20 },
    { x: 1680, y: 400, width: 20, height: 20 },
    { x: 1700, y: 400, width: 20, height: 20 },
  ],
};
game_world.style.width = level.level_width + "px";
game_world.style.height = "500px";
game_world.style.position = "absolute";
game.appendChild(game_world);
//platforms dealing!!
level.platforms.forEach((platform) => {
  const platformdiv = document.createElement("div");
  platformdiv.classList.add("platform");
  platformdiv.style.left = platform.x + "px";
  platformdiv.style.top = platform.y + "px";
  platformdiv.style.width = platform.width + "px";
  platformdiv.style.height = platform.height + "px";
  game_world.appendChild(platformdiv);
  console.log(platformdiv);
});
//deal with ground
const grounddiv = document.createElement("div");
grounddiv.classList.add("groundclass");
grounddiv.style.position = "absolute";
grounddiv.style.left = level.ground.x + "px";
grounddiv.style.top = level.ground.y + "px";
grounddiv.style.width = level.ground.width + "px";
grounddiv.style.height = level.ground.height + "px";

game_world.appendChild(grounddiv);
//with coins
level.coins.forEach((coin) => {
  const coindiv = document.createElement("div");
  coindiv.classList.add("coin");
  coindiv.style.left = coin.x + "px";
  coindiv.style.top = coin.y + "px";
  game_world.appendChild(coindiv);
  coin.element = coindiv;
  console.log(coindiv);
});

//deal with ball
const balldiv = document.createElement("div");
//balldiv.classList.add("ballclass");
balldiv.style.color = ball.color;
balldiv.style.left = ball.x + "px";
balldiv.style.top = ball.y + "px";
balldiv.style.width = "40px";
balldiv.style.height = "40px";
balldiv.style.position = "absolute";
balldiv.style.backgroundColor = ball.color;
balldiv.style.borderRadius = "50%";
game_world.appendChild(balldiv);
// const isOnground = (ball) => {
//   // console.log(ball.y);
//   if (ball.y == level.ground.y - ball.height) {
//     ball.y = level.ground.y - ball.height;
//     ball.onground = true;
//   }
// };
level.spikes.forEach((spike) => {
  const spikesdiv = document.createElement("div");
  spikesdiv.classList.add("spike");
  spikesdiv.style.left = spike.x + "px";
  spikesdiv.style.top = spike.y + "px";
  spikesdiv.style.width = spike.width + "px";
  spikesdiv.style.height = spike.height + "px";
  game_world.appendChild(spikesdiv);
  spike.element = spikesdiv;
});
const scoredisplay = document.createElement("div");
scoredisplay.style.position = "absolute";
scoredisplay.style.top = "10px";
scoredisplay.style.left = "10px";
game.appendChild(scoredisplay);

const leveldisplay = document.createElement("div");
leveldisplay.style.position = "absolute";
leveldisplay.style.top = "30px";
leveldisplay.style.left = "10px";
game.appendChild(leveldisplay);
const windoor = document.createElement("div");
windoor.style.position = "absolute";
windoor.style.top = level.windoor.y + "px";
windoor.style.left = level.windoor.x + "px";
windoor.style.width = level.windoor.width + "px";
windoor.style.height = level.windoor.height + "px";
windoor.style.backgroundColor = level.windoor.color;
game_world.appendChild(windoor);
const rectangleOverlaps = (rect1, rect2) => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
};
const ballhitPlatform = (paltform) => {
  return rectangleOverlaps(ball, paltform);
};
const ballhitCoin = () => {
  level.coins.forEach((coin) => {
    if (rectangleOverlaps(ball, coin) && !coin.isCollected) {
      console.log(coin.isCollected);
      coin.isCollected = true;
      console.log("spikehit");
      coin.element.style.display = "none";
      score++;
    }
  });
};
const ballhitSpike = () => {
  level.spikes.forEach((spike) => {
    if (rectangleOverlaps(ball, spike)) {
      ball.x = 0;
      ball.y = 400;
      ball.vx = 0;
      ball.vy = 0;
      level.coins.forEach((coin) => {
        coin.isCollected = false;
        coin.element.style.display = "block";
      });
      score = 0;
    }
  });
};
const ballhitwindoor = () => {
  if (rectangleOverlaps(ball, level.windoor)) {
    ball.vx = 0;
    ball.vy = 0;
    ball.x = "1910px";
    ball.y = "400px";
    wintext.innerHTML = "YOU WIN!<br>your score is " + score;
    winmenu.style.display = "flex";
  }
};
//check x axis collision to adjust position
const checkxaxis = () => {
  ball.x += ball.vx;
  level.platforms.forEach((platform) => {
    if (ballhitPlatform(platform)) {
      if (ball.vx > 0) {
        ball.x = platform.x - ball.width;
      } else if (ball.vx < 0) {
        ball.x = platform.x + platform.width;
      }
      ball.vx = 0;
    }
  });
};
const checkyaxis = () => {
  ball.y += ball.vy;
  if (ball.y > level.ground.y - ball.height) {
    ball.y = level.ground.y - ball.height;
    ball.vy = -ball.vy * 0.4;
    ball.onground = true;
  }
  level.platforms.forEach((platform) => {
    if (ballhitPlatform(platform)) {
      if (ball.vy > 0) {
        ball.y = platform.y - ball.height;

        ball.onground = true;
      } else if (ball.vy < 0) {
        ball.y = platform.y + platform.height;
      }
      ball.vy = -ball.vy * 0.4;
    }
  });
};
// const checkplatformCollision = (prev_bottom) => {
//   level.platforms.forEach((platform) => {
//     //to check if ball is above platform
//     if (rectangleOverlaps(ball, platform)) {
//       if (prev_bottom <= platform.y) {
//         ball.vy = 0;
//         //ball.vx = 0;
//         ball.y = platform.y - ball.height;
//       } else if (ball.x + ball.width > platform.x) {
//         ball.x = platform.x - ball.width;
//       } else if (ball.y + ball.height > platform.y) {
//         ball.y = platform.y - ball.height;
//       }
//     }
//   });
// };
// const checkGroundCollision = () => {
//   if (ball.y + ball.height > level.ground.y) {
//     ball.y = level.ground.y - ball.height;
//     ball.vy = 0;
//     ball.onground = true;
//   }
// };
const update = () => {
  ball.vy += gravity;
  ball.onground = false;

  // ball.x = ball.x + ball.vx;
  // ball.y = ball.y + ball.vy;
  // if (!isOnground(ball)) {
  //   ball.y += gravity;
  // }
  if (ball.x + ball.width > level.level_width) {
    ball.x = level.level_width - ball.width;
  } else if (ball.x < 0) {
    ball.x = 0;
  }
  if (ball.y + ball.height > game_screen.height) {
    ball.y = game_screen.height - ball.height;
    ball.vy = 0;
  }
  //camera scroll
  if (ball.x > scrollthreshhold) {
    camerax = ball.x - scrollthreshhold;
  }
  if (ball.x - camerax < 0) {
    camerax = ball.x;
  }
  camerax = Math.min(camerax, level.level_width - game_screen_width);
  checkxaxis();
  checkyaxis();
  // isOnground(ball);
  ballhitCoin();

  ballhitSpike();
};

const render = () => {
  if (!gamerunning) {
    gamemenu.style.display = "flex";
    return;
  } else {
    gamemenu.style.display = "none";
  }
  balldiv.style.left = ball.x + "px";
  balldiv.style.top = ball.y + "px";
  game_world.style.left = -camerax + "px";

  scoredisplay.textContent = "Score: " + score;
  leveldisplay.textContent = "Level: " + leveldisp;
  if (rectangleOverlaps(ball, level.windoor)) {
    ballhitwindoor();
  }
};
const moveleft = () => {
  ball.vx = -3;
};
const moveright = () => {
  ball.vx = 3;
};
const jump = () => {
  if (ball.onground) {
    ball.vy = -12;
  }
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    moveleft();
  } else if (e.key === "ArrowRight") {
    moveright();
  } else if (e.key === " ") {
    jump();
  }
  if (e.key == "Escape") {
    gamerunning = false;
  }
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    ball.vx = 0;
  } else if (e.key === " ") {
    ball.vy = 0;
  }
});
const gamestartbtn = document.querySelector("#startgamebtn");
gamestartbtn.addEventListener("click", () => {
  gamerunning = true;
});
const gameresetbtn = document.querySelector("#resetbtn");
gameresetbtn.addEventListener("click", () => {
  window.location.reload();
});
const leftbtn = document.querySelector("#leftbtn");
leftbtn.addEventListener("touchstart", () => {
  moveleft();
});
const rightbtn = document.querySelector("#rightbtn");
rightbtn.addEventListener("touchstart", () => {
  moveright();
});
const jumpbtn = document.querySelector("#jumpbtn");
jumpbtn.addEventListener("touchstart", () => {
  jump();
});
const control_btn = document.querySelector(".ctrlbtn");
document.addEventListener("touchend", (e) => {
  ball.vx = 0;
  ball.vy = 0;
});
const theresetbtn = document.querySelector("#theresetbtn");
theresetbtn.addEventListener("click", () => {
  window.location.reload();
});
control_btn.addEventListener("touchstart", () => {});
const gameLoop = () => {
  update();
  render();
  requestAnimationFrame(gameLoop);
};
requestAnimationFrame(gameLoop);
