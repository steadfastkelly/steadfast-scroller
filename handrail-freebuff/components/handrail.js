// Handrail components for React 18+. Plain createElement, no build step needed.
// Import handrail.css once at the app root.
import React from "react";

var h = React.createElement;
function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
function omit(o, keys) { var r = {}; for (var k in o) { if (keys.indexOf(k) < 0) r[k] = o[k]; } return r; }

var STATUS_LABEL = { draft: "Draft", review: "In review", approved: "Approved", overdue: "Review overdue", retired: "Retired" };

function Button(p) {
  var variant = p.variant || "secondary", size = p.size || "md";
  var rest = omit(p, ["variant", "size", "className", "children"]);
  rest.className = cx("hr-btn", "hr-btn--" + variant, "hr-btn--" + size, p.className);
  if (!rest.type) rest.type = "button";
  return h("button", rest, p.children);
}

function Eyebrow(p) {
  return h("p", { className: cx("hr-eyebrow", p.className) },
    h("span", { className: "hr-eyebrow__dot", "aria-hidden": "true" }),
    h("span", null, p.children),
    p.count != null ? h("span", { className: "hr-counter" }, "(" + String(p.count).padStart(2, "0") + ")") : null);
}

function StatusBadge(p) {
  var s = p.status || "draft";
  return h("span", { className: cx("hr-badge", "hr-badge--" + s, p.className) },
    h("span", { className: "hr-badge__dot", "aria-hidden": "true" }),
    p.children || STATUS_LABEL[s]);
}

function Meta(label, value, mono) {
  return h("div", { className: "hr-gov__item", key: label },
    h("dt", { className: "hr-gov__key" }, label),
    h("dd", { className: mono ? "hr-meta" : "hr-gov__val" }, value));
}

function GovernanceHeader(p) {
  var items = [];
  if (p.owner) items.push(Meta("Owner", p.owner));
  if (p.status) items.push(Meta("Status", h(StatusBadge, { status: p.status })));
  if (p.reviewed) items.push(Meta("Last reviewed", p.reviewed, true));
  if (p.nextReview) items.push(Meta("Next review", p.nextReview, true));
  if (p.version) items.push(Meta("Version", p.version, true));
  return h("header", { className: cx("hr-gov", p.className) },
    h("div", { className: "hr-gov__main" },
      p.section ? h(Eyebrow, { className: "hr-gov__section" }, p.section) : null,
      h("h1", { className: "hr-gov__title" }, p.title),
      p.summary ? h("p", { className: "hr-gov__summary" }, p.summary) : null),
    h("dl", { className: "hr-gov__meta" }, items));
}

function ProcessSteps(p) {
  var steps = p.steps || [];
  return h("ol", { className: cx("hr-steps", p.className) }, steps.map(function (s, i) {
    return h("li", { className: cx("hr-step", s.current && "is-current"), key: i, id: s.id },
      h("span", { className: "hr-step__num", "aria-hidden": "true" }, "(" + String(i + 1).padStart(2, "0") + ")"),
      h("div", { className: "hr-step__body" },
        h("h3", { className: "hr-step__title" }, s.title),
        s.owner ? h("p", { className: "hr-step__owner" }, h("span", { className: "hr-pill" }, s.owner)) : null,
        s.body ? h("p", { className: "hr-step__text" }, s.body) : null,
        s.decision ? h("p", { className: "hr-step__decision" },
          h("span", { "aria-hidden": "true" }, "↳ "), "If ", s.decision["if"], ", go to ",
          h("a", { href: "#" + (s.decision.target || ""), className: "hr-link" }, s.decision.goTo)) : null));
  }));
}

var CALLOUT_LABEL = { required: "Required", recommended: "Recommended", note: "Note" };
function Callout(p) {
  var kind = p.kind || "note";
  return h("aside", { className: cx("hr-callout", "hr-callout--" + kind, p.className) },
    h("p", { className: "hr-callout__head" },
      h("span", { className: "hr-callout__tag" }, CALLOUT_LABEL[kind]),
      p.title ? h("span", { className: "hr-callout__title" }, p.title) : null),
    h("div", { className: "hr-callout__body" }, p.children));
}

var RACI = { R: "Responsible", A: "Accountable", C: "Consulted", I: "Informed" };
function RaciTable(p) {
  var roles = p.roles || [], rows = p.rows || [];
  return h("div", { className: cx("hr-table-wrap", p.className) },
    h("table", { className: "hr-table" },
      p.caption ? h("caption", { className: "hr-table__cap" }, p.caption) : null,
      h("thead", null, h("tr", null,
        h("th", { scope: "col" }, "Task"),
        roles.map(function (r) { return h("th", { scope: "col", key: r, className: "hr-table__c" }, r); }))),
      h("tbody", null, rows.map(function (row, i) {
        return h("tr", { key: i },
          h("th", { scope: "row" }, row.task),
          roles.map(function (r) {
            var v = (row.cells || {})[r];
            return h("td", { key: r, className: "hr-table__c" },
              v ? h("abbr", { title: RACI[v], className: cx("hr-raci", v === "A" && "hr-raci--a") }, v) : h("span", { className: "hr-raci-none", "aria-label": "None" }, "·"));
          }));
      }))));
}

function SearchField(p) {
  var rest = omit(p, ["shortcut", "className", "label"]);
  rest.type = "search"; rest.className = "hr-search__input";
  if (!rest.placeholder) rest.placeholder = "Search the handbook";
  if (!rest["aria-label"]) rest["aria-label"] = p.label || "Search the handbook";
  return h("div", { className: cx("hr-search", p.className), role: "search" },
    h("svg", { className: "hr-search__icon", viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true" },
      h("circle", { cx: 7, cy: 7, r: 5, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }),
      h("path", { d: "M11 11l3.5 3.5", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" })),
    h("input", rest),
    p.shortcut ? h("kbd", { className: "hr-kbd" }, p.shortcut) : null);
}

function DocNav(p) {
  var sections = p.sections || [];
  return h("nav", { className: cx("hr-nav", p.className), "aria-label": p.label || "Handbook" },
    sections.map(function (s, i) {
      return h("div", { className: "hr-nav__group", key: i },
        h(Eyebrow, { className: "hr-nav__title", count: (s.items || []).length }, s.title),
        h("ul", { className: "hr-nav__list" }, (s.items || []).map(function (it, j) {
          return h("li", { key: j },
            h("a", { href: it.href || "#", className: cx("hr-nav__item", it.active && "is-active"), "aria-current": it.active ? "page" : undefined },
              h("span", { className: "hr-nav__text" }, it.label),
              it.status && it.status !== "approved" ? h(StatusBadge, { status: it.status, className: "hr-badge--compact" }) : null));
        })));
    }));
}


export { Button, Eyebrow, StatusBadge, GovernanceHeader, ProcessSteps, Callout, RaciTable, SearchField, DocNav };
