---
name: scraping-reddit
description: Extracts top posts and metadata from Reddit subreddits using JSON endpoints. validating connection status and parsing results into structured formats.
---

# Scraping Reddit

## When to use this skill
- Gathering data from specific subreddits (e.g., getting top posts from r/python)
- Analysing community trends or sentiment
- Verifying Reddit availability or content existence

## Workflow
1.  **Validate Dependencies**: checks if `requests` is installed.
2.  **Target Selection**: Identifies the subreddit to scrape.
3.  **Extraction**: Connects to the endpoint using a robust User-Agent.
4.  **Parsing**: Converts the raw JSON response into readable headlines and metadata.

## Instructions
Run the included python script to perform the scraping action. ensuring the output encoding is handled correctly for the environment.

```bash
python .agent/skills/scraping-reddit/scripts/scrape_subreddit.py [subreddit_name]
```

### Example
```bash
python .agent/skills/scraping-reddit/scripts/scrape_subreddit.py n8n
```
