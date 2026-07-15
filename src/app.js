// app.js vanilla SPA logic. Reads window.SITE_DATA (inlined at build time)
// and renders the six views. View state is mirrored to location.hash so URLs
// are shareable and the browser back/forward buttons work.
(function () {
  "use strict";

  var DATA = window.SITE_DATA;
  if (!DATA) {
    document.body.innerHTML =
      '<div class="noscript"><h1>NeoRevived</h1><p>Site data failed to load. Try refreshing; if it persists, file an issue.</p></div>';
    return;
  }

  var ENTRIES = DATA.entries; // { shims: [...], streaming: [...], ... }
  var NEWS = DATA.news;       // [{ id, date, title, author, tags, summary, bodyHtml }]
  var SPECS = DATA.specs;     // [{ section, order, type, rows?|quirks?|bodyHtml? }]

  var ENTRY_CATS = ["shims", "streaming", "decomp", "projects"];

  var state = {
    view: "listing",     // listing | detail | specs | news | news-detail | contribute
    category: "shims",
    statusFilter: "all",
    search: "",
    sortKey: "name",
    sortDir: "asc",
    entry: null,         // { name, category }
    newsId: null,
  };

  // ---------- helpers ----------
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function findEntry(category, name) {
    var list = ENTRIES[category] || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].name === name) return list[i];
    }
    return null;
  }
  function findNews(id) {
    for (var i = 0; i < NEWS.length; i++) {
      if (NEWS[i].id === id) return NEWS[i];
    }
    return null;
  }

  // ---------- hash routing ----------
  function parseHash() {
    var h = location.hash.replace(/^#\/?/, "");
    if (!h) return null;
    var parts = h.split("/");
    if (parts[0] === "entry" && parts[1] && parts[2]) {
      return { view: "detail", category: parts[1], name: decodeURIComponent(parts[2]) };
    }
    if (parts[0] === "news" && parts[1]) {
      return { view: "news-detail", id: decodeURIComponent(parts[1]) };
    }
    if (parts[0] === "news") return { view: "news" };
    if (parts[0] === "specs") return { view: "specs" };
    if (parts[0] === "contribute") return { view: "contribute" };
    if (ENTRY_CATS.indexOf(parts[0]) !== -1) return { view: "listing", category: parts[0] };
    return null;
  }

  function setHash(view) {
    var h = "";
    if (view === "listing") h = state.category;
    else if (view === "detail") h = "entry/" + state.category + "/" + encodeURIComponent(state.entry.name);
    else if (view === "news") h = "news";
    else if (view === "news-detail") h = "news/" + encodeURIComponent(state.newsId);
    else if (view === "specs") h = "specs";
    else if (view === "contribute") h = "contribute";
    if (("#/" + h) !== location.hash) location.hash = "/" + h;
  }

  function applyHash() {
    var p = parseHash();
    if (!p) {
      showView("listing");
      return;
    }
    if (p.view === "listing") {
      state.category = p.category;
      resetFilters();
      showView("listing");
    } else if (p.view === "detail") {
      var entry = findEntry(p.category, p.name);
      if (!entry) { showView("listing"); return; }
      state.category = p.category;
      state.entry = entry;
      showView("detail");
    } else if (p.view === "news") {
      showView("news");
    } else if (p.view === "news-detail") {
      var post = findNews(p.id);
      if (!post) { showView("news"); return; }
      state.newsId = p.id;
      showView("news-detail");
    } else {
      showView(p.view);
    }
  }

  // ---------- view switching ----------
  function setActivePage(id) {
    var pages = document.querySelectorAll(".page");
    for (var i = 0; i < pages.length; i++) pages[i].classList.remove("active");
    var page = $("page-" + id);
    if (page) page.classList.add("active");
    window.scrollTo(0, 0);
  }

  function setActiveNav(matcher) {
    var links = document.querySelectorAll("header nav a");
    for (var i = 0; i < links.length; i++) links[i].classList.remove("active");
    for (var j = 0; j < links.length; j++) {
      if (matcher(links[j])) { links[j].classList.add("active"); break; }
    }
  }

  function showView(view) {
    state.view = view;
    if (view !== "detail" && view !== "news-detail") setHash(view);

    if (view === "listing") {
      setActivePage("listing");
      setActiveNav(function (a) {
        return a.dataset.page === "listing" && a.dataset.cat === state.category;
      });
      $("cat-title").textContent = cap(state.category);
      renderTable();
    } else if (view === "detail") {
      setActivePage("detail");
      setActiveNav(function (a) {
        return a.dataset.page === "listing" && a.dataset.cat === state.category;
      });
      renderDetail();
    } else if (view === "specs") {
      setActivePage("specs");
      setActiveNav(function (a) { return a.dataset.page === "specs"; });
      renderSpecs();
    } else if (view === "news") {
      setActivePage("news");
      setActiveNav(function (a) { return a.dataset.page === "news"; });
      renderNews();
    } else if (view === "news-detail") {
      setActivePage("news-detail");
      setActiveNav(function (a) { return a.dataset.page === "news"; });
      renderNewsDetail();
    } else if (view === "contribute") {
      setActivePage("contribute");
      setActiveNav(function (a) { return a.dataset.page === "contribute"; });
    }
  }

  // ---------- listing ----------
  function resetFilters() {
    state.statusFilter = "all";
    state.search = "";
    $("search-input").value = "";
    var btns = document.querySelectorAll("#filter-bar button");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("active", btns[i].dataset.status === "all");
    }
  }

  function renderTable() {
    var list = (ENTRIES[state.category] || []).slice();

    if (state.statusFilter !== "all") {
      list = list.filter(function (e) { return e.status === state.statusFilter; });
    }
    if (state.search) {
      var q = state.search.toLowerCase();
      list = list.filter(function (e) {
        return (
          (e.humanname || e.name).toLowerCase().indexOf(q) !== -1 ||
          e.name.toLowerCase().indexOf(q) !== -1 ||
          e.notes.toLowerCase().indexOf(q) !== -1 ||
          e.status.toLowerCase().indexOf(q) !== -1 ||
          (e.tags || []).some(function (t) { return t.toLowerCase().indexOf(q) !== -1; })
        );
      });
    }

    list.sort(function (a, b) {
      var ka = a[state.sortKey], kb = b[state.sortKey];
      if (ka < kb) return state.sortDir === "asc" ? -1 : 1;
      if (ka > kb) return state.sortDir === "asc" ? 1 : -1;
      return 0;
    });

    $("entry-count").textContent = list.length + " entr" + (list.length === 1 ? "y" : "ies");

    var tbody = $("entry-tbody");
    if (list.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="4" class="empty">No entries match your filter.</td></tr>';
      return;
    }

    var html = list.map(function (e) {
      return (
        '<tr class="entry-row" data-cat="' + escapeHtml(e.category) + '" data-name="' + escapeHtml(e.name) + '">' +
          '<td class="name"><a>' + escapeHtml(e.humanname || e.name) + '</a></td>' +
          '<td><span class="status status-' + escapeHtml(e.status) + '">' + escapeHtml(e.status) + '</span></td>' +
          '<td class="updated">' + escapeHtml(e.updated) + '</td>' +
          '<td class="notes">' + escapeHtml(e.notes) + '</td>' +
        '</tr>'
      );
    }).join("");
    tbody.innerHTML = html;

    var rows = tbody.querySelectorAll(".entry-row");
    for (var i = 0; i < rows.length; i++) {
      rows[i].addEventListener("click", onEntryClick);
    }
  }

  function onEntryClick(ev) {
    var row = ev.currentTarget;
    var category = row.dataset.cat;
    var name = row.dataset.name;
    var entry = findEntry(category, name);
    if (!entry) return;
    state.category = category;
    state.entry = entry;
    showView("detail");
  }

  function onSort(ev) {
    var th = ev.currentTarget;
    var key = th.dataset.sort;
    if (state.sortKey === key) {
      state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
    } else {
      state.sortKey = key;
      state.sortDir = "asc";
    }
    renderTable();
  }

  // ---------- detail ----------
  function renderDetail() {
    var e = state.entry;
    if (!e) { showView("listing"); return; }
    $("detail-title").textContent = e.humanname || e.name;
    $("detail-breadcrumb-name").textContent = e.humanname || e.name;
    var back = $("detail-back");
    back.textContent = cap(e.category);
    back.onclick = function () { state.category = e.category; resetFilters(); showView("listing"); };

    var statusEl = $("detail-status");
    statusEl.textContent = e.status;
    statusEl.className = "status status-" + e.status;

    $("detail-updated").textContent = e.updated;
    $("detail-author").textContent = e.author;
    $("detail-license").textContent = e.license || "—";

    var tagsEl = $("detail-tags");
    tagsEl.innerHTML = "";
    (e.tags || []).forEach(function (t) { tagsEl.appendChild(el("span", "tag", t)); });

    $("detail-body").innerHTML = e.bodyHtml || "<p><em>No content.</em></p>";
  }

  // ---------- specs ----------
  var specsRendered = false;
  function renderSpecs() {
    if (specsRendered) return;
    var container = $("specs-container");
    container.innerHTML = "";

    if (!SPECS || SPECS.length === 0) {
      container.appendChild(el("div", "empty", "No specs have been added yet."));
      specsRendered = true;
      return;
    }

    SPECS.forEach(function (s) {
      var section = el("div", "specs-section");
      section.appendChild(el("h2", null, s.section));

      if (s.type === "table" && s.rows) {
        var tbl = document.createElement("table");
        tbl.className = "specs-table";
        s.rows.forEach(function (r) {
          var tr = document.createElement("tr");
          var k = el("td", "spec-key", r.key);
          var v = el("td", "spec-val");
          v.innerHTML = r.value; // allow inline code in spec values
          tr.appendChild(k); tr.appendChild(v);
          tbl.appendChild(tr);
        });
        section.appendChild(tbl);
      } else if (s.type === "quirks" && s.quirks) {
        s.quirks.forEach(function (q) {
          var wrap = el("div", "quirk");
          wrap.appendChild(el("div", "quirk-label", q.label));
          var desc = el("div", "quirk-desc");
          desc.innerHTML = q.desc;
          wrap.appendChild(desc);
          section.appendChild(wrap);
        });
      } else {
        var free = el("div", "specs-freeform markdown-body");
        free.innerHTML = s.bodyHtml || "";
        section.appendChild(free);
      }
      container.appendChild(section);
    });
    specsRendered = true;
  }

  // ---------- news ----------
  function renderNews() {
    $("news-count").textContent = NEWS.length + " post" + (NEWS.length === 1 ? "" : "s");
    var list = $("news-list");
    list.innerHTML = "";
    if (NEWS.length === 0) {
      list.appendChild(el("div", "empty", "No news posts yet."));
      return;
    }
    NEWS.forEach(function (p) {
      var item = el("div", "news-item");
      item.appendChild(el("div", "news-date", p.date));
      item.appendChild(el("div", "news-title", p.title));
      item.appendChild(el("div", "news-summary", p.summary));
      var tags = el("div", "news-tags");
      (p.tags || []).forEach(function (t) { tags.appendChild(el("span", "tag", t)); });
      item.appendChild(tags);
      item.addEventListener("click", function () {
        state.newsId = p.id;
        showView("news-detail");
      });
      list.appendChild(item);
    });
  }

  function renderNewsDetail() {
    var p = findNews(state.newsId);
    if (!p) { showView("news"); return; }
    $("news-detail-title").textContent = p.title;
    $("news-detail-breadcrumb").textContent = p.title;
    $("news-detail-date").textContent = p.date;
    $("news-detail-author").textContent = p.author;
    var tagsEl = $("news-detail-tags");
    tagsEl.innerHTML = "";
    (p.tags || []).forEach(function (t) { tagsEl.appendChild(el("span", "tag", t)); });
    $("news-detail-body").innerHTML = p.bodyHtml || "<p><em>No content.</em></p>";
    $("news-back").onclick = function () { showView("news"); };
  }

  // ---------- wire up events ----------
  function init() {
    var navToggle = $("nav-toggle");
    var nav = $("nav");
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("open");
      nav.classList.toggle("open");
    });
    var navLinks = document.querySelectorAll("header nav a");
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", function (a) {
        return function () {
          if (a.dataset.page === "listing") {
            state.category = a.dataset.cat;
            resetFilters();
          }
          navToggle.classList.remove("open");
          nav.classList.remove("open");
          showView(a.dataset.page);
        };
      }(navLinks[i]));
    }

    $("search-input").addEventListener("input", function (ev) {
      state.search = ev.target.value;
      if (state.view === "listing") renderTable();
    });

    var filterBtns = document.querySelectorAll("#filter-bar button");
    for (var j = 0; j < filterBtns.length; j++) {
      filterBtns[j].addEventListener("click", function (b) {
        return function () {
          for (var k = 0; k < filterBtns.length; k++) filterBtns[k].classList.remove("active");
          b.classList.add("active");
          state.statusFilter = b.dataset.status;
          renderTable();
        };
      }(filterBtns[j]));
    }

    var ths = document.querySelectorAll("#entry-table th");
    for (var m = 0; m < ths.length; m++) {
      ths[m].addEventListener("click", onSort);
    }

    $("footer-contribute").addEventListener("click", function () {
      showView("contribute");
    });

    window.addEventListener("hashchange", applyHash);

    applyHash();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
