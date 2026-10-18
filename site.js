// SPDX-License-Identifier: MIT
// Mitcad website: download links from the GitHub releases, entrance on
// scroll. The page works without this script (links to the releases page).
(function () {
  "use strict";

  // Platform cards: the newest release that has a file for the platform.
  var platforms = [
    { id: "dl-windows", match: /windows-x64\.exe$/i },
    { id: "dl-linux", match: /\.AppImage$/i },
    { id: "dl-macos", match: /\.dmg$/i }
  ];

  function showRelease(releases) {
    var latest = releases.find(function (r) { return !r.draft && !r.prerelease; });
    if (latest) {
      var v = document.getElementById("latest-version");
      if (v) v.textContent = latest.tag_name.replace(/^v/, "");
    }
    platforms.forEach(function (p) {
      var card = document.getElementById(p.id);
      if (!card) return;
      for (var i = 0; i < releases.length; i++) {
        var r = releases[i];
        if (r.draft || r.prerelease) continue;
        var asset = (r.assets || []).find(function (a) { return p.match.test(a.name); });
        if (asset) {
          card.href = asset.browser_download_url;
          card.querySelector(".file").textContent = asset.name;
          return;
        }
      }
    });
  }

  if (window.fetch) {
    fetch("https://api.github.com/repos/mitcad/Mitcad/releases?per_page=15", {
      headers: { Accept: "application/vnd.github+json" }
    })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (list) { if (Array.isArray(list)) showRelease(list); })
      .catch(function () { /* keep the fallback links */ });
  }

  // Close the mobile menu after a jump.
  var menu = document.getElementById("menu");
  document.querySelectorAll(".links a").forEach(function (a) {
    a.addEventListener("click", function () { if (menu) menu.checked = false; });
  });

  // Entrance on scroll.
  var items = document.querySelectorAll(".card, .dl, .format-table, .why, .community, .section-head");
  if ("IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (el.classList.contains("card") ? (i % 4) * 70 : 0) + "ms";
      io.observe(el);
    });
  }
})();
