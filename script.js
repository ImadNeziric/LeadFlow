"use strict";

/*
 * LEADFLOW LANDING PAGE + SAFE DEMO
 *
 * The marketing page intentionally routes "Open app" and "Get started"
 * buttons to the on-page demo. It does not expose the real application.
 *
 * IMPORTANT: this is only the marketing-page experience. The live app URL
 * must also be protected server-side/Supabase-side before charging customers.
 */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const currentYear = document.getElementById("currentYear");

  if (currentYear) currentYear.textContent = new Date().getFullYear();

  // Mobile navigation.
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navLinks.classList.toggle("open", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  // Route the sales CTAs to the safe demo instead of the live app.
  document.querySelectorAll("[data-demo-link]").forEach((link) => {
    link.setAttribute("href", "#demo");
  });

  // Demo view tabs: owner dashboard vs. customer-facing inquiry form.
  const demoTabs = document.querySelectorAll("[data-demo-tab]");
  const demoPanels = document.querySelectorAll("[data-demo-panel]");

  demoTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.demoTab;

      demoTabs.forEach((item) => {
        const selected = item === tab;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-selected", String(selected));
      });

      demoPanels.forEach((panel) => {
        panel.hidden = panel.dataset.demoPanel !== target;
      });
    });
  });

  // Safe sample lead filter. It only filters fictional HTML rows.
  const statusFilter = document.getElementById("demoStatusFilter");
  const demoLeadRows = document.querySelectorAll(".demo-lead-row");
  const emptyState = document.getElementById("demoEmptyState");

  if (statusFilter) {
    statusFilter.addEventListener("change", () => {
      let visibleCount = 0;
      demoLeadRows.forEach((row) => {
        const matches = statusFilter.value === "all" || row.dataset.status === statusFilter.value;
        row.hidden = !matches;
        if (matches) visibleCount += 1;
      });
      if (emptyState) emptyState.hidden = visibleCount !== 0;
    });
  }

  // Demo form is intentionally non-functional: never sends or stores data.
  const sampleForm = document.getElementById("sampleInquiryForm");
  const sampleFormMessage = document.getElementById("sampleFormMessage");

  if (sampleForm && sampleFormMessage) {
    sampleForm.addEventListener("submit", (event) => {
      event.preventDefault();
      sampleForm.reset();
      sampleFormMessage.textContent =
        "Demo preview only: no inquiry was sent and no information was saved.";
      sampleFormMessage.classList.add("is-success");
    });

    sampleForm.addEventListener("input", () => {
      sampleFormMessage.textContent =
        "Demo only. Submitting will not contact a business or save any information.";
      sampleFormMessage.classList.remove("is-success");
    });
  }

  console.info("LeadFlow landing page and safe demo initialized.");
});
