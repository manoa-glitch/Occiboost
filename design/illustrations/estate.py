"""Scènes « immobilier » : villa, maison bois, salon, loft."""
import math
from kit import Svg, blob, leaf_path
from interiors import wood_rect, soft_shadow, books


def glass_pane(s: Svg, x, y, w, h, warm=False, seed=0):
    sky = s.lin([(0, "#5E7C93"), (0.55, "#3C5367"), (1, "#2A3A48")], 0, 0, 0, 1)
    s.a(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" fill="{sky}"/>')
    if warm:
        lg = s.lin([(0, "#FFD9A0", 0.55), (1, "#FFB866", 0.25)], 0, 0, 0, 1)
        s.a(f'<rect x="{x:.1f}" y="{y + h*0.25:.1f}" width="{w:.1f}" height="{h*0.75:.1f}" fill="{lg}"/>')
        # silhouettes intérieures
        s.a(f'<rect x="{x + w*0.15:.1f}" y="{y + h*0.68:.1f}" width="{w*0.7:.1f}" height="{h*0.18:.1f}" rx="6" fill="#6b4a33" opacity=".55"/>')
        s.a(f'<path d="M{x + w*0.75:.1f},{y + h*0.68:.1f} L{x + w*0.75:.1f},{y + h*0.3:.1f}" stroke="#4a3526" stroke-width="3" opacity=".6"/>')
        s.a(f'<path d="M{x + w*0.68:.1f},{y + h*0.32:.1f} L{x + w*0.82:.1f},{y + h*0.32:.1f} L{x + w*0.79:.1f},{y + h*0.22:.1f} L{x + w*0.71:.1f},{y + h*0.22:.1f}Z" fill="#FFE7B8"/>')
    refl = s.lin([(0, "#fff", 0.0), (0.45, "#fff", 0.0), (0.5, "#fff", 0.22), (0.62, "#fff", 0.0), (1, "#fff", 0.0)], 0, 0, 1, 1)
    s.a(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" fill="{refl}"/>')
    s.a(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" fill="none" stroke="#2B2B2B" stroke-width="5"/>')


def olive_tree(s: Svg, x, y, scale, rng):
    trunk = f"M{x - 10*scale:.1f},{y} C{x - 18*scale:.1f},{y - 60*scale:.1f} {x + 14*scale:.1f},{y - 90*scale:.1f} {x - 6*scale:.1f},{y - 150*scale:.1f} L{x + 10*scale:.1f},{y - 150*scale:.1f} C{x + 30*scale:.1f},{y - 90*scale:.1f} {x + 6*scale:.1f},{y - 60*scale:.1f} {x + 14*scale:.1f},{y}Z"
    s.a(f'<path d="{trunk}" fill="#6B5A4A"/>')
    cols = ["#8E9C7E", "#7D8C6E", "#A4B092", "#6F7E61", "#B5BFA4"]
    for _ in range(170):
        a = rng.uniform(0, math.tau)
        r = 120 * scale * math.sqrt(rng.random())
        cx = x + math.cos(a) * r * 1.25
        cy = y - 190 * scale + math.sin(a) * r * 0.7
        s.a(f'<ellipse cx="{cx:.1f}" cy="{cy:.1f}" rx="{rng.uniform(7, 14)*scale:.1f}" ry="{rng.uniform(4, 8)*scale:.1f}" fill="{rng.choice(cols)}" opacity=".92" transform="rotate({rng.uniform(-40, 40):.0f} {cx:.1f} {cy:.1f})"/>')


def cypress(s: Svg, x, y, h, w, rng):
    g = s.lin([(0, "#3E5A3E"), (0.6, "#2C4630"), (1, "#22382A")], 0, 0, 1, 0)
    s.a(f'<path d="M{x},{y - h} C{x + w*0.6:.1f},{y - h*0.7:.1f} {x + w*0.7:.1f},{y - h*0.2:.1f} {x + w*0.35:.1f},{y} L{x - w*0.35:.1f},{y} C{x - w*0.7:.1f},{y - h*0.2:.1f} {x - w*0.6:.1f},{y - h*0.7:.1f} {x},{y - h}Z" fill="{g}"/>')
    for _ in range(30):
        yy = y - rng.uniform(0.05, 0.95) * h
        xx = x + rng.uniform(-0.3, 0.3) * w * (1 - abs(yy - (y - h * 0.4)) / h)
        s.a(f'<ellipse cx="{xx:.1f}" cy="{yy:.1f}" rx="{w*0.12:.1f}" ry="{w*0.2:.1f}" fill="#4B6B48" opacity=".5"/>')


def lavender(s: Svg, x0, x1, y, rng, density=60):
    for _ in range(density):
        x = rng.uniform(x0, x1)
        h = rng.uniform(30, 60)
        s.a(f'<path d="M{x:.1f},{y} L{x + rng.uniform(-8, 8):.1f},{y - h:.1f}" stroke="#6E8457" stroke-width="2.5"/>')
        s.a(f'<ellipse cx="{x + rng.uniform(-8, 8):.1f}" cy="{y - h:.1f}" rx="4" ry="10" fill="{rng.choice(["#8E7BC2", "#7D69B5", "#A08ED0"])}"/>')


def scene_villa():
    s = Svg(1600, 900, seed=91)
    rng = s.rng
    sky = s.lin([(0, "#86AED0"), (0.45, "#C9DCE6"), (0.75, "#F3D8B6"), (1, "#F7C99A")], 0, 0, 0, 1)
    s.a(f'<rect width="1600" height="680" fill="{sky}"/>')
    sun = s.rad([(0, "#FFF1CF", 0.95), (0.25, "#FFE2AE", 0.55), (1, "#FFE2AE", 0)], cx=0.5, cy=0.5, r=0.5)
    s.a(f'<circle cx="1330" cy="540" r="320" fill="{sun}"/>')
    s.a('<path d="M0,560 C200,520 360,540 520,520 C700,500 900,530 1100,510 C1300,495 1450,520 1600,505 L1600,680 L0,680Z" fill="#A9B7C2" opacity=".75"/>')
    s.a('<path d="M0,600 C240,580 420,600 640,585 C860,570 1080,600 1300,585 C1450,575 1520,590 1600,585 L1600,680 L0,680Z" fill="#8FA2AE" opacity=".7"/>')
    ground = s.lin([(0, "#9AAE76"), (1, "#6E8650")], 0, 0, 0, 1)
    s.a(f'<rect x="0" y="640" width="1600" height="260" fill="{ground}"/>')
    # villa
    soft_shadow(s, 350, 600, 920, 70, 0.35, 20)
    facade = s.lin([(0, "#E9E4DA"), (0.6, "#F6F2EA"), (1, "#FFFDF8")], 0, 0, 1, 0)
    s.a(f'<rect x="520" y="236" width="540" height="150" fill="{facade}"/>')
    s.a(f'<rect x="360" y="380" width="880" height="270" fill="{facade}"/>')
    # bardage bois
    for i in range(12):
        x = 362 + i * 13.5
        wood_rect(s, x, 392, 11, 258, vertical=True, base="#B9875A", seed=1000 + i)
    # vitrages
    for i in range(5):
        glass_pane(s, 560 + i * 132, 420, 122, 230, warm=(i in (1, 2, 4)), seed=i)
    for i in range(3):
        glass_pane(s, 580 + i * 152, 270, 142, 96, warm=(i == 1), seed=10 + i)
    # dalles débordantes + ombres
    for (x, y, w) in [(490, 222, 600), (330, 370, 940)]:
        sb = s.blur(8)
        s.a(f'<rect x="{x}" y="{y + 16}" width="{w}" height="22" fill="#000" opacity=".25" filter="url(#{sb})"/>')
        s.a(f'<rect x="{x}" y="{y}" width="{w}" height="18" fill="#FBF9F4"/><rect x="{x}" y="{y + 15}" width="{w}" height="3" fill="#C9C2B5"/>')
    # terrasse bois
    for k in range(5):
        wood_rect(s, 260, 650 + k * 9, 1080, 9, base="#B48558", seed=2000 + k)
    # piscine
    s.a('<path d="M240,696 L1360,696 L1420,812 L180,812Z" fill="#EDE7DB"/>')
    water = s.lin([(0, "#58C3D8"), (0.5, "#2FA3C2"), (1, "#1E86A8")], 0, 0, 0, 1)
    s.a(f'<path d="M262,706 L1338,706 L1392,800 L208,800Z" fill="{water}"/>')
    for k in range(26):
        y = 712 + rng.uniform(0, 82)
        x = rng.uniform(260, 1330)
        w = rng.uniform(40, 140)
        s.a(f'<path d="M{x:.1f},{y:.1f} q{w/4:.1f},-6 {w/2:.1f},0 t{w/2:.1f},0" stroke="#E6FAFF" stroke-width="2" fill="none" opacity=".55"/>')
    sunr = s.blur(12)
    s.a(f'<ellipse cx="1180" cy="740" rx="150" ry="16" fill="#FFF3D6" opacity=".6" filter="url(#{sunr})"/>')
    # végétation
    olive_tree(s, 170, 700, 1.25, rng)
    for (x, h) in [(1430, 380), (1500, 330), (1560, 300)]:
        cypress(s, x, 700, h, 70, rng)
    lavender(s, 20, 520, 900, rng, 70)
    lavender(s, 1120, 1590, 900, rng, 70)
    s.finish(grain=0.16, vignette=0.28, warm=("#FFB866", 0.14))
    return s


def scene_wood_house():
    s = Svg(800, 600, seed=95)
    rng = s.rng
    sky = s.lin([(0, "#9CC3DE"), (1, "#E3EEF0")], 0, 0, 0, 1)
    s.a(f'<rect width="800" height="600" fill="{sky}"/>')
    fb = s.blur(18)
    for (cx, cy, r, c) in [(80, 420, 120, "#6F8F5E"), (720, 400, 140, "#5E7F52"), (640, 440, 100, "#7FA06B"), (150, 450, 90, "#86A673")]:
        s.a(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{c}" filter="url(#{fb})"/>')
    grass = s.lin([(0, "#8DB06A"), (1, "#5F8546")], 0, 0, 0, 1)
    s.a(f'<rect x="0" y="470" width="800" height="130" fill="{grass}"/>')
    # maison à pignon
    soft_shadow(s, 210, 450, 400, 40, 0.3, 14)
    s.a('<clipPath id="gable"><path d="M200,470 L200,250 L400,110 L600,250 L600,470Z"/></clipPath>')
    s.a('<g clip-path="url(#gable)">')
    for i in range(32):
        wood_rect(s, 200 + i * 12.5, 100, 11, 380, vertical=True, base="#A9764A", seed=3000 + i, dark=(0.3, 0.18, 0.1))
    s.a('</g>')
    s.a('<path d="M180,262 L400,104 L620,262" stroke="#2D2A27" stroke-width="16" fill="none" stroke-linejoin="round"/>')
    glass_pane(s, 330, 230, 140, 240, warm=True)
    s.a('<path d="M330,230 L400,168 L470,230Z" fill="#3C5367" stroke="#2B2B2B" stroke-width="5"/>')
    glass_pane(s, 230, 330, 70, 90)
    glass_pane(s, 500, 330, 70, 90)
    s.a('<rect x="180" y="468" width="440" height="10" fill="#8F8A80"/>')
    for x in (250, 320, 470, 560):
        s.a(f'<ellipse cx="{x}" cy="476" rx="34" ry="18" fill="#4E7A3E"/>')
    s.finish(grain=0.15, vignette=0.28)
    return s


def scene_living():
    s = Svg(800, 600, seed=97)
    rng = s.rng
    wall = s.lin([(0, "#F1ECE4"), (1, "#E2DBD0")], 0, 0, 1, 0)
    s.a(f'<rect width="800" height="470" fill="{wall}"/>')
    # baie vitrée
    view = s.lin([(0, "#BFD6E4"), (1, "#E8EEE6")], 0, 0, 0, 1)
    s.a(f'<rect x="420" y="50" width="330" height="330" fill="{view}"/>')
    fb = s.blur(12)
    for (cx, cy, r, c) in [(470, 340, 70, "#8FAE84"), (560, 330, 80, "#7C9C72"), (690, 320, 90, "#9DB78F")]:
        s.a(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{c}" filter="url(#{fb})" opacity=".85"/>')
    s.a('<rect x="420" y="50" width="330" height="330" fill="none" stroke="#2B2B2B" stroke-width="8"/><rect x="581" y="50" width="8" height="330" fill="#2B2B2B"/>')
    # tableau
    s.a('<rect x="90" y="90" width="180" height="130" fill="#FAF7F1" stroke="#2B2724" stroke-width="6"/><circle cx="150" cy="150" r="30" fill="#D17A4A"/><rect x="170" y="130" width="70" height="70" fill="#9AAE9A" opacity=".9"/>')
    # sol
    floor = s.lin([(0, "#C49A6C"), (1, "#A57C52")], 0, 0, 0, 1)
    s.a(f'<rect x="0" y="470" width="800" height="130" fill="{floor}"/>')
    s.a('<ellipse cx="360" cy="540" rx="300" ry="46" fill="#E9E1D2"/>')
    # canapé
    soft_shadow(s, 60, 440, 520, 50, 0.3, 14)
    sofa = s.lin([(0, "#9DB09A"), (1, "#7E937B")], 0, 0, 0, 1)
    s.a(f'<rect x="60" y="320" width="520" height="90" rx="26" fill="{sofa}"/>')
    s.a(f'<rect x="60" y="380" width="520" height="80" rx="22" fill="#8EA28B"/>')
    s.a('<rect x="40" y="350" width="60" height="110" rx="26" fill="#8A9E87"/><rect x="540" y="350" width="60" height="110" rx="26" fill="#8A9E87"/>')
    for (x, c) in [(120, "#E9DCC4"), (220, "#C46A3C"), (420, "#E9DCC4")]:
        s.a(f'<rect x="{x}" y="330" width="80" height="62" rx="16" fill="{c}"/>')
    s.a('<rect x="90" y="460" width="10" height="20" fill="#3a2a1e"/><rect x="540" y="460" width="10" height="20" fill="#3a2a1e"/>')
    # table basse
    s.a('<ellipse cx="350" cy="520" rx="110" ry="22" fill="#2E2925"/><ellipse cx="350" cy="514" rx="110" ry="22" fill="#4A3F36"/>')
    s.a('<rect x="320" y="488" width="44" height="22" rx="4" fill="#E6DED0"/><circle cx="400" cy="500" r="12" fill="#D9A441"/>')
    # lampe + plante
    s.a('<path d="M680,470 L680,230" stroke="#1E1C1B" stroke-width="4"/><path d="M640,232 L720,232 L700,190 L660,190Z" fill="#EADBC0"/>')
    s.a('<path d="M720,470 L730,410 L780,410 L790,470Z" fill="#D9CFC2"/>')
    for k in range(10):
        ang = -90 + rng.uniform(-60, 60)
        s.a(f'<path d="{leaf_path(rng.uniform(50, 80), 22)}" fill="{rng.choice(["#3F6B35", "#4E7F40", "#5F9149"])}" transform="translate(755 410) rotate({ang:.0f})"/>')
    s.finish(grain=0.15, vignette=0.3, warm=("#FFC97A", 0.12))
    return s


def scene_loft():
    s = Svg(800, 600, seed=99)
    rng = s.rng
    concrete = s.lin([(0, "#B8B3AA"), (1, "#9E988E")], 0, 0, 1, 0)
    s.a(f'<rect width="800" height="470" fill="{concrete}"/>')
    tex = s.texture_filter(freq=0.02, seed=101, color=(0.35, 0.33, 0.3), k=0.8, b=-0.38, octaves=5)
    s.a(f'<rect width="800" height="470" fill="#ADA79D" filter="url(#{tex})" opacity=".9"/>')
    # verrière
    s.a('<rect x="80" y="40" width="380" height="380" fill="#D7E4EA"/>')
    fb = s.blur(10)
    for (cx, cy, w, h, c) in [(120, 300, 60, 160, "#9AA7B0"), (200, 260, 70, 200, "#8D9AA4"), (300, 320, 80, 140, "#A9B4BB"), (390, 280, 60, 180, "#97A3AC")]:
        s.a(f'<rect x="{cx}" y="{cy - h + 120}" width="{w}" height="{h}" fill="{c}" filter="url(#{fb})" opacity=".8"/>')
    for i in range(5):
        s.a(f'<rect x="{80 + i*95 - 4}" y="40" width="8" height="380" fill="#1D1D1D"/>')
    for j in range(5):
        s.a(f'<rect x="80" y="{40 + j*95 - 4}" width="384" height="8" fill="#1D1D1D"/>')
    lb = s.blur(30)
    s.a(f'<path d="M460,60 L760,140 L760,470 L460,440Z" fill="#FFF3DD" opacity=".35" filter="url(#{lb})"/>')
    # sol + table
    floor = s.lin([(0, "#8B6544"), (1, "#6E4E33")], 0, 0, 0, 1)
    s.a(f'<rect x="0" y="470" width="800" height="130" fill="{floor}"/>')
    soft_shadow(s, 470, 470, 300, 30, 0.35, 12)
    wood_rect(s, 450, 400, 320, 20, base="#B98A5C", seed=4100)
    s.a('<rect x="470" y="420" width="10" height="90" fill="#1D1D1D"/><rect x="740" y="420" width="10" height="90" fill="#1D1D1D"/>')
    for x in (500, 610, 700):
        s.a(f'<path d="M{x},500 L{x + 6},430 L{x + 46},430 L{x + 52},500" stroke="#1D1D1D" stroke-width="5" fill="none"/>')
        s.a(f'<rect x="{x + 2}" y="438" width="48" height="10" rx="3" fill="#2a2a2a"/>')
    # suspensions
    for x in (540, 680):
        s.a(f'<path d="M{x},0 L{x},250" stroke="#1D1D1D" stroke-width="2"/><path d="M{x - 34},288 Q{x},230 {x + 34},288Z" fill="#1D1D1D"/>')
        g = s.blur(18)
        s.a(f'<ellipse cx="{x}" cy="300" rx="50" ry="22" fill="#FFE0A6" opacity=".55" filter="url(#{g})"/>')
    # plante + vase
    s.a('<path d="M590,400 L596,360 L624,360 L630,400Z" fill="#E9E1D2"/>')
    for k in range(7):
        s.a(f'<path d="{leaf_path(rng.uniform(40, 60), 16)}" fill="#4E7F40" transform="translate(610 362) rotate({-160 + k * 22})"/>')
    books(s, 20, 470, rng, n=4, max_h=60)
    s.finish(grain=0.16, vignette=0.32, warm=("#FFC97A", 0.1))
    return s
