"""Scènes « menuiserie » : cuisine, dressing, escalier, bibliothèque (vues d'élévation)."""
import math
from kit import Svg, blob, leaf_path

OAK = "#C9A174"
OAK_DARK = (0.38, 0.24, 0.13)


def wall(s: Svg, x, y, w, h, base="#E9E2D8", shade="#D6CCBE", light_from="left"):
    g = s.lin([(0, base), (1, shade)], 0, 0, 1, 0) if light_from == "left" else s.lin([(0, shade), (1, base)], 0, 0, 1, 0)
    s.a(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{g}"/>')
    tex = s.texture_filter(freq=0.03, seed=41, color=(0.5, 0.45, 0.38), k=0.5, b=-0.22, octaves=4)
    s.a(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{base}" opacity=".5" filter="url(#{tex})"/>')


def wood_rect(s: Svg, x, y, w, h, vertical=False, base=OAK, seed=4, rx=0, dark=OAK_DARK, k=1.9, b=-0.78):
    fx, fy = (0.11, 0.0035) if vertical else (0.0035, 0.11)
    f = s.wood_filter(seed=seed, fx=fx, fy=fy, dark=dark, k=k, b=b)
    s.a(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{base}" filter="url(#{f})"/>')


def soft_shadow(s: Svg, x, y, w, h, opacity=0.25, blur=10, rx=0):
    f = s.blur(blur)
    s.a(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="#2a1a0c" opacity="{opacity}" filter="url(#{f})"/>')


def jar(s: Svg, x, y, w, h, content):
    glass = s.lin([(0, "#ffffff", 0.35), (0.5, "#ffffff", 0.08), (1, "#ffffff", 0.3)], 0, 0, 1, 0)
    s.a(f'<rect x="{x}" y="{y + h*0.35:.1f}" width="{w}" height="{h*0.65:.1f}" rx="8" fill="{content}"/>')
    s.a(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="{glass}" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>')
    s.a(f'<rect x="{x - 3}" y="{y - 12}" width="{w + 6}" height="14" rx="4" fill="#B98C5E"/>')
    s.a(f'<rect x="{x + 6}" y="{y + 8}" width="5" height="{h - 18}" rx="2.5" fill="#fff" opacity=".55"/>')


def bowl_stack(s: Svg, x, y, w, colors):
    for i, c in enumerate(colors):
        yy = y - i * 18
        ww = w - i * 10
        xx = x + i * 5
        s.a(f'<path d="M{xx},{yy - 22} L{xx + ww},{yy - 22} Q{xx + ww - 6},{yy} {xx + ww / 2},{yy} Q{xx + 6},{yy} {xx},{yy - 22}Z" fill="{c}"/>')
        s.a(f'<ellipse cx="{xx + ww / 2}" cy="{yy - 22}" rx="{ww / 2}" ry="3" fill="#fff" opacity=".5"/>')


def plant_trailing(s: Svg, x, y, rng, pot="#D7CEC2"):
    s.a(f'<path d="M{x - 30},{y - 56} L{x + 30},{y - 56} L{x + 24},{y} L{x - 24},{y}Z" fill="{pot}"/>')
    s.a(f'<rect x="{x - 32}" y="{y - 62}" width="64" height="9" rx="3" fill="#E7E0D6"/>')
    greens = ["#4F7D3A", "#5F9146", "#3E6B2E", "#6FA352"]
    for vine in range(5):
        vx = x + rng.uniform(-28, 28)
        vy = y - 58
        length = rng.uniform(80, 210)
        steps = int(length / 16)
        for k in range(steps):
            px = vx + math.sin(k * 0.7 + vine) * 10 + (vine - 2) * 6
            py = vy + k * 16
            c = rng.choice(greens)
            ang = rng.uniform(-50, 50) + (90 if k % 2 else -90) + 90
            s.a(f'<path d="{leaf_path(22, 9)}" fill="{c}" transform="translate({px:.1f} {py:.1f}) rotate({ang:.0f})"/>')
    for k in range(9):
        ang = -90 + rng.uniform(-70, 70)
        s.a(f'<path d="{leaf_path(30, 12)}" fill="{rng.choice(greens)}" transform="translate({x + rng.uniform(-20,20):.1f} {y - 60:.1f}) rotate({ang:.0f})"/>')


def books(s: Svg, x, y, rng, n=7, palette=None, lean_last=True, max_h=110):
    palette = palette or ["#2F4858", "#C46A3C", "#E3D5B8", "#6B7F4E", "#8C3B3B", "#D9A441", "#3C3A4F", "#A9B8B0"]
    cx = x
    for i in range(n):
        w = rng.uniform(14, 26)
        h = rng.uniform(max_h * 0.72, max_h)
        c = rng.choice(palette)
        if lean_last and i == n - 1:
            s.a(f'<rect x="{cx + 6:.1f}" y="{y - h:.1f}" width="{w:.1f}" height="{h:.1f}" rx="2" fill="{c}" transform="rotate(14 {cx + 6:.1f} {y})"/>')
        else:
            s.a(f'<rect x="{cx:.1f}" y="{y - h:.1f}" width="{w:.1f}" height="{h:.1f}" rx="2" fill="{c}"/>')
            s.a(f'<rect x="{cx + 3:.1f}" y="{y - h + 12:.1f}" width="{w - 6:.1f}" height="3" fill="#fff" opacity=".35"/>')
            s.a(f'<rect x="{cx:.1f}" y="{y - h:.1f}" width="3" height="{h:.1f}" fill="#000" opacity=".12"/>')
        cx += w + 1.5
    return cx


# ---------------------------------------------------------------- cuisine
def scene_kitchen():
    s = Svg(1200, 900, seed=51)
    rng = s.rng
    wall(s, 0, 0, 1200, 600, base="#EDE7DE", shade="#D9CFC2")
    # fenêtre
    sky = s.lin([(0, "#D5E6EC"), (0.6, "#EAF1EC"), (1, "#F4F1E6")], 0, 0, 0, 1)
    s.a(f'<rect x="90" y="60" width="330" height="410" fill="{sky}"/>')
    fb = s.blur(14)
    for (cx, cy, r, c) in [(150, 420, 90, "#8FAE84"), (260, 440, 110, "#7C9C72"), (380, 410, 100, "#9DB78F"), (330, 360, 70, "#AFC59F"), (180, 360, 60, "#A6BF95")]:
        s.a(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{c}" opacity=".8" filter="url(#{fb})"/>')
    s.a('<rect x="90" y="60" width="330" height="410" fill="none" stroke="#F7F5F0" stroke-width="18"/>')
    s.a('<rect x="248" y="60" width="14" height="410" fill="#F7F5F0"/><rect x="90" y="250" width="330" height="12" fill="#F7F5F0"/>')
    s.a('<rect x="70" y="466" width="370" height="16" rx="3" fill="#F3F0EA"/>')
    soft_shadow(s, 72, 478, 366, 10, 0.18, 6)
    # lumière portée
    lb = s.blur(30)
    s.a(f'<path d="M430,90 L760,160 L800,560 L440,470Z" fill="#FFF6E2" opacity=".35" filter="url(#{lb})"/>')
    # étagères
    for sy in (200, 365):
        soft_shadow(s, 520, sy + 18, 640, 26, 0.28, 12)
        wood_rect(s, 520, sy, 640, 24, seed=7 + sy)
        s.a(f'<rect x="520" y="{sy}" width="640" height="4" fill="#fff" opacity=".3"/>')
        s.a(f'<rect x="520" y="{sy + 20}" width="640" height="4" fill="#5b3c22" opacity=".35"/>')
    # étagère haute
    bowl_stack(s, 545, 200, 120, ["#E9E3D7", "#C9D3C4", "#EFE9DF"])
    jar(s, 700, 118, 54, 82, "#E2C08A")
    jar(s, 766, 132, 50, 68, "#9C5B3B")
    jar(s, 828, 108, 58, 92, "#F1E6C9")
    books(s, 905, 200, rng, n=6, max_h=100)
    plant_trailing(s, 1085, 200, rng)
    # étagère basse
    for i, (px, r, c) in enumerate([(560, 58, "#E7E1D6"), (600, 52, "#C9D2C3"), (640, 48, "#EFEAE1")]):
        s.a(f'<ellipse cx="{px}" cy="{365 - r}" rx="{r}" ry="{r}" fill="{c}" stroke="#cfc6b8" stroke-width="2"/>')
        s.a(f'<ellipse cx="{px}" cy="{365 - r}" rx="{r*0.62:.1f}" ry="{r*0.62:.1f}" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/>')
    # pichet
    pg = s.lin([(0, "#F4F0E8"), (1, "#D9D1C4")], 0, 0, 1, 0)
    s.a(f'<path d="M730,365 L736,290 Q740,272 760,270 L800,270 Q812,272 814,288 L820,365Z" fill="{pg}"/>')
    s.a('<path d="M816,292 Q846,300 838,330 Q832,345 818,342" stroke="#D9D1C4" stroke-width="9" fill="none"/>')
    s.a('<path d="M736,276 L724,268 L744,266Z" fill="#E9E3D9"/>')
    # cadre
    s.a('<rect x="860" y="250" width="110" height="115" fill="#2E2A26"/><rect x="868" y="258" width="94" height="99" fill="#F3EEE4"/>')
    s.a('<circle cx="900" cy="300" r="22" fill="#D17A4A"/><rect x="915" y="296" width="36" height="46" fill="#4E6B5A"/><path d="M876,345 L955,330" stroke="#2E2A26" stroke-width="3"/>')
    # tasses
    for i, c in enumerate(["#3F5A6B", "#D9A441", "#E8E2D7"]):
        x = 1010 + i * 50
        s.a(f'<rect x="{x}" y="325" width="36" height="40" rx="6" fill="{c}"/>')
        s.a(f'<path d="M{x+36},335 q14,4 0,20" stroke="{c}" stroke-width="6" fill="none"/>')
    # plan de travail
    soft_shadow(s, 0, 590, 1200, 30, 0.35, 10)
    ctop = s.lin([(0, "#F3F1EC"), (1, "#E1DDD5")], 0, 0, 0, 1)
    s.a(f'<rect x="0" y="560" width="1200" height="36" fill="{ctop}"/>')
    tex = s.texture_filter(freq=0.25, seed=61, color=(0.4, 0.4, 0.4), k=1.4, b=-0.85, octaves=2)
    s.a(f'<rect x="0" y="560" width="1200" height="36" fill="#E9E6E0" filter="url(#{tex})" opacity=".8"/>')
    s.a('<rect x="0" y="560" width="1200" height="3" fill="#fff" opacity=".8"/>')
    # robinet
    s.a('<path d="M250,560 L250,450 Q250,412 290,412 Q326,412 326,450 L326,470" stroke="#26221F" stroke-width="12" fill="none" stroke-linecap="round"/>')
    s.a('<rect x="238" y="548" width="26" height="14" rx="3" fill="#26221F"/><rect x="268" y="540" width="8" height="20" rx="3" fill="#26221F"/>')
    # planche + citrons + pot ustensiles
    soft_shadow(s, 642, 420, 130, 140, 0.25, 10, rx=14)
    wood_rect(s, 640, 410, 120, 150, vertical=True, base="#B88654", seed=71, rx=14)
    s.a('<circle cx="700" cy="438" r="10" fill="#7a5532"/>')
    bowlg = s.lin([(0, "#F7F4EE"), (1, "#DCD5C9")], 0, 0, 0, 1)
    for (cx, cy) in [(492, 520), (526, 512), (560, 522), (510, 500), (545, 497)]:
        lg = s.rad([(0, "#FBE58A"), (0.7, "#F2C731"), (1, "#D9A51C")], cx=0.4, cy=0.35, r=0.65)
        s.a(f'<ellipse cx="{cx}" cy="{cy}" rx="22" ry="19" fill="{lg}"/>')
    s.a(f'<path d="M455,522 L595,522 Q588,562 525,562 Q462,562 455,522Z" fill="{bowlg}"/>')
    s.a('<path d="M1040,560 L1046,470 L1110,470 L1116,560Z" fill="#7B8C7D"/>')
    for (x2, y2, c) in [(1056, 400, "#B98C5E"), (1078, 392, "#8d6a45"), (1098, 410, "#C9A174")]:
        s.a(f'<path d="M{x2 + 6},472 L{x2 + 4},{y2}" stroke="{c}" stroke-width="8" stroke-linecap="round"/>')
        s.a(f'<ellipse cx="{x2 + 4}" cy="{y2}" rx="9" ry="16" fill="{c}"/>')
    # meubles bas
    y0, y1 = 596, 860
    s.a(f'<rect x="0" y="{y0}" width="1200" height="{y1 - y0}" fill="#5B4330"/>')
    fronts = [
        (4, y0 + 4, 292, 78), (4, y0 + 86, 292, 82), (4, y0 + 172, 292, 88),
        (300, y0 + 4, 196, y1 - y0 - 8), (500, y0 + 4, 196, y1 - y0 - 8),
        (700, y0 + 4, 196, y1 - y0 - 8),
        (900, y0 + 4, 296, 124), (900, y0 + 132, 296, 128),
    ]
    for i, (x, y, w, h) in enumerate(fronts):
        wood_rect(s, x, y, w, h, vertical=(h > 200), seed=81 + i)
        s.a(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#fff" opacity=".04"/>')
        if h > 200:
            hx = x + w - 22 if i % 2 else x + 14
            s.a(f'<rect x="{hx}" y="{y + 24}" width="8" height="90" rx="4" fill="#1F1B18"/>')
        else:
            s.a(f'<rect x="{x + w/2 - 60:.1f}" y="{y + 14}" width="120" height="8" rx="4" fill="#1F1B18"/>')
    # lumière sur façades
    s.a(f'<rect x="0" y="{y0}" width="1200" height="{y1 - y0}" fill="{s.lin([(0, "#FFF4DE", 0.18), (0.5, "#FFF4DE", 0.04), (1, "#000", 0.08)], 0, 0, 1, 0)}"/>')
    s.a(f'<rect x="0" y="{y1}" width="1200" height="40" fill="#2E241C"/>')
    s.finish(grain=0.18, vignette=0.32, warm=("#FFD08A", 0.12))
    return s


# ---------------------------------------------------------------- dressing
def garment(s: Svg, x, y, w, h, color, kind="shirt"):
    s.a(f'<path d="M{x + w/2:.1f},{y - 18} q-6,-10 0,-16 q8,-4 8,6" stroke="#8b7357" stroke-width="3" fill="none"/>')
    s.a(f'<path d="M{x + w/2:.1f},{y - 18} L{x + 2},{y} L{x + w - 2},{y} Z" stroke="#8b7357" stroke-width="3" fill="none"/>')
    if kind == "dress":
        d = f"M{x + w*0.2:.1f},{y} L{x + w*0.8:.1f},{y} L{x + w + 8:.1f},{y + h} L{x - 8:.1f},{y + h}Z"
    else:
        d = f"M{x:.1f},{y} L{x + w:.1f},{y} L{x + w:.1f},{y + h} Q{x + w/2:.1f},{y + h + 6} {x:.1f},{y + h}Z"
    sh = s.lin([(0, "#000", 0.18), (0.25, "#000", 0), (0.75, "#000", 0), (1, "#000", 0.22)], 0, 0, 1, 0)
    s.a(f'<path d="{d}" fill="{color}"/><path d="{d}" fill="{sh}"/>')
    if kind == "shirt":
        s.a(f'<path d="M{x + w/2:.1f},{y} L{x + w/2:.1f},{y + h}" stroke="#000" stroke-opacity=".12" stroke-width="2"/>')


def scene_dressing():
    s = Svg(900, 700, seed=63)
    rng = s.rng
    wall(s, 0, 0, 900, 700, base="#E6DFD5", shade="#D3C9BC")
    # caisson
    s.a('<rect x="40" y="40" width="820" height="600" fill="#CBB79C"/>')
    s.a(f'<rect x="60" y="60" width="780" height="560" fill="{s.lin([(0, "#E9E2D7"), (1, "#D8CEBF")], 0, 0, 0, 1)}"/>')
    for (x, y, w, h, v) in [(40, 40, 820, 22, False), (40, 618, 820, 22, False), (40, 40, 22, 600, True), (838, 40, 22, 600, True), (330, 40, 20, 600, True), (590, 40, 20, 600, True)]:
        wood_rect(s, x, y, w, h, vertical=v, seed=int(x + y))
    # penderie
    s.a('<rect x="66" y="112" width="262" height="8" rx="4" fill="#B08D57"/>')
    cols = ["#2D3A4A", "#F2EFE9", "#C8B79A", "#6D7A55", "#1F1E1C", "#B5835A", "#A8BCC9", "#EDE6DA"]
    x = 74
    for i, c in enumerate(cols):
        w = rng.uniform(26, 34)
        garment(s, x, 130, w, rng.uniform(220, 330), c, kind="dress" if i == 5 else "shirt")
        x += w - 4
    # étagères centrales + pulls pliés
    for sy in (180, 320, 460):
        wood_rect(s, 350, sy, 240, 16, seed=sy)
        glow = s.lin([(0, "#FFE9C2", 0.55), (1, "#FFE9C2", 0)], 0, 0, 0, 1)
        s.a(f'<rect x="350" y="{sy + 16}" width="240" height="40" fill="{glow}"/>')
    knits = ["#E8E1D3", "#B5562F", "#7B8794", "#33475B", "#C9A86A", "#9A9F86"]
    for row, sy in enumerate((180, 320, 460)):
        for stack in range(2):
            bx = 372 + stack * 110
            for k in range(3):
                c = knits[(row * 2 + stack + k) % len(knits)]
                yy = sy - 22 - k * 22
                s.a(f'<rect x="{bx}" y="{yy}" width="90" height="22" rx="7" fill="{c}"/>')
                s.a(f'<rect x="{bx + 4}" y="{yy + 3}" width="82" height="4" rx="2" fill="#fff" opacity=".18"/>')
    # tiroirs
    for i in range(2):
        y = 500 + i * 58
        wood_rect(s, 352, y, 236, 54, seed=300 + i)
        s.a(f'<rect x="430" y="{y + 24}" width="80" height="6" rx="3" fill="#2A2522"/>')
    # chaussures
    for sy in (440, 540):
        s.a(f'<path d="M612,{sy} L836,{sy - 26} L836,{sy - 14} L612,{sy + 12}Z" fill="#B8A07F"/>')
    shoes = ["#2A2420", "#8C5A3C", "#E9E4DA", "#1E2A3A"]
    for i in range(4):
        x = 630 + (i % 2) * 100
        y = (420 if i < 2 else 520) - (i % 2) * 12
        c = shoes[i]
        s.a(f'<path d="M{x},{y} q10,-22 40,-22 l30,8 q10,6 6,14 Z" fill="{c}"/><path d="M{x + 40},{y + 4} q10,-22 40,-22 l30,8 q10,6 6,14 Z" fill="{c}" opacity=".92"/>')
    # boîtes et chapeau
    s.a('<rect x="626" y="120" width="96" height="60" rx="4" fill="#E9E1D2"/><rect x="740" y="132" width="80" height="48" rx="4" fill="#C9B79C"/>')
    s.a('<ellipse cx="700" cy="306" rx="70" ry="14" fill="#7C5C3E"/><path d="M660,306 Q662,250 700,250 Q738,250 740,306Z" fill="#8E6B49"/><rect x="662" y="288" width="76" height="8" fill="#2A2420"/>')
    wood_rect(s, 610, 320, 228, 16, seed=901)
    s.a('<rect x="40" y="640" width="820" height="60" fill="#B88F62"/>')
    s.finish(grain=0.18, vignette=0.38, warm=("#FFC97A", 0.16))
    return s


# ---------------------------------------------------------------- escalier
def scene_stairs():
    s = Svg(900, 700, seed=71)
    rng = s.rng
    wall(s, 0, 0, 900, 620, base="#F2EFEA", shade="#DCD6CD", light_from="right")
    lb = s.blur(40)
    s.a(f'<path d="M900,0 L560,0 L300,620 L900,620Z" fill="#FFF8EA" opacity=".55" filter="url(#{lb})"/>')
    # cadre
    s.a('<rect x="120" y="110" width="190" height="140" fill="#2B2724"/><rect x="130" y="120" width="170" height="120" fill="#EFE6D6"/>')
    s.a('<path d="M130,210 Q180,160 230,190 T300,170 L300,240 L130,240Z" fill="#9AAE9A"/><circle cx="255" cy="155" r="16" fill="#E2A15E"/>')
    # marches suspendues
    n = 9
    for i in range(n):
        x = 90 + i * 62
        y = 600 - (i + 1) * 58
        sb = s.blur(10)
        s.a(f'<path d="M{x + 10},{y + 30} L{x + 210},{y + 30} L{x + 260},{y + 90} L{x + 60},{y + 90}Z" fill="#6b5a48" opacity=".22" filter="url(#{sb})"/>')
        wood_rect(s, x, y, 210, 30, seed=500 + i, base="#C79E6E")
        s.a(f'<rect x="{x}" y="{y}" width="210" height="4" fill="#fff" opacity=".45"/>')
        s.a(f'<rect x="{x}" y="{y + 26}" width="210" height="4" fill="#4b3420" opacity=".35"/>')
    # garde-corps
    for i in range(n):
        x = 90 + i * 62 + 190
        y = 600 - (i + 1) * 58
        s.a(f'<rect x="{x}" y="{y - 150}" width="5" height="150" fill="#1E1C1B"/>')
    s.a('<path d="M280,446 L838,-76" stroke="#1E1C1B" stroke-width="7"/>')
    # sol
    floor = s.lin([(0, "#C69B6A"), (1, "#A77B4E")], 0, 0, 0, 1)
    s.a(f'<rect x="0" y="620" width="900" height="80" fill="{floor}"/>')
    for k in range(6):
        s.a(f'<path d="M0,{630 + k * 13} L900,{630 + k * 13}" stroke="#8a6440" stroke-width="1.5" opacity=".5"/>')
    s.a('<rect x="0" y="616" width="900" height="6" fill="#FAF8F4"/>')
    # plante
    s.a('<path d="M60,620 L70,540 L150,540 L160,620Z" fill="#C46A3C"/><rect x="62" y="532" width="96" height="12" rx="4" fill="#B05C30"/>')
    for k in range(14):
        ang = -90 + rng.uniform(-60, 60)
        ln = rng.uniform(60, 130)
        sx, sy = 110 + rng.uniform(-6, 6), 540 - rng.uniform(0, 160)
        s.a(f'<path d="M110,540 Q{sx},{sy + 40} {sx:.1f},{sy:.1f}" stroke="#3E5E2E" stroke-width="3" fill="none"/>')
        s.a(f'<path d="{leaf_path(ln * 0.55, ln * 0.24)}" fill="{rng.choice(["#3F6B35", "#4E7F40", "#5F9149"])}" transform="translate({sx:.1f} {sy:.1f}) rotate({ang:.0f})"/>')
    s.finish(grain=0.16, vignette=0.3, warm=("#FFD08A", 0.1))
    return s


# ---------------------------------------------------------------- bibliothèque
def scene_library():
    s = Svg(900, 700, seed=83)
    rng = s.rng
    wall(s, 0, 0, 900, 700, base="#3F4A44", shade="#323B36")
    # niche + banquette
    s.a('<rect x="330" y="120" width="240" height="300" fill="#C9D8D8"/>')
    fb = s.blur(18)
    s.a(f'<circle cx="420" cy="380" r="90" fill="#7E9F84" filter="url(#{fb})" opacity=".8"/><circle cx="520" cy="360" r="70" fill="#9DB8A0" filter="url(#{fb})" opacity=".8"/>')
    s.a('<rect x="330" y="120" width="240" height="300" fill="none" stroke="#F4F1EA" stroke-width="12"/><rect x="444" y="120" width="12" height="300" fill="#F4F1EA"/>')
    # structure chêne
    frame = [(40, 40, 24, 620, True), (836, 40, 24, 620, True), (40, 40, 820, 24, False), (306, 40, 24, 520, True), (570, 40, 24, 520, True), (40, 560, 820, 26, False)]
    for (x, y, w, h, v) in frame:
        wood_rect(s, x, y, w, h, vertical=v, seed=int(x * 3 + y))
    for col_x in (64, 594):
        s.a(f'<rect x="{col_x}" y="64" width="242" height="496" fill="#2C332F" opacity=".55"/>')
        for k, sy in enumerate((180, 300, 420)):
            wood_rect(s, col_x, sy, 242, 16, seed=sy + col_x)
        for k, base in enumerate((180, 300, 420, 560)):
            x = col_x + 8
            if k == 1:
                s.a(f'<path d="M{x + 140},{base} L{x + 150},{base - 50} L{x + 200},{base - 50} L{x + 210},{base}Z" fill="#D9CFC2"/>')
                for j in range(6):
                    s.a(f'<path d="{leaf_path(40, 14)}" fill="#5F9149" transform="translate({x + 175} {base - 50}) rotate({-160 + j * 28})"/>')
                books(s, x, base, rng, n=5, max_h=100)
            elif k == 2:
                books(s, x + 60, base, rng, n=7, max_h=100)
                s.a(f'<rect x="{x}" y="{base - 40}" width="50" height="40" rx="4" fill="#C46A3C"/>')
            else:
                books(s, x, base, rng, n=9, max_h=100)
    # banquette + coussins
    wood_rect(s, 330, 470, 240, 90, seed=777)
    s.a('<rect x="330" y="440" width="240" height="34" rx="10" fill="#E8DCC6"/>')
    s.a('<rect x="350" y="400" width="80" height="54" rx="14" fill="#C46A3C"/><rect x="460" y="404" width="90" height="50" rx="14" fill="#9AAE9A"/>')
    # lampe
    s.a('<path d="M450,64 L450,96" stroke="#1d1d1d" stroke-width="3"/><path d="M420,96 L480,96 L468,74 L432,74Z" fill="#D9A441"/>')
    lg = s.blur(26)
    s.a(f'<ellipse cx="450" cy="150" rx="90" ry="60" fill="#FFE2A8" opacity=".35" filter="url(#{lg})"/>')
    s.a('<rect x="0" y="660" width="900" height="40" fill="#A77B4E"/>')
    s.finish(grain=0.16, vignette=0.36, warm=("#FFC97A", 0.12))
    return s
