let canvas;
let ctx; 
let flowField;
let flowFieldAnimation;
window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate(0); 
}
window.addEventListener('resize', function(){
  cancelAnimationFrame(flowFieldAnimation)
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate(0); 
})
const mouse = {
  x: 0,
  y: 0,
}
window.addEventListener('mousemove', function(e){
  mouse.x = e.x;
  mouse.y = e.y;
})
class FlowFieldEffect{
  #ctx;
  #width;
  #height;
  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#ctx.strokeStyle = 'white';
    this.#ctx.lineWidth = 5;
    this.#width = width;
    this.#height = height;
    this.lastTime = 0;
    this.interval = 1000/60;
    this.timer = 0;
    this.cellSize = 15;
  }
  #drawLine(x, y) {
    const length = 300;
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y);
    this.#ctx.lineTo(x + 5, y + 5);
    this.#ctx.stroke();
  }
  animate(timeStamp) {
    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
    if (this.timer > this.interval) {
      this.#ctx.clearRect(0, 0, this.#width, this.#height);
      for (let y = 0; y < this.#height; y += this.cellSize) {
        for (let x = 0; x < this.#width; x += this.cellSize) {
          this.#drawLine(x, y);
        }
      }
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    
    flowFieldAnimation = requestAnimationFrame(this.animate.bind(this))
  }
}
