import kaplay from "kaplay";
const k = kaplay({
  background: [135, 62, 132],
  burp:true
});
k.loadBean();
k.setGravity(2000)
k.loadSprite("tga","/tga.png")
const player = k.add([
  k.sprite("tga", {

    flipX: true, // flip the sprite in the X axis
    flipY: false, // flip the sprite in the Y axis
    anim: "crack", // the animation to play at the start
  }),
   k.pos(k.center()),
   k.area(),
   k.body(),
   k.offscreen(),
   k.health(4)
  
  ]);

  
  
  player.onKeyPress("space",()=>{
    if(player.isGrounded()){
      player.jumpForce=1300;
      player.jump()
     

    }
  })
  player.onExitScreen(()=>{
    k.go("gameover")
  })
 k.scene("gameover",()=>{
   k.add([k.text("Game Over!!"),k.pos(k.center())])
   k.add([k.text(`Your Score: ${score}`)])
   burp()
 })
 player.onCollide("tree", () => {
  addKaboom(player.pos);
 
  score-=2;
  shake();
});
player.onKeyPress("right",()=>{
  player.moveBy(30,0)
  player.flipX
})
player.onKeyPress("left",()=>{
  player.moveBy(0,30)
  player.flipX
})
  k.add([k.rect(k.width(),300),k.pos(0,500),k.area(),k.outline(3),k.body({isStatic:true})])
  let score = 0;
const scoreLabel = add([text(score), pos(24, 24)]);
onUpdate(() => {
 
});
let counter = 0;
const counterUI = k.add([k.text("0")])
  const spawnBlocks=()=>{
    counter++;
    score++;
    player.hurt(1)

    scoreLabel.text = score;
    counterUI.text=counter.toString();
    const speed = [200,300,400,500,800];
    const currentSpeed = speed[Math.floor(Math.random()*speed.length)]
  
    k.add([k.scale(rand(1,2)),k.circle(48, rand(24, 64)),k.area(),k.outline(2), k.body(),k.pos(1000,500),k.move(k.vec2(-1,0),currentSpeed), "tree"])
    wait(rand(0.5, 1.5), () => {
      spawnBlocks();
  });
  }
  spawnBlocks()
