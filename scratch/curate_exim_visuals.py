import urllib.request
import json
import os
import cv2
import numpy as np

# Curated list of high-res authentic trade & logistics images from verified public sources
# Each image specifically curated for its exact EXIM topic (no random faces!)
IMAGE_SPECS = {
    "service-iec": {
        "query": "customs document shipping bill cargo invoice",
        "url": "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1600&auto=format&fit=crop", # Legal contract & trade documents signing
        "desc": "Import Export Code & DGFT documentation filing"
    },
    "service-rodtep": {
        "query": "container shipping port logistics cargo",
        "url": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1600&auto=format&fit=crop", # Port container terminal logistics
        "desc": "RoDTEP & RoSCTL duty credit scrip realization"
    },
    "service-epcg": {
        "query": "industrial factory machinery export manufacturing",
        "url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop", # High-tech precision manufacturing machinery
        "desc": "EPCG zero-duty capital goods machinery authorization"
    },
    "service-advance-licence": {
        "query": "warehouse logistics raw materials industrial export",
        "url": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop", # Modern bonded industrial warehouse
        "desc": "Advance Authorization duty-free raw material imports"
    },
    "service-dgft": {
        "query": "corporate modern glass building ministry government",
        "url": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop", # Institutional corporate architecture
        "desc": "DGFT policy advisory and Udyog Bhawan liaison"
    },
    "service-aeo": {
        "query": "container terminal security inspection port gate",
        "url": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1600&auto=format&fit=crop", # Secure port gate expedited clearance
        "desc": "Authorized Economic Operator green channel status"
    },
    "service-fssai": {
        "query": "food quality inspection laboratory spices export",
        "url": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1600&auto=format&fit=crop", # Scientific laboratory quality testing
        "desc": "FSSAI food & agricultural export certification"
    },
    "service-coo": {
        "query": "diplomatic trade treaty document stamp chamber of commerce",
        "url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1600&auto=format&fit=crop", # Legal compliance & official certification
        "desc": "Preferential Certificate of Origin & trade agreements"
    },
    "service-rcmc": {
        "query": "international trade expo exhibition convention center",
        "url": "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop", # International business convention
        "desc": "Export Promotion Council RCMC registration"
    },
    "service-dsc": {
        "query": "digital security hardware token laptop encryption",
        "url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop", # Digital security token & encrypted trade filing
        "desc": "Class 3 DGFT & ICEGATE Digital Signature Certificate"
    },
    "service-icegate": {
        "query": "customs EDI server computer terminal logistics dispatch",
        "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop", # Financial & trade analytics dashboard
        "desc": "ICEGATE electronic customs clearance & shipping bill tracking"
    },
    "service-export-house": {
        "query": "modern corporate global business headquarters trade",
        "url": "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop", # Star export house modern office
        "desc": "One to Five Star Export House status recognition"
    },
    "service-compliance": {
        "query": "audit compliance review legal documents magnifying glass",
        "url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop", # Financial & regulatory audit analysis
        "desc": "Comprehensive customs compliance & Foreign Trade Policy audit"
    },
    "about-timeline": {
        "query": "mumbai maritime port container ships timelapse logistics",
        "url": "https://images.unsplash.com/photo-1505705694340-019e1e335916?q=80&w=1600&auto=format&fit=crop", # Expansive port container cranes at twilight
        "desc": "15-year journey of trade leadership since 2011"
    },
    "consultancy-advisory": {
        "query": "corporate advisors meeting strategy business boardroom",
        "url": "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1600&auto=format&fit=crop", # High-level strategic consultation
        "desc": "Senior EXIM advisory desk for Indian exporters"
    },
    "contact-workspace": {
        "query": "executive office desk architecture glass view city",
        "url": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop", # Executive consultancy workspace
        "desc": "Welcome Consultancy executive headquarters in Mumbai"
    },
    "cta-horizon": {
        "query": "cargo vessel sailing open sea sunset horizon",
        "url": "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1600&auto=format&fit=crop", # Cargo ship navigating open ocean horizon
        "desc": "Global horizon for Indian export growth"
    },
    "faq-clarity": {
        "query": "structured checklist magnifying glass documents clarity",
        "url": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1600&auto=format&fit=crop", # Clear structured guidance and answers
        "desc": "Clarity on complex DGFT rules and customs FAQs"
    },
    "testimonials-trust": {
        "query": "business partnership handshake agreement corporate trade",
        "url": "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600&auto=format&fit=crop", # Professional trust and partnership handshake
        "desc": "1000+ satisfied exporters across PAN India"
    },
    "deco-trade-routes": {
        "query": "world trade routes global logistics maritime ocean",
        "url": "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1600&auto=format&fit=crop", # World trade routes and global connectivity
        "desc": "Global maritime corridors connecting India to world markets"
    }
}

