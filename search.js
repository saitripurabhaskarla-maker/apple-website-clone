// ── Apple Clone Search ──────────────────────────────────────────
// All search suggestions are plain <a> anchor tags pointing to
// the relevant HTML page in the multi-file site.
// ────────────────────────────────────────────────────────────────

const LINKS = [
  // iPhone
  { label: "iPhone 16 Pro",          href: "iphone (1).html", tag: "iPhone",  icon: "📱" },
  { label: "iPhone 16",              href: "iphone (1).html", tag: "iPhone",  icon: "📱" },
  { label: "Compare iPhone models",  href: "iphone (1).html#compare", tag: "iPhone", icon: "📱" },
  // Mac
  { label: "MacBook Air",            href: "mac.html",    tag: "Mac",     icon: "💻" },
  { label: "MacBook Pro",            href: "mac.html",    tag: "Mac",     icon: "💻" },
  { label: "Mac mini",               href: "mac.html",    tag: "Mac",     icon: "💻" },
  { label: "Mac Studio",             href: "mac.html",    tag: "Mac",     icon: "💻" },
  { label: "Compare Mac models",     href: "mac.html#compare", tag: "Mac", icon: "💻" },
  // iPad
  { label: "iPad Pro",               href: "ipad.html",   tag: "iPad",    icon: "📓" },
  { label: "iPad Air",               href: "ipad.html",   tag: "iPad",    icon: "📓" },
  { label: "iPad mini",              href: "ipad.html",   tag: "iPad",    icon: "📓" },
  // Watch
  { label: "Apple Watch Series 10",  href: "watch.html",  tag: "Watch",   icon: "⌚" },
  { label: "Apple Watch Ultra 2",    href: "watch.html",  tag: "Watch",   icon: "⌚" },
  { label: "Apple Watch SE",         href: "watch.html",  tag: "Watch",   icon: "⌚" },
  // Store
  { label: "Apple Store",            href: "store.html",  tag: "Store",   icon: "🛍️" },
  { label: "Shop iPhone",            href: "store.html",  tag: "Store",   icon: "🛍️" },
  { label: "Shop Mac",               href: "store.html",  tag: "Store",   icon: "🛍️" },
  { label: "Financing options",      href: "store.html#financing", tag: "Store", icon: "🛍️" },
  // Support
  { label: "Get support",            href: "support.html",tag: "Support", icon: "🆘" },
  { label: "Apple ID",               href: "support.html#appleid", tag: "Support", icon: "🆘" },
  { label: "iCloud",                 href: "support.html#icloud", tag: "Support", icon: "🆘" },
  { label: "Repair & service",       href: "support.html#repair", tag: "Support", icon: "🆘" },
];

const DEFAULT_SHOWN = [
  "iPhone 16 Pro", "MacBook Air", "iPad Pro",
  "Apple Watch Series 10", "Apple Store", "Get support"
];

// ── DOM refs ──────────────────────────────────────────────────────
const toggle   = document.getElementById("searchToggle");
const overlay  = document.getElementById("searchOverlay");
const input    = document.getElementById("searchInput");
const cancel   = document.getElementById("cancelSearch");
const list     = document.getElementById("suggestionsList");

// ── Helpers ───────────────────────────────────────────────────────
function renderItems(items) {
  list.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${item.href}">
        <span class="s-icon">${item.icon}</span>
        ${item.label}
        <span class="s-tag">${item.tag}</span>
      </a>`;
    list.appendChild(li);
  });
}

function showDefaults() {
  const defaults = LINKS.filter(l => DEFAULT_SHOWN.includes(l.label));
  renderItems(defaults);
}

function filterLinks(query) {
  const q = query.toLowerCase();
  const matches = LINKS.filter(l =>
    l.label.toLowerCase().includes(q) || l.tag.toLowerCase().includes(q)
  );
  renderItems(matches.length ? matches : [{ label: "No results found", href: "#", tag: "", icon: "🔍" }]);
}

// ── Events ────────────────────────────────────────────────────────
toggle.addEventListener("click", () => {
  overlay.classList.add("active");
  showDefaults();
  setTimeout(() => input.focus(), 60);
});

cancel.addEventListener("click", () => {
  overlay.classList.remove("active");
  input.value = "";
});

input.addEventListener("input", () => {
  const q = input.value.trim();
  if (q === "") { showDefaults(); return; }
  filterLinks(q);
});

input.addEventListener("keydown", e => {
  if (e.key === "Escape") cancel.click();
  if (e.key === "Enter") {
    const q = input.value.trim().toLowerCase();
    const match = LINKS.find(l => l.label.toLowerCase().startsWith(q));
    if (match) window.location.href = match.href;
  }
});

// Close overlay when clicking outside
document.addEventListener("click", e => {
  if (overlay.classList.contains("active") &&
      !overlay.contains(e.target) && e.target !== toggle) {
    cancel.click();
  }
});