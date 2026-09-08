let display = document.getElementById('display');
let sound = document.getElementById('clickSound');
let keyboard = document.getElementById('keyboard');

function press(val) {
  playSound();
  display.value += val;
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
    display.value = eval(exp);
  } catch {
    display.value = "Error";
  }
}

function clearDisplay() {
  playSound();
  display.value = '';
}

function backspace() {
  playSound();
  display.value = display.value.slice(0, -1);
}

function playSound() {
  sound.currentTime = 0;
  sound.play();
}

document.getElementById('themeUpload').addEventListener('change', function(e){
  let file = e.target.files[0];
  if(file){
    let reader = new FileReader();
    reader.onload = function(event){
      keyboard.style.backgroundImage = `url(${event.target.result})`;
    }
    reader.readAsDataURL(file);
  }
});

document.getElementById('resetTheme').onclick = function(){
  keyboard.style.backgroundImage = "url('https://i.ibb.co/N2yR2ZQ/pro-keyboard.jpg')"; /* RESET TO NEW DEFAULT */
}