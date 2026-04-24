---
name: Meeting Prep Dashboard Generator
description: A complete pipeline using NotebookLM to generate deep research, artifacts, and a gorgeous glassmorphic HTML dashboard for meeting prep.
---

## 🧠 Automated Meeting Prep Dashboard Generator

> A complete pipeline using NotebookLM to generate deep research, artifacts, and a gorgeous glassmorphic HTML dashboard for meeting prep. Takes a company/meeting context and builds a local presentation website.

## Automated Meeting Prep Framework

This skill dictates how to operate as an elite intelligence analyst and engineer, automatically building a comprehensive web dashboard full of deep-researched artifacts for any upcoming meeting or company target, leveraging the NotebookLM MCP tools.

### 🎯 The Goal

Take a raw input (a company name, domain, and/or meeting context) and transform it into a ready-to-view, high-end "Meeting Prep Dashboard" folder containing:

1.  A suite of AI-generated Markdown documents (briefing, competitive intel, research report, quiz, flashcards).
2.  Downloaded media artifacts (audio podcast MP3, market infographic PNG).
3.  A beautiful, offline-ready HTML dashboard unifying everything for the executive.

### ⚡ Trigger Details

Input can come from any of the following sources:

*   **Zapier/Make automation:** Watching Google Calendar for new "Discovery Call" events and firing a payload with the company name.
*   **Email/CRM trigger:** A new lead or meeting request arriving in an inbox or CRM system.
*   **Manual prompt:** The user simply types a company name and meeting context directly.

The input payload should contain at minimum: `company_name`, and optionally: `company_domain`, `meeting_date`, `meeting_type`, `contact_name`, `contact_title`.

---

## 🔄 Step-By-Step Execution Pipeline

### Phase 0: Agent Pre-Research (Data Enrichment)

Before touching NotebookLM, use standard web search tools to:
1.  Find the official company website and LinkedIn profile.
2.  Search for recent news (last 6 months) about the company's funding, product launches, or leadership changes.
3.  Synthesize a "Company Profile" (approx 500 words) summarizing their core value prop and target market.

### Phase 1: Knowledge Ingestion

**Step 1.1 — Create the Notebook**
```
mcp: notebook_create
title: "Meeting Prep: [Company Name] - [Date]"
```

**Step 1.2 — Inject Seed Data as Text Source**
```
mcp: source_text_add
title: "Company Profile"
content: "[Synthesized Profile from Phase 0]"
notebook_id: [ID from Step 1.1]
```

**Step 1.3 — Add Scraped URLs as Sources**
For each high-quality URL found during Phase 0 (company website, Wikipedia, key news articles), add them individually:
```
mcp: source_add
notebook_id: [from step 1.1]
source_type: "url"
url: "[each URL]"
wait: true
```
*ℹ️ Add 3-8 of the best URLs. Don't add more than 10 here — deep research will find more.*

### Phase 2: Autonomous Deep Research (NotebookLM Web Search)

This is where NotebookLM's killer feature kicks in — it autonomously searches the web for 40-100+ additional sources about the company and their industry.

**Step 2.1 — Start Deep Research**
```
mcp: research_start
notebook_id: [from step 1.1]
query: "[Company Name] competitive landscape market trends [industry] [region] 2025 2026"
source: "web"
mode: "deep"
```

**Step 2.2 — Monitor & Iterate**
Wait for the research to complete. If the source count is low (under 20), run a second deep research query focusing on technical stack or specific product lines.

**Step 2.3 — Capture Source Map**
List all sources and save the titles/URLs as a reference document for the dashboard.
```
mcp: source_list
notebook_id: [from 1.1]
```

### Phase 3: Artifact Generation (The "Intelligence Suite")

Now, generate the core content files. Each should be saved as a separate .md file in a local `/output/[company_name]/artifacts` folder.

**Step 3.1 — Executive Briefing (Markdown)**
```
mcp: notebook_query
query: "Generate a 1500-word Executive Briefing. Include: Company Core, Financial health, Leadership analysis, and '3 Must-Ask Questions' for the meeting."
notebook_id: [from 1.1]
```

**Step 3.2 — Competitive Matrix**
```
mcp: notebook_query
query: "Identify top 3 competitors. Create a comparison table across: Pricing, Key Features, Market Share, and 'Why we win'."
notebook_id: [from 1.1]
```

**Step 3.3 — The Deep Research Report**
```
mcp: notebook_query
query: "Generate a comprehensive technical research report based on all sources. Focus on their current tech stack and future roadmap leaks."
notebook_id: [from 1.1]
```

**Step 3.4 — Interactive Quiz (JSON/Markdown)**
```
mcp: notebook_query
query: "Generate 10 multiple-choice questions to test the executive on this company. Include answers at the end."
notebook_id: [from 1.1]
```

**Step 3.5 — Deep Research Briefing (Markdown)**
```
mcp: notebook_query
query: "Generate a bulleted summary of the top 20 most relevant sources found during deep research."
notebook_id: [from 1.1]
```

**Step 3.6 — Podcast Audio (The "Drive-Time" Briefing)**
```
mcp: notebook_query
query: "Generate a high-quality audio overview of this company (The NotebookLM Studio Podcast)."
notebook_id: [from 1.1]
```
Wait for generation, then download the MP3 to `/output/[company_name]/artifacts/podcast.mp3`.

**Step 3.7 — Flashcards**
```
mcp: notebook_query
query: "Generate 15 study flashcards summarizing key facts about [Company Name]."
notebook_id: [from 1.1]
```

**Step 3.8 — Infographic Data Generation**
```
mcp: notebook_query
query: "Extract 5 key data points or statistics about [Company Name] that would look great in an infographic."
notebook_id: [from 1.1]
```

### Phase 4: HTML Dashboard Generation

**Step 4.1 — Create the Index File**
Generate a single, beautiful `index.html` file in `/output/[company_name]/`. 
Use a modern CSS framework (Tailwind via CDN) to create a Glassmorphic Dashboard.

### Phase 5: HTML Dashboard Construction

**Step 5.1 — Dashboard Integration**
The HTML should include:
*   **Left Sidebar:** Navigation between sections (Briefing, Research, Quiz, Audio).
*   **Audio Hero Section:** A sleek MP3 player for `podcast.mp3`.
*   **Artifact Grid:** Cards linking to the Markdown-to-HTML converted artifacts.
*   **Metric Cards:** Displaying the 5 key data points from Step 3.8.
*   **Glassmorphic UI:** Smooth blur effects, dark mode support, and gold accents.

**Step 5.2 — Convert Markdown to HTML**
Use a local library (like `markdown2` or `showdown`) to convert all generated .md files into styled HTML partials that are embedded into the main dashboard sections.

**Step 5.3 — Generate Visual Infographic**
Using the data from Step 3.8, generate a simple SVG or PNG infographic using a tool like DALL-E or a local charting library and place it in the dashboard.

**Step 5.4 — Final Cleanup**
Ensure all local paths are relative so the folder can be zipped and sent to the client.

---

## 📐 Guiding Principles & Constraints

### 🔴 Batch Imports (Non-Negotiable)
Never attempt to bulk-import 100+ sources from deep research at once. Always iterate in chunks of 20 using the `source_indices` parameter. Wait 2-3 seconds between batches.

### 🟡 Fail Gracefully
*   If `flashcards` studio output is too thin (fewer than 8 cards), automatically regenerate via `notebook_query` with an explicit prompt for 10 Q&A pairs.
*   If `infographic` generation fails, skip it and note it in the INDEX file. The dashboard should still work without it.
*   If `audio` generation is still processing after 5 minutes, move on and note it as "generating" in the INDEX.

### 🎨 Aesthetics Are Non-Negotiable
The HTML dashboard must feel premium — dark modes, glassmorphism, smooth transitions, crisp typography, animated elements. It should look like a product, not a prototype. Jack's colour preferences are blue + gold.

### 🔐 Data Isolation
Each client/meeting gets its own NotebookLM notebook. Never reuse notebooks across clients. This prevents data contamination and hallucination.
