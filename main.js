const game = document.querySelector(".gamecard");
const gamemenu = document.querySelector(".menu");
const winmenu = document.querySelector(".gamewinmenu");
const wintext = document.createElement("div");
wintext.classList.add("wintext");
winmenu.insertBefore(wintext, winmenu.firstChild);
const gravity = 0.4;
const helpbtn = document.querySelector("#helpbtn");
const helpmenu = document.querySelector(".helpmenu");

helpbtn.addEventListener("click", () => {
  helpmenu.style.display = "flex";
});
const helpclosebtn = document.querySelector("#helpclosebtn");
helpclosebtn.addEventListener("click", () => {
  helpmenu.style.display = "none";
});
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
let current_lvl = 0;
let score = 0;
let leveldisp = 1 + "/3";
//let spikehit = false;

const levels = [
  {
    level_width: 800,
    ground: { x: 0, y: 420, width: 800, height: 80, color: "#f8d7da" },
    windoor: { x: 720, y: 380, width: 60, height: 40, color: "purple" },
    platforms: [
      { x: 150, y: 330, width: 100, height: 60, color: "#aed6f1" },
      { x: 310, y: 280, width: 100, height: 60, color: "#aed6f1" },
      { x: 470, y: 330, width: 100, height: 60, color: "#aed6f1" },
      { x: 590, y: 270, width: 90, height: 60, color: "#aed6f1" },
    ],
    coins: [
      { x: 190, y: 295, isCollected: false, height: 20, width: 20 },
      { x: 350, y: 245, isCollected: false, height: 20, width: 20 },
      { x: 510, y: 295, isCollected: false, height: 20, width: 20 },
      { x: 615, y: 235, isCollected: false, height: 20, width: 20 },
      { x: 740, y: 360, isCollected: false, height: 20, width: 20 },
    ],
    spikes: [
      { x: 400, y: 400, width: 20, height: 20 },
      { x: 420, y: 400, width: 20, height: 20 },
    ],
  },
  {
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
  },
];

let game_screen_width =
  window.innerWidth < levels[current_lvl].level_width
    ? window.innerWidth
    : levels[current_lvl].level_width;
const game_screen = { width: 500, height: 500 };
const game_world = document.createElement("div");
game_world.style.height = "500px";
game_world.style.position = "absolute";
game_world.style.backgroundColor = "skyblue";
game.appendChild(game_world);

const balldiv = document.createElement("div");
balldiv.style.left = ball.x + "px";
balldiv.style.top = ball.y + "px";
balldiv.style.color = ball.color;
balldiv.style.width = "40px";
balldiv.style.height = "40px";
balldiv.style.position = "absolute";
balldiv.style.backgroundColor = ball.color;
balldiv.style.borderRadius = "50%";
game_world.appendChild(balldiv);

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
game_world.appendChild(windoor);

