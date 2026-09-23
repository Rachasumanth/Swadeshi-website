/**
 * SWADESHI AI PRIVATE LIMITED — CORE CLIENT ENGINE & INTERACTIVE RUNTIMES
 * Domain: Artificial Intelligence / Machine Learning / Electronics
 * Established: 9 March 2026
 */

(function () {
  "use strict";

  // =========================================================================
  // 1. BOOT SEQUENCE & LOADING EXPERIENCE
  // =========================================================================
  const initBootLoader = () => {
    const loader = document.getElementById("system-boot-loader");
    if (!loader) return;

    // Check if already booted in this session to avoid annoyance
    const hasBooted = sessionStorage.getItem("swadeshi-booted");
    if (hasBooted) {
      loader.classList.add("hidden");
      return;
    }

    const logEl = document.getElementById("boot-log-text");
    const progressEl = document.getElementById("boot-progress-bar");

    const steps = [
      { text: "SWADESHI AI PROTOCOL / SYS_INIT", pct: 30 },
      { text: "MOUNTING RESEARCH RUNTIMES", pct: 65 },
      { text: "CORE INSTRUMENTS / NOMINAL", pct: 100 }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        if (logEl) logEl.textContent = steps[currentStep].text;
        if (progressEl) progressEl.style.width = steps[currentStep].pct + "%";
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add("hidden");
          sessionStorage.setItem("swadeshi-booted", "true");
        }, 220);
      }
    }, 180);
  };

  // =========================================================================
  // 2. THEME SYSTEM (LIGHT / DARK)
  // =========================================================================
  const initTheme = () => {
    const root = document.documentElement;
    const toggles = document.querySelectorAll(".theme-toggle");

    const savedTheme = localStorage.getItem("swadeshi-theme") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    root.setAttribute("data-theme", savedTheme);

    const updateToggleState = (theme) => {
      toggles.forEach((btn) => {
        btn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
        btn.setAttribute("title", `Theme: ${theme.toUpperCase()}`);
      });
    };

    updateToggleState(savedTheme);

    toggles.forEach((btn) => {
      btn.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "light";
        const next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem("swadeshi-theme", next);
        updateToggleState(next);
      });
    });
  };

  // =========================================================================
  // 3. TELEMETRY HEADER UPDATER (UTC CLOCK & POINTER COORDINATES)
  // =========================================================================
  const initTelemetryHeader = () => {
    const clockEl = document.getElementById("telem-clock");
    const coordEl = document.getElementById("telem-coords");

    if (clockEl) {
      const updateClock = () => {
        const now = new Date();
        const utcStr = now.toISOString().substring(11, 19) + " UTC";
        clockEl.textContent = utcStr;
      };
      updateClock();
      setInterval(updateClock, 1000);
    }

    if (coordEl && window.innerWidth > 768) {
      window.addEventListener("pointermove", (e) => {
        const x = String(e.clientX).padStart(4, "0");
        const y = String(e.clientY).padStart(4, "0");
        coordEl.textContent = `PTR: [X:${x} Y:${y}]`;
      }, { passive: true });
    }
  };

  // =========================================================================
  // 4. MOBILE NAVIGATION DRAWER
  // =========================================================================
  const initMobileNav = () => {
    const toggle = document.querySelector(".menu-toggle");
    const drawer = document.querySelector(".mobile-nav-drawer");
    if (!toggle || !drawer) return;

    const toggleNav = (open) => {
      const state = typeof open === "boolean" ? open : !drawer.classList.contains("open");
      drawer.classList.toggle("open", state);
      toggle.setAttribute("aria-expanded", String(state));
    };

    toggle.addEventListener("click", () => toggleNav());

    drawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => toggleNav(false));
    });

    document.addEventListener("click", (e) => {
      if (!toggle.contains(e.target) && !drawer.contains(e.target) && drawer.classList.contains("open")) {
        toggleNav(false);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("open")) {
        toggleNav(false);
      }
    });
  };

  // =========================================================================
  // 5. SIGNATURE INTERACTION: "ENTER THE LAB" TRANSITION MODAL
  // =========================================================================
  const initSignatureLabModal = () => {
    const modal = document.getElementById("signature-lab-modal");
    const triggers = document.querySelectorAll(".trigger-lab-modal");
    const closeBtns = document.querySelectorAll(".close-lab-modal");

    if (!modal) return;

    const openModal = (e) => {
      if (e) e.preventDefault();
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };

    triggers.forEach((btn) => btn.addEventListener("click", openModal));
    closeBtns.forEach((btn) => btn.addEventListener("click", closeModal));

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });
  };

  // =========================================================================
  // 6. HERO INTERACTIVE VISUALIZER
  // =========================================================================
  const initHeroVisualizer = () => {
    const visual = document.querySelector(".hero-canvas-svg");
    if (!visual) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const dynamicGroup = visual.querySelector(".hero-dynamic-layer");
    const nodes = visual.querySelectorAll(".hero-node");

    visual.parentElement.addEventListener("pointermove", (e) => {
      const rect = visual.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      if (dynamicGroup) {
        dynamicGroup.style.transform = `translate(${relX * 12}px, ${relY * 12}px)`;
      }

      nodes.forEach((node, idx) => {
        const factor = (idx % 2 === 0 ? 1 : -1) * (14 + idx * 4);
        node.style.transform = `translate(${relX * factor}px, ${relY * factor}px)`;
      });
    }, { passive: true });

    visual.parentElement.addEventListener("pointerleave", () => {
      if (dynamicGroup) dynamicGroup.style.transform = "translate(0px, 0px)";
      nodes.forEach((node) => {
        node.style.transform = "translate(0px, 0px)";
      });
    });
  };

  // =========================================================================
  // 7. AGENTIC AI INTERACTIVE FLOW STEPPER
  // =========================================================================
  const initAgentFlowStepper = () => {
    const stepNodes = document.querySelectorAll(".agent-step-node");
    const titleEl = document.getElementById("agent-step-title-display");
    const descEl = document.getElementById("agent-step-desc-display");
    const codeEl = document.getElementById("agent-step-code-display");
    const autoRunBtn = document.getElementById("agent-autorun-btn");

    if (!stepNodes.length || !titleEl || !descEl || !codeEl) return;

    const stepData = [
      {
        title: "01 — TASK INPUT & CONTEXT PARSING",
        desc: "Autonomous agent ingests natural-language goals, parses ambient environment constraints, and retrieves context from the Model Context Protocol (MCP) host.",
        code: `// SYSTEM: MCP Context Ingestion\n{\n  "session_id": "swa-ag-892",\n  "objective": "Design robust state machine for low-power sensor bus",\n  "context_buffers": ["registers.json", "timing_constraints.sdc"],\n  "permission_level": "read_write_sandboxed"\n}`
      },
      {
        title: "02 — REASONING & HYPOTHESIS SYNTHESIS",
        desc: "Constructs semantic graph of the problem space, formulates intermediate reasoning tokens, and evaluates dependency trees before planning actions.",
        code: `// CHAIN-OF-THOUGHT INFERENCE\n1. Analyze bus specifications: I2C vs SPI constraints.\n2. Power budget: < 1.8mW during active measurement phase.\n3. Formulate sub-goal hypothesis: Split clock gating from core logic.`
      },
      {
        title: "03 — DETERMINISTIC ACTION PLANNING",
        desc: "Synthesizes structured multi-step execution schedule. Validates dependency graph and sets fallback recovery branches for failure states.",
        code: `// ACTION EXECUTION PLAN\n[\n  { "step": 1, "tool": "mcp:fs:read_file", "path": "/specs/bus.vhdl" },\n  { "step": 2, "tool": "eda:synth:lint_check", "args": ["--strict"] },\n  { "step": 3, "tool": "eval:power_est", "target_mw": 1.8 }\n]`
      },
      {
        title: "04 — SECURE TOOL-CALLING (MCP)",
        desc: "Issues typed RPC calls over the Model Context Protocol to sandboxed tools, hardware simulation harnesses, and static analysis checkers.",
        code: `// MCP TOOL CALL DISPATCH\nPOST /rpc/mcp.v1/execute\n{\n  "tool": "eda_linter",\n  "parameters": {\n    "file": "/specs/bus.vhdl",\n    "ruleset": "ieee-1076-2008"\n  },\n  "auth_token": "bearer mcp_sig_991b"\n}`
      },
      {
        title: "05 — SANDBOXED EXECUTION",
        desc: "Tool processes request in an isolated environment. Signals, telemetry, compiler returns, or API outputs are captured deterministically.",
        code: `// RUNTIME EXECUTION OUTPUT\n[STATUS: SUCCESS]\nExit code: 0\nTiming violations: 0\nEstimated dynamic power: 1.42mW\nPeak clock skew: 42ps\nMemory overhead: 24.1KB`
      },
      {
        title: "06 — MULTI-DIMENSIONAL OBSERVATION",
        desc: "Agent observes execution results, matches telemetry against target thresholds, and computes loss/error differential against the goal.",
        code: `// OBSERVATION TELEMETRY EVALUATION\nTarget Power: <= 1.80mW  | Measured: 1.42mW [PASS]\nTiming Margin: >= 120ps  | Measured: 185ps  [PASS]\nSyntax Integrity: 100%    | Regressions: 0   [PASS]`
      },
      {
        title: "07 — ITERATION & CONVERGENCE",
        desc: "If constraints are met, commits state to persistent memory and emits verified artifact. If non-optimal, loops back with differential feedback.",
        code: `// STATE CONVERGENCE & MEMORY PERSISTENCE\n{\n  "state": "CONVERGED",\n  "iterations_executed": 3,\n  "artifact_hash": "sha256:7f4a9b0c2e...",\n  "memory_updated": true,\n  "ready_for_verification": true\n}`
      }
    ];

    const activateStep = (index) => {
      stepNodes.forEach((node, idx) => {
        node.classList.toggle("active", idx === index);
      });
      const data = stepData[index];
      if (data) {
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
        codeEl.textContent = data.code;
      }
    };

    stepNodes.forEach((node, index) => {
      node.addEventListener("click", () => activateStep(index));
    });

    let autoRunTimer = null;
    let autoRunIndex = 0;

    if (autoRunBtn) {
      autoRunBtn.addEventListener("click", () => {
        if (autoRunTimer) {
          clearInterval(autoRunTimer);
          autoRunTimer = null;
          autoRunBtn.textContent = "Auto Run Sequence";
          return;
        }

        autoRunBtn.textContent = "Halt Sequence";
        autoRunIndex = 0;
        activateStep(autoRunIndex);

        autoRunTimer = setInterval(() => {
          autoRunIndex = (autoRunIndex + 1) % stepNodes.length;
          activateStep(autoRunIndex);
          if (autoRunIndex === stepNodes.length - 1) {
            setTimeout(() => {
              clearInterval(autoRunTimer);
              autoRunTimer = null;
              autoRunBtn.textContent = "Auto Run Sequence";
            }, 1200);
          }
        }, 1500);
      });
    }

    // Default activate first step
    activateStep(0);
  };

  // =========================================================================
  // 8. SEMICONDUCTOR & ANALOG WAVEFORM OSCILLOSCOPE
  // =========================================================================
  const initOscilloscope = () => {
    const canvas = document.getElementById("oscilloscope-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const freqInput = document.getElementById("semi-freq-slider");
    const waveTypeSelect = document.getElementById("semi-wavetype-select");
    const freqDisplay = document.getElementById("semi-freq-val");

    let animationFrame = null;
    let phase = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = (w, h) => {
      ctx.strokeStyle = "#162b22";
      ctx.lineWidth = 1;
      ctx.beginPath();

      const step = 25;
      for (let x = 0; x < w; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Center crosshair axis
      ctx.strokeStyle = "#254839";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);
      drawGrid(w, h);

      const freq = freqInput ? parseFloat(freqInput.value) : 2.5;
      const waveType = waveTypeSelect ? waveTypeSelect.value : "sine";
      const amp = h * 0.35;
      const centerY = h / 2;

      ctx.lineWidth = 2.2;
      ctx.strokeStyle = "#38ef7d";
      ctx.shadowColor = "rgba(56, 239, 125, 0.4)";
      ctx.shadowBlur = 8;
      ctx.beginPath();

      for (let x = 0; x < w; x++) {
        const t = (x / w) * freq * Math.PI * 2 + phase;
        let y = centerY;

        if (waveType === "sine") {
          y = centerY + Math.sin(t) * amp;
        } else if (waveType === "square") {
          y = centerY + (Math.sin(t) >= 0 ? amp : -amp);
        } else if (waveType === "sawtooth") {
          y = centerY + ((t % (Math.PI * 2)) / Math.PI - 1) * amp;
        } else if (waveType === "analog-composite") {
          // Complex analog simulation with 2nd & 3rd harmonics + thermal noise
          const harmonic2 = Math.sin(t * 2) * (amp * 0.25);
          const harmonic3 = Math.cos(t * 3) * (amp * 0.12);
          const noise = (Math.random() - 0.5) * 3;
          y = centerY + Math.sin(t) * (amp * 0.7) + harmonic2 + harmonic3 + noise;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      phase += 0.04;
      animationFrame = requestAnimationFrame(render);
    };

    if (freqInput && freqDisplay) {
      freqInput.addEventListener("input", () => {
        freqDisplay.textContent = `${parseFloat(freqInput.value).toFixed(1)} GHz`;
      });
    }

    render();
  };

  // =========================================================================
  // 9. THE LAB RESEARCH CONSOLE INTERACTIVE MODULES
  // =========================================================================
  const initLabConsole = () => {
    const moduleBtns = document.querySelectorAll(".console-module-btn");
    const displayTitle = document.getElementById("console-display-title");
    const displayDesc = document.getElementById("console-display-desc");
    const telemNode = document.getElementById("console-telem-node");
    const telemStatus = document.getElementById("console-telem-status");
    const telemIter = document.getElementById("console-telem-iter");
    const telemLatency = document.getElementById("console-telem-latency");
    const visualStage = document.getElementById("console-stage-content");

    if (!moduleBtns.length || !displayTitle || !displayDesc) return;

    const moduleData = [
      {
        id: "01",
        name: "Agent Runtime & Planning Mesh",
        desc: "Real-time inspection of active agent task execution, tool dispatch latency, and semantic graph memory retention across nodes.",
        node: "SWA-AG-NODE-01",
        status: "ONLINE / NOMINAL",
        iter: "1,842",
        latency: "14.2 ms",
        visual: `<div class="mono" style="font-size: 0.8rem; line-height: 1.6; color: var(--text-primary); width: 100%;">
          <p><strong>[ACTIVE GRAPH]</strong>: Multi-Agent Consensus Mesh</p>
          <p><strong>[TASK RUNNER]</strong>: tool_mcp_dispatch_eval (PID 4091)</p>
          <p><strong>[CONTEXT RETENTION]</strong>: 128,490 tokens @ 99.8% precision</p>
          <div style="margin-top: 1rem; padding: 0.75rem; background: var(--surface); border: 1px solid var(--line); border-radius: 4px;">
            <code>>> STEP 4: verify_boundary_conditions() -> [EXIT 0]</code>
          </div>
        </div>`
      },
      {
        id: "02",
        name: "Defensive Attack Surface Telemetry",
        desc: "Simulated perimeter reconnaissance telemetry, protocol anomaly detection, and defensive hypothesis verification pipeline.",
        node: "SWA-SEC-NODE-04",
        status: "ACTIVE TESTING",
        iter: "934",
        latency: "8.7 ms",
        visual: `<div class="mono" style="font-size: 0.8rem; line-height: 1.6; color: var(--text-primary); width: 100%;">
          <p><strong>[SCOPE]</strong>: Authorized Defensive Boundary Evaluation</p>
          <p><strong>[PROTOCOL AUDIT]</strong>: TLS 1.3 / mTLS Mesh Verification</p>
          <p><strong>[ANOMALY SCORE]</strong>: 0.002 (Within Baseline Limits)</p>
          <div style="margin-top: 1rem; padding: 0.75rem; background: var(--surface); border: 1px solid var(--line); border-radius: 4px;">
            <code>>> DISCLOSURE PROTOCOL: SEC-SWA-2026-RFC COMPLIANT</code>
          </div>
        </div>`
      },
      {
        id: "03",
        name: "Model Context Protocol (MCP) Router",
        desc: "Structured capability discovery, secure tool registry, and memory buffer arbitration connecting agents to physical and digital tools.",
        node: "SWA-MCP-ROUTER-09",
        status: "ONLINE / NOMINAL",
        iter: "4,210",
        latency: "3.1 ms",
        visual: `<div class="mono" style="font-size: 0.8rem; line-height: 1.6; color: var(--text-primary); width: 100%;">
          <p><strong>[MCP SPEC]</strong>: v1.0 Standard Protocol Adapter</p>
          <p><strong>[REGISTERED SERVERS]</strong>: 12 Tools | 4 Memory Stores</p>
          <p><strong>[RPC THROUGHPUT]</strong>: 480 ops/sec continuous stream</p>
          <div style="margin-top: 1rem; padding: 0.75rem; background: var(--surface); border: 1px solid var(--line); border-radius: 4px;">
            <code>>> ROUTE: client -> mcp://hardware.analog/v1/read_probe</code>
          </div>
        </div>`
      },
      {
        id: "04",
        name: "Analog Computing & Silicon Concepts",
        desc: "Transistor-level signal flow studies, continuous-time differential simulation, and analog compute-in-memory architecture exploration.",
        node: "SWA-HW-LAB-02",
        status: "R&D DIRECTION",
        iter: "219",
        latency: "0.4 ms (Analog)",
        visual: `<div class="mono" style="font-size: 0.8rem; line-height: 1.6; color: var(--text-primary); width: 100%;">
          <p><strong>[PHYSICS MODEL]</strong>: Sub-threshold MOSFET Conduction</p>
          <p><strong>[SIGNAL FORM]</strong>: Continuous Voltage Differential</p>
          <p><strong>[ROADMAP]</strong>: Analog Neural Accumulator Architecture</p>
          <div style="margin-top: 1rem; padding: 0.75rem; background: var(--surface); border: 1px solid var(--line); border-radius: 4px;">
            <code>>> TRANSISTOR BIAS: V_gs = 0.35V | I_ds = 42nA [STABLE]</code>
          </div>
        </div>`
      }
    ];

    const selectModule = (index) => {
      moduleBtns.forEach((btn, idx) => {
        btn.classList.toggle("active", idx === index);
      });

      const m = moduleData[index];
      if (m) {
        displayTitle.textContent = m.name;
        displayDesc.textContent = m.desc;
        if (telemNode) telemNode.textContent = m.node;
        if (telemStatus) telemStatus.textContent = m.status;
        if (telemIter) telemIter.textContent = m.iter;
        if (telemLatency) telemLatency.textContent = m.latency;
        if (visualStage) visualStage.innerHTML = m.visual;
      }
    };

    moduleBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => selectModule(index));
    });

    selectModule(0);
  };

  // =========================================================================
  // 10. RESEARCH CARD ACCORDION EXPANSION
  // =========================================================================
  const initResearchCardDrawers = () => {
    const cards = document.querySelectorAll(".research-card");
    cards.forEach((card) => {
      const btn = card.querySelector(".card-toggle-btn");
      if (!btn) return;

      btn.addEventListener("click", () => {
        const isOpen = card.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(isOpen));
        btn.textContent = isOpen ? "Collapse details" : "Explore research";
      });
    });
  };

  // =========================================================================
  // 11. FORM HANDLING (INTERNSHIP & CONTACT) WITH VALIDATION & FEEDBACK
  // =========================================================================
  const initForm = (formId, successPrefix) => {
    const form = document.getElementById(formId);
    if (!form) return;

    const statusEl = form.querySelector(".form-status");
    const submitBtn = form.querySelector("button[type='submit']");
    const originalBtnText = submitBtn ? submitBtn.textContent : "Submit";

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!statusEl || !submitBtn) return;

      // Reset status
      statusEl.className = "form-status";
      statusEl.style.display = "none";

      const formData = new FormData(form);
      const values = Object.fromEntries(formData.entries());

      // Validation
      const emptyFields = Object.entries(values).filter(([, val]) => !String(val).trim());
      if (emptyFields.length > 0) {
        statusEl.className = "form-status error";
        statusEl.textContent = "Please complete all required fields.";
        statusEl.style.display = "block";
        return;
      }

      const emailVal = values.email ? String(values.email).trim() : "";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailVal && !emailRegex.test(emailVal)) {
        statusEl.className = "form-status error";
        statusEl.textContent = "Please provide a valid institutional or personal email address.";
        statusEl.style.display = "block";
        return;
      }

      // Simulate loading state
      submitBtn.disabled = true;
      submitBtn.textContent = "Validating & Submitting...";
      statusEl.className = "form-status";
      statusEl.textContent = "Transmitting application parameters...";
      statusEl.style.display = "block";

      await new Promise((resolve) => setTimeout(resolve, 800));

      const refCode = `${successPrefix}-${Math.floor(1000 + Math.random() * 9000)}`;

      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;

      statusEl.className = "form-status success";
      statusEl.innerHTML = `<strong>Application Recorded.</strong> Reference ID: <code>${refCode}</code>. Our research team reviews submissions on a rolling basis. Official contact: <a href="mailto:internship@swadeshi.dev">internship@swadeshi.dev</a>.`;
      statusEl.style.display = "block";

      form.reset();
    });
  };

  // =========================================================================
  // 12. RUNTIME INITIALIZATION
  // =========================================================================
  document.addEventListener("DOMContentLoaded", () => {
    initBootLoader();
    initTheme();
    initTelemetryHeader();
    initMobileNav();
    initSignatureLabModal();
    initHeroVisualizer();
    initAgentFlowStepper();
    initOscilloscope();
    initLabConsole();
    initResearchCardDrawers();

    initForm("internship-form", "SWA-INT");
    initForm("contact-form", "SWA-MSG");

    // Dynamic current year
    const yearEl = document.getElementById("curr-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
