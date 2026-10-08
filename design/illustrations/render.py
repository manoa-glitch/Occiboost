"""Génère les illustrations des sites d'exemple (SVG -> WebP).

Usage :
    python3 design/illustrations/render.py            # toutes les scènes
    python3 design/illustrations/render.py burrata    # filtre par nom

Prérequis : Python 3, Playwright (Chromium) et Pillow.
Les fichiers WebP sont écrits dans src/assets/img/ et les sources SVG dans design/illustrations/out/.
"""
import io
import sys
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import importlib  # noqa: E402

ROOT = HERE.parent.parent
OUT_IMG = ROOT / "src" / "assets" / "img"
OUT_SVG = HERE / "out"

# nom -> (fonction, largeur de sortie, qualité)
SCENES = {
    "resto-hero": ("food.scene_burrata_hero", 1080, 80),
    "resto-burrata": ("food.scene_burrata_square", 560, 80),
    "resto-saumon": ("food.scene_salmon", 560, 80),
    "resto-figues": ("food.scene_figtart", 560, 80),
    "atelier-cuisine": ("interiors.scene_kitchen", 1080, 80),
    "atelier-dressing": ("interiors.scene_dressing", 720, 80),
    "atelier-escalier": ("interiors.scene_stairs", 720, 80),
    "atelier-bibliotheque": ("interiors.scene_library", 720, 80),
    "immo-villa": ("estate.scene_villa", 1400, 80),
    "immo-maison": ("estate.scene_wood_house", 720, 80),
    "immo-salon": ("estate.scene_living", 720, 80),
    "immo-loft": ("estate.scene_loft", 720, 80),
    "shop-vase": ("products.scene_vase", 520, 82),
    "shop-tasse": ("products.scene_mug", 520, 82),
    "shop-bol": ("products.scene_bowl", 520, 82),
    "shop-carafe": ("products.scene_jug", 520, 82),
}


def main():
    flt = sys.argv[1] if len(sys.argv) > 1 else ""
    OUT_IMG.mkdir(parents=True, exist_ok=True)
    OUT_SVG.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        for name, (fn, out_w, q) in SCENES.items():
            if flt and flt not in name:
                continue
            mod, func = fn.split(".")
            svg = getattr(importlib.import_module(mod), func)()
            markup = svg.render()
            (OUT_SVG / f"{name}.svg").write_text(markup)
            page.set_viewport_size({"width": svg.w, "height": svg.h})
            page.set_content(f'<html><body style="margin:0;background:#000">{markup}</body></html>')
            page.wait_for_timeout(50)
            png = page.screenshot(clip={"x": 0, "y": 0, "width": svg.w, "height": svg.h})
            img = Image.open(io.BytesIO(png)).convert("RGB")
            if out_w and out_w < img.width:
                out_h = round(img.height * out_w / img.width)
                img = img.resize((out_w, out_h), Image.LANCZOS)
            dest = OUT_IMG / f"{name}.webp"
            img.save(dest, "WEBP", quality=q, method=6)
            print(f"{name:24s} {img.width}x{img.height}  {dest.stat().st_size/1024:.0f} KB")
        browser.close()


if __name__ == "__main__":
    main()
