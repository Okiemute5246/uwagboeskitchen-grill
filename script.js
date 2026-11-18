// Uwagboe's Kitchen & Grill — interactions
(() => {
  // Sticky nav background on scroll
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  // Scroll reveal
  const reveal = el => el.classList.add("is-visible");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach(reveal);
  }

  // Count-up stats
  const animateCount = el => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    const start = performance.now(), dur = 1400;
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(c => co.observe(c));
  } else {
    counters.forEach(c => (c.textContent = c.dataset.count + (c.dataset.suffix || "")));
  }

  // Menu tabs
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".menu__panel");
  tabs.forEach(tab =>
    tab.addEventListener("click", () => {
      tabs.forEach(t => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      panels.forEach(p => p.classList.remove("is-active"));
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      const panel = document.getElementById(tab.dataset.tab);
      panel.classList.add("is-active");
      // re-trigger reveal for newly shown cards
      panel.querySelectorAll(".reveal").forEach(el => {
        el.classList.remove("is-visible");
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-visible")));
      });
    })
  );

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();
})();

// Full menu page: search, dietary filters, active category, order bar
(() => {
  const items = [...document.querySelectorAll(".mitem")];
  const sections = [...document.querySelectorAll(".msec")];
  const catLinks = [...document.querySelectorAll(".cat")];
  const search = document.getElementById("msearch");
  const empty = document.getElementById("mempty");
  const filters = new Set();

  // ---- filtering ----
  const apply = () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    items.forEach(it => {
      const flags = it.dataset.flags.split(" ");
      const okFilter = [...filters].every(f => flags.includes(f));
      const okSearch = !q || it.dataset.search.includes(q);
      const visible = okFilter && okSearch;
      it.hidden = !visible;
      if (visible) { it.classList.add("is-visible"); shown++; }
    });
    sections.forEach(sec => {
      const any = sec.querySelector(".mitem:not([hidden])");
      sec.hidden = !any;
      const link = catLinks.find(a => a.getAttribute("href") === "#/menu/" + sec.id);
      if (link) {
        link.classList.toggle("is-empty", !any);
        const n = sec.querySelectorAll(".mitem:not([hidden])").length;
        link.querySelector("span").textContent = n;
      }
    });
    empty.hidden = shown > 0;
  };

  search.addEventListener("input", apply);
  document.querySelectorAll(".mfilter").forEach(btn =>
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      filters.has(f) ? filters.delete(f) : filters.add(f);
      btn.classList.toggle("is-on", filters.has(f));
      btn.setAttribute("aria-pressed", filters.has(f));
      apply();
    })
  );

  // ---- active category highlight ----
  const track = document.querySelector(".cats__track");
  const setActive = id => {
    catLinks.forEach(a => {
      const on = a.getAttribute("href") === "#/menu/" + id;
      a.classList.toggle("is-active", on);
      if (on) track.scrollTo({ left: a.offsetLeft - track.offsetWidth / 2 + a.offsetWidth / 2, behavior: "smooth" });
    });
  };
  if ("IntersectionObserver" in window) {
    const so = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-140px 0px -65% 0px" });
    sections.forEach(s => so.observe(s));
  }

  // ---- floating order bar after scrolling past hero ----
  const bar = document.querySelector(".morder");
  const hero = document.querySelector(".mhero");
  const onScroll = () => bar.classList.toggle("is-shown", !document.getElementById("view-menu").hidden && window.scrollY > hero.offsetHeight);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// ---------- Router: home <-> full menu (one page, works in iframes/sandboxes too) ----------
(() => {
  const home = document.getElementById("view-home");
  const menu = document.getElementById("view-menu");
  const navLinks = document.querySelectorAll(".nav__links a");
  let current = "";

  const jump = el => {
    if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const route = h => {
    h = h || "";
    current = h;
    const isMenu = h.startsWith("#/menu");
    const wasMenu = !menu.hidden;
    home.hidden = isMenu;
    menu.hidden = !isMenu;
    document.body.classList.toggle("menu-page", isMenu);
    navLinks.forEach(a => a.classList.toggle("is-current", isMenu && a.getAttribute("href") === "#/menu"));
    let target = null;
    if (isMenu) { const id = h.split("/")[2]; target = id ? document.getElementById(id) : null; }
    else if (h.length > 1) { target = document.getElementById(h.slice(1)); }
    if (target && isMenu === wasMenu) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      jump(target);
      requestAnimationFrame(() => requestAnimationFrame(() => jump(target)));
    }
    window.dispatchEvent(new Event("scroll"));
  };

  // Handle every in-page link ourselves, so nothing relies on the browser's hash navigation
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    const h = a.getAttribute("href");
    try { if (location.hash !== h) history.pushState(null, "", h); } catch (_) { /* sandboxed: no URL updates */ }
    route(h === "#top" ? "" : h);
  });

  const fromUrl = () => { let h = ""; try { h = location.hash; } catch (_) {} if (h !== current) route(h); };
  window.addEventListener("popstate", fromUrl);
  window.addEventListener("hashchange", fromUrl);
  route((() => { try { return location.hash; } catch (_) { return ""; } })());
})();
