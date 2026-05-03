export const projects = [
  {
    id: "oa",
    title: "OA — Autonomous Offense Agent",
    description:
      "Production-grade autonomous pentesting platform with AI-powered vulnerability detection and exploitation automation. Features 24/7 scanning, LLM agent reasoning, and real-time alerting. Built & architected with Claude Code.",
    longDescription:
      "Built with Python orchestrator, Flask dashboards, DeepSeek-R1 LLM integration, and comprehensive exploitation tooling. Includes API, Grafana monitoring, and PostgreSQL findings database.",
    tech: ["Python", "Flask", "PostgreSQL", "Docker", "API Integration", "LLM Agents"],
    github: "https://github.com/pepe587/OA",
    demo: null,
    featured: true,
    placeholderType: "hacker",
    accentColor: "#00ffcc",
    builtWith: "Claude Code",
    icon: "shield",
  },
  {
    id: "esp32_calculator",
    title: "ESP32 Casio Calculator Emulator",
    description:
      "Full-featured Casio FX-991ES PLUS calculator emulator on ESP32. Reverse-engineered ROM execution, LCD display rendering, 47-key matrix input, and advanced VRAM debugging. Includes bonus games (Pong, Snake, Flappy Bird) and AI chat interface.",
    longDescription:
      "Complete 8-bit CPU emulation (SIMU8 processor) running original Casio firmware unmodified. Custom hardware: ILI9341 LCD driver with real-time pixel rendering, GPIO keypad matrix, Wi-Fi connectivity for web control. Architected system architecture with VRAM inspection tools, bootloader, and OTA firmware updates.",
    tech: ["C", "Embedded Systems", "ESP32", "CPU Emulation", "LCD Driver", "IoT"],
    github: "https://github.com/pepe587/esp32-calculator",
    demo: null,
    featured: true,
    placeholderType: "embedded",
    accentColor: "#ff6b35",
    builtWith: "Claude Code",
    icon: "calculator",
  },
  {
    id: "harold_token",
    title: "Harold Token — Solana SPL Asset",
    description:
      "Solana memecoin experiment inspired by 'Hide the Pain Harold' meme. 1B total supply, ATH $5k market cap, 250+ active holders, $50k+ total trading volume. Demonstrates SPL token creation, liquidity pool mechanics, and community management on Raydium DEX.",
    longDescription:
      "SPL token built on Solana blockchain (Contract: 6zEanetCDv4MN8cQJ468RBMdvbduxTtRqLeoshE4gEtj). Launched with 1B token supply, reached ATH of $5k market cap with 250+ unique holders and $50k+ total trading volume. Managed community through Telegram (@hide_the_pain_harold_token), handled liquidity provisioning, and executed token distribution mechanics. Project demonstrates practical knowledge of blockchain asset creation, DEX integration, and community-driven token economics on Solana.",
    tech: ["Solana", "SPL Token", "Blockchain", "DEX Integration", "Token Economics", "Raydium", "Community Management"],
    github: null,
    demo: null,
    featured: true,
    placeholderType: "tradingview",
    accentColor: "#a78bfa",
    builtWith: null,
    icon: "coin",
  },
  {
    id: "storj_infrastructure",
    title: "Storj Infrastructure — 73-Node DevOps System",
    description:
      "Production-grade distributed storage infrastructure with 73 active Storj nodes across 2 dedicated servers. Real-time Prometheus + Grafana monitoring, automated node provisioning, Telegram alerting, and VPN failover. Revenue-generating infrastructure with 99.2% uptime.",
    longDescription:
      "Large-scale infrastructure-as-code project demonstrating DevOps mastery: 4,300+ lines of Python automation for node provisioning, lifecycle management, and monitoring. Features Prometheus time-series database, Grafana dashboards, systemd watchdog services, Docker orchestration, Wireguard+OpenVPN dual-stack VPN. Handles disk temperature monitoring (SMART errors), container health checks, and sub-30-second critical alerts via Telegram. 40+ node identities, dynamic port allocation, and self-healing failover logic.",
    tech: ["Python", "Docker", "Prometheus", "Grafana", "DevOps", "Infrastructure-as-Code", "Telegram API", "VPN", "Linux"],
    github: null,
    demo: null,
    featured: true,
    placeholderType: "storj",
    accentColor: "#00ffcc",
    builtWith: "Claude Code",
    icon: "server",
  },
  {
    id: "ft_transcendence",
    title: "ft_transcendence — Multiplayer Web Engine",
    description:
      "Full-stack real-time Pong game. Architected WebSocket event loop, OAuth flow, REST API, and PostgreSQL schema. Handled concurrent player state, game physics, and chat persistence.",
    longDescription:
      "42 capstone: production-grade web app with WebSockets, OAuth, REST API, and PostgreSQL database. Full architecture design.",
    tech: ["JavaScript", "WebSockets", "REST API", "PostgreSQL", "Docker"],
    github: "https://github.com/pepe587/ft_transcendence",
    demo: null,
    featured: true,
    placeholderType: "game",
    accentColor: "#00ffcc",
    icon: "gamepad",
  },
  {
    id: "arkanoid2",
    title: "Arkanoid 2.0 — Arcade Physics Engine",
    description:
      "Custom game engine in C. Designed collision system, sprite animation loop, and level progression. Optimized pixel-perfect physics with low-level graphics rendering.",
    longDescription:
      "Low-level C game development: custom physics engine, SDL2 graphics, and level editor. Full system architecture from scratch.",
    tech: ["C", "Game Dev", "SDL2", "Physics"],
    github: "https://github.com/pepe587/Arkanoid2.0",
    demo: null,
    featured: true,
    placeholderType: "arcade",
    accentColor: "#39ff14",
    icon: "target",
  },
  {
    id: "streaming_esp32",
    title: "ESP32 Video Stream — Embedded Media Server",
    description:
      "Architected embedded HTTP server on microcontroller. Designed MJPEG encoder, Wi-Fi connection pool, and real-time frame buffering. Optimized for 4MB RAM constraint.",
    longDescription:
      "Embedded systems: IoT video streaming with real-time data pipelines and constrained-resource optimization. Full hardware integration.",
    tech: ["C++", "ESP32", "IoT", "MJPEG", "Embedded"],
    github: "https://github.com/pepe587/streaming_esp32",
    demo: null,
    featured: true,
    placeholderType: "streaming",
    accentColor: "#ff6b35",
    icon: "video",
  },
  {
    id: "nmap42",
    title: "nmap-42",
    description:
      "A partial reimplementation of the nmap network scanner in C. Supports SYN, NULL, FIN, XMAS, ACK, and UDP scan types.",
    longDescription:
      "Deep networking project using raw POSIX sockets and ICMP/TCP packet crafting.",
    tech: ["C", "Networking", "Raw Sockets", "POSIX"],
    github: "https://github.com/pepe587/nmap-42",
    demo: null,
    featured: false,
    placeholderType: "terminal",
    accentColor: "#00ffcc",
    icon: "search",
  },
  {
    id: "libasm",
    title: "libasm",
    description:
      "A static library of common C standard functions re-implemented entirely in x86-64 Assembly. Pure AT&T/Intel syntax asm with full Makefile.",
    longDescription:
      "Low-level systems programming — no C, no libc. Pure x86-64 assembly.",
    tech: ["Assembly", "x86-64", "Systems", "Makefile"],
    github: "https://github.com/pepe587/libasm",
    demo: null,
    featured: false,
    placeholderType: "binary",
    accentColor: "#a78bfa",
    icon: "cpu",
  },
  {
    id: "42cursus",
    title: "42 Cursus",
    description:
      "The complete collection of projects from 42 Málaga — from libft through minishell covering systems programming, algorithms, and Unix processes.",
    longDescription:
      "A progression through systems programming, algorithms, Unix processes, and inter-process communication, all in C.",
    tech: ["C", "Unix", "Algorithms", "Shell", "42 School"],
    github: "https://github.com/pepe587/42cursus",
    demo: null,
    featured: false,
    placeholderType: "code",
    accentColor: "#00ffcc",
    icon: "book",
  },
];
