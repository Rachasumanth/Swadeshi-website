const navLinks = [
  ["Home", "#home"],
  ["Research", "#research"],
  ["Technology", "#technology"],
  ["Cybersecurity", "#cybersecurity"],
  ["Semiconductor Lab", "#semiconductor"],
  ["AI Agents", "#agents"],
  ["Internships", "#internships"],
  ["About", "#about"],
  ["Contact", "#contact"],
  ["LAB", "#lab"],
];

const researchAreas = [
  {
    id: "01",
    title: "Agentic AI",
    summary: "Autonomous planning loops with constrained tools and observable execution.",
    status: "Active",
    tech: "Planning, tool-calling, memory, evaluation",
    experiments: "Task planning runtimes, multi-agent orchestration",
  },
  {
    id: "02",
    title: "Cybersecurity",
    summary: "Defensive security research across architectures, workflows, and telemetry.",
    status: "Active",
    tech: "Threat modeling, surface mapping, validation",
    experiments: "Attack-surface simulation and mitigation flows",
  },
  {
    id: "03",
    title: "AI Systems",
    summary: "Reliable AI system architecture for context-heavy and tool-rich execution.",
    status: "Active",
    tech: "LLM ops, orchestration, evaluation",
    experiments: "Context optimization and reliability benchmarking",
  },
  {
    id: "04",
    title: "MCP / Tool-Calling Systems",
    summary: "Structured protocol-based interfaces for tools, context, and execution control.",
    status: "Active",
    tech: "MCP interfaces, secure adapters, observability",
    experiments: "Capability routing and tool safety gates",
  },
  {
    id: "05",
    title: "Analog Computing",
    summary: "Early-stage exploration of analog principles for AI-adjacent systems.",
    status: "R&D Direction",
    tech: "Signal behavior, analog abstraction",
    experiments: "Concept modeling and simulation studies",
  },
  {
    id: "06",
    title: "Semiconductor Research",
    summary: "Long-horizon transistor and circuit-level intelligence hardware research.",
    status: "R&D Direction",
    tech: "Circuit fundamentals, semiconductor layers",
    experiments: "Schematic-inspired experimentation",
  },
];

const techCategories = [
  { name: "AI", items: ["Machine Learning", "Agentic Systems", "LLMs", "Model Evaluation"] },
  { name: "Systems", items: ["APIs", "Tool Calling", "MCP", "Distributed Systems"] },
  { name: "Security", items: ["Application Security", "AI Security", "Research Infrastructure"] },
  { name: "Hardware", items: ["Analog Electronics", "Semiconductor Design", "Circuit Research"] },
];

const timelinePoints = [
  { phase: "NOW", focus: "Agentic AI, Cybersecurity" },
  { phase: "NEXT", focus: "Advanced AI Systems, Research Infrastructure" },
  { phase: "LONG TERM", focus: "Analog Computing, Semiconductor Design" },
];

const labModules = [
  {
    title: "System Status",
    copy: "Core research services available in controlled experimental mode.",
    meta: ["NODE: SWA-R1", "EXPERIMENT: CONTEXT MESH", "MODEL: LAB-DEMO", "ITERATIONS: 124"],
  },
  {
    title: "Agent Runtime",
    copy: "Evaluating planning depth, tool-dependency mapping, and state transitions.",
    meta: ["NODE: SWA-AG2", "EXPERIMENT: AGENT PATH", "TOOLS: 8", "ITERATIONS: 231"],
  },
  {
    title: "Security Telemetry",
    copy: "Researching architecture visibility and defensive hypothesis validation.",
    meta: ["NODE: SWA-SC4", "EXPERIMENT: SURFACE MAP", "SIGNALS: 42", "ITERATIONS: 87"],
  },
  {
    title: "Silicon Concepts",
    copy: "Tracking analog and circuit abstraction studies for long-term semiconductor work.",
    meta: ["NODE: SWA-HW1", "EXPERIMENT: ANALOG LAB", "LAYERS: 5", "ITERATIONS: 19"],
  },
];

const topics = [
  "Agent Architecture",
  "Tool Execution",
  "Memory",
  "Context",
  "Planning",
  "Feedback",
  "Evaluation",
  "Multi-Agent Systems",
];

const internTracks = [
  "AI Agents",
  "AI/ML",
  "MCP",
  "Cybersecurity",
  "Research Workflows",
  "Semiconductor / Analog Design",
];

const create = (tag, className, text) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
};