out_dir = "public/illustrations"
os.makedirs("scratch/raw_images", exist_ok=True)

headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"}

for key, spec in IMAGE_SPECS.items():
    raw_path = f"scratch/raw_images/{key}.jpg"
    final_webp = f"{out_dir}/{key}.webp"
    print(f"--> Processing {key} ({spec['desc']})...")
    
    # Download high-res
    req = urllib.request.Request(spec["url"], headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as resp, open(raw_path, "wb") as f:
            f.write(resp.read())
    except Exception as e:
        print(f"Error downloading {key}: {e}")
        continue
        
    img = cv2.imread(raw_path)
    if img is None:
        print(f"Failed to read {raw_path}")
        continue
        
    # Resize to standardized 1600x900 (16:9)
    target_w, target_h = 1600, 900
    h, w = img.shape[:2]
    # Crop center to 16:9
    target_aspect = 16 / 9
    current_aspect = w / h
    if current_aspect > target_aspect:
        # Too wide, crop sides
        new_w = int(h * target_aspect)
        start_x = (w - new_w) // 2
        img = img[:, start_x:start_x + new_w]
    else:
        # Too tall, crop top/bottom
        new_h = int(w / target_aspect)
        start_y = (h - new_h) // 2
        img = img[start_y:start_y + new_h, :]
        
    img = cv2.resize(img, (target_w, target_h), interpolation=cv2.INTER_AREA)
    
    # Color grading:
    # 1. Convert to LAB and apply CLAHE to L channel for crisp micro-contrast
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.2, tileGridSize=(8, 8))
    l = clahe.apply(l)
    lab = cv2.merge((l, a, b))
    img = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)
    
    # 2. Color tuning:
    # Boost Red channel slightly (+8) to evoke brand Crimson
    # Reduce Yellow/Green by reducing (B, G) slightly in highlights
    b, g, r = cv2.split(img)
    r = cv2.add(r, 8)
    # Cool down greens/yellows
    g = cv2.subtract(g, 4)
    img = cv2.merge((b, g, r))
    
    # 3. Apply subtle obsidian vignette on edges
    Y, X = np.ogrid[:target_h, :target_w]
    center_y, center_x = target_h / 2, target_w / 2
    dist_from_center = np.sqrt((X - center_x)**2 + (Y - center_y)**2)
    max_dist = np.sqrt(center_x**2 + center_y**2)
    vignette = 1 - 0.28 * (dist_from_center / max_dist)**2
    vignette = np.clip(vignette, 0.7, 1.0)
    for c in range(3):
        img[:, :, c] = np.clip(img[:, :, c] * vignette, 0, 255).astype(np.uint8)
        
    # Save as high-quality WebP
    cv2.imwrite(final_webp, img, [cv2.IMWRITE_WEBP_QUALITY, 88])
    sz = os.path.getsize(final_webp) // 1024
    print(f"    Saved {final_webp} ({sz} KB)")

print("All EXIM images curated, graded, and saved!")
