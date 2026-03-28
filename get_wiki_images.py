import urllib.request
import re

urls = [
    "https://en.wikipedia.org/wiki/Shah_Rukh_Khan",
    "https://en.wikipedia.org/wiki/Salman_Khan",
    "https://en.wikipedia.org/wiki/MS_Dhoni",
    "https://en.wikipedia.org/wiki/Allu_Arjun"
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'<td class="infobox-image">.*?<img.*?src="(//upload\.wikimedia\.org/wikipedia/commons/[^"]+)"', html, re.DOTALL)
        if match:
            thumb_url = "https:" + match.group(1)
            # Change width parameter for bigger image if it's a thumb
            if "/thumb/" in thumb_url:
                thumb_url = re.sub(r'/(\d+)px-', r'/800px-', thumb_url)
            print(f"{url.split('/')[-1]}: {thumb_url}")
        else:
            print(f"{url.split('/')[-1]}: No image found")
    except Exception as e:
        print(f"Error {url}: {e}")
