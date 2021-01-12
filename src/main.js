const N = 5;
const RADIUS = 30;
const INSET = 2.5;

const stars = [
  { x: 100, y: 100, color: "red" },
  { x: 500, y: 100, color: "blue" },
  { x: 100, y: 500, color: "green" },
  { x: 500, y: 500, color: "yellow" },
  { x: 300, y: 300, color: "black" },
]

function drawStar(ctx, { x, y, color }) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / N);
  ctx.moveTo(0, 0 - RADIUS);

  for (let i = 0; i < N; i++) {
    ctx.rotate(Math.PI / N);
    ctx.lineTo(0, 0 - (RADIUS*2.5));
    ctx.rotate(Math.PI / N);
    ctx.lineTo(0, 0 - RADIUS);
  }

  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function fillCanvas(ctx, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 600, 600);
  ctx.restore();
}

function onClick(canvas1, ctx1, ctx2) {
  return function (e) {
    const mousePos = {
      x: e.clientX - canvas1.offsetLeft,
      y: e.clientY - canvas1.offsetTop,
    };
  
    const pixel = ctx1.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    fillCanvas(ctx2, color);
  }
}

function main() {
  const canvas1 = document.querySelector('.first-canvas');
  const ctx1 = canvas1.getContext('2d');
  const canvas2 = document.querySelector('.second-canvas');
  const ctx2 = canvas2.getContext('2d');

  fillCanvas(ctx1, 'white');
  stars.forEach((star) => drawStar(ctx1, star));
  canvas1.addEventListener('click', onClick(canvas1, ctx1, ctx2));
}

document.addEventListener("DOMContentLoaded", main);
