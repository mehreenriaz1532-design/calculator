const display = document.getElementById('display');
const clickSound = document.getElementById('clickSound');
const themeUpload = document.getElementById('themeUpload');
const resetTheme = document.getElementById('resetTheme');
const keyboard = document.getElementById('keyboard');

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function press(val) {
  playSound();
  display.value += val;
  gsap.to(event.target, {scale: 0.9, duration: 0.1, yoyo: true, repeat: 1})
}

function calculate() {
  playSound();
  try {
    let expr = display.value
     .replace(/sin\(/g, 'Math.sin(')
     .replace(/cos\(/g, 'Math.cos(')
     .replace(/tan\(/g, 'Math.tan(')
     .replace(/log\(/g, 'Math.log10(')
     .replace(/sqrt\(/g, 'Math.sqrt(')
     .replace(/pi/g, 'Math.PI')
     .replace(/e/g, 'Math.E')
     .replace(/\^/g, '**');
    let result = eval(expr);
    animateValue(0, result, 500);
  } catch {
    display.value = 'Error';
  }
}

function animateValue(start, end, duration) {
  let obj = {val: start};
  gsap.to(obj, {
    val: end,
    duration: duration/1000,
    ease: "power1.out",
    onUpdate: () => { display.value = obj.val.toFixed(4); }
  })
}

function clearDisplay() { display.value = ''; playSound(); }
function backspace() { display.value = display.value.slice(0,-1); playSound(); }

themeUpload.onchange = e => {
  const file = e.target.files[0];
  if(file) {
    const url = URL.createObjectURL(file);
    keyboard.style.background = `url(${url}) no-repeat center/cover`;
  }
}
resetTheme.onclick = () => {
  keyboard.style.background = `url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1170') no-repeat center/cover`;
}
