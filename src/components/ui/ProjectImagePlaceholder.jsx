import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function ProjectImagePlaceholder({ type, accentColor, title }) {
  if (type === "game") {
    const PongGame = () => {
      // SVG: x in [-150,150], y in [-60,60]
      const W = 150, H = 60;
      const PADDLE_H = 18, PADDLE_W = 4, PADDLE_X = 140;
      const BALL_R = 2.5;
      // AI misses on purpose: only moves at 60% of what it needs
      const AI_SPEED = 1.4;

      const stateRef = useRef({
        ball: { x: 0, y: 10, vx: 2.2, vy: 1.4 },
        p1y: 0, p2y: 0,
        score1: 0, score2: 0,
      });
      const rafRef = useRef(null);
      const [, setTick] = useState(0);

      useEffect(() => {
        const tick = () => {
          const s = stateRef.current;
          s.ball.x += s.ball.vx;
          s.ball.y += s.ball.vy;

          // Top/bottom walls
          if (s.ball.y - BALL_R < -H) { s.ball.y = -H + BALL_R; s.ball.vy = Math.abs(s.ball.vy); }
          if (s.ball.y + BALL_R > H)  { s.ball.y = H - BALL_R;  s.ball.vy = -Math.abs(s.ball.vy); }

          // Left paddle collision
          const lx = -PADDLE_X;
          if (s.ball.vx < 0 && s.ball.x - BALL_R <= lx + PADDLE_W && s.ball.x >= lx) {
            if (s.ball.y >= s.p1y - PADDLE_H && s.ball.y <= s.p1y + PADDLE_H) {
              s.ball.x = lx + PADDLE_W + BALL_R;
              // Random point on paddle: -PADDLE_H to +PADDLE_H
              const randomHit = (Math.random() - 0.5) * PADDLE_H * 2;
              const offset = randomHit / PADDLE_H;
              s.ball.vx = Math.min(Math.abs(s.ball.vx) * 1.04, 5.5);
              s.ball.vy = offset * 2.8;
            }
          }

          // Right paddle collision
          const rx = PADDLE_X - PADDLE_W;
          if (s.ball.vx > 0 && s.ball.x + BALL_R >= rx && s.ball.x <= PADDLE_X) {
            if (s.ball.y >= s.p2y - PADDLE_H && s.ball.y <= s.p2y + PADDLE_H) {
              s.ball.x = rx - BALL_R;
              // Random point on paddle: -PADDLE_H to +PADDLE_H
              const randomHit = (Math.random() - 0.5) * PADDLE_H * 2;
              const offset = randomHit / PADDLE_H;
              s.ball.vx = -Math.min(Math.abs(s.ball.vx) * 1.04, 5.5);
              s.ball.vy = offset * 2.8;
            }
          }

          // Score / reset
          if (s.ball.x < -W - 5) {
            s.score2++;
            s.ball.x = 0; s.ball.y = 0;
            s.ball.vx = 2.2; s.ball.vy = (Math.random() - 0.5) * 2.8;
            s.p1y = 0; s.p2y = 0;
          }
          if (s.ball.x > W + 5) {
            s.score1++;
            s.ball.x = 0; s.ball.y = 0;
            s.ball.vx = -2.2; s.ball.vy = (Math.random() - 0.5) * 2.8;
            s.p1y = 0; s.p2y = 0;
          }

          // Imperfect AI: moves toward ball but capped so it can miss
          const p1Target = s.ball.vx < 0 ? s.ball.y : 0;
          const p1Diff = p1Target - s.p1y;
          s.p1y += Math.sign(p1Diff) * Math.min(AI_SPEED, Math.abs(p1Diff));
          s.p1y = Math.max(-H + PADDLE_H, Math.min(H - PADDLE_H, s.p1y));

          const p2Target = s.ball.vx > 0 ? s.ball.y : 0;
          const p2Diff = p2Target - s.p2y;
          s.p2y += Math.sign(p2Diff) * Math.min(AI_SPEED, Math.abs(p2Diff));
          s.p2y = Math.max(-H + PADDLE_H, Math.min(H - PADDLE_H, s.p2y));

          setTick(t => t + 1);
          rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
      }, []);

      const s = stateRef.current;
      return (
        <div className="relative h-48 overflow-hidden rounded-t-lg flex flex-col" style={{ borderTop: `2px solid ${accentColor}`, backgroundColor: "#0a0a0f" }}>
          <div className="flex justify-between px-6 py-1.5 text-xs font-mono border-b" style={{ color: accentColor, borderColor: `${accentColor}20` }}>
            <span>P1: {s.score1}</span>
            <span>P2: {s.score2}</span>
          </div>
          <div className="flex-1 relative">
            <svg viewBox="-150 -60 300 120" className="w-full h-full">
              <line x1="0" y1="-55" x2="0" y2="55" stroke={accentColor} strokeWidth="0.5" opacity="0.2" strokeDasharray="6,4" />
              <rect x={-PADDLE_X} y={s.p1y - PADDLE_H} width={PADDLE_W} height={PADDLE_H * 2} fill={accentColor} rx="2" />
              <rect x={PADDLE_X - PADDLE_W} y={s.p2y - PADDLE_H} width={PADDLE_W} height={PADDLE_H * 2} fill={accentColor} rx="2" />
              <circle cx={s.ball.x} cy={s.ball.y} r={BALL_R} fill="white" style={{ filter: `drop-shadow(0 0 4px ${accentColor})` }} />
            </svg>
          </div>
        </div>
      );
    };
    return <PongGame />;
  }

  if (type === "arcade") {
    const ArkanoidGame = () => {
      // SVG coords: 0..300 wide, 0..192 tall
      const W = 300, H = 192;
      const COLS = 7, ROWS = 3;
      const BW = 34, BH = 10, BGAP = 3;
      const BOFF_X = (W - (COLS * (BW + BGAP) - BGAP)) / 2;
      const BOFF_Y = 18;
      const PADDLE_W = 50, PADDLE_H = 6, PADDLE_Y = H - 18;
      const BALL_R = 4;

      const initBricks = () =>
        Array.from({ length: ROWS * COLS }, () => true);

      const brickCenter = (i, bricks) => {
        const col = i % COLS, row = Math.floor(i / COLS);
        return {
          x: BOFF_X + col * (BW + BGAP) + BW / 2,
          y: BOFF_Y + row * (BH + BGAP) + BH / 2,
        };
      };

      // Launch ball from pos toward nearest alive brick at fixed speed
      const aimAtBrick = (s) => {
        const alive = s.bricks.map((v, i) => v ? i : -1).filter(i => i !== -1);
        if (alive.length === 0) return;
        // pick random alive brick
        const target = brickCenter(alive[Math.floor(Math.random() * alive.length)], s.bricks);
        const dx = target.x - s.ball.x;
        const dy = target.y - s.ball.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const spd = 3.2;
        s.ball.vx = (dx / len) * spd;
        s.ball.vy = (dy / len) * spd;
      };

      const stateRef = useRef(null);
      if (!stateRef.current) {
        const bricks = initBricks();
        const s = { ball: { x: W / 2, y: H - 40, vx: 0, vy: 0 }, paddleX: W / 2, bricks };
        aimAtBrick(s);
        stateRef.current = s;
      }
      const [, setTick] = useState(0);
      const rafRef = useRef(null);

      useEffect(() => {
        const step = () => {
          const s = stateRef.current;
          s.ball.x += s.ball.vx;
          s.ball.y += s.ball.vy;

          // Walls
          if (s.ball.x - BALL_R < 0)  { s.ball.x = BALL_R;     s.ball.vx = Math.abs(s.ball.vx); }
          if (s.ball.x + BALL_R > W)   { s.ball.x = W - BALL_R; s.ball.vx = -Math.abs(s.ball.vx); }
          if (s.ball.y - BALL_R < 0)   { s.ball.y = BALL_R;     s.ball.vy = Math.abs(s.ball.vy); }

          // Paddle AI: follow ball perfectly (it's just a visual anchor)
          const targetX = Math.max(PADDLE_W / 2, Math.min(W - PADDLE_W / 2, s.ball.x));
          s.paddleX += Math.sign(targetX - s.paddleX) * Math.min(4, Math.abs(targetX - s.paddleX));

          // Paddle collision — bounce back up toward bricks
          const px = s.paddleX - PADDLE_W / 2;
          if (
            s.ball.vy > 0 &&
            s.ball.y + BALL_R >= PADDLE_Y &&
            s.ball.y + BALL_R <= PADDLE_Y + PADDLE_H + 2 &&
            s.ball.x >= px && s.ball.x <= px + PADDLE_W
          ) {
            s.ball.y = PADDLE_Y - BALL_R;
            aimAtBrick(s);
          }

          // Ball out — respawn and aim at brick
          if (s.ball.y - BALL_R > H) {
            s.ball.x = W / 2; s.ball.y = H - 40;
            aimAtBrick(s);
          }

          // Brick collisions
          let newBricks = [...s.bricks];
          let hit = false;
          for (let i = 0; i < ROWS * COLS && !hit; i++) {
            if (!newBricks[i]) continue;
            const col = i % COLS, row = Math.floor(i / COLS);
            const bx = BOFF_X + col * (BW + BGAP);
            const by = BOFF_Y + row * (BH + BGAP);
            if (
              s.ball.x + BALL_R > bx && s.ball.x - BALL_R < bx + BW &&
              s.ball.y + BALL_R > by && s.ball.y - BALL_R < by + BH
            ) {
              newBricks[i] = false;
              const overlapL = s.ball.x + BALL_R - bx;
              const overlapR = bx + BW - (s.ball.x - BALL_R);
              const overlapT = s.ball.y + BALL_R - by;
              const overlapB = by + BH - (s.ball.y - BALL_R);
              const minH = Math.min(overlapL, overlapR);
              const minV = Math.min(overlapT, overlapB);
              if (minV < minH) s.ball.vy *= -1; else s.ball.vx *= -1;
              hit = true;
            }
          }
          // All bricks gone → reset and re-aim
          if (newBricks.every(b => !b)) {
            newBricks = initBricks();
            s.bricks = newBricks;
            s.ball.x = W / 2; s.ball.y = H - 40;
            aimAtBrick(s);
          }
          s.bricks = newBricks;

          setTick(t => t + 1);
          rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafRef.current);
      }, []);

      const s = stateRef.current;
      const brickColors = ["#ff4444", "#ff8800", accentColor];

      return (
        <div
          className="relative h-48 overflow-hidden rounded-t-lg"
          style={{ borderTop: `2px solid ${accentColor}`, backgroundColor: "#0a0a0f" }}
        >
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
            {/* Bricks */}
            {s.bricks.map((alive, i) => {
              if (!alive) return null;
              const col = i % COLS, row = Math.floor(i / COLS);
              const bx = BOFF_X + col * (BW + BGAP);
              const by = BOFF_Y + row * (BH + BGAP);
              return (
                <rect key={i} x={bx} y={by} width={BW} height={BH}
                  fill={brickColors[row % brickColors.length]}
                  rx="2" opacity="0.9"
                  style={{ filter: `drop-shadow(0 0 3px ${brickColors[row % brickColors.length]})` }}
                />
              );
            })}
            {/* Paddle */}
            <rect
              x={s.paddleX - PADDLE_W / 2} y={PADDLE_Y}
              width={PADDLE_W} height={PADDLE_H}
              fill={accentColor} rx="3"
              style={{ filter: `drop-shadow(0 0 4px ${accentColor})` }}
            />
            {/* Ball */}
            <circle cx={s.ball.x} cy={s.ball.y} r={BALL_R}
              fill="white"
              style={{ filter: `drop-shadow(0 0 5px ${accentColor})` }}
            />
          </svg>
        </div>
      );
    };
    return <ArkanoidGame />;
  }

  if (type === "embedded") {
    // Pin rows for ESP32 chip
    const leftPins  = [52, 64, 76, 88, 100, 112, 124, 136];
    const rightPins = [52, 64, 76, 88, 100, 112, 124, 136];
    // LCD lines to display
    const lcdLines = [
      { y: 20, text: "CASIO FX-991ES", color: "#7fff7f", size: 7.5, bold: true },
      { y: 34, text: "sin(π/4)×e^2.718", color: "#5fd87f", size: 6.5 },
    ];
    return (
      <div
        className="relative h-48 overflow-hidden rounded-t-lg"
        style={{ borderTop: `2px solid ${accentColor}`, background: "#04080f" }}
      >
        <svg viewBox="0 0 360 192" className="w-full h-full">

          {/* ── ESP32 chip ── */}
          {/* Left pins */}
          {leftPins.map((y, i) => (
            <line key={`lp-${i}`} x1="28" y1={y} x2="52" y2={y}
              stroke={accentColor} strokeWidth="1" opacity="0.5" />
          ))}
          {/* Right pins */}
          {rightPins.map((y, i) => (
            <line key={`rp-${i}`} x1="112" y1={y} x2="136" y2={y}
              stroke={accentColor} strokeWidth="1" opacity="0.5" />
          ))}
          {/* Chip body */}
          <rect x="52" y="44" width="60" height="100" rx="4"
            fill="#0c160a" stroke={accentColor} strokeWidth="1.3"
            style={{ filter: `drop-shadow(0 0 8px ${accentColor}55)` }}
          />
          {/* Chip label */}
          <text x="82" y="89" textAnchor="middle" fill={accentColor} fontSize="6.5" fontFamily="monospace" fontWeight="bold" opacity="0.9">ESP32</text>
          <text x="82" y="101" textAnchor="middle" fill={accentColor} fontSize="5" fontFamily="monospace" opacity="0.55">WROOM-32</text>
          {/* Antenna trace on chip */}
          <rect x="66" y="48" width="32" height="10" rx="2" fill="none" stroke={accentColor} strokeWidth="0.7" opacity="0.4" />
          {/* Status LED */}
          <motion.circle cx="104" cy="52" r="2.5" fill="#00ff88"
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />

          {/* ── Data bus wires ── */}
          {[60, 72, 84, 96].map((y, i) => (
            <motion.line key={`bus-${i}`} x1="136" y1={y} x2="172" y2={y}
              stroke={accentColor} strokeWidth="0.8" opacity="0"
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity, repeatDelay: 1.2 }}
            />
          ))}
          <line x1="136" y1="56" x2="172" y2="56" stroke={accentColor} strokeWidth="0.5" opacity="0.2" />
          <line x1="136" y1="68" x2="172" y2="68" stroke={accentColor} strokeWidth="0.5" opacity="0.2" />
          <line x1="136" y1="80" x2="172" y2="80" stroke={accentColor} strokeWidth="0.5" opacity="0.2" />
          <line x1="136" y1="92" x2="172" y2="92" stroke={accentColor} strokeWidth="0.5" opacity="0.2" />
          <text x="154" y="108" textAnchor="middle" fill={accentColor} fontSize="5" fontFamily="monospace" opacity="0.35">SPI</text>

          {/* ── ILI9341 LCD ── */}
          {/* Bezel */}
          <rect x="172" y="22" width="158" height="148" rx="5"
            fill="#0a100a" stroke={accentColor} strokeWidth="1.2"
            style={{ filter: `drop-shadow(0 0 8px ${accentColor}44)` }}
          />
          {/* Screen area */}
          <rect x="178" y="28" width="146" height="136" rx="3" fill="#061209" />

          {/* Casio UI: top bar */}
          <rect x="178" y="28" width="146" height="18" rx="3" fill="#0a1f0a" />
          <text x="185" y="40" fill={accentColor} fontSize="7" fontFamily="monospace" fontWeight="bold" opacity="0.9">CASIO FX-991ES</text>
          <motion.text x="316" y="40" textAnchor="end" fill="#00ff88" fontSize="6" fontFamily="monospace"
            animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>●RUN</motion.text>

          {/* Expression line */}
          <text x="185" y="60" fill="#7fff7f" fontSize="7" fontFamily="monospace" opacity="0.8">sin(π/4)×e^2.718</text>

          {/* Result */}
          <motion.text x="315" y="82" textAnchor="end" fill={accentColor} fontSize="16" fontFamily="monospace" fontWeight="bold"
            animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2.6, repeat: Infinity }}
            style={{ filter: `drop-shadow(0 0 6px ${accentColor})` }}
          >15.1543</motion.text>

          {/* Blinking cursor */}
          <motion.rect x="317" y="68" width="5" height="13" fill={accentColor}
            animate={{ opacity: [1, 0] }} transition={{ duration: 0.65, repeat: Infinity }} />

          {/* Divider */}
          <line x1="180" y1="90" x2="322" y2="90" stroke={accentColor} strokeWidth="0.5" opacity="0.2" />

          {/* VRAM debug output lines */}
          <text x="185" y="103" fill={accentColor} fontSize="5.5" fontFamily="monospace" opacity="0.45">VRAM: 0x3FFB0000</text>
          <text x="185" y="114" fill={accentColor} fontSize="5.5" fontFamily="monospace" opacity="0.35">LCD:  ILI9341 240×320</text>
          <text x="185" y="125" fill={accentColor} fontSize="5.5" fontFamily="monospace" opacity="0.35">CPU:  SIMU8 @ 3.58MHz</text>
          <text x="185" y="136" fill={accentColor} fontSize="5.5" fontFamily="monospace" opacity="0.35">KEY:  matrix 47-key OK</text>
          <motion.text x="185" y="147" fill="#00ff88" fontSize="5.5" fontFamily="monospace"
            animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1, repeat: Infinity }}>
            WiFi: 192.168.1.42 ✓
          </motion.text>
          <text x="185" y="157" fill={accentColor} fontSize="5.5" fontFamily="monospace" opacity="0.25">ROM:  FX-991ES v2.04</text>

          {/* Bottom label */}
          <text x="251" y="171" textAnchor="middle" fill={accentColor} fontSize="5.5" fontFamily="monospace" opacity="0.3">ESP32 CASIO EMULATOR</text>
        </svg>
      </div>
    );
  }

  if (type === "streaming") {
    return (
      <div
        className="relative h-48 overflow-hidden rounded-t-lg"
        style={{ borderTop: `2px solid ${accentColor}`, background: "#04080f" }}
      >
        <svg viewBox="0 0 360 192" className="w-full h-full">
          {/* ── Camera body ── */}
          <rect x="18" y="62" width="88" height="58" rx="6"
            fill="#0b0f0a" stroke={accentColor} strokeWidth="1.3"
            style={{ filter: `drop-shadow(0 0 7px ${accentColor}55)` }}
          />
          {/* Lens ring outer */}
          <circle cx="62" cy="91" r="22" fill="#060c07" stroke={accentColor} strokeWidth="1.1" />
          {/* Lens ring mid */}
          <circle cx="62" cy="91" r="15" fill="#040908" stroke={accentColor} strokeWidth="0.8" opacity="0.8" />
          {/* Lens glass */}
          <circle cx="62" cy="91" r="9" fill="#071510" stroke={accentColor} strokeWidth="0.6" opacity="0.9" />
          {/* Lens glint */}
          <circle cx="57" cy="86" r="2.5" fill="white" opacity="0.12" />
          {/* Record LED */}
          <motion.circle cx="96" cy="68" r="3.5" fill="#ff2222"
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.0, repeat: Infinity }} />
          {/* ESP32 chip label */}
          <text x="62" y="133" textAnchor="middle" fill={accentColor} fontSize="6" fontFamily="monospace" opacity="0.55">ESP32-CAM</text>

          {/* ── Video frame / monitor ── */}
          <rect x="148" y="28" width="164" height="120" rx="5"
            fill="#060e08" stroke={accentColor} strokeWidth="1.1"
            style={{ filter: `drop-shadow(0 0 6px ${accentColor}44)` }}
          />
          {/* Scanlines (static) */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i}
              x1="150" y1={32 + i * 10} x2="310" y2={32 + i * 10}
              stroke={accentColor} strokeWidth="0.4" opacity="0.07"
            />
          ))}
          {/* MJPEG frame content suggestion — simple scene */}
          <rect x="160" y="40" width="60" height="40" rx="2" fill={accentColor} opacity="0.06" />
          <circle cx="225" cy="68" r="18" fill={accentColor} opacity="0.07" />
          {/* Frame counter */}
          <motion.text
            x="295" y="44" textAnchor="end" fill={accentColor} fontSize="6" fontFamily="monospace" opacity="0.6"
            animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 0.5, repeat: Infinity }}
          >
            30fps
          </motion.text>
          {/* Resolution badge */}
          <text x="160" y="140" fill={accentColor} fontSize="6" fontFamily="monospace" opacity="0.45">1600×1200  MJPEG</text>

          {/* ── Wi-Fi packets cam → frame ── */}
          {[0, 0.5, 1.0].map((d, i) => (
            <motion.circle key={i} r="2.2" fill={accentColor}
              style={{ filter: `drop-shadow(0 0 4px ${accentColor})` }}
              animate={{ cx: [106, 148], cy: [91, 88], opacity: [0, 1, 0] }}
              transition={{ duration: 1.1, delay: d, repeat: Infinity, ease: "linear" }}
            />
          ))}

          {/* Wi-Fi arc hints */}
          {[8, 14, 20].map((r2, i) => (
            <path key={i}
              d={`M ${106 + r2 * 0.6} ${91 - r2} A ${r2} ${r2} 0 0 1 ${106 + r2 * 0.6} ${91 + r2}`}
              fill="none" stroke={accentColor} strokeWidth="0.7" opacity={0.25 - i * 0.06}
            />
          ))}
        </svg>
      </div>
    );
  }


  if (type === "storj") {
    // 2 servers, each with satellite nodes arranged around them
    const cx1 = 90, cy1 = 96;   // server-01 center
    const cx2 = 270, cy2 = 96;  // server-02 center
    const nodeAngles = [300, 340, 20, 60, 100, 140, 200, 240];
    const r = 44;
    const nodes1 = nodeAngles.map((a) => ({
      x: cx1 + r * Math.cos((a * Math.PI) / 180),
      y: cy1 + r * Math.sin((a * Math.PI) / 180),
    }));
    const nodes2 = nodeAngles.map((a) => ({
      x: cx2 + r * Math.cos((a * Math.PI) / 180),
      y: cy2 + r * Math.sin((a * Math.PI) / 180),
    }));

    return (
      <div
        className="relative h-48 overflow-hidden rounded-t-lg"
        style={{ borderTop: `2px solid ${accentColor}`, background: "#04080f" }}
      >
        <svg viewBox="0 0 360 192" className="w-full h-full">
          {/* Inter-server link */}
          <line x1={cx1} y1={cy1} x2={cx2} y2={cy2} stroke={accentColor} strokeWidth="0.6" opacity="0.25" strokeDasharray="4,3" />

          {/* Animated packet server-01 → server-02 */}
          {[0, 0.6, 1.2].map((d, i) => (
            <motion.circle key={`pkt-a-${i}`} r="2" fill={accentColor}
              style={{ filter: `drop-shadow(0 0 4px ${accentColor})` }}
              animate={{ cx: [cx1, cx2], cy: [cy1, cy2], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.2, delay: d, repeat: Infinity, ease: "linear" }}
            />
          ))}
          {[1.1, 1.7].map((d, i) => (
            <motion.circle key={`pkt-b-${i}`} r="2" fill={accentColor}
              style={{ filter: `drop-shadow(0 0 4px ${accentColor})` }}
              animate={{ cx: [cx2, cx1], cy: [cy2, cy1], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.2, delay: d, repeat: Infinity, ease: "linear" }}
            />
          ))}

          {/* Node spokes & dots — server 1 */}
          {nodes1.map((n, i) => (
            <g key={`n1-${i}`}>
              <line x1={cx1} y1={cy1} x2={n.x} y2={n.y} stroke={accentColor} strokeWidth="0.5" opacity="0.2" />
              <motion.circle cx={n.x} cy={n.y} r="3" fill={accentColor} opacity="0.85"
                animate={{ opacity: [0.5, 1, 0.5], r: [2.5, 3.2, 2.5] }}
                transition={{ duration: 1.6 + i * 0.18, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: `drop-shadow(0 0 3px ${accentColor})` }}
              />
            </g>
          ))}

          {/* Node spokes & dots — server 2 */}
          {nodes2.map((n, i) => (
            <g key={`n2-${i}`}>
              <line x1={cx2} y1={cy2} x2={n.x} y2={n.y} stroke={accentColor} strokeWidth="0.5" opacity="0.2" />
              <motion.circle cx={n.x} cy={n.y} r="3" fill={accentColor} opacity="0.85"
                animate={{ opacity: [0.5, 1, 0.5], r: [2.5, 3.2, 2.5] }}
                transition={{ duration: 1.6 + i * 0.18, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                style={{ filter: `drop-shadow(0 0 3px ${accentColor})` }}
              />
            </g>
          ))}

          {/* Server-01 box */}
          <motion.rect x={cx1 - 18} y={cy1 - 13} width="36" height="26" rx="4"
            fill="#0a0a0f" stroke={accentColor} strokeWidth="1.2"
            animate={{ boxShadow: undefined }}
            style={{ filter: `drop-shadow(0 0 6px ${accentColor})` }}
          />
          <text x={cx1} y={cy1 - 2} textAnchor="middle" fill={accentColor} fontSize="5.5" fontFamily="monospace" fontWeight="bold">SERVER</text>
          <text x={cx1} y={cy1 + 6} textAnchor="middle" fill={accentColor} fontSize="5" fontFamily="monospace" opacity="0.7">01</text>

          {/* Server-02 box */}
          <motion.rect x={cx2 - 18} y={cy2 - 13} width="36" height="26" rx="4"
            fill="#0a0a0f" stroke={accentColor} strokeWidth="1.2"
            style={{ filter: `drop-shadow(0 0 6px ${accentColor})` }}
          />
          <text x={cx2} y={cy2 - 2} textAnchor="middle" fill={accentColor} fontSize="5.5" fontFamily="monospace" fontWeight="bold">SERVER</text>
          <text x={cx2} y={cy2 + 6} textAnchor="middle" fill={accentColor} fontSize="5" fontFamily="monospace" opacity="0.7">02</text>

          {/* Labels */}
          <text x="180" y="178" textAnchor="middle" fill={accentColor} fontSize="6.5" fontFamily="monospace" opacity="0.5">
            73 nodes • 99.2% uptime • 4.2 TB
          </text>
        </svg>
      </div>
    );
  }

  if (type === "terminal") {
    return (
      <div
        className="relative h-48 overflow-hidden rounded-t-lg bg-surface flex flex-col p-4"
        style={{ borderTop: `2px solid ${accentColor}` }}
      >
        {/* Terminal header */}
        <div className="flex gap-2 mb-3 pb-2 border-b border-cyan-neon/20">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* Terminal content */}
        <div className="font-mono text-xs text-cyan-neon/80 space-y-1 overflow-hidden">
          <div>$ nmap -sS 192.168.1.0/24</div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Starting Nmap...
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            PORT    STATE  SERVICE
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            22/tcp  open   ssh
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            80/tcp  open   http
          </motion.div>
        </div>
      </div>
    );
  }

  if (type === "binary") {
    return (
      <div
        className="relative h-48 overflow-hidden rounded-t-lg bg-surface"
        style={{ borderTop: `2px solid ${accentColor}` }}
      >
        <motion.pre
          className="font-mono text-xs p-4 h-full overflow-hidden"
          style={{ color: accentColor }}
          animate={{ y: [0, "-50%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          {`4f504f00 4c4c4157 20f00db0 0aded00f
45564152 09594f55 48457878 2d4f7846
4f505045 4e584553 00000000 deadbeef
41444448 45524541 4d20434f 4c4f4553
DEADBEEF BADDCAFE C0FFEEEE F00DC0DE
48656C6C 6F576F72 6C640000 00000000
4f504f00 4c4c4157 20f00db0 0aded00f
45564152 09594f55 48457878 2d4f7846`}
        </motion.pre>
      </div>
    );
  }

  if (type === "code") {
    return (
      <div
        className="relative h-48 overflow-hidden rounded-t-lg bg-surface p-4"
        style={{ borderTop: `2px solid ${accentColor}` }}
      >
        <pre className="font-mono text-xs leading-relaxed text-cyan-neon/80">
          {`int main(void) {
  int i = 0;
  while (i < 42)
    i++;
  return (0);
}`}
        </pre>
      </div>
    );
  }

  if (type === "hacker") {
    return (
      <div
        className="relative h-48 overflow-hidden rounded-t-lg bg-black flex flex-col p-3"
        style={{ borderTop: `2px solid ${accentColor}` }}
      >
        {/* Terminal header */}
        <div className="flex gap-2 mb-2 pb-2 border-b border-cyan-neon/20">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>

        {/* Terminal content - Hacker style */}
        <div className="font-mono text-xs text-green-neon/90 space-y-1 flex-1 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0 }}
          >
            {'> '}scanning targets...
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {'[*] '}10.0.0.1:22 - SSH open
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {'[+] '}CVE-2024-1234 detected
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {'[!] '}EXPLOITING vulnerability...
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {'[+] '}Access granted
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {'[*] '}Exfiltrating data...
          </motion.div>

          {/* Blinking cursor */}
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            _
          </motion.div>
        </div>
      </div>
    );
  }

  if (type === "tradingview") {
    return (
      <div
        className="relative overflow-hidden rounded-t-lg bg-surface"
        style={{
          borderTop: `2px solid ${accentColor}`,
          height: "300px",
        }}
      >
        <iframe
          src="https://dexscreener.com/solana/6zEanetCDv4MN8cQJ468RBMdvbduxTtRqLeoshE4gEtj?embed=1&theme=dark&trades=0&info=0"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            background: "#12121a",
            display: "block",
          }}
          allowFullScreen
          title="Harold Token Chart"
        />
      </div>
    );
  }

  if (type === "catalyst") {
    return (
      <div
        className="relative h-48 overflow-hidden rounded-t-lg"
        style={{ borderTop: `2px solid ${accentColor}`, background: "#04080f" }}
      >
        <svg viewBox="0 0 360 192" className="w-full h-full">
          <defs>
            <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: accentColor, stopOpacity: 0.12 }} />
              <stop offset="100%" style={{ stopColor: accentColor, stopOpacity: 0.02 }} />
            </linearGradient>
          </defs>

          {/* Browser chrome */}
          <rect x="10" y="8" width="340" height="176" rx="6" fill="#0c0c14" stroke={accentColor} strokeWidth="0.8" opacity="0.5" />

          {/* Browser top bar */}
          <rect x="10" y="8" width="340" height="22" rx="6" fill={accentColor} opacity="0.08" />
          <circle cx="24" cy="19" r="3.5" fill="#ff5f57" opacity="0.7" />
          <circle cx="35" cy="19" r="3.5" fill="#febc2e" opacity="0.7" />
          <circle cx="46" cy="19" r="3.5" fill="#28c840" opacity="0.7" />
          {/* URL bar */}
          <rect x="70" y="13" width="200" height="12" rx="6" fill={accentColor} opacity="0.07" />
          <text x="170" y="22" textAnchor="middle" fill={accentColor} fontSize="5" fontFamily="monospace" opacity="0.4">nikatrecycling.com</text>

          {/* Page: nav */}
          <rect x="10" y="30" width="340" height="18" fill={accentColor} opacity="0.06" />
          <rect x="22" y="36" width="22" height="6" rx="2" fill={accentColor} opacity="0.4" />
          <rect x="270" y="35" width="30" height="8" rx="3" fill={accentColor} opacity="0.5" />
          <rect x="230" y="36" width="20" height="6" rx="2" fill={accentColor} opacity="0.2" />
          <rect x="200" y="36" width="20" height="6" rx="2" fill={accentColor} opacity="0.2" />

          {/* Page: hero */}
          <rect x="10" y="48" width="340" height="60" fill="url(#heroGrad)" />
          <rect x="80" y="58" width="120" height="10" rx="2" fill={accentColor} opacity="0.5" />
          <rect x="90" y="72" width="100" height="6" rx="2" fill={accentColor} opacity="0.25" />
          <rect x="100" y="82" width="80" height="6" rx="2" fill={accentColor} opacity="0.2" />
          <rect x="90" y="94" width="50" height="10" rx="4" fill={accentColor} opacity="0.6" />

          {/* Hero right visual block */}
          <rect x="230" y="54" width="90" height="50" rx="4" fill={accentColor} opacity="0.06" stroke={accentColor} strokeWidth="0.6" />
          <motion.rect x="245" y="63" width="60" height="5" rx="2" fill={accentColor} opacity="0"
            animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
          <motion.rect x="245" y="72" width="45" height="5" rx="2" fill={accentColor} opacity="0"
            animate={{ opacity: [0, 0.35, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
          <motion.rect x="245" y="81" width="52" height="5" rx="2" fill={accentColor} opacity="0"
            animate={{ opacity: [0, 0.3, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />

          {/* Page: 3 feature cards */}
          {[30, 135, 240].map((x, i) => (
            <g key={i}>
              <rect x={x} y="118" width="85" height="48" rx="3" fill={accentColor} opacity="0.05" stroke={accentColor} strokeWidth="0.5" />
              <circle cx={x + 14} cy="131" r="6" fill={accentColor} opacity="0.15" />
              <rect x={x + 8} y="142" width="50" height="4" rx="2" fill={accentColor} opacity="0.3" />
              <rect x={x + 8} y="150" width="38" height="3" rx="2" fill={accentColor} opacity="0.15" />
              <rect x={x + 8} y="157" width="43" height="3" rx="2" fill={accentColor} opacity="0.12" />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (type === "fitness") {
    const workouts = [
      { label: "Push Day", sets: 4, done: 4, emoji: "💪" },
      { label: "Pull Day", sets: 4, done: 3, emoji: "🏋️" },
      { label: "Leg Day", sets: 5, done: 2, emoji: "🦵" },
    ];
    return (
      <div
        className="h-48 rounded-t-lg overflow-hidden flex gap-3"
        style={{ backgroundColor: "#0a0a0f", borderTop: `2px solid ${accentColor}` }}
      >
        {/* Phone mockup */}
        <div className="flex items-center justify-center w-[48%] py-3 pl-5">
          <div
            className="w-[88px] h-[156px] rounded-[18px] border-2 flex flex-col overflow-hidden shadow-lg"
            style={{ borderColor: `${accentColor}50`, backgroundColor: "#0f0f18", boxShadow: `0 0 20px ${accentColor}18` }}
          >
            {/* Status bar */}
            <div className="flex justify-between items-center px-2.5 pt-1.5 pb-1" style={{ backgroundColor: "#0a0a12" }}>
              <span className="text-[7px] font-mono font-semibold" style={{ color: accentColor }}>9:41</span>
              <div className="flex gap-0.5 items-center">
                <div className="w-2 h-1 rounded-sm" style={{ backgroundColor: `${accentColor}80` }} />
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${accentColor}50` }} />
              </div>
            </div>

            {/* App header */}
            <div className="px-2.5 py-1.5 border-b" style={{ borderColor: `${accentColor}18`, background: `linear-gradient(135deg, ${accentColor}0a, transparent)` }}>
              <div className="text-[8.5px] font-bold font-mono tracking-wide" style={{ color: accentColor }}>TrainerApp</div>
              <div className="text-[6.5px] mt-0.5" style={{ color: `${accentColor}70` }}>Sergio · Semana 4</div>
            </div>

            {/* Workout rows */}
            <div className="flex-1 px-2 py-1.5 space-y-1.5">
              {workouts.map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.25, duration: 0.4 }}
                  className="flex items-center justify-between"
                >
                  <span className="text-[7px] font-mono" style={{ color: i === 0 ? accentColor : `${accentColor}90` }}>
                    {w.emoji} {w.label}
                  </span>
                  <div className="flex gap-[3px]">
                    {Array.from({ length: w.sets }).map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.2 + j * 0.08 }}
                        className="w-[5px] h-[5px] rounded-full"
                        style={{ backgroundColor: j < w.done ? accentColor : `${accentColor}22` }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stripe footer */}
            <div className="px-2.5 py-1.5 flex items-center gap-1.5 border-t" style={{ backgroundColor: "#0a0a12", borderColor: "#635bff30" }}>
              <div className="w-2 h-2 rounded-full flex items-center justify-center" style={{ backgroundColor: "#635bff30" }}>
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "#635bff" }} />
              </div>
              <span className="text-[6.5px] font-mono" style={{ color: "#8b5cf6" }}>Stripe · Activo</span>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="ml-auto w-1 h-1 rounded-full"
                style={{ backgroundColor: "#22c55e" }}
              />
            </div>
          </div>
        </div>

        {/* Stats panel */}
        <div className="flex-1 flex flex-col justify-center gap-2 pr-5 py-4">
          <div className="text-[9px] font-mono font-bold tracking-widest mb-2" style={{ color: `${accentColor}90` }}>// STACK</div>

          {[
            { label: "Flutter", pct: 92, color: accentColor },
            { label: "FastAPI", pct: 78, color: accentColor },
            { label: "PostgreSQL", pct: 65, color: accentColor },
          ].map((s, i) => (
            <div key={i} className="space-y-0.5">
              <div className="flex justify-between">
                <span className="text-[8px] font-mono" style={{ color: `${accentColor}dd` }}>{s.label}</span>
                <span className="text-[7px] font-mono" style={{ color: `${accentColor}55` }}>{s.pct}%</span>
              </div>
              <div className="h-[3px] rounded-full overflow-hidden" style={{ backgroundColor: `${accentColor}15` }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${accentColor}cc, ${accentColor}66)` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${s.pct}%` }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}

          <div className="mt-2 flex flex-wrap gap-1">
            {["Magic Link", "Offline", "FCM", "Stripe"].map((tag) => (
              <span
                key={tag}
                className="text-[6px] font-mono px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${accentColor}10`,
                  color: `${accentColor}bb`,
                  border: `1px solid ${accentColor}25`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-48 rounded-t-lg bg-surface flex items-center justify-center"
      style={{ borderTop: `2px solid ${accentColor}` }}
    >
      <div className="text-text-muted font-mono text-sm">[{type}]</div>
    </div>
  );
}