const sanitize = (value) => value.trim().replace(/[<>]/g, "");

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const mobileNav = document.getElementById("mobile-nav");
if (mobileNav) {
  navLinks.forEach(([label, href]) => {
    const link = create("a", "mono", label);
    link.href = href;
    mobileNav.append(link);
  });
}

const menuToggle = document.querySelector(".menu-toggle");
if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    menuToggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    mobileNav.classList.toggle("open", !open);
  });
  mobileNav.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      mobileNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    }
  });
}

const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;
const preferredTheme = localStorage.getItem("swadeshi-theme");
if (preferredTheme) root.setAttribute("data-theme", preferredTheme);
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("swadeshi-theme", nextTheme);
  });
}

const researchGrid = document.getElementById("research-grid");
if (researchGrid) {
  researchAreas.forEach((area) => {
    const article = create("article", "card");
    article.innerHTML = `
      <p class="mono">${area.id}</p>
      <h3>${area.title}</h3>
      <p>${area.summary}</p>
      <p class="mono">STATUS: ${area.status}</p>
      <button type="button" aria-expanded="false">Explore research</button>
      <div class="expand">
        <p><strong>Technologies:</strong> ${area.tech}</p>
        <p><strong>Experiments:</strong> ${area.experiments}</p>
      </div>
    `;
    const button = article.querySelector("button");
    button?.addEventListener("click", () => {
      const open = article.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
    researchGrid.append(article);
  });
}

const techGrid = document.getElementById("tech-grid");
if (techGrid) {
  techCategories.forEach((group) => {
    const article = create("article", "card");
    article.innerHTML = `<h3>${group.name}</h3><p>${group.items.join(" · ")}</p>`;
    techGrid.append(article);
  });
}

const timeline = document.getElementById("timeline");
if (timeline) {
  timelinePoints.forEach((point) => {
    const card = create("article", "card");
    card.innerHTML = `<p class="mono">${point.phase}</p><p>${point.focus}</p>`;
    timeline.append(card);
  });
}

const agentTopics = document.getElementById("agent-topics");
if (agentTopics) topics.forEach((item) => agentTopics.append(create("span", "", item)));

const trackNode = document.getElementById("intern-tracks");
if (trackNode) internTracks.forEach((item) => trackNode.append(create("span", "", item)));

const modulesNode = document.getElementById("lab-modules");
const labTitle = document.getElementById("lab-module-title");
const labCopy = document.getElementById("lab-module-copy");
const labMeta = document.getElementById("lab-meta");

const renderLabModule = (index) => {
  const active = labModules[index];
  if (!active || !labTitle || !labCopy || !labMeta) return;
  labTitle.textContent = active.title;
  labCopy.textContent = active.copy;
  labMeta.innerHTML = active.meta.map((item) => `<p>${item}</p>`).join("");
};

if (modulesNode) {
  labModules.forEach((module, index) => {
    const btn = create("button", index === 0 ? "active mono" : "mono", module.title.toUpperCase());
    btn.type = "button";
    btn.addEventListener("click", () => {
      modulesNode.querySelectorAll("button").forEach((el) => el.classList.remove("active"));
      btn.classList.add("active");
      renderLabModule(index);
    });
    modulesNode.append(btn);
  });
  renderLabModule(0);
}

const submitForm = (formId) => {
  const form = document.getElementById(formId);
  if (!form) return;

  const status = form.querySelector(".form-status");
  const button = form.querySelector("button[type='submit']");
  const defaultText = button?.textContent || "Submit";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!status || !button) return;

    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    const fields = Object.entries(values).map(([key, val]) => [key, sanitize(String(val))]);
    const hasEmpty = fields.some(([, val]) => !val);

    if (hasEmpty) {
      status.className = "form-status error";
      status.textContent = "Please complete all required fields.";
      return;
    }

    button.disabled = true;
    button.textContent = button.dataset.loading || "Submitting...";
    status.className = "form-status";
    status.textContent = "Validating input...";

    await new Promise((resolve) => setTimeout(resolve, 700));

    status.className = "form-status success";
    status.textContent = "Submission captured locally. Backend endpoint can be connected securely.";
    button.disabled = false;
    button.textContent = defaultText;
    form.reset();
  });
};

submitForm("internship-form");
submitForm("contact-form");

const heroVisual = document.querySelector(".hero-visual svg");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (heroVisual && !reducedMotion) {
  const nodes = heroVisual.querySelectorAll(".orbit-nodes circle");
  window.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 18;
    heroVisual.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    nodes.forEach((node, index) => {
      const factor = index % 2 === 0 ? 1 : -1;
      node.style.transform = `translate(${x * factor * 0.25}px, ${y * factor * 0.25}px)`;
    });
  });
}
