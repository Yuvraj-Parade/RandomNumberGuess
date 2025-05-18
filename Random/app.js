


    let secretNumber;
    let attempts;
    const guessInput = document.getElementById('guess');
    const checkBtn = document.getElementById('checkBtn');
    const newGameBtn = document.getElementById('newGameBtn');
    const attemptsCount = document.getElementById('attemptsCount');
    const guessHistory = document.getElementById('guessHistory');
    const messageEl = document.getElementById('message');
    const confettiCanvas = document.getElementById('confetti-canvas');
    
   
    function Game() {
      secretNumber = Math.floor(Math.random() * 100) + 1;
      attempts = 0;
      attemptsCount.textContent = attempts;
      guessHistory.innerHTML = '';
      messageEl.textContent = '';
      guessInput.value = '';
    }
    
    Game();
    
    
    checkBtn.addEventListener('click', function() {
      const uGuess = Number(guessInput.value);
      
      
      if (!uGuess || uGuess < 1 || uGuess > 100) {
        messageEl.style.color = 'red';
        messageEl.textContent = 'Warning: Please enter a number between 1 and 100.';
        guessInput.value = '';
        guessInput.focus();
        return;
      }
      
      attempts++;
      attemptsCount.textContent = attempts;
      
      
      const li = document.createElement('li');
      li.textContent = uGuess;
      guessHistory.appendChild(li);
      
    
      if (uGuess === secretNumber) {
        messageEl.style.color = 'green';
        messageEl.textContent = `Congratulations! You guessed correctly in ${attempts} attempt${attempts > 1 ? "s" : ""}.`;
        startConfetti();
      } else if (uGuess < secretNumber) {
        messageEl.style.color = '#333';
        messageEl.textContent = 'Too low! Try again.';
      } else {
        messageEl.style.color = '#333';
        messageEl.textContent = 'Too high! Try again.';
      }
      
      guessInput.value = '';
      guessInput.focus();
    });
    

    newGameBtn.addEventListener('click', function() {
      Game();
      messageEl.style.color = '#333';
      messageEl.textContent = 'New game started! Guess the new number.';
    });
    


    function startConfetti() {
      confettiCanvas.style.display = 'block';
      const ctx = confettiCanvas.getContext('2d');
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
      
      const confettiCount = 150;
      const confetti = [];
      

      for (let i = 0; i < confettiCount; i++) {
        confetti.push({
          x: Math.random() * confettiCanvas.width,
          y: Math.random() * confettiCanvas.height - confettiCanvas.height,
          r: Math.random() * 6 + 2,
          d: Math.random() * confettiCount,
          color: `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 1)`,
          tilt: Math.floor(Math.random() * 10) - 10,
          tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
          tiltAngle: 0
        });
      }
      
      let animationFrame;
      function drawConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confetti.forEach((c, i) => {
          c.tiltAngle += c.tiltAngleIncremental;
          c.y += (Math.cos(0.1 + c.d) + 3 + c.r / 2) / 2;
          c.tilt = Math.sin(c.tiltAngle - i) * 15;
          
          ctx.beginPath();
          ctx.lineWidth = c.r;
          ctx.strokeStyle = c.color;
          ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
          ctx.lineTo(c.x + c.tilt, c.y + c.r * 2);
          ctx.stroke();
        });
        animationFrame = requestAnimationFrame(drawConfetti);
      }
      drawConfetti();
      
      
      setTimeout(() => {
        cancelAnimationFrame(animationFrame);
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiCanvas.style.display = 'none';
      }, 3000);
    }
  



const canvas = document.getElementById('neuroCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const colors = ['#ff007f', '#7f00ff', '#00ffff', '#ff7f00', '#00ff7f'];

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1; 
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.005; 
  }
}

function spawnParticles() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const radius = Math.random() * 5 + 2;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const velocity = {
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2,
  };

  particles.push(new Particle(x, y, radius, color, velocity));
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    if (particle.alpha <= 0) {
      particles.splice(index, 1); 
    } else {
      particle.update();
      particle.draw();
    }
  });

  spawnParticles(); 
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
