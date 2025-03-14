// wave animation

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let resolution = window.devicePixelRatio || 1;

let waves = [];
let resized = false;

let vw, vh;
resizeCanvas();

let wave1 = createWave(context, {
  amplitude: 50,
  duration: 4,
  fillStyle: "rgba(43, 101, 236,0.8)",
  frequency: 2.5,
  width: vw,
  height: vh,
  segments: 100,
  waveHeight: vh * 0.25
});

let wave2 = createWave(context, {
  amplitude: 100,
  duration: 2,
  fillStyle: "rgba(13, 152, 186,0.7)",
  frequency: 1.5,
  width: vw,
  height: vh,
  segments: 100,
  waveHeight: vh * 0.25
});

waves.push(wave1, wave2);

gsap.to(waves, {
  duration: 10,
  waveHeight: vh / 2,
  ease: "sine.inOut",
  repeat: -1,
  repeatDelay: 1,
  yoyo: true
});

gsap.to(wave1, {
  duration: 6,
  amplitude: 10,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true
});

gsap.to(wave2, {
  duration: 7,
  amplitude: 25,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true
});

window.addEventListener("resize", () => {
  resized = true;
});

gsap.ticker.add(update);

function update() {
  
  let len = waves.length;
  
  if (resized) {
    
    resizeCanvas();
    
    for (let i = 0; i < len; i++) {
      waves[i].resize(vw, vh);
    }
    
    resized = false;
  }
  
  context.clearRect(0, 0, vw, vh);  
  context.globalCompositeOperation = "soft-light";
  
  for (let i = 0; i < len; i++) {
    waves[i].draw();
  }
}

function createWave(context, options) {
  
  options = options || {};
  
  // API
  let wave = {
    
    // Properties
    amplitude: options.amplitude || 200,
    context: context,
    curviness: options.curviness || 0.75,
    duration: options.duration || 2,
    fillStyle: options.fillStyle || "rgba(33,150,243,1)",
    frequency: options.frequency || 4,
    height: options.height || 600,
    points: [],
    segments: options.segments || 100,
    tweens: [],
    waveHeight: options.waveHeight || 300,
    width: options.width || 800,
    x: options.x || 0,
    y: options.y || 0,
    
    // Methods
    init: init,
    resize: resize,
    draw: draw,
    kill: kill
  };
  
  init();
    
  function kill() {
    
    let tweens = wave.tweens;
    let len = tweens.length;
    
    for (let i = 0; i < len; i++) {
      tweens[i].kill();
    }
    
    tweens.length = 0;
    wave.points.length = 0;
  }
  
  function init() {
    
    kill();
    
    let segments = wave.segments;
    let interval = wave.width / segments;
    
    for (let i = 0; i <= segments; i++) {
      
      let norm = i / segments;
      let point = {
        x: wave.x + i * interval,
        y: 1
      };
      
      let tween = gsap.to(point, {
        duration: wave.duration,
        y: -1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      }).progress(norm * wave.frequency)
      
      wave.tweens.push(tween);
      wave.points.push(point);
    }    
  }
  
  function draw() {
    
    let points = wave.points;
    let len = points.length;
    
    let startY = wave.waveHeight;
    let height = wave.amplitude / 2;
    
    context.beginPath();    
    context.moveTo(points[0].x, startY + points[0].y * height);
    
    for (let i = 1; i < len; i++) {
      
      let point = points[i];
      context.lineTo(point.x, startY + point.y * height);
    }
    
    context.lineTo(wave.x + wave.width, wave.y + wave.height);
    context.lineTo(wave.x, wave.y + wave.height);
    context.closePath();
    context.fillStyle = wave.fillStyle;
    context.fill();
  }
  
  function resize(width, height) {
    
    wave.width = width;
    wave.height = height;
    
    let points = wave.points;
    let len = points.length;
    let interval = wave.width / wave.segments;
    
    for (let i = 0; i < len; i++) {
      
      let point = points[i];
      point.x = wave.x + i * interval;
    }
  }
  
  return wave;
}

function resizeCanvas() {
  
  vw = window.innerWidth;
  vh = window.innerHeight;
    
  canvas.width  = vw * resolution;
  canvas.height = vh * resolution;
  
  canvas.style.width  = vw + "px";
  canvas.style.height = vh + "px";
  
  context.scale(resolution, resolution);
}


  // Days Until Maui

  const mauiVacation = "2025-04-26";
  const daysUntilMaui = getDaysUntilEvent(mauiVacation);
  
  const mauiElem = document.querySelector('.daysUntilMaui');
  
  mauiElem.textContent = daysUntilMaui;
  mauiElem.setAttribute("datetime", mauiVacation);

    // Days of Meditation Streak

const startDate = "2025-01-01";
const daysOfMeditation = getDayStreak(startDate);
console.log( daysOfMeditation );

const elem = document.querySelector('.streakOfDays');


elem.textContent = daysOfMeditation;
elem.setAttribute("datetime", daysOfMeditation);

// Maui fun facts

const mauiFunFacts = [
  "Maui is the second largest Hawaiian island with an area of 727 square miles.",
  "Haleakalā, Maui's highest peak, stands at 10,023 feet above sea level.",
  "Maui was named after the demigod Māui in Hawaiian mythology.",
  "The Road to Hana features over 600 curves and 50+ one-lane bridges.",
  "Maui is home to more than 30 beaches with white, black, and red sand.",
  "The Banyan Tree in Lahaina was planted in 1873 and covers nearly an acre.",
  "Molokini is a crescent-shaped, partially submerged volcanic crater off Maui's shore.",
  "Maui is visible from the Big Island, Molokai, Lanai, and Kahoolawe.",
  "The island has over 80 beaches stretching more than 30 miles.",
  "Maui's Hana Highway was first constructed in 1926.",
  "The island experiences 10 of the world's 14 climate zones.",
  "Maui is sometimes called the 'Valley Isle' due to the large valley between its volcanoes.",
  "Maui's Kaanapali Beach was once named America's Best Beach.",
  "Maui's official flower is the pink lokelani (damask rose).",
  "The humpback whale sanctuary off Maui is one of the world's best whale watching spots."
];

const maxFacts = mauiFunFacts.length;
const randFunFacts = Math.floor(Math.random() * maxFacts);

const feature5 = document.querySelector(".feature-5");

feature5.textContent = mauiFunFacts[randFunFacts];

