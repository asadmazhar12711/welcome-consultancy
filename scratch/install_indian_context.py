import urllib.request
import os
import cv2
import numpy as np

INDIAN_EXIM_ASSETS = {
    # 1. DGFT: Actual Udyog Bhawan New Delhi (DGFT & Ministry of Commerce headquarters)
    "service-dgft": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Udyog_Bhawan_1.jpg",
    
    # 2. FSSAI: Authentic Indian spices export (turmeric, cardamom, chili in burlap export sacks)
    "service-fssai": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1600&auto=format&fit=crop",
    
    # 3. RCMC: Indian Commerce Minister chairing Export Promotion Councils review meeting
    "service-rcmc": "https://upload.wikimedia.org/wikipedia/commons/a/a4/The_Union_Minister_for_Commerce_%26_Industry_and_Textiles%2C_Shri_Anand_Sharma_chairing_the_review_meeting_on_Export_Sector_Performance_involving_industry_bodies_and_Export_promotion_Councils%2C_in_New_Delhi_on_August_14%2C_2012.jpg",
    
    # 4. Advance Licence: CMA CGM Wagner container ship at Mumbai Port India
    "service-advance-licence": "https://upload.wikimedia.org/wikipedia/commons/1/13/%22CMA_CGM_WAGNER%22_IMO-_9280665_-_CONTAINER_SHIP_65247_tons%2C_Mumbai_-_India._%2813906868747%29.jpg",
    
    # 5. IEC Code: Certificate of Origin & Customs Desk documentation
    "service-iec": "https://upload.wikimedia.org/wikipedia/commons/7/76/Certificate_of_origin-_Customs_Desk.jpg",
    
    # 6. Certificate of Origin: Official customs stamped trade documents
    "service-coo": "https://upload.wikimedia.org/wikipedia/commons/7/76/Certificate_of_origin-_Customs_Desk.jpg",
    
    # 7. AEO Green Channel: Mumbai container terminal from Elephanta Island
    "service-aeo": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Mumbai_container_terminal_from_Elephanta_Island.jpg",
    
    # 8. EPCG: Heavy precision industrial CNC machinery manufacturing
    "service-epcg": "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1600&auto=format&fit=crop",
    
    # 9. Star Export House: Prestigious Indian trade tower architecture
    "service-export-house": "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop",
    
    # 10. ICEGATE: Electronic customs EDI terminal & container loading
    "service-icegate": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1600&auto=format&fit=crop",
    
    # 11. DSC: Cryptographic hardware security key for DGFT/ICEGATE
    "service-dsc": "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop",
    
    # 12. Compliance: Legal regulatory audit & trade policy review
    "service-compliance": "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1600&auto=format&fit=crop",
    
    # 13. FAQ Clarity: Structured legal trade policy documentation
    "faq-clarity": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
    
    # 14. Contact Workspace: Welcome Consultancy Mumbai executive trade desk
    "contact-workspace": "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"
}

out_dir = "public/illustrations"
os.makedirs("scratch/indian_raw", exist_ok=True)
headers = {"User-Agent": "WelcomeConsultancyBot/2.0 (mumbai@welcomeconsultancy.in)"}

for key, url in INDIAN_EXIM_ASSETS.items():
    raw_path = f"scratch/indian_raw/{key}.jpg"
    final_webp = f"{out_dir}/{key}.webp"
    print(f"--> Downloading Indian context for [{key}]...")
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as resp, open(raw_path, "wb") as f:
            f.write(resp.read())
    except Exception as e:
        print(f"    Failed download {key}: {e}")
        continue
        
    img = cv2.imread(raw_path)
    if img is None:
        print(f"    Failed reading {raw_path}")
        continue
        
    target_w, target_h = 1600, 900
    h, w = img.shape[:2]
    target_aspect = 16 / 9
    current_aspect = w / h
    if current_aspect > target_aspect:
        new_w = int(h * target_aspect)
        start_x = (w - new_w) // 2
        img = img[:, start_x:start_x + new_w]
    else:
        new_h = int(w / target_aspect)
        start_y = (h - new_h) // 2
        img = img[start_y:start_y + new_h, :]
        
    img = cv2.resize(img, (target_w, target_h), interpolation=cv2.INTER_AREA)
    
    # CLAHE for micro-contrast
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.2, tileGridSize=(8, 8))
    l = clahe.apply(l)
    lab = cv2.merge((l, a, b))
    img = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)
    
    # Boost Red slightly (+6), tone down harsh yellows (-3)
    b, g, r = cv2.split(img)
    r = cv2.add(r, 6)
    g = cv2.subtract(g, 3)
    img = cv2.merge((b, g, r))
    
    # Edge vignette
    Y, X = np.ogrid[:target_h, :target_w]
    center_y, center_x = target_h / 2, target_w / 2
    dist = np.sqrt((X - center_x)**2 + (Y - center_y)**2)
    max_d = np.sqrt(center_x**2 + center_y**2)
    vignette = np.clip(1 - 0.28 * (dist / max_d)**2, 0.72, 1.0)
    for c in range(3):
        img[:, :, c] = np.clip(img[:, :, c] * vignette, 0, 255).astype(np.uint8)
        
    cv2.imwrite(final_webp, img, [cv2.IMWRITE_WEBP_QUALITY, 88])
    sz = os.path.getsize(final_webp) // 1024
    print(f"    Saved {final_webp} ({sz} KB)")

print("Indian context assets successfully processed!")
