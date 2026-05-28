# CLAUDE.md — ScribeGulf

## Project Overview

Static HTML/CSS/JS marketing website for ScribeGulf, an academic writing support service targeting UAE university students. Hosted on GitHub Pages at [scribegulf.com](https://scribegulf.com). No build tools — plain HTML, CSS, and vanilla JavaScript. Form submissions go to a Google Apps Script endpoint that writes to a Google Sheet and sends email notifications.

**Tech stack:** HTML5 · CSS3 · Vanilla JS · GitHub Pages · Google Apps Script

**Repo:** https://github.com/gargisingh2/scribegulf

---

## Marketing Operating System

This project uses the Marketing OS — a set of global Claude Code agents and slash commands for coordinating all marketing work. Agents live globally and are available from any project directory. They read `marketing-context.md` at the start of every session to load brand and audience context.

### Slash Commands

| Command | What it does |
|---|---|
| `/marketing` | General entry point — describe your task and the orchestrator routes it |
| `/campaign` | Full multi-channel campaign planning |
| `/content` | Write blog posts, emails, web copy, ad copy |
| `/seo` | Keyword research, on-page audit, content cluster planning, meta tags |
| `/social` | Social media posts, captions, content calendars |
| `/design` | Create, edit, and export Canva designs using the brand kit |

### Agents

| Agent | Role | Auto-activates when... |
|---|---|---|
| `marketing-orchestrator` | Senior strategist, routes all tasks | Multi-discipline requests, campaign planning, general marketing asks |
| `content-copywriter` | Writes all marketing copy | Blog posts, emails, web copy, ad copy, landing pages |
| `seo-analyst` | SEO research and optimisation | Keyword research, on-page audits, meta tags, content clusters |
| `social-media-specialist` | Social content and calendars | Instagram, LinkedIn, Twitter/X, TikTok, Facebook content |
| `designer` | Canva design creation and export | Social graphics, banners, email headers, presentations |

### MCP Integrations

| Tool | Used by | For |
|---|---|---|
| Canva (plugin `873c4f8d`) | designer | Design generation, brand templates, export |
| Ahrefs | seo-analyst | Keyword data, competitor analysis (fallback: web search) |
| Notion | orchestrator, content-copywriter | Brief storage, content planning |
| Slack | orchestrator | Team delivery and updates |
| Klaviyo | content-copywriter | Email campaign creation |
| HubSpot | orchestrator | CRM context, lead intelligence |
| Amplitude / Supermetrics | seo-analyst, orchestrator | Performance data |
| SimilarWeb | seo-analyst | Competitor traffic intelligence |

### Brand Context File

`marketing-context.md` (this project root) is the single source of truth for:
- Brand voice and tone
- Target audience and their language
- Service tiers and pricing
- Competitors
- Brand asset details (Canva kit, hex codes, fonts)
- Active channels and posting frequency
- Content pillars
- SEO priorities
- Constraints and legal rules

**Keep this file updated.** Every agent reads it before doing any work. Update the "Current Campaigns / Priorities" section before each marketing sprint.

---

## Common Workflows

**Write a blog post:**
```
/content
→ Blog post
→ Topic: [your topic]
→ [answer remaining questions]
```

**Create an Instagram carousel:**
```
/design
→ Instagram post (carousel)
→ [describe the message]
[designer loads brand kit from Canva, creates and exports the design]
```

**Plan a full campaign:**
```
/campaign
[orchestrator collects brief, then delegates in parallel to:
  - content-copywriter (landing page + email sequence)
  - seo-analyst (target keywords)
  - social-media-specialist (4-week social calendar)
  - designer (hero banner + social graphics)]
```

**Monthly SEO audit:**
```
/seo
→ On-page audit
→ URL: https://scribegulf.com
[seo-analyst audits using Ahrefs MCP or SERP analysis, returns prioritised fix table]
```

**One month of social posts:**
```
/social
→ Platforms: Instagram + LinkedIn
→ Calendar: 4 weeks, 4 posts/week Instagram, 3 posts/week LinkedIn
→ [theme/campaign context]
```

---

## File Structure

```
C:\Users\sumitchauhan\Desktop\Gargi\UAE\
├── marketing-context.md    ← Brand/audience/tone spec — UPDATE REGULARLY
├── CLAUDE.md               ← This file
├── index.html
├── services.html
├── pricing.html
├── how-it-works.html
├── contact.html
├── style.css
├── script.js
├── Logo.png
├── Shield.png
├── Shield-nav.png
└── CNAME

C:\Users\sumitchauhan\.claude\           ← Global (all projects)
├── agents/
│   ├── marketing-orchestrator.md
│   ├── content-copywriter.md
│   ├── seo-analyst.md
│   ├── social-media-specialist.md
│   └── designer.md
└── commands/
    ├── marketing.md
    ├── campaign.md
    ├── content.md
    ├── seo.md
    ├── social.md
    └── design.md
```

---

## Using the Marketing OS on a New Project

1. Copy `marketing-context.md` to the new project root
2. Fill in all brand/audience/channel sections for the new project
3. Run `/marketing` — agents will automatically read the new project's context
4. No agent files need to be copied — they are global

---

## Website Development Notes

- **Form endpoint:** Google Apps Script at `https://script.google.com/macros/s/AKfycbxYBVCHBh0lWcjZYGNRy73Sca7k4t4x_t0A1c8WKjDPI3fOu4IWdv4vkakK6j469Zt0mw/exec`
- **Form fields collected:** name, WhatsApp number, university, subject, assignment type, word count, deadline, brief, extra notes, user agent, referrer
- **Honeypot field:** present for spam protection — do not remove
- **CSS variables:** defined at `:root` in style.css — use these for any colour additions
- **Brand colours:** forest `#1C3D2E`, sage `#4A7C59`, walnut `#6B4423`, parchment `#F5F0E8`, gold `#C9A84C`
- **Responsive breakpoints:** 960px (tablet) and 640px (mobile)
- **No build step** — edit files directly, push to main, GitHub Pages deploys automatically
