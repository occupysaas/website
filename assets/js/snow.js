// Christmas snow over the whole landing page.
// A fixed canvas with pointer-events: none, so it never blocks links or buttons.
// Skipped for prefers-reduced-motion, and paused while the tab is hidden.
(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.className = "snow";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let w = 0, h = 0, dpr = 1, flakes = [];
  const make = (y) => {
    const r = 1.2 + Math.random() * 2.8;
    return { x: Math.random() * w, y: y ?? Math.random() * h, r,
      vy: 0.35 + r * 0.22 + Math.random() * 0.3,   // bigger flakes fall faster
      drift: Math.random() * Math.PI * 2, sway: 0.4 + Math.random() * 0.8 };
  };
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(160, (w * h) / 9000));
    while (flakes.length < count) flakes.push(make());
    flakes.length = count;
  };

  let last = performance.now(), running = true;
  const frame = (now) => {
    if (!running) return;
    const dt = Math.min(3, (now - last) / 16.7); last = now;
    ctx.clearRect(0, 0, w, h);
    for (const f of flakes) {
      f.drift += 0.012 * dt;
      f.y += f.vy * dt;
      f.x += Math.sin(f.drift) * f.sway * 0.5 * dt;
      if (f.y - f.r > h) Object.assign(f, make(-f.r));
      if (f.x < -f.r) f.x = w + f.r; else if (f.x > w + f.r) f.x = -f.r;
      // white flake with a faint ink rim, so it reads on the paper, red and black sections alike
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.92)"; ctx.fill();
      ctx.lineWidth = 0.8; ctx.strokeStyle = "rgba(17,17,17,0.22)"; ctx.stroke();
    }
    requestAnimationFrame(frame);
  };

  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) { last = performance.now(); requestAnimationFrame(frame); }
  });
  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(frame);
})();
