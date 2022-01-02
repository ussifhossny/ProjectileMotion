const g = 9.81;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const vel = document.getElementById("vel");
const ang = document.getElementById("ang");
let Angle,
  timer,
  velocity,
  x = 40,
  y = 460,
  radius = 5;

let frameCount = 0;
let v0x = velocity * Math.cos((Angle * Math.PI) / 180);
let v0y = velocity * Math.sin((Angle * Math.PI) / 180);
let startX = x;
let startY = y;

const make_base = () => {
  base_image = new Image(10, 10);
  base_image.src = "pall.png";
  base_image.onload = function () {
    ctx.drawImage(base_image, 0, 460);
  };
};
make_base();

const init = () => {
  velocity = vel.value;
  Angle = ang.value;
  frameCount = 0;
  v0x = velocity * Math.cos((Angle * Math.PI) / 180);
  v0y = velocity * Math.sin((Angle * Math.PI) / 180);
};

const draw = () => {
  ctx.save();
  ctx.restore();
  if (y < canvasHeight - radius + 1 && x < canvasWidth - radius + 1) {
    y = startY - (v0y * frameCount - (1 / 2) * g * Math.pow(frameCount, 2));
    x = startX + v0x * frameCount;
  } else {
    clearInterval(timer);
  }
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "blue";
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
  frameCount += 0.15;
};

const checkS = () => {
  if (isNaN(vel.value) || vel.value === "") {
    alert("velocity: " + vel.value + "not a number");
    return 0;
  }
  if (isNaN(ang.value) || ang.value === "") {
    alert("Angle: " + ang.value + "not a number");
    return 0;
  }
  return 1;
};

const reset = () => {
  clearInterval(timer);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  make_base();
  x = 40;
  y = 460;
  startX = x;
  startY = y;
};

const start = () => {
  reset();
  init();
  if (checkS()) timer = setInterval(draw, 10);
};

const checkNumber = (val) => {
  if (isNaN(val)) alert("Please enter a number.");
};