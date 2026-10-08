"""Scènes « boutique » : céramiques photographiées en studio."""
import math
from kit import Svg


def studio(s: Svg, top, bottom, floor_y=0.72):
    W, H = s.w, s.h
    bg = s.lin([(0, top), (floor_y, bottom), (1, top)], 0, 0, 0, 1)
    s.a(f'<rect width="{W}" height="{H}" fill="{bg}"/>')
    light = s.rad([(0, "#fff", 0.35), (1, "#fff", 0)], cx=0.42, cy=0.32, r=0.6)
    s.a(f'<rect width="{W}" height="{H}" fill="{light}"/>')


def floor_shadow(s: Svg, cx, cy, rx, ry, op=0.32):
    b = s.blur(ry * 0.9)
    s.a(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="#2a1a10" opacity="{op}" filter="url(#{b})"/>')


def speckles(s: Svg, clip_id, x0, y0, x1, y1, n, color, rng):
    out = [f'<g clip-path="url(#{clip_id})">']
    for _ in range(n):
        out.append(f'<circle cx="{rng.uniform(x0, x1):.1f}" cy="{rng.uniform(y0, y1):.1f}" r="{rng.uniform(0.6, 1.8):.1f}" fill="{color}" opacity="{rng.uniform(0.3, 0.8):.2f}"/>')
    out.append("</g>")
    s.a("".join(out))


def scene_vase():
    s = Svg(600, 600, seed=111)
    rng = s.rng
    studio(s, "#D98A63", "#C9754D")
    floor_shadow(s, 312, 498, 118, 16)
    body = "M240,500 C210,470 190,400 205,330 C218,270 250,240 262,200 C268,180 266,160 262,145 L338,145 C334,160 332,180 338,200 C350,240 382,270 395,330 C410,400 390,470 360,500Z"
    s.a(f'<clipPath id="vclip"><path d="{body}"/></clipPath>')
    glaze = s.lin([(0, "#B9A285"), (0.3, "#E8DCC6"), (0.55, "#F2E8D6"), (0.85, "#CDBA9A"), (1, "#A78E6E")], 0, 0, 1, 0)
    s.a(f'<path d="{body}" fill="{glaze}"/>')
    speckles(s, "vclip", 200, 140, 400, 500, 260, "#6B5640", rng)
    s.a('<ellipse cx="300" cy="146" rx="38" ry="8" fill="#8D7559"/>')
    s.a('<path d="M248,470 C226,420 222,350 240,300" stroke="#fff" stroke-width="10" fill="none" opacity=".35" stroke-linecap="round"/>')
    # branches séchées
    for k in range(5):
        ang = -90 + (k - 2) * 14 + rng.uniform(-5, 5)
        L = rng.uniform(170, 240)
        ex = 300 + math.cos(math.radians(ang)) * L
        ey = 150 + math.sin(math.radians(ang)) * L
        s.a(f'<path d="M300,150 L{ex:.1f},{ey:.1f}" stroke="#8C6B45" stroke-width="2.5"/>')
        for j in range(9):
            t = 0.45 + j * 0.06
            px = 300 + (ex - 300) * t
            py = 150 + (ey - 150) * t
            s.a(f'<ellipse cx="{px + rng.uniform(-10, 10):.1f}" cy="{py:.1f}" rx="5" ry="9" fill="#E8D3A8" opacity=".95"/>')
    s.finish(grain=0.12, vignette=0.2)
    return s


def scene_mug():
    s = Svg(600, 600, seed=113)
    rng = s.rng
    studio(s, "#EFE7DA", "#E2D6C3")
    floor_shadow(s, 300, 470, 120, 14)
    s.a('<path d="M392,300 C450,300 460,400 392,410" stroke="#8FA68C" stroke-width="26" fill="none" stroke-linecap="round"/>')
    s.a('<path d="M392,300 C450,300 460,400 392,410" stroke="#B9CBB4" stroke-width="8" fill="none" opacity=".6" stroke-linecap="round"/>')
    body = "M200,250 L400,250 L392,452 Q390,470 372,470 L228,470 Q210,470 208,452Z"
    glaze = s.lin([(0, "#7F977C"), (0.3, "#A8BCA4"), (0.55, "#C2D2BD"), (0.85, "#93AA90"), (1, "#748B71")], 0, 0, 1, 0)
    s.a(f'<clipPath id="mclip"><path d="{body}"/></clipPath>')
    s.a(f'<path d="{body}" fill="{glaze}"/>')
    s.a('<g clip-path="url(#mclip)"><rect x="200" y="420" width="200" height="60" fill="#D8C7A8"/></g>')
    s.a('<path d="M200,420 Q240,428 270,420 T340,422 T400,418" stroke="#7F977C" stroke-width="6" fill="none" clip-path="url(#mclip)"/>')
    speckles(s, "mclip", 200, 250, 400, 470, 120, "#4C5E4A", rng)
    s.a('<ellipse cx="300" cy="250" rx="100" ry="18" fill="#6E846B"/><ellipse cx="300" cy="252" rx="88" ry="12" fill="#3B2A1E"/>')
    s.a('<rect x="222" y="270" width="12" height="160" rx="6" fill="#fff" opacity=".35"/>')
    s.finish(grain=0.12, vignette=0.18)
    return s


def scene_bowl():
    s = Svg(600, 600, seed=117)
    rng = s.rng
    studio(s, "#CFE0EA", "#B9CFDB")
    floor_shadow(s, 300, 448, 170, 18)
    outer = "M120,300 L480,300 C478,380 410,440 300,444 C190,440 122,380 120,300Z"
    glaze = s.lin([(0, "#2C5C86"), (0.35, "#4A7FAD"), (0.6, "#6E9CC4"), (1, "#244E73")], 0, 0, 1, 0)
    s.a(f'<clipPath id="bclip"><path d="{outer}"/></clipPath>')
    s.a(f'<path d="{outer}" fill="{glaze}"/>')
    s.a('<g clip-path="url(#bclip)"><path d="M100,400 Q160,380 200,404 T300,396 T400,408 T500,392 L500,460 L100,460Z" fill="#E7DCC8"/></g>')
    speckles(s, "bclip", 120, 300, 480, 444, 160, "#1B3550", rng)
    s.a('<ellipse cx="300" cy="300" rx="180" ry="34" fill="#3F6E99"/><ellipse cx="300" cy="304" rx="164" ry="26" fill="#EDE5D6"/>')
    s.a('<ellipse cx="300" cy="312" rx="120" ry="14" fill="#DCD0BC"/>')
    s.a('<path d="M160,330 C180,380 220,410 260,420" stroke="#fff" stroke-width="10" fill="none" opacity=".3" stroke-linecap="round"/>')
    s.finish(grain=0.12, vignette=0.18)
    return s


def scene_jug():
    s = Svg(600, 600, seed=119)
    rng = s.rng
    studio(s, "#F2CDB4", "#E6B697")
    floor_shadow(s, 300, 496, 120, 16)
    s.a('<path d="M372,230 C440,236 446,350 380,380" stroke="#EDE7DD" stroke-width="22" fill="none" stroke-linecap="round"/>')
    body = "M236,496 C214,440 216,360 238,300 C252,262 250,220 236,170 L340,170 L372,148 L366,182 C350,222 352,262 364,300 C386,360 388,440 366,496Z"
    glaze = s.lin([(0, "#D9D1C4"), (0.3, "#F4EFE6"), (0.55, "#FFFCF6"), (0.85, "#E3DBCE"), (1, "#C9BFAF")], 0, 0, 1, 0)
    s.a(f'<clipPath id="jclip"><path d="{body}"/></clipPath>')
    s.a(f'<path d="{body}" fill="{glaze}"/>')
    speckles(s, "jclip", 210, 140, 390, 500, 90, "#8C8070", rng)
    s.a('<path d="M246,470 C232,420 232,350 250,300" stroke="#fff" stroke-width="10" fill="none" opacity=".55" stroke-linecap="round"/>')
    for k in range(3):
        y = 330 + k * 40
        s.a(f'<path d="M236,{y} Q300,{y + 10} 368,{y}" stroke="#CFC5B5" stroke-width="2" fill="none" opacity=".6" clip-path="url(#jclip)"/>')
    s.finish(grain=0.12, vignette=0.18)
    return s
