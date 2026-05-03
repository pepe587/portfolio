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
    return (
      <div
        className="relative h-48 overflow-hidden rounded-t-lg flex items-center justify-center"
        style={{ borderTop: `2px solid ${accentColor}`, backgroundColor: "#0a0a0f" }}
      >
        <svg className="w-full h-full" viewBox="0 0 400 192">
          {/* Clean connecting lines */}
          <line x1="100" y1="96" x2="160" y2="96" stroke={accentColor} strokeWidth="1" opacity="0.4" />
          <line x1="240" y1="96" x2="300" y2="96" stroke={accentColor} strokeWidth="1" opacity="0.4" />

          {/* Left cube - Memory */}
          <g>
            {/* Front face */}
            <rect x="70" y="80" width="30" height="30" fill="none" stroke={accentColor} strokeWidth="1.2" opacity="0.85" />
            {/* Top face */}
            <polygon points="70,80 82,68 112,68 100,80" fill="none" stroke={accentColor} strokeWidth="1.2" opacity="0.65" />
            {/* Right face */}
            <polygon points="100,80 112,68 112,98 100,110" fill="none" stroke={accentColor} strokeWidth="1.2" opacity="0.5" />
            <text x="85" y="100" textAnchor="middle" fill={accentColor} fontSize="7" fontFamily="monospace" fontWeight="bold" opacity="0.75">
              MEM
            </text>
          </g>

          {/* Central cube - CPU (larger) */}
          <g>
            {/* Front face */}
            <rect x="170" y="75" width="40" height="40" fill="none" stroke={accentColor} strokeWidth="1.4" opacity="0.95" />
            {/* Top face */}
            <polygon points="170,75 186,55 226,55 210,75" fill="none" stroke={accentColor} strokeWidth="1.4" opacity="0.75" />
            {/* Right face */}
            <polygon points="210,75 226,55 226,95 210,115" fill="none" stroke={accentColor} strokeWidth="1.4" opacity="0.6" />
            <text x="190" y="102" textAnchor="middle" fill={accentColor} fontSize="8" fontFamily="monospace" fontWeight="bold" opacity="0.9">
              CPU
            </text>
          </g>

          {/* Right cube - I/O */}
          <g>
            {/* Front face */}
            <rect x="300" y="80" width="30" height="30" fill="none" stroke={accentColor} strokeWidth="1.2" opacity="0.85" />
            {/* Top face */}
            <polygon points="300,80 312,68 342,68 330,80" fill="none" stroke={accentColor} strokeWidth="1.2" opacity="0.65" />
            {/* Right face */}
            <polygon points="330,80 342,68 342,98 330,110" fill="none" stroke={accentColor} strokeWidth="1.2" opacity="0.5" />
            <text x="315" y="100" textAnchor="middle" fill={accentColor} fontSize="7" fontFamily="monospace" fontWeight="bold" opacity="0.75">
              I/O
            </text>
          </g>

          {/* Animated pulse left to center */}
          <motion.circle
            cx="100"
            cy="96"
            r="1.8"
            fill={accentColor}
            animate={{
              cx: [100, 190],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              filter: `drop-shadow(0 0 3px ${accentColor})`
            }}
          />

          {/* Animated pulse right to center */}
          <motion.circle
            cx="300"
            cy="96"
            r="1.8"
            fill={accentColor}
            animate={{
              cx: [300, 210],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6
            }}
            style={{
              filter: `drop-shadow(0 0 3px ${accentColor})`
            }}
          />
        </svg>
      </div>
    );
  }

  if (type === "streaming") {
    return (
      <div
        className="relative h-48 overflow-hidden rounded-t-lg flex items-center justify-center gap-12"
        style={{ borderTop: `2px solid ${accentColor}`, backgroundColor: "#0a0a0f" }}
      >
        <svg className="w-full h-full" viewBox="0 0 400 192">
          {/* Left ESP32 - Camera */}
          <g>
            {/* Body */}
            <rect x="35" y="75" width="60" height="35" fill="none" stroke={accentColor} strokeWidth="1.5" opacity="0.9" rx="3" />
            {/* Camera module box - vertical */}
            <rect x="57" y="78" width="16" height="20" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.7" rx="2" />
            {/* Lens circle */}
            <circle cx="65" cy="85" r="4" fill="none" stroke={accentColor} strokeWidth="1.2" opacity="0.8" />
            <circle cx="65" cy="85" r="2.5" fill={accentColor} opacity="0.4" />
            {/* Label */}
            <text x="65" y="118" textAnchor="middle" fill={accentColor} fontSize="7" fontFamily="monospace" fontWeight="bold" opacity="0.75">
              CAM
            </text>
          </g>

          {/* Right ESP32 - Receiver */}
          <g>
            {/* Body */}
            <rect x="305" y="75" width="60" height="35" fill="none" stroke={accentColor} strokeWidth="1.5" opacity="0.9" rx="3" />
            {/* Antenna */}
            <line x1="340" y1="75" x2="340" y2="55" stroke={accentColor} strokeWidth="1.2" opacity="0.7" />
            <circle cx="340" cy="52" r="2.5" fill={accentColor} opacity="0.6" />
            {/* Label */}
            <text x="335" y="118" textAnchor="middle" fill={accentColor} fontSize="7" fontFamily="monospace" fontWeight="bold" opacity="0.75">
              RX
            </text>
          </g>

          {/* Wi-Fi signal waves - Static arcs */}
          <g opacity="0.4">
            <circle cx="200" cy="96" r="20" fill="none" stroke={accentColor} strokeWidth="0.8" />
            <circle cx="200" cy="96" r="35" fill="none" stroke={accentColor} strokeWidth="0.8" />
            <circle cx="200" cy="96" r="50" fill="none" stroke={accentColor} strokeWidth="0.8" />
          </g>

          {/* Animated Wi-Fi pulse 1 - Left to right */}
          <motion.circle
            cx="65"
            cy="92"
            r="2"
            fill={accentColor}
            animate={{
              cx: [65, 200, 335],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              filter: `drop-shadow(0 0 5px ${accentColor})`
            }}
          />

          {/* Animated Wi-Fi pulse 2 - Delayed */}
          <motion.circle
            cx="65"
            cy="92"
            r="2"
            fill={accentColor}
            animate={{
              cx: [65, 200, 335],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.53
            }}
            style={{
              filter: `drop-shadow(0 0 5px ${accentColor})`
            }}
          />

          {/* Animated Wi-Fi pulse 3 - More delayed */}
          <motion.circle
            cx="65"
            cy="92"
            r="2"
            fill={accentColor}
            animate={{
              cx: [65, 200, 335],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.06
            }}
            style={{
              filter: `drop-shadow(0 0 5px ${accentColor})`
            }}
          />

          {/* Data flow indicators - Frame animation */}
          <motion.text
            x="200"
            y="140"
            textAnchor="middle"
            fill={accentColor}
            fontSize="6"
            fontFamily="monospace"
            opacity="0.5"
            animate={{
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            MJPEG Stream
          </motion.text>
        </svg>
      </div>
    );
  }

  if (type === "storj") {
    const BareMetalDashboard = () => {
      const [stats] = useState([
        { name: "SERVER-01", cpu: 0.68, temp: 52, status: "OK" },
        { name: "SERVER-02", cpu: 0.84, temp: 61, status: "OK" },
      ]);

      return (
        <div
          className="relative h-48 overflow-hidden rounded-t-lg bg-black flex flex-col p-3"
          style={{ borderTop: `2px solid ${accentColor}` }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-cyan-neon/30">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-green-500"
                animate={{ boxShadow: [`0 0 6px #00ff00`, `0 0 12px #00ff00`, `0 0 6px #00ff00`] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="font-mono text-xs text-green-neon font-bold">BARE METAL INFRASTRUCTURE</span>
            </div>
            <span className="font-mono text-xs text-cyan-neon/70">73 Nodes • 99.2% Uptime</span>
          </div>

          {/* Server cards */}
          <div className="flex-1 flex gap-3">
            {stats.map((server, idx) => (
              <div key={idx} className="flex-1 border border-cyan-neon/40 rounded p-2" style={{ background: "#0a0a0f" }}>
                <div className="text-xs font-mono text-cyan-neon mb-1.5">{server.name}</div>

                {/* CPU Load */}
                <div className="mb-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs text-cyan-neon/60">CPU</span>
                    <span className="text-xs text-green-neon font-mono">{Math.round(server.cpu * 100)}%</span>
                  </div>
                  <motion.div
                    className="h-1 bg-cyan-neon/20 rounded overflow-hidden"
                    animate={{
                      boxShadow: [
                        `inset 0 0 4px ${accentColor}33`,
                        `inset 0 0 8px ${accentColor}66`,
                        `inset 0 0 4px ${accentColor}33`,
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      className="h-full"
                      style={{
                        width: `${server.cpu * 100}%`,
                        background: `linear-gradient(90deg, ${accentColor}, #00ff00)`,
                      }}
                      animate={{ width: [`${server.cpu * 100}%`, `${server.cpu * 95}%`, `${server.cpu * 100}%`] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>

                {/* Temp */}
                <div className="mb-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs text-cyan-neon/60">TEMP</span>
                    <span className="text-xs font-mono" style={{ color: server.temp > 55 ? "#ff8800" : "#00ff00" }}>
                      {server.temp}°C
                    </span>
                  </div>
                  <div className="h-1 bg-cyan-neon/20 rounded overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{
                        width: `${(server.temp / 100) * 100}%`,
                        background: server.temp > 55
                          ? "linear-gradient(90deg, #ff8800, #ff4444)"
                          : "linear-gradient(90deg, #00ff00, #00ffcc)",
                      }}
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-1 text-xs">
                  <motion.div
                    className="w-1 h-1 rounded-full bg-green-500"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                  <span className="text-green-neon font-mono">{server.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer stats */}
          <div className="mt-2 pt-2 border-t border-cyan-neon/20 flex justify-between text-xs font-mono text-cyan-neon/60">
            <span>Disk: 4.2TB</span>
            <span>Bandwidth: 2.1Gbps</span>
            <span>Memory: 256GB</span>
            <span>Alerts: 0</span>
          </div>
        </div>
      );
    };
    return <BareMetalDashboard />;
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

  return (
    <div
      className="h-48 rounded-t-lg bg-surface flex items-center justify-center"
      style={{ borderTop: `2px solid ${accentColor}` }}
    >
      <div className="text-text-muted font-mono text-sm">[{type}]</div>
    </div>
  );
}
