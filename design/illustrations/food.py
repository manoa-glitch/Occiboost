"""Scènes « restaurant » : assiettes vues de dessus."""
import math
from kit import Svg, blob, leaf_path, smooth_closed


# ---------------------------------------------------------------- éléments
def plate(s: Svg, cx, cy, r, tone="#FBF9F5"):
    sh = s.blur(r * 0.07)
    s.a(f'<ellipse cx="{cx + r*0.05:.1f}" cy="{cy + r*0.09:.1f}" rx="{r*1.0:.1f}" ry="{r*0.98:.1f}" fill="#000" opacity=".5" filter="url(#{sh})"/>')
    rim = s.rad([(0, tone), (0.7, tone), (0.9, "#EDE9E1"), (0.985, "#DCD5C8"), (1, "#C9C1B2")])
    s.a(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{rim}"/>')
    well = s.rad([(0, "#FFFFFF"), (0.8, "#F7F4EE"), (1, "#ECE7DE")], cx=0.45, cy=0.42, r=0.6)
    s.a(f'<circle cx="{cx}" cy="{cy}" r="{r*0.71:.1f}" fill="{well}" stroke="#E4DED3" stroke-width="{r*0.012:.1f}"/>')
    # reflet du rebord
    hl = s.blur(r * 0.02)
    s.a(
        f'<path d="M{cx - r*0.86:.1f},{cy - r*0.2:.1f} A{r*0.88:.1f},{r*0.88:.1f} 0 0 1 {cx - r*0.2:.1f},{cy - r*0.86:.1f}" '
        f'stroke="#fff" stroke-width="{r*0.05:.1f}" fill="none" stroke-linecap="round" opacity=".85" filter="url(#{hl})"/>'
    )
    s.a(f'<circle cx="{cx}" cy="{cy}" r="{r*0.71:.1f}" fill="none" stroke="#000" stroke-opacity=".04" stroke-width="{r*0.04:.1f}"/>')


TOMATO = {
    "red": ("#A3241A", "#DC4430", "#F27756", "#F8D9A4"),
    "yellow": ("#C9901A", "#F2C03A", "#F8DB7C", "#FBEFC0"),
    "orange": ("#B9511A", "#EE7F30", "#F6A65E", "#FBDDB0"),
    "green": ("#4F6E25", "#8DAE45", "#C4D67C", "#EEF0C2"),
}


def tomato(s: Svg, x, y, r, kind="red", rot=0, n=5):
    skin, flesh, gel, seed = TOMATO[kind]
    rng = s.rng
    g = [f'<g transform="translate({x:.1f} {y:.1f}) rotate({rot:.1f})">']
    sh = s.blur(r * 0.08)
    g.append(f'<circle cx="{r*0.06:.1f}" cy="{r*0.1:.1f}" r="{r:.1f}" fill="#5a2a10" opacity=".22" filter="url(#{sh})"/>')
    g.append(f'<circle r="{r:.1f}" fill="{skin}"/>')
    fl = s.rad([(0, flesh), (0.85, flesh), (1, skin)])
    g.append(f'<circle r="{r*0.93:.1f}" fill="{fl}"/>')
    for i in range(n):
        ang = 360 * i / n + rng.uniform(-8, 8)
        g.append(f'<g transform="rotate({ang:.1f})">')
        g.append(
            f'<ellipse cx="0" cy="{-r*0.52:.1f}" rx="{r*0.22:.1f}" ry="{r*0.27:.1f}" fill="{gel}" opacity=".95"/>'
        )
        for k in range(4):
            sx = rng.uniform(-r * 0.12, r * 0.12)
            sy = -r * 0.52 + rng.uniform(-r * 0.16, r * 0.16)
            g.append(
                f'<ellipse cx="{sx:.1f}" cy="{sy:.1f}" rx="{r*0.035:.1f}" ry="{r*0.055:.1f}" fill="{seed}" '
                f'transform="rotate({rng.uniform(-40,40):.0f} {sx:.1f} {sy:.1f})"/>'
            )
        g.append("</g>")
    g.append(f'<circle r="{r*0.2:.1f}" fill="{flesh}" opacity=".9"/>')
    g.append(f'<circle r="{r*0.11:.1f}" fill="{gel}" opacity=".6"/>')
    if kind == "green":
        for i in range(6):
            ang = i * 60 + 15
            g.append(
                f'<path d="M0,0 L{math.cos(math.radians(ang))*r*0.9:.1f},{math.sin(math.radians(ang))*r*0.9:.1f}" '
                f'stroke="#5d7d2e" stroke-width="{r*0.03:.1f}" opacity=".35"/>'
            )
    hl = s.blur(r * 0.05)
    g.append(
        f'<ellipse cx="{-r*0.35:.1f}" cy="{-r*0.4:.1f}" rx="{r*0.38:.1f}" ry="{r*0.16:.1f}" fill="#fff" opacity=".28" '
        f'transform="rotate(-35 {-r*0.35:.1f} {-r*0.4:.1f})" filter="url(#{hl})"/>'
    )
    g.append("</g>")
    s.a("".join(g))


def basil(s: Svg, x, y, length, rot):
    width = length * 0.36
    grad = s.lin([(0, "#2F6B25"), (0.6, "#4E9338"), (1, "#6DB04A")], 0, 0, 1, 0)
    sh = s.blur(length * 0.06)
    g = [f'<g transform="translate({x:.1f} {y:.1f}) rotate({rot:.1f})">']
    g.append(f'<path d="{leaf_path(length, width)}" fill="#0b2a06" opacity=".28" transform="translate({length*0.05:.1f} {length*0.07:.1f})" filter="url(#{sh})"/>')
    g.append(f'<path d="{leaf_path(length, width)}" fill="{grad}"/>')
    g.append(f'<path d="M{length*0.04:.1f},0 Q{length*0.5:.1f},{-width*0.08:.1f} {length*0.95:.1f},0" stroke="#9DD27A" stroke-width="{length*0.018:.1f}" fill="none" opacity=".75"/>')
    for k in range(3):
        px = length * (0.25 + k * 0.2)
        g.append(f'<path d="M{px:.1f},{-width*0.02:.1f} Q{px+length*0.08:.1f},{-width*0.35:.1f} {px+length*0.16:.1f},{-width*0.55:.1f}" stroke="#8BC56A" stroke-width="{length*0.01:.1f}" fill="none" opacity=".5"/>')
        g.append(f'<path d="M{px:.1f},{width*0.02:.1f} Q{px+length*0.08:.1f},{width*0.35:.1f} {px+length*0.16:.1f},{width*0.55:.1f}" stroke="#8BC56A" stroke-width="{length*0.01:.1f}" fill="none" opacity=".5"/>')
    g.append(f'<path d="M{length*0.1:.1f},{-width*0.5:.1f} Q{length*0.5:.1f},{-width*1.0:.1f} {length*0.85:.1f},{-width*0.3:.1f}" stroke="#fff" stroke-width="{length*0.03:.1f}" fill="none" opacity=".18"/>')
    g.append("</g>")
    s.a("".join(g))


def burrata(s: Svg, cx, cy, R):
    rng = s.rng
    sh = s.blur(R * 0.12)
    s.a(f'<ellipse cx="{cx + R*0.08:.1f}" cy="{cy + R*0.14:.1f}" rx="{R:.1f}" ry="{R*0.95:.1f}" fill="#4a3b20" opacity=".28" filter="url(#{sh})"/>')
    skin = s.rad([(0, "#FFFFFF"), (0.45, "#FBF8F1"), (0.82, "#EEE6D5"), (1, "#D7CBB1")], cx=0.38, cy=0.36, r=0.68)
    s.a(f'<path d="{blob(cx, cy, R, rng, n=10, jitter=0.05)}" fill="{skin}"/>')
    # ouverture : stracciatella crémeuse
    open_d = blob(cx + R * 0.18, cy + R * 0.12, R * 0.55, rng, n=9, jitter=0.22, sx=1.15, sy=0.9)
    cream = s.rad([(0, "#FFFDF6"), (0.7, "#F5EEDC"), (1, "#E6DBC2")], cx=0.45, cy=0.4, r=0.6)
    s.a(f'<path d="{open_d}" fill="{cream}"/>')
    for i in range(26):
        a = rng.uniform(0, math.tau)
        rr = rng.uniform(0, R * 0.45)
        x = cx + R * 0.18 + math.cos(a) * rr * 1.1
        y = cy + R * 0.12 + math.sin(a) * rr * 0.85
        l = rng.uniform(R * 0.05, R * 0.16)
        ang = rng.uniform(0, 360)
        s.a(
            f'<path d="M{x:.1f},{y:.1f} q{l*0.5:.1f},{-l*0.4:.1f} {l:.1f},0" stroke="#fff" stroke-width="{R*0.022:.1f}" '
            f'fill="none" opacity=".85" stroke-linecap="round" transform="rotate({ang:.0f} {x:.1f} {y:.1f})"/>'
        )
        if i % 3 == 0:
            s.a(f'<path d="M{x:.1f},{y+R*0.02:.1f} q{l*0.5:.1f},{-l*0.4:.1f} {l:.1f},0" stroke="#d8ccb3" stroke-width="{R*0.012:.1f}" fill="none" opacity=".6" transform="rotate({ang:.0f} {x:.1f} {y:.1f})"/>')
    # noeud
    s.a(f'<path d="M{cx - R*0.42:.1f},{cy - R*0.5:.1f} q{R*0.1:.1f},{-R*0.12:.1f} {R*0.22:.1f},{-R*0.02:.1f}" stroke="#d9ceb5" stroke-width="{R*0.03:.1f}" fill="none" stroke-linecap="round"/>')
    hl = s.blur(R * 0.08)
    s.a(f'<ellipse cx="{cx - R*0.42:.1f}" cy="{cy - R*0.38:.1f}" rx="{R*0.3:.1f}" ry="{R*0.18:.1f}" fill="#fff" opacity=".9" filter="url(#{hl})" transform="rotate(-30 {cx - R*0.42:.1f} {cy - R*0.38:.1f})"/>')


def oil_drizzle(s: Svg, pts, width):
    d = smooth_open(pts)
    s.a(f'<path d="{d}" stroke="#D7A72C" stroke-width="{width:.1f}" fill="none" stroke-linecap="round" opacity=".45"/>')
    s.a(f'<path d="{d}" stroke="#F9DE86" stroke-width="{width*0.35:.1f}" fill="none" stroke-linecap="round" opacity=".55"/>')


def smooth_open(pts, t=0.25):
    d = f"M{pts[0][0]:.1f},{pts[0][1]:.1f}"
    for i in range(len(pts) - 1):
        p0 = pts[max(i - 1, 0)]
        p1 = pts[i]
        p2 = pts[i + 1]
        p3 = pts[min(i + 2, len(pts) - 1)]
        c1 = (p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t)
        c2 = (p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t)
        d += f" C{c1[0]:.1f},{c1[1]:.1f} {c2[0]:.1f},{c2[1]:.1f} {p2[0]:.1f},{p2[1]:.1f}"
    return d


def specks(s: Svg, cx, cy, r, n, color, size, rng, opacity=1):
    out = []
    for _ in range(n):
        a = rng.uniform(0, math.tau)
        rr = r * math.sqrt(rng.random())
        x, y = cx + math.cos(a) * rr, cy + math.sin(a) * rr
        sz = size * rng.uniform(0.5, 1.3)
        out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{sz:.1f}" fill="{color}" opacity="{opacity}"/>')
    s.a("".join(out))


def fork(s: Svg, x, y, scale, rot):
    metal = s.lin([(0, "#F4F6F8"), (0.45, "#C9CED4"), (0.55, "#AEB4BB"), (1, "#E8EBEE")], 0, 0, 1, 0)
    sh = s.blur(6 * scale)
    path = (
        "M-9,0 L9,0 L7,190 Q0,205 -7,190 Z"  # manche
    )
    head = (
        "M-16,-10 L16,-10 L14,-60 L11,-60 L9,-128 L5,-128 L5,-62 L2,-62 L2,-130 L-2,-130 L-2,-62 L-5,-62 "
        "L-5,-128 L-9,-128 L-11,-60 L-14,-60 Z"
    )
    neck = "M-9,0 L9,0 L16,-10 L-16,-10 Z"
    s.a(
        f'<g transform="translate({x} {y}) rotate({rot}) scale({scale})">'
        f'<g transform="translate(8 12)" opacity=".45" filter="url(#{sh})"><path d="{path}" fill="#000"/><path d="{head}" fill="#000"/><path d="{neck}" fill="#000"/></g>'
        f'<path d="{path}" fill="{metal}"/><path d="{neck}" fill="{metal}"/><path d="{head}" fill="{metal}"/>'
        f'<path d="M-3,10 L-2,180" stroke="#fff" stroke-width="2" opacity=".7"/></g>'
    )


def wine_glass(s: Svg, x, y, r, wine="#E8D27A"):
    sh = s.blur(r * 0.1)
    s.a(f'<circle cx="{x + r*0.15:.1f}" cy="{y + r*0.2:.1f}" r="{r*1.05:.1f}" fill="#000" opacity=".3" filter="url(#{sh})"/>')
    s.a(f'<circle cx="{x}" cy="{y}" r="{r:.1f}" fill="#fff" opacity=".08" stroke="#fff" stroke-opacity=".55" stroke-width="{r*0.04:.1f}"/>')
    liq = s.rad([(0, wine), (0.8, wine), (1, "#B9963C")], cx=0.45, cy=0.45, r=0.6)
    s.a(f'<circle cx="{x}" cy="{y}" r="{r*0.72:.1f}" fill="{liq}" opacity=".78"/>')
    s.a(f'<circle cx="{x}" cy="{y}" r="{r*0.25:.1f}" fill="#fff" opacity=".12"/>')
    hl = s.blur(r * 0.04)
    s.a(f'<path d="M{x - r*0.7:.1f},{y - r*0.3:.1f} A{r*0.8:.1f},{r*0.8:.1f} 0 0 1 {x - r*0.2:.1f},{y - r*0.75:.1f}" stroke="#fff" stroke-width="{r*0.08:.1f}" fill="none" opacity=".75" stroke-linecap="round" filter="url(#{hl})"/>')


def napkin(s: Svg, x, y, w, h, rot, color="#D9CEBB"):
    tex = s.texture_filter(freq=0.9, seed=5, color=(0.45, 0.38, 0.28), k=0.6, b=-0.2, octaves=1)
    sh = s.blur(14)
    s.a(
        f'<g transform="translate({x} {y}) rotate({rot})">'
        f'<rect x="10" y="16" width="{w}" height="{h}" rx="10" fill="#000" opacity=".4" filter="url(#{sh})"/>'
        f'<rect width="{w}" height="{h}" rx="8" fill="{color}" filter="url(#{tex})"/>'
        f'<path d="M0,{h*0.5} L{w},{h*0.48}" stroke="#a89c86" stroke-width="3" opacity=".5"/>'
        f'<path d="M{w*0.5},0 L{w*0.52},{h}" stroke="#fff" stroke-width="3" opacity=".25"/>'
        f'<rect x="14" y="14" width="{w-28}" height="{h-28}" rx="4" fill="none" stroke="#b5a88f" stroke-width="2" stroke-dasharray="1 5" opacity=".7"/>'
        f'</g>'
    )


def stone_table(s: Svg, base="#25261F", light=0.12):
    W, H = s.w, s.h
    tex = s.texture_filter(freq=0.012, seed=11, color=(0.55, 0.55, 0.5), k=0.7, b=-0.32, octaves=5)
    s.a(f'<rect width="{W}" height="{H}" fill="{base}" filter="url(#{tex})"/>')
    tex2 = s.texture_filter(freq=0.6, seed=12, color=(0, 0, 0), k=0.8, b=-0.3, octaves=2)
    s.a(f'<rect width="{W}" height="{H}" fill="{base}" opacity=".35" filter="url(#{tex2})"/>')
    lg = s.rad([(0, "#FFE8C4", light), (1, "#FFE8C4", 0)], cx=0.3, cy=0.25, r=0.7)
    s.a(f'<rect width="{W}" height="{H}" fill="{lg}"/>')


def linen_table(s: Svg, base="#E7DECF"):
    W, H = s.w, s.h
    s.a(f'<rect width="{W}" height="{H}" fill="{base}"/>')
    tex = s.texture_filter(freq="0.9 0.02", seed=21, color=(0.55, 0.47, 0.36), k=0.9, b=-0.42, octaves=2)
    s.a(f'<rect width="{W}" height="{H}" fill="{base}" filter="url(#{tex})"/>')
    tex2 = s.texture_filter(freq="0.02 0.9", seed=22, color=(0.55, 0.47, 0.36), k=0.9, b=-0.45, octaves=2)
    s.a(f'<rect width="{W}" height="{H}" fill="{base}" opacity=".7" filter="url(#{tex2})"/>')
    lg = s.rad([(0, "#fff", 0.35), (1, "#fff", 0)], cx=0.25, cy=0.2, r=0.8)
    s.a(f'<rect width="{W}" height="{H}" fill="{lg}"/>')


# ---------------------------------------------------------------- scènes
def bread(s: Svg, x, y, r, rot):
    rng = s.rng
    sh = s.blur(r * 0.08)
    outer = blob(0, 0, r, rng, n=10, jitter=0.08, sx=1.25, sy=0.9)
    inner = blob(0, 0, r * 0.84, rng, n=10, jitter=0.06, sx=1.25, sy=0.88)
    crust = s.rad([(0, "#B5763A"), (0.85, "#8A4E22"), (1, "#5E3315")])
    crumb = s.rad([(0, "#F1E2C6"), (0.8, "#E5CFA6"), (1, "#C99D63")], cx=0.45, cy=0.42, r=0.62)
    g = [f'<g transform="translate({x} {y}) rotate({rot})">']
    g.append(f'<path d="{outer}" fill="#000" opacity=".45" transform="translate(10 14)" filter="url(#{sh})"/>')
    g.append(f'<path d="{outer}" fill="{crust}"/><path d="{inner}" fill="{crumb}"/>')
    for _ in range(26):
        hx, hy = rng.uniform(-r, r) * 0.9, rng.uniform(-r, r) * 0.6
        if (hx / (r * 1.05)) ** 2 + (hy / (r * 0.7)) ** 2 > 0.8:
            continue
        g.append(f'<ellipse cx="{hx:.1f}" cy="{hy:.1f}" rx="{rng.uniform(3,10):.1f}" ry="{rng.uniform(2,6):.1f}" fill="#C9A673" opacity=".8"/>')
    g.append("</g>")
    s.a("".join(g))


def scene_burrata_hero():
    s = Svg(1200, 900, seed=7)
    stone_table(s)
    napkin(s, -70, -50, 380, 320, -12, color="#CDBFA6")
    wine_glass(s, 1050, 140, 96)
    bread(s, 120, 760, 150, -18)
    plate(s, 590, 470, 360)
    rng = s.rng
    ring = [("red", 0), ("yellow", 1), ("orange", 2), ("green", 3), ("red", 4), ("orange", 5), ("yellow", 6), ("red", 7)]
    for kind, i in ring:
        a = math.tau * i / len(ring) + 0.25
        rr = 182 + rng.uniform(-10, 12)
        tomato(s, 590 + math.cos(a) * rr, 470 + math.sin(a) * rr, 70 + rng.uniform(-6, 8), kind, rng.uniform(0, 360))
    for (x, y, k, rot) in [(455, 350, "yellow", 20), (720, 600, "red", 140), (735, 355, "green", 60)]:
        tomato(s, x, y, 44, k, rot)
    burrata(s, 600, 470, 132)
    basil(s, 660, 350, 96, -38)
    basil(s, 495, 555, 84, 150)
    basil(s, 735, 505, 74, 30)
    basil(s, 460, 425, 66, -150)
    basil(s, 600, 650, 60, 80)
    basil(s, 560, 300, 58, -110)
    oil_drizzle(s, [(410, 470), (470, 530), (540, 560), (640, 600), (720, 560), (780, 470)], 7)
    oil_drizzle(s, [(450, 380), (520, 330), (610, 320), (700, 360)], 5)
    specks(s, 600, 470, 230, 70, "#2a221c", 2.2, rng)
    specks(s, 600, 470, 200, 40, "#fff", 2.4, rng, opacity=0.85)
    fork(s, 1010, 610, 1.25, 8)
    s.finish(grain=0.22, vignette=0.45, warm=("#FFB866", 0.12))
    return s


def scene_burrata_square():
    s = Svg(800, 800, seed=17)
    linen_table(s, "#E6DCCB")
    plate(s, 400, 400, 330)
    rng = s.rng
    ring = ["red", "yellow", "orange", "green", "red", "yellow", "orange"]
    for i, kind in enumerate(ring):
        a = math.tau * i / len(ring)
        tomato(s, 400 + math.cos(a) * 150, 400 + math.sin(a) * 150, 56 + rng.uniform(-5, 6), kind, rng.uniform(0, 360))
    burrata(s, 405, 400, 104)
    basil(s, 450, 300, 80, -40)
    basil(s, 330, 470, 70, 150)
    basil(s, 520, 440, 60, 25)
    oil_drizzle(s, [(260, 400), (320, 470), (420, 500), (520, 460), (560, 380)], 6)
    specks(s, 400, 400, 210, 55, "#2a221c", 2, rng)
    s.finish(grain=0.18, vignette=0.22, warm=("#FFC77D", 0.1))
    return s


def fennel(s: Svg, x, y, r, rot):
    g = s.lin([(0, "#F3F2DA"), (0.7, "#D9E0A8"), (1, "#B8C47C")], 0, 0, 0, 1)
    sh = s.blur(r * 0.08)
    d = f"M{-r:.1f},0 A{r:.1f},{r*0.8:.1f} 0 0 1 {r:.1f},0 A{r*0.75:.1f},{r*0.5:.1f} 0 0 0 {-r:.1f},0Z"
    s.a(
        f'<g transform="translate({x:.1f} {y:.1f}) rotate({rot:.1f})">'
        f'<path d="{d}" fill="#3b2a10" opacity=".25" transform="translate(4 6)" filter="url(#{sh})"/>'
        f'<path d="{d}" fill="{g}"/>'
        f'<path d="M{-r*0.9:.1f},{-r*0.05:.1f} A{r*0.9:.1f},{r*0.7:.1f} 0 0 1 {r*0.9:.1f},{-r*0.05:.1f}" stroke="#A9772F" stroke-width="{r*0.09:.1f}" fill="none" opacity=".55"/>'
        f'<path d="M{-r*0.6:.1f},{-r*0.25:.1f} A{r*0.6:.1f},{r*0.45:.1f} 0 0 1 {r*0.6:.1f},{-r*0.25:.1f}" stroke="#fff" stroke-width="{r*0.04:.1f}" fill="none" opacity=".5"/>'
        f'</g>'
    )


def fish_fillet(s: Svg, x, y, L, rot):
    rng = s.rng
    W = L * 0.32
    d = (
        f"M0,0 C{L*0.15:.1f},{-W*0.75:.1f} {L*0.55:.1f},{-W*0.62:.1f} {L:.1f},{-W*0.18:.1f} "
        f"C{L*1.02:.1f},{W*0.05:.1f} {L*0.98:.1f},{W*0.25:.1f} {L*0.9:.1f},{W*0.3:.1f} "
        f"C{L*0.55:.1f},{W*0.55:.1f} {L*0.2:.1f},{W*0.62:.1f} 0,0Z"
    )
    skin = s.lin([(0, "#F0D7A8"), (0.3, "#D9AE6E"), (0.62, "#B98546"), (0.85, "#C9CBC6"), (1, "#E6D7B5")], 0, 0, 0, 1)
    sh = s.blur(L * 0.04)
    g = [f'<g transform="translate({x:.1f} {y:.1f}) rotate({rot:.1f})">']
    g.append(f'<path d="{d}" fill="#2a1e10" opacity=".35" transform="translate({L*0.03:.1f} {L*0.05:.1f})" filter="url(#{sh})"/>')
    g.append(f'<path d="{d}" fill="{skin}"/>')
    # stries croustillantes
    for i in range(14):
        px = L * (0.08 + i * 0.062)
        g.append(f'<path d="M{px:.1f},{-W*0.42:.1f} q{L*0.03:.1f},{W*0.35:.1f} {L*0.01:.1f},{W*0.75:.1f}" stroke="#6E6A60" stroke-width="{L*0.006:.1f}" fill="none" opacity=".45"/>')
    for i in range(5):
        px = L * (0.2 + i * 0.15)
        g.append(f'<path d="M{px:.1f},{-W*0.45:.1f} l{L*0.08:.1f},{W*0.8:.1f}" stroke="#7a5a2c" stroke-width="{L*0.018:.1f}" opacity=".55" stroke-linecap="round"/>')
    g.append(f'<path d="M{L*0.08:.1f},{W*0.2:.1f} C{L*0.3:.1f},{W*0.45:.1f} {L*0.7:.1f},{W*0.35:.1f} {L*0.92:.1f},{W*0.22:.1f}" stroke="#C99A55" stroke-width="{L*0.03:.1f}" fill="none" opacity=".75"/>')
    hl = s.blur(L * 0.02)
    g.append(f'<path d="M{L*0.12:.1f},{-W*0.32:.1f} C{L*0.35:.1f},{-W*0.52:.1f} {L*0.65:.1f},{-W*0.45:.1f} {L*0.85:.1f},{-W*0.2:.1f}" stroke="#fff" stroke-width="{L*0.03:.1f}" fill="none" opacity=".55" filter="url(#{hl})"/>')
    g.append("</g>")
    s.a("".join(g))


def dill(s: Svg, x, y, size, rot):
    rng = s.rng
    out = [f'<g transform="translate({x:.1f} {y:.1f}) rotate({rot:.1f})" stroke="#4E8A3A" fill="none" stroke-linecap="round">']
    out.append(f'<path d="M0,0 L{size:.1f},0" stroke-width="{size*0.03:.1f}"/>')
    for i in range(7):
        px = size * (0.15 + i * 0.12)
        for sgn in (-1, 1):
            out.append(f'<path d="M{px:.1f},0 q{size*0.05:.1f},{sgn*size*0.12:.1f} {size*0.16:.1f},{sgn*size*0.2:.1f}" stroke-width="{size*0.015:.1f}" opacity=".9"/>')
    out.append("</g>")
    s.a("".join(out))


def lemon_wedge(s: Svg, x, y, r, rot):
    sh = s.blur(r * 0.12)
    d = f"M{-r:.1f},0 A{r:.1f},{r*0.62:.1f} 0 0 1 {r:.1f},0 Z"
    s.a(
        f'<g transform="translate({x:.1f} {y:.1f}) rotate({rot:.1f})">'
        f'<path d="{d}" fill="#3a2a00" opacity=".3" transform="translate(5 8)" filter="url(#{sh})"/>'
        f'<path d="{d}" fill="#E8BE2B"/>'
        f'<path d="M{-r*0.88:.1f},0 A{r*0.88:.1f},{r*0.52:.1f} 0 0 1 {r*0.88:.1f},0 Z" fill="#F7E48A"/>'
        + "".join(
            f'<path d="M0,0 L{math.cos(math.radians(a))*r*0.85:.1f},{-math.sin(math.radians(a))*r*0.5:.1f}" stroke="#FFF6C9" stroke-width="{r*0.04:.1f}"/>'
            for a in (25, 55, 90, 125, 155)
        )
        + "</g>"
    )


def scene_daurade():
    s = Svg(800, 800, seed=23)
    linen_table(s, "#E3D9C7")
    plate(s, 400, 400, 330)
    rng = s.rng
    sauce = s.rad([(0, "#F7EBC0"), (0.8, "#EED98F"), (1, "#E2C46A")])
    s.a(f'<path d="{blob(400, 470, 120, rng, n=11, jitter=0.14, sx=1.35, sy=0.7)}" fill="{sauce}" opacity=".95"/>')
    hl = s.blur(10)
    s.a(f'<ellipse cx="350" cy="455" rx="60" ry="14" fill="#fff" opacity=".5" filter="url(#{hl})"/>')
    for (x, y, r, rot) in [(290, 470, 66, -25), (520, 470, 62, 20), (330, 350, 58, -160), (480, 340, 60, 170), (410, 500, 56, 5)]:
        fennel(s, x, y, r, rot)
    fish_fillet(s, 232, 425, 340, -12)
    for i in range(16):
        a = rng.uniform(0, 6.28); rr = rng.uniform(150, 205)
        x = 400 + math.cos(a) * rr; y = 410 + math.sin(a) * rr
        s.a(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{rng.uniform(4,9):.1f}" fill="#5E9B3A" opacity=".85"/><circle cx="{x-1.5:.1f}" cy="{y-1.5:.1f}" r="2" fill="#CDE8A0" opacity=".7"/>')
    dill(s, 520, 330, 90, -60)
    dill(s, 260, 330, 70, -130)
    lemon_wedge(s, 560, 520, 56, 30)
    specks(s, 400, 420, 160, 14, "#C9435A", 4, rng)
    specks(s, 400, 420, 180, 30, "#2a221c", 1.8, rng)
    s.finish(grain=0.18, vignette=0.22, warm=("#FFC77D", 0.1))
    return s


def fig_quarter(s: Svg, x, y, size, rot):
    rng = s.rng
    L, W = size, size * 0.62
    outer = f"M0,0 C{L*0.15:.1f},{-W*0.65:.1f} {L*0.75:.1f},{-W*0.6:.1f} {L:.1f},0 C{L*0.75:.1f},{W*0.6:.1f} {L*0.15:.1f},{W*0.65:.1f} 0,0Z"
    inner = f"M{L*0.1:.1f},0 C{L*0.22:.1f},{-W*0.48:.1f} {L*0.72:.1f},{-W*0.44:.1f} {L*0.9:.1f},0 C{L*0.72:.1f},{W*0.44:.1f} {L*0.22:.1f},{W*0.48:.1f} {L*0.1:.1f},0Z"
    core = f"M{L*0.2:.1f},0 C{L*0.3:.1f},{-W*0.3:.1f} {L*0.65:.1f},{-W*0.28:.1f} {L*0.8:.1f},0 C{L*0.65:.1f},{W*0.28:.1f} {L*0.3:.1f},{W*0.3:.1f} {L*0.2:.1f},0Z"
    sk = s.lin([(0, "#3E1838"), (1, "#7A3A62")], 0, 0, 1, 0)
    sh = s.blur(size * 0.06)
    g = [f'<g transform="translate({x:.1f} {y:.1f}) rotate({rot:.1f})">']
    g.append(f'<path d="{outer}" fill="#2a0f12" opacity=".35" transform="translate(3 5)" filter="url(#{sh})"/>')
    g.append(f'<path d="{outer}" fill="{sk}"/>')
    g.append(f'<path d="{inner}" fill="#F2D6C2"/>')
    g.append(f'<path d="{core}" fill="#C23F55"/>')
    for _ in range(14):
        px = rng.uniform(L * 0.28, L * 0.75)
        py = rng.uniform(-W * 0.18, W * 0.18)
        g.append(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="{size*0.018:.1f}" fill="#F6E1B5"/>')
    g.append(f'<path d="M{L*0.2:.1f},{-W*0.32:.1f} C{L*0.45:.1f},{-W*0.5:.1f} {L*0.7:.1f},{-W*0.45:.1f} {L*0.85:.1f},{-W*0.2:.1f}" stroke="#fff" stroke-width="{size*0.03:.1f}" fill="none" opacity=".35"/>')
    g.append("</g>")
    s.a("".join(g))


def scene_figtart():
    s = Svg(800, 800, seed=31)
    linen_table(s, "#E5DAC6")
    plate(s, 400, 400, 330)
    rng = s.rng
    # quenelle de crème
    sh = s.blur(10)
    s.a(f'<ellipse cx="590" cy="560" rx="70" ry="34" fill="#4a3a20" opacity=".25" transform="rotate(-30 590 560)" filter="url(#{sh})"/>')
    cr = s.rad([(0, "#FFFFFF"), (0.7, "#F8F3EA"), (1, "#E3D8C5")], cx=0.4, cy=0.4, r=0.65)
    s.a(f'<ellipse cx="582" cy="550" rx="68" ry="32" fill="{cr}" transform="rotate(-30 582 550)"/>')
    s.a(f'<path d="M545,560 q35,-30 75,-25" stroke="#e6dccb" stroke-width="5" fill="none" stroke-linecap="round"/>')
    # tarte
    sh2 = s.blur(16)
    s.a(f'<circle cx="388" cy="398" r="210" fill="#3a2410" opacity=".35" filter="url(#{sh2})"/>')
    crust = s.rad([(0, "#E6B46A"), (0.82, "#D49A50"), (0.93, "#B9772F"), (1, "#9C5F22")])
    pts = []
    n = 44
    for i in range(n):
        a = math.tau * i / n
        rr = 205 + (8 if i % 2 == 0 else -4)
        pts.append((380 + math.cos(a) * rr, 390 + math.sin(a) * rr))
    from kit import smooth_closed as sc
    s.a(f'<path d="{sc(pts, 0.18)}" fill="{crust}"/>')
    s.a(f'<circle cx="380" cy="390" r="178" fill="#E2B677"/>')
    tex = s.texture_filter(freq=0.08, seed=33, color=(0.6, 0.38, 0.15), k=0.9, b=-0.35, octaves=3)
    s.a(f'<circle cx="380" cy="390" r="178" fill="#E2B677" filter="url(#{tex})"/>')
    # rosace de figues
    for ring, (rr, cnt, size) in enumerate([(120, 12, 92), (52, 6, 76)]):
        for i in range(cnt):
            a = 360 * i / cnt + (15 if ring else 0)
            ax = 380 + math.cos(math.radians(a)) * rr * 0.4
            ay = 390 + math.sin(math.radians(a)) * rr * 0.4
            fig_quarter(s, ax, ay, size, a)
    hl = s.blur(6)
    s.a(f'<path d="M240,300 A170,170 0 0 1 380,215" stroke="#fff" stroke-width="10" fill="none" opacity=".35" filter="url(#{hl})"/>')
    specks(s, 380, 390, 210, 120, "#fff", 1.6, rng, opacity=0.8)
    # thym
    s.a('<g transform="translate(205 590) rotate(-20)" stroke="#5F7A3C" stroke-width="3" fill="none" stroke-linecap="round">'
        '<path d="M0,0 L110,0"/>' + "".join(f'<ellipse cx="{12+i*14}" cy="{-6 if i%2 else 6}" rx="6" ry="3" fill="#7C9852" stroke="none"/>' for i in range(7)) + "</g>")
    s.finish(grain=0.18, vignette=0.22, warm=("#FFC77D", 0.1))
    return s


def salmon(s: Svg, x, y, L, rot):
    W = L * 0.62
    d = (
        f"M0,{-W*0.5:.1f} C{L*0.35:.1f},{-W*0.62:.1f} {L*0.8:.1f},{-W*0.58:.1f} {L:.1f},{-W*0.42:.1f} "
        f"C{L*1.06:.1f},{-W*0.1:.1f} {L*1.04:.1f},{W*0.3:.1f} {L*0.96:.1f},{W*0.48:.1f} "
        f"C{L*0.6:.1f},{W*0.62:.1f} {L*0.25:.1f},{W*0.6:.1f} {-L*0.02:.1f},{W*0.46:.1f} "
        f"C{-L*0.06:.1f},{W*0.1:.1f} {-L*0.05:.1f},{-W*0.3:.1f} 0,{-W*0.5:.1f}Z"
    )
    flesh = s.lin([(0, "#F7A27A"), (0.5, "#F08A5D"), (1, "#E2703F")], 0, 0, 1, 1)
    sh = s.blur(L * 0.05)
    g = [f'<g transform="translate({x:.1f} {y:.1f}) rotate({rot:.1f})">']
    g.append(f'<path d="{d}" fill="#3a1a08" opacity=".38" transform="translate({L*0.04:.1f} {L*0.06:.1f})" filter="url(#{sh})"/>')
    g.append(f'<clipPath id="salclip{int(x)}"><path d="{d}"/></clipPath>')
    g.append(f'<path d="{d}" fill="{flesh}"/>')
    g.append(f'<g clip-path="url(#salclip{int(x)})">')
    for i in range(-3, 9):
        px = L * (0.08 + i * 0.13)
        g.append(f'<path d="M{px:.1f},{-W*0.7:.1f} C{px+L*0.12:.1f},{-W*0.2:.1f} {px-L*0.02:.1f},{W*0.2:.1f} {px+L*0.1:.1f},{W*0.7:.1f}" stroke="#FFE3D0" stroke-width="{L*0.028:.1f}" fill="none" opacity=".85"/>')
    seared = s.lin([(0, "#8A4A22", 0.0), (0.75, "#8A4A22", 0.0), (1, "#7A3E18", 0.75)], 0, 0, 0, 1)
    g.append(f'<rect x="{-L*0.1:.1f}" y="{-W*0.7:.1f}" width="{L*1.2:.1f}" height="{W*1.4:.1f}" fill="{seared}"/>')
    g.append("</g>")
    hl = s.blur(L * 0.03)
    g.append(f'<path d="M{L*0.1:.1f},{-W*0.35:.1f} C{L*0.4:.1f},{-W*0.48:.1f} {L*0.7:.1f},{-W*0.45:.1f} {L*0.88:.1f},{-W*0.3:.1f}" stroke="#fff" stroke-width="{L*0.05:.1f}" fill="none" opacity=".45" filter="url(#{hl})"/>')
    g.append("</g>")
    s.a("".join(g))


def asparagus(s: Svg, x, y, L, rot):
    stem = s.lin([(0, "#C9DB8A"), (0.5, "#7FA845"), (1, "#5E8A32")], 0, 0, 0, 1)
    sh = s.blur(L * 0.03)
    w = L * 0.075
    g = [f'<g transform="translate({x:.1f} {y:.1f}) rotate({rot:.1f})">']
    g.append(f'<rect x="0" y="{-w/2:.1f}" width="{L:.1f}" height="{w:.1f}" rx="{w/2:.1f}" fill="#20300c" opacity=".35" transform="translate(4 6)" filter="url(#{sh})"/>')
    g.append(f'<rect x="0" y="{-w/2:.1f}" width="{L:.1f}" height="{w:.1f}" rx="{w/2:.1f}" fill="{stem}"/>')
    for k in range(4):
        px = L * (0.2 + k * 0.17)
        g.append(f'<path d="M{px:.1f},{-w*0.4:.1f} l{L*0.04:.1f},{w*0.25:.1f}" stroke="#4D7428" stroke-width="{w*0.18:.1f}" stroke-linecap="round"/>')
    tip = f"M{L*0.86:.1f},{-w*0.62:.1f} C{L*0.97:.1f},{-w*0.6:.1f} {L*1.04:.1f},{-w*0.2:.1f} {L*1.05:.1f},0 C{L*1.04:.1f},{w*0.2:.1f} {L*0.97:.1f},{w*0.6:.1f} {L*0.86:.1f},{w*0.62:.1f}Z"
    g.append(f'<path d="{tip}" fill="#56802F"/>')
    g.append(f'<path d="M{L*0.88:.1f},{-w*0.3:.1f} l{L*0.08:.1f},{w*0.1:.1f} M{L*0.88:.1f},{w*0.3:.1f} l{L*0.08:.1f},{-w*0.1:.1f}" stroke="#3E6420" stroke-width="{w*0.12:.1f}"/>')
    g.append(f'<rect x="{L*0.05:.1f}" y="{-w*0.38:.1f}" width="{L*0.75:.1f}" height="{w*0.16:.1f}" rx="{w*0.08:.1f}" fill="#fff" opacity=".35"/>')
    g.append("</g>")
    s.a("".join(g))


def scene_salmon():
    s = Svg(800, 800, seed=29)
    linen_table(s, "#E3D9C7")
    plate(s, 400, 400, 330)
    rng = s.rng
    sauce = s.rad([(0, "#F7EBC0"), (0.8, "#EED98F"), (1, "#E2C46A")])
    s.a(f'<path d="{blob(410, 440, 150, rng, n=11, jitter=0.12, sx=1.25, sy=0.8)}" fill="{sauce}" opacity=".9"/>')
    for i, (x, y, L, rot) in enumerate([(250, 300, 300, 22), (240, 330, 300, 18), (236, 362, 290, 14), (238, 392, 270, 10)]):
        asparagus(s, x, y, L, rot)
    salmon(s, 330, 470, 200, -8)
    lemon_wedge(s, 590, 560, 52, 35)
    dill(s, 545, 330, 90, -50)
    dill(s, 300, 600, 70, -150)
    for i in range(18):
        a = rng.uniform(0, 6.28); rr = rng.uniform(170, 215)
        x = 400 + math.cos(a) * rr; y = 410 + math.sin(a) * rr
        s.a(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{rng.uniform(4,9):.1f}" fill="#5E9B3A" opacity=".85"/>')
    specks(s, 420, 470, 120, 14, "#C9435A", 4, rng)
    specks(s, 400, 420, 180, 30, "#2a221c", 1.8, rng)
    s.finish(grain=0.18, vignette=0.22, warm=("#FFC77D", 0.1))
    return s
