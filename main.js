const textColor = document.getElementById("text-color");
const bgColor = document.getElementById("bg-color");
const fontSize = document.getElementById("font-size");
const myCanvas = document.getElementById("myCanvas");
const clearBtn = document.getElementById("clear-btn");
const saveBtn = document.getElementById("save-btn");
const retrieveBtn = document.getElementById("retrieve-btn");
const ctx = myCanvas.getContext("2d");
let isDrawing = false;
let lastOffSetX, lastOffSetY;

textColor.addEventListener("change", (e) => {
  // ctx.fillStyle = e.target.value;
  ctx.strokeStyle = e.target.value;
});

bgColor.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, 1000, 500);
});

fontSize.addEventListener('change', (e) => {
  ctx.lineWidth = parseInt(e.target.value);
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
});

saveBtn.addEventListener("click", () => {
  localStorage.setItem("canvas-contents", myCanvas.toDataURL());
  let link = document.createElement("a");
  link.download = "my-canvas.png";
  link.href = myCanvas.toDataURL();
  link.click();
});

retrieveBtn.addEventListener("click", () => {
  let savedImg = localStorage.getItem("canvas-contents");
  if (savedImg) {
    let img = new Image();
    img.src = savedImg;
    ctx.drawImage(img, 0, 0);
  }
});

myCanvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastOffSetX = e.offsetX;
  lastOffSetY = e.offsetY;
});

myCanvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastOffSetX, lastOffSetY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    lastOffSetX = e.offsetX;
    lastOffSetY = e.offsetY;
  }
});
myCanvas.addEventListener("mouseleave", (e) => {
  isDrawing = false;
});

myCanvas.addEventListener("mouseup", (e) => {
  isDrawing = false;
});