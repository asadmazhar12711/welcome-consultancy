import urllib.request
import urllib.parse
import json
import os
import cv2
import numpy as np

# Map of exact Wikimedia Commons search queries for authentic EXIM topics
QUERIES = {
    "service-iec": "customs declaration document shipping bill",
    "service-epcg": "CNC milling machine industrial manufacturing factory",
    "service-advance-licence": "intermodal freight transport shipping container logistics",
    "service-fssai": "spices export market quality inspection",
    "service-dsc": "smart card cryptographic token security key",
    "service-icegate": "container terminal gantry cranes loading ship night",
    "service-export-house": "modern corporate office glass tower architecture",
    "service-aeo": "customs border inspection container scanner port",
    "service-coo": "certificate of origin customs desk",
    "service-rcmc": "international trade fair conference exhibition hall",
    "service-compliance": "financial audit document review legal checklist",
    "consultancy-advisory": "business consultation boardroom meeting executive",
    "contact-workspace": "executive boardroom office glass harbor view",
    "about-timeline": "Jawaharlal Nehru Port Trust container terminal aerial",
    "cta-horizon": "container ship ocean sunset horizon maritime",
    "faq-clarity": "legal law books trade regulations library",
    "testimonials-trust": "business agreement handshake corporate partnership",
    "deco-trade-routes": "nautical navigation chart sea map routes"
}

headers = {"User-Agent": "WelcomeConsultancyEXIM/2.0 (trade@welcomeconsultancy.in)"}

def search_wikimedia(query):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=filetype:bitmap+{urllib.parse.quote(query)}&gsrlimit=6&prop=imageinfo&iiprop=url|size|mime"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            pages = data.get("query", {}).get("pages", {})
            results = []
            for p in pages.values():
                info = p.get("imageinfo", [{}])[0]
                url = info.get("url")
                width = info.get("width", 0)
                height = info.get("height", 0)
                if url and width >= 1000 and height >= 600:
                    results.append((url, p.get("title", "")))
            return results
    except Exception as e:
        print(f"Error searching for {query}: {e}")
        return []

for key, query in QUERIES.items():
    print(f"\nSearching for [{key}]: {query}...")
    results = search_wikimedia(query)
    if not results:
        # Fallback to broader query
        parts = query.split()
        broader = " ".join(parts[:2])
        print(f"  Fallback search: {broader}")
        results = search_wikimedia(broader)
    
    if results:
        print(f"  Found {len(results)} candidates for {key}:")
        for u, title in results[:3]:
            print(f"    - {title} ({u[:60]}...)")
    else:
        print(f"  No suitable candidates found for {key}")

