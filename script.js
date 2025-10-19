document.addEventListener('DOMContentLoaded', () => {
  typingEffect();
  setupTabs();
  setupScrollTop();
  setupSmoothScroll();
  backgroundAnimation();
  setTimeout(animateSkills, 1000); // đảm bảo thanh kỹ năng khởi động sau khi hero load
});

/* ---- Hiệu ứng gõ chữ ---- */
function typingEffect(){
  const typingElement = document.getElementById('typing');
  const location = document.getElementById('location');

  // Tách ba phần để có thể tô màu highlight cho tên
  const parts = [
    { text: "Xin chào, tôi tên ", class: "" },
    { text: "Trần Thanh Phong", class: "highlight" },
    { text: " - Kĩ sư phần mềm", class: "" }
  ];

  let partIndex = 0;
  let charIndex = 0;
  let spans = [];

  // Tạo trước ba <span> để giữ định dạng và màu sắc
  parts.forEach(p => {
    const span = document.createElement('span');
    if (p.class) span.classList.add(p.class);
    typingElement.appendChild(span);
    spans.push(span);
  });

  function type(){
    if(partIndex < parts.length){
      const part = parts[partIndex];
      const span = spans[partIndex];

      if(charIndex < part.text.length){
        span.textContent += part.text.charAt(charIndex);
        charIndex++;
        setTimeout(type, 65);
      } else {
        partIndex++;
        charIndex = 0;
        setTimeout(type, 150);
      }
    } else {
      // Sau khi gõ xong, hiện dòng địa điểm
      setTimeout(() => location.classList.add('show'), 300);
    }
  }

  type();
}

/* ---- Thanh kỹ năng ---- */
function animateSkills(){
  document.querySelectorAll('.bar-fill').forEach((bar, i) => {
    const val = bar.dataset.value || 70;
    bar.style.width = '0%';
    bar.style.background = 'linear-gradient(90deg,#ff004c,#ff5580)';
    setTimeout(() => {
      bar.style.transition = 'width 1.5s ease-in-out';
      bar.style.width = val + '%';
    }, 300 + i * 200);
  });
}

/* ---- Tabs: Sở thích / Sinh nhật / Chứng nhận ---- */
function setupTabs(){
  const buttons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.info-section');
  buttons.forEach(btn=>{
    btn.addEventListener('click',()=>{
      buttons.forEach(b=>b.classList.remove('active'));
      sections.forEach(s=>s.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.section).classList.add('active');
    });
  });
}

/* ---- Nút “Xem lại từ đầu” ---- */
function setupScrollTop(){
  const btn = document.getElementById('scrollTopBtn');
  if(btn){
    btn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  }
}

/* ---- Hiệu ứng cuộn mượt khi bấm Navbar ---- */
function setupSmoothScroll(){
  const navLinks = document.querySelectorAll('.top-nav nav a');
  navLinks.forEach(link=>{
    link.addEventListener('click', e=>{
  const id = link.getAttribute('href');
  if (id && id.startsWith('#')) {
    e.preventDefault();
    const target = document.querySelector(id);
    if(target){
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({top, behavior:'smooth'});
    }
  }
});

  });
}

/* ---- Nền động Canvas ---- */
function backgroundAnimation(){
  const canvas=document.getElementById('bgCanvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let w,h,particles=[];
  function resize(){
    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;
    particles=[];
    for(let i=0;i<60;i++){
      particles.push({
        x:Math.random()*w,
        y:Math.random()*h,
        vx:(Math.random()-0.5)*0.4,
        vy:(Math.random()-0.5)*0.4,
        r:Math.random()*1.5+0.5,
        a:Math.random()*0.3+0.2
      });
    }
  }
  window.addEventListener('resize',resize);
  resize();

  function loop(){
    const grd=ctx.createLinearGradient(0,0,w,h);
    grd.addColorStop(0,"#1a0008");
    grd.addColorStop(1,"#3b0015");
    ctx.fillStyle=grd;
    ctx.fillRect(0,0,w,h);

    for(let p of particles){
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=w;if(p.x>w)p.x=0;
      if(p.y<0)p.y=h;if(p.y>h)p.y=0;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,0,76,${p.a})`;
      ctx.fill();
    }
    requestAnimationFrame(loop);
  }
  loop();
}
 /* ---- Nút hiện khi lướt xuống ---- */
window.addEventListener('scroll', () => {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

/* ---- Khi bấm thì cuộn mượt lên đầu ---- */
document.getElementById('scrollTopBtn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
