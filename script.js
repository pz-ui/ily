// Khai báo các biến ở phạm vi toàn cục để dễ truy cập
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle-btn");
const musicIcon = musicBtn.querySelector(".icon");
const continueBtn = document.getElementById("continue-btn");
const introOverlay = document.getElementById("intro-overlay");
const mainContent = document.getElementById("main-content");

// Lắng nghe sự kiện click vào nút "Tiếp tục"
continueBtn.addEventListener("click", () => {
  // Thêm class 'fade-out' để tạo hiệu ứng mờ dần
  introOverlay.classList.add("fade-out");

  // Chờ hiệu ứng mờ dần hoàn tất (0.5s) rồi mới bắt đầu chương trình
  setTimeout(() => {
    introOverlay.style.display = "none";
    mainContent.style.display = "block"; // Hiển thị nội dung chính
    startProgram();
  }, 500);
});

function startProgram() {
  // Thử tự động phát nhạc ngay khi chương trình bắt đầu
  music.play().then(() => {
    musicIcon.classList.add("playing");
  }).catch(e => {
    console.log("Autoplay was prevented. User interaction required.");
    window.addEventListener("click", () => {
      music.play().then(() => {
        musicIcon.classList.add("playing");
      }).catch(e => console.log("Music play blocked after click:", e));
    }, { once: true });
  });

  // Thêm sự kiện click cho nút bật/tắt nhạc
  musicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      musicIcon.classList.add("playing");
      musicIcon.classList.remove("paused");
    } else {
      music.pause();
      musicIcon.classList.remove("playing");
      musicIcon.classList.add("paused");
    }
  });

  // Di chuyển tất cả các đoạn code còn lại vào trong hàm này
  const messages = [
    "=}}",
    ":v",
    ":))",
    "=))",
    "^_^",
    ":>",
    "'-'",
    "(^.^)"
  ];
  const fallingTexts = [];

  function createFallingText() {
    const text = messages[Math.floor(Math.random() * messages.length)];
    const fontSize = Math.random() * 15 + 15;

    ctx.font = `bold ${fontSize}px Open Sans`;
    const textWidth = ctx.measureText(text).width;

    const x = Math.random() * (width - textWidth); 

    fallingTexts.push({
      text,
      x,
      y: -10,
      speed: Math.random() * 2 + 2,
      alpha: 1,
      fontSize,
      hue: Math.random() * 360
    });
  }


  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const stars = [];
  const heartStars = [];
  const meteors = [];

  let mouseX = width / 2;
  let mouseY = height / 2;
  let heartBeat = 1;
  let heartScale = Math.min(width, height) * 0.015;

  function heartShape(t, scale = 1) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    return { x: x * scale, y: y * scale };
  }

  function createHeartStars(count = 1600) {
    const centerX = width / 2;
    const centerY = height / 2 + 20;
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const heart = heartShape(t, heartScale);
      const offsetX = (Math.random() - 0.5) * 15;
      const offsetY = (Math.random() - 0.5) * 15;

      const targetX = centerX + heart.x + offsetX;
      const targetY = centerY + heart.y + offsetY;

      heartStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX,
        targetY,
        originalX: targetX,
        originalY: targetY,
        size: Math.random() * 3 + 1,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        brightness: Math.random() * 0.5 + 0.5,
        hue: Math.random() * 60 + 300,
        mode: 'flying'
      });
    }
  }


  function createBackgroundStars() {
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.01 + 0.005,
        brightness: Math.random() * 0.3 + 0.2
      });
    }
  }

  function createMeteor() {
    meteors.push({
      x: Math.random() * width,
      y: -50,
      length: Math.random() * 80 + 50,
      speed: Math.random() * 6 + 6,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
      alpha: 1
    });
  }

  setInterval(() => {
    if (Math.random() < 0.8) createFallingText();
  }, 2000);


  function animate() {
    ctx.clearRect(0, 0, width, height);
    heartBeat += 0.1;

    stars.forEach(star => {
      star.twinkle += star.twinkleSpeed;
      const flicker = Math.random() < 0.005 ? 1 : 0;
      const baseOpacity = star.brightness * (0.4 + 0.6 * Math.sin(star.twinkle));
      const opacity = Math.min(1, baseOpacity + flicker);

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = flicker ? 20 : 0;
      ctx.shadowColor = flicker ? '#fff' : 'transparent';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    meteors.forEach((m, i) => {
      const dx = Math.cos(m.angle) * m.length;
      const dy = Math.sin(m.angle) * m.length;
      ctx.save();
      ctx.globalAlpha = m.alpha;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x - dx, m.y - dy);
      ctx.stroke();
      ctx.restore();
      m.x += Math.cos(m.angle) * m.speed;
      m.y += Math.sin(m.angle) * m.speed;
      m.alpha -= 0.005;
      if (m.alpha <= 0) meteors.splice(i, 1);
    });

    fallingTexts.forEach((t, i) => {
      ctx.save();
      ctx.font = `bold ${t.fontSize}px Open Sans`;
      ctx.fillStyle = `hsla(${t.hue}, 100%, 85%, ${t.alpha})`;
      ctx.shadowBlur = 5;
      ctx.shadowColor = `hsla(${t.hue}, 100%, 70%, ${t.alpha})`;
      ctx.fillText(t.text, t.x, t.y);
      ctx.restore();

      t.y += t.speed;
      t.alpha -= 0.002;

      if (t.y > height + 30 || t.alpha <= 0) {
        fallingTexts.splice(i, 1);
      }
    });

    heartStars.forEach((star, i) => {
      star.twinkle += star.twinkleSpeed;
      const centerX = width / 2;
      const centerY = height / 2 + 20;

      if (star.mode === 'flying') {
        const dx = star.targetX - star.x;
        const dy = star.targetY - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = 0.07;
        if (dist > 1) {
          star.x += dx * speed;
          star.y += dy * speed;
        } else {
          star.mode = 'heart';
        }
      } 
      else {
        const deltaX = star.originalX - centerX;
        const deltaY = star.originalY - centerY;
        const beatScale = 1 + Math.sin(heartBeat) * 0.05;
        star.x = centerX + deltaX * beatScale;
        star.y = centerY + deltaY * beatScale;

        const distanceToMouse = Math.hypot(mouseX - star.x, mouseY - star.y);
        let interactionForce = 0;
        if (distanceToMouse < 100) {
          interactionForce = (100 - distanceToMouse) / 100;
          const angle = Math.atan2(star.y - mouseY, star.x - mouseX);
          star.x += Math.cos(angle) * interactionForce * 10;
          star.y += Math.sin(angle) * interactionForce * 10;
        }
      }

      const twinkleOpacity = star.brightness * (0.3 + 0.7 * Math.sin(star.twinkle));
      ctx.save();
      ctx.globalAlpha = twinkleOpacity;
      ctx.fillStyle = `hsl(${star.hue}, 70%, 80%)`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsl(${star.hue}, 70%, 60%)`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }

  canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  canvas.addEventListener('click', (e) => {
    const centerX = width / 2;
    const centerY = height / 2 + 20;
    heartScale *= 1.015;
    heartStars.forEach((star, i) => {
      if (star.mode === 'heart') {
        const t = (i / heartStars.length) * Math.PI * 2;
        const heart = heartShape(t, heartScale);
        const offsetX = (Math.random() - 0.5) * 15;
        const offsetY = (Math.random() - 0.5) * 15;
        star.originalX = centerX + heart.x + offsetX;
        star.originalY = centerY + heart.y + offsetY;
      }
    });

    for (let i = 0; i < 10; i++) {
      const t = Math.random() * Math.PI * 2;
      const heart = heartShape(t, heartScale);
      const targetX = centerX + heart.x;
      const targetY = centerY + heart.y;

      heartStars.push({
        x: e.clientX + (Math.random() - 0.5) * 50,
        y: e.clientY + (Math.random() - 0.5) * 50,
        targetX,
        targetY,
        originalX: targetX,
        originalY: targetY,
        size: Math.random() * 3 + 2,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.03 + 0.02,
        brightness: Math.random() * 0.8 + 0.6,
        hue: Math.random() * 60 + 300,
        mode: 'flying'
      });
    }
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    heartScale = Math.min(width, height) * 0.015;
    heartStars.length = 0;
    stars.length = 0;
    createHeartStars();
    createBackgroundStars();
  });

  setInterval(() => { if (Math.random() < 0.7) createMeteor(); }, 3000);

  createHeartStars();
  createBackgroundStars();
  animate();
}