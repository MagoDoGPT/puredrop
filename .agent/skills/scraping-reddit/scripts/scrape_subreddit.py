import requests
import sys
import json

# Force UTF-8 on Windows terminals to prevent emoji encoding errors
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

def scrape_subreddit(subreddit):
    """
    Scrapes the top 3 posts from a given subreddit from the last 7 days using the JSON endpoint.
    """
    url = f"https://www.reddit.com/r/{subreddit}/top.json?t=week&limit=3"
    
    # Generic User-Agent to avoid immediate blocking
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    print(f"🔍 Scraping r/{subreddit} (Top 3, Last 7 Days)...")
    
    try:
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            data = response.json()
            posts = data['data']['children']
            
            print(f"\n🚀 Top 3 Scraped Posts from r/{subreddit} (Last Week):\n" + "="*40)
            
            for i, post in enumerate(posts[:3], 1):
                p = post['data']
                title = p.get('title', 'No Title')
                score = p.get('score', 0)
                comments = p.get('num_comments', 0)
                post_url = p.get('url', '')
                
                print(f"\n{i}. {title}")
                print(f"   👍 Score: {score} | 💬 Comments: {comments}")
                print(f"   🔗 Link: {post_url}")
                print("-" * 40)
                
            return True
        elif response.status_code == 429:
            print("❌ Error: Rate Limited (Too Many Requests).")
        elif response.status_code == 404:
            print(f"❌ Error: Subreddit r/{subreddit} not found.")
        else:
            print(f"❌ Error: Connection failed with Status Code {response.status_code}")
            
    except Exception as e:
        print(f"❌ Critical Error: {e}")
    
    return False

if __name__ == "__main__":
    # Default to 'technology' if no argument provided
    sub = sys.argv[1] if len(sys.argv) > 1 else "technology"
    scrape_subreddit(sub)
