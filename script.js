let display = document.getElementById('display');
let sound = document.getElementById('clickSound');
let keyboard = document.getElementById('keyboard');

// PAGE LOAD ANIMATION
gsap.from("#calc", {opacity: 0, y: 50, duration: 0.8, ease: "power3.out"});

function press(val) {
  playSound();
  display.value += val;

  // BUTTON PRESS BOUNCE
  gsap.to(event.target, {scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.out"})
}

function calculate() {
  playSound();
  try {
    let exp = display.value
  .replace(/sin\(/g, 'Math.sin(Math.PI/180*')
  .replace(/cos\(/g, 'Math.cos(Math.PI/180*')
  .replace(/tan\(/g, 'Math.tan(Math.PI/180*')
  .replace(/log\(/g, 'Math.log10(')
  .replace(/sqrt\(/g, 'Math.sqrt(')
  .replace(/pi/g, 'Math.PI')
  .replace(/e/g, 'Math.E')
  .replace(/\^/g, '**');
    let open = (exp.match(/\(/g)||[]).length;
    let close = (exp.match(/\)/g)||[]).length;
    exp += ')'.repeat(open-close);
    let result = eval(exp);
    
    // NUMBER COUNTING ANIMATION
    gsap.fromTo("#display", 
      {value: 0},
      {value: result, duration: 0.5, ease: "power1.out", snap: {value: 0.01},
       onUpdate: function(){ display.value = this.targets()[0].value.toFixed(2) }
      }
    )
    // RESULT SLIDE-IN
    gsap.from("#display", {y: 15, opacity: 0, duration: 0.4, ease: "back.out(1.7)"})

  } catch {
    display.value = "Error";
    // ERROR SHAKE ANIMATION
    gsap.to("#display", {x: [-8, 8, -8, 8, 0], duration: 0.4})
  }
}

function clearDisplay() {
  playSound();
  display.value = '';
  gsap.to("#display", {scale: 0.95, duration: 0.1, yoyo: true, repeat: 1})
}

function backspace() {
  playSound();
  display.value = display.value.slice(0, -1);
}

function playSound() {
  sound.currentTime = 0;
  sound.play();
}

// BUTTON HOVER GLOW EFFECT
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, {boxShadow: "0 0 20px #00f2ff", backgroundColor: "rgba(120,120,120,0.7)", duration: 0.3})
  })
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {boxShadow: "0 0 0px #00f2ff", backgroundColor: "rgba(80,80,80,0.5)", duration: 0.3})
  })
})

document.getElementById('themeUpload').addEventListener('change', function(e){
  let file = e.target.files[0];
  if(file){
    let reader = new FileReader();
    reader.onload = function(event){
      // THEME FADE ANIMATION
      gsap.to("#keyboard", {backgroundImage: `url(${event.target.result})`, duration: 0.6, ease: "power2.inOut"})
    }
    reader.readAsDataURL(file);
  }
});

document.getElementById('resetTheme').onclick = function(){
  // RESET THEME WITH ANIMATION
  gsap.to("#keyboard", {backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1170')", duration: 0.6, ease: "power2.inOut"})
}