const renderlvl = () => {
  ball.x = 30;
  ball.y = 300;
  ball.vx = 0;
  ball.vy = 0;
  ball.onground = false;
  camerax = 0;
  score = 0;
  game_screen_width = Math.min(
    window.innerWidth,
    levels[current_lvl].level_width,
  );
  levels[current_lvl].coins.forEach((c) => (c.isCollected = false));
  // wipe the old level's DOM (keep the persistent ball + windoor elements)
  Array.from(game_world.children).forEach((child) => {
    if (child !== balldiv && child !== windoor) child.remove();
  });
  game_world.style.width = levels[current_lvl].level_width + "px";

  //platforms dealing!!
  levels[current_lvl].platforms.forEach((platform) => {
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
  grounddiv.style.left = levels[current_lvl].ground.x + "px";
  grounddiv.style.top = levels[current_lvl].ground.y + "px";
  grounddiv.style.width = levels[current_lvl].ground.width + "px";
  grounddiv.style.height = levels[current_lvl].ground.height + "px";

  game_world.appendChild(grounddiv);
  //with coins
  levels[current_lvl].coins.forEach((coin) => {
    const coindiv = document.createElement("div");
    coindiv.classList.add("coin");
    coindiv.style.left = coin.x + "px";
    coindiv.style.top = coin.y + "px";
    game_world.appendChild(coindiv);
    coin.element = coindiv;
    console.log(coindiv);
  });

  // const isOnground = (ball) => {
  //   // console.log(ball.y);
  //   if (ball.y == level.ground.y - ball.height) {
  //     ball.y = level.ground.y - ball.height;
  //     ball.onground = true;
  //   }
  // };
  levels[current_lvl].spikes.forEach((spike) => {
    const spikesdiv = document.createElement("div");
    spikesdiv.classList.add("spike");
    spikesdiv.style.left = spike.x + "px";
    spikesdiv.style.top = spike.y + "px";
    spikesdiv.style.width = spike.width + "px";
    spikesdiv.style.height = spike.height + "px";
    game_world.appendChild(spikesdiv);
    spike.element = spikesdiv;
  });
  // win door on top
  windoor.style.left = levels[current_lvl].windoor.x + "px";
  windoor.style.top = levels[current_lvl].windoor.y + "px";
  windoor.style.width = levels[current_lvl].windoor.width + "px";
  windoor.style.height = levels[current_lvl].windoor.height + "px";
  windoor.style.backgroundColor = levels[current_lvl].windoor.color;
  game_world.appendChild(windoor);

  leveldisp = current_lvl + 1 + "/" + levels.length;
};
renderlvl();
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
  levels[current_lvl].coins.forEach((coin) => {
    if (rectangleOverlaps(ball, coin) && !coin.isCollected) {
      console.log(coin.isCollected);
      coin.isCollected = true;
      console.log("coin is", coin);
      coin.element.style.display = "none";
      score++;
    }
  });
};
const ballhitSpike = () => {
  levels[current_lvl].spikes.forEach((spike) => {
    if (rectangleOverlaps(ball, spike)) {
      ball.x = 0;
      ball.y = 400;
      ball.vx = 0;
      ball.vy = 0;
      levels[current_lvl].coins.forEach((coin) => {
        coin.isCollected = false;
        coin.element.style.display = "block";
      });
      score = 0;
    }
  });
};

const ballhitwindoor = () => {
  if (rectangleOverlaps(ball, levels[current_lvl].windoor)) {
    ball.vx = 0;
    ball.vy = 0;
    // nudge past the door (kept numeric!) so this doesn't re-fire each frame
    ball.x =
      levels[current_lvl].windoor.x + levels[current_lvl].windoor.width + 5;

    let lastlvl = current_lvl + 1;
    if (lastlvl >= levels.length) {
      wintext.innerHTML = "YOU WIN!<br>your score is " + score;
      thenextbtn.style.display = "none";
      winmenu.style.display = "flex";
    } else {
      wintext.innerHTML = "YOU WIN!<br>your score is " + score;
      thenextbtn.style.display = " ";
      winmenu.style.display = "flex";
    }
  }
};

//check x axis collision to adjust position
const checkxaxis = () => {
  ball.x += ball.vx;
  levels[current_lvl].platforms.forEach((platform) => {
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
  if (ball.y > levels[current_lvl].ground.y - ball.height) {
    ball.y = levels[current_lvl].ground.y - ball.height;
    ball.vy = -ball.vy * 0.4;
    ball.onground = true;
  }
  levels[current_lvl].platforms.forEach((platform) => {
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
  if (ball.x + ball.width > levels[current_lvl].level_width) {
    ball.x = levels[current_lvl].level_width - ball.width;
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
  camerax = Math.min(
    camerax,
    levels[current_lvl].level_width - game_screen_width,
  );
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
  // When the level is narrower than the viewport, center it.
  // For wide levels, the offset is 0 and behavior is unchanged.
  const centerOffset = Math.max(
    0,
    (window.innerWidth - levels[current_lvl].level_width) / 2,
  );
  game_world.style.left = centerOffset - camerax + "px";

  scoredisplay.textContent = "Score: " + score;
  leveldisplay.textContent = "Level: " + leveldisp;
  if (rectangleOverlaps(ball, levels[current_lvl].windoor)) {
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
const thenextbtn = document.querySelector("#thenextbtn");
thenextbtn.addEventListener("click", () => {
  if (current_lvl < levels.length - 1) {
    current_lvl++;
    renderlvl(); // <- this is what makes the transition work
    winmenu.style.display = "none";
  } else {
  }
});

const gameLoop = () => {
  update();
  render();
  requestAnimationFrame(gameLoop);
};
requestAnimationFrame(gameLoop);
