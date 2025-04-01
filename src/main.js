let counter = 0;
import kaplay from "kaplay";

const k = kaplay({
  background: [0, 0, 0],
  burp:true
});



//songs loaders 
k.loadSound("backsnd","/backsnd.mp3")
k.loadSound("jumpsnd","/jumpsnd.mp3")
k.loadSound("hurt","/hurt.mp3")
k.loadSound("lose","/lose.wav")
k.loadSound("level2","/level2.mp3")
k.loadSound("victory","/victory.mp3")

//images loader 
k.loadSprite("1st","/1st.png")
k.loadSprite("2nd","/2nd.webp")
 k.loadSprite("3rd","/3rd.png")
 k.loadSprite("4th","/4th.png")
 k.loadSprite("5th","/5th.webp")
 k.loadSprite("sixth","/sixth.png")
 k.loadSprite("upsc","/upsc.jpg")
 k.loadSprite("7th","/7th.jpeg")
 k.loadSprite("8th","/8th.png")

 //background music
const backgroundMusic=play("backsnd", {
  volume: 0.5, // set the volume to 50%
  speed: 1.5, // speed up the sound
  loop: true, // loop the sound
});

if(counter<3){
  k.loadSprite("back1", "/back1.webp").then(() => {
    k.add([
      k.sprite("back1"),
      k.pos(0, 0),
      k.scale(1), // Scale to fit screen
      k.layer("bg"),
    ]);
  });
  k.layers([
    "bg",    // Background layer
    "game",  // Main game objects
  ], "game");
}else{
   k.loadSprite("upsc", "/upsc.jpg").then(() => {
    k.add([
      k.sprite("upsc"),
      k.pos(0, 0),
      k.scale(1), 
      k.layer("bg"),
    ]);
  });
  k.layers([
    "bg",    // Background layer
    "game",  // Main game objects
  ], "game");
}
//character loader
k.loadSprite("tga","/tga.png")
k.loadSprite("images","/images.png")

k.setGravity(2000)//In game gravity
const levels = [1,2,3];//game levels

//player 
const player = k.add([
  k.sprite("tga"),
   k.pos(k.center()),
   k.area(),
   k.body(),
   k.offscreen(),
  ]);

  

  //on pressing some specific keys in keyboard
  player.onKeyPress("space",()=>{
    if(player.isGrounded()){
      play("jumpsnd", {
        volume: 1, // set the volume to 50%
        speed: 1.5, // speed up the sound
        loop:false // loop the sound
      });
      player.jumpForce=1300;
      player.jump()
    }
  })
  //out of view === gameover
  player.onExitScreen(()=>{
    k.go("gameover")
  })
  

 

  //gameover scene
 k.scene("gameover",()=>{
  backgroundMusic.stop();
  play("lose", {
    volume: 2, // set the volume to 50%
    speed: 1, // speed up the sound
    loop:false // loop the sound
  });

  //game over background image
  k.loadSprite("gameover", "/gameover.webp").then(() => {
    k.add([
      k.sprite("gameover"),
      k.center(),
      k.scale(0.7), // Scale to fit screen
      k.layer("bg"),
    ]);
  });
   k.add([k.text(`Your Score: ${score}`),k.pos(5,20)])
   k.add([k.text(`Your Level: ${level?level:"1st"}`),k.pos(5,50)])
   burp()
 })
 //on collision with obstacles
 player.onCollide("tree", () => {
  play("hurt", {
    volume: 2, // set the volume to 50%
    speed: 1.1, // speed up the sound
    loop:false // loop the sound
  });
  addKaboom(player.pos);//kaboom 
  score-=2;//-2 of score
  shake();//shaking of screen
});

//static base rectangle
 const base = k.add([k.rect(k.width(),300),k.color(128,0,128),k.pos(0,500),k.area(),k.outline(3),k.body({isStatic:true})])
 
 //scoreBoard
let score = 0;
const scoreLabel = add([text(), pos(50, 15)]);
 

//counter
const counterUI = k.text("0")



 const spawnBlocks=()=>{ 
   //winner scene 
if(score>30){
  k.go("winner")
}
 
   if(counter<30){
   add([text("level:"+levels[0]),pos(50,50),"firstlev"])
   globalThis.level="1st";
   const sprites1 = ["1st","2nd","3rd"]
    globalThis.obsDisplay=  sprites1[Math.floor(Math.random()*sprites1.length)]
   }else if(counter>30 && counter<80){
    globalThis.level="2nd"
    const sprites2 = ["4th","5th","sixth"]
    globalThis.obsDisplay=  sprites2[Math.floor(Math.random()*sprites2.length)]
    k.destroyAll("firstlev")
    add([text("level:"+levels[1]),pos(50,50),"seclev"])
   }else if(counter>80){
    globalThis.level="3rd"
    const sprites3 = ["7th","8th","upsc"]
    globalThis.obsDisplay=  sprites3[Math.floor(Math.random()*sprites3.length)]
     k.destroyAll("seclev") 
     add([text("level:"+levels[2]),pos(50,50)])
   }
    counter++;
    score++;
    

    scoreLabel.text = `Score:${score}`;
    counterUI.text=counter.toString();
    const speed = [200,300,400,500,800];
    const currentSpeed = speed[Math.floor(Math.random()*speed.length)]
  
    k.add([k.scale(rand(1,3)),k.sprite(`${obsDisplay?obsDisplay:"1st"}`,{width:40,height:40}),k.area(),k.outline(2), k.body(),k.pos(1000,500),k.move(k.vec2(-1,0),currentSpeed), "tree"])

    wait(rand(0.5, 1.5), () => {
      spawnBlocks();
  });
  }
  spawnBlocks()
  k.scene("winner",()=>{
    backgroundMusic.stop()//stops the background music
    play("victory",{
      volume: 2, // set the volume to 200%
      speed: 1, // speed up the sound
      loop:false // loop the sound
    })
    k.loadSprite("winner", "/winner.webp").then(() => {
      k.add([
        k.sprite("winner"),
        k.center(),
        k.scale(2), // Scale to fit screen
        k.layer("bg"),
      ]);
    });
    k.add([k.text(`Your Score: ${score}`),k.pos(5,20)])
  })

  




