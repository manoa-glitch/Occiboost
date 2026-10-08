"""Petite boîte à outils SVG pour générer les illustrations des sites d'exemple.

Les visuels des concepts (restaurant, menuiserie, immobilier, boutique) sont dessinés
en SVG puis rendus en WebP par `render.py`. Aucune photo externe n'est utilisée.
"""
import math
import random


class Svg:
    def __init__(self, w, h, seed=1):
        self.w, self.h = w, h
        self.defs = []
        self.body = []
        self.rng = random.Random(seed)
        self._ids = 0

    def uid(self, prefix="i"):
        self._ids += 1
        return f"{prefix}{self._ids}"

    def d(self, s):
        self.defs.append(s)

    def a(self, s):
        self.body.append(s)

    def render(self):
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" '
            f'viewBox="0 0 {self.w} {self.h}"><defs>{"".join(self.defs)}</defs>{"".join(self.body)}</svg>'
        )

    # ---- defs helpers -------------------------------------------------
    def blur(self, std):
        fid = self.uid("blur")
        self.d(
            f'<filter id="{fid}" x="-60%" y="-60%" width="220%" height="220%">'
            f'<feGaussianBlur stdDeviation="{std}"/></filter>'
        )
        return fid

    def lin(self, stops, x1=0, y1=0, x2=0, y2=1, units=None):
        gid = self.uid("lg")
        st = "".join(
            f'<stop offset="{o}" stop-color="{c}"' + (f' stop-opacity="{op}"' if op is not None else "") + "/>"
            for (o, c, *rest) in stops
            for op in [rest[0] if rest else None]
        )
        u = f' gradientUnits="{units}"' if units else ""
        self.d(f'<linearGradient id="{gid}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}"{u}>{st}</linearGradient>')
        return f"url(#{gid})"

    def rad(self, stops, cx=0.5, cy=0.5, r=0.5, fx=None, fy=None, units=None, transform=None):
        gid = self.uid("rg")
        st = "".join(
            f'<stop offset="{o}" stop-color="{c}"' + (f' stop-opacity="{op}"' if op is not None else "") + "/>"
            for (o, c, *rest) in stops
            for op in [rest[0] if rest else None]
        )
        f = ""
        if fx is not None:
            f = f' fx="{fx}" fy="{fy}"'
        u = f' gradientUnits="{units}"' if units else ""
        t = f' gradientTransform="{transform}"' if transform else ""
        self.d(f'<radialGradient id="{gid}" cx="{cx}" cy="{cy}" r="{r}"{f}{u}{t}>{st}</radialGradient>')
        return f"url(#{gid})"

    def grain_filter(self, freq=0.85, seed=3):
        fid = self.uid("grain")
        self.d(
            f'<filter id="{fid}" x="0" y="0" width="100%" height="100%">'
            f'<feTurbulence type="fractalNoise" baseFrequency="{freq}" numOctaves="2" seed="{seed}" stitchTiles="stitch"/>'
            f'<feColorMatrix type="saturate" values="0"/></filter>'
        )
        return fid

    def wood_filter(self, seed=4, fx=0.004, fy=0.11, dark=(0.36, 0.22, 0.12), k=1.9, b=-0.78, octaves=4):
        """Filtre de veinage bois : à appliquer sur une forme remplie de la teinte de base."""
        fid = self.uid("wood")
        r, g, bl = dark
        self.d(
            f'<filter id="{fid}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">'
            f'<feTurbulence type="fractalNoise" baseFrequency="{fx} {fy}" numOctaves="{octaves}" seed="{seed}" result="n"/>'
            f'<feColorMatrix in="n" type="matrix" values="0 0 0 0 {r}  0 0 0 0 {g}  0 0 0 0 {bl}  {k} 0 0 0 {b}" result="s"/>'
            f'<feComposite in="s" in2="SourceGraphic" operator="atop"/></filter>'
        )
        return fid

    def texture_filter(self, freq=0.04, seed=8, color=(0, 0, 0), k=0.9, b=-0.35, octaves=3):
        fid = self.uid("tex")
        r, g, bl = color
        self.d(
            f'<filter id="{fid}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">'
            f'<feTurbulence type="fractalNoise" baseFrequency="{freq}" numOctaves="{octaves}" seed="{seed}" result="n"/>'
            f'<feColorMatrix in="n" type="matrix" values="0 0 0 0 {r}  0 0 0 0 {g}  0 0 0 0 {bl}  {k} 0 0 0 {b}" result="s"/>'
            f'<feComposite in="s" in2="SourceGraphic" operator="atop"/></filter>'
        )
        return fid

    # ---- finishing ----------------------------------------------------
    def finish(self, grain=0.2, vignette=0.35, warm=None, grain_freq=0.85):
        if warm:
            self.a(f'<rect width="{self.w}" height="{self.h}" fill="{warm[0]}" opacity="{warm[1]}" style="mix-blend-mode:soft-light"/>')
        if vignette:
            v = self.rad([(0.55, "#000", 0), (1, "#000", vignette)], cx=0.5, cy=0.5, r=0.75)
            self.a(f'<rect width="{self.w}" height="{self.h}" fill="{v}"/>')
        if grain:
            g = self.grain_filter(grain_freq)
            self.a(
                f'<rect width="{self.w}" height="{self.h}" filter="url(#{g})" opacity="{grain}" '
                f'style="mix-blend-mode:soft-light"/>'
            )


def blob(cx, cy, r, rng, n=9, jitter=0.18, sx=1.0, sy=1.0):
    """Forme organique fermée (courbe lissée)."""
    pts = []
    for i in range(n):
        ang = 2 * math.pi * i / n
        rr = r * (1 + rng.uniform(-jitter, jitter))
        pts.append((cx + math.cos(ang) * rr * sx, cy + math.sin(ang) * rr * sy))
    return smooth_closed(pts)


def smooth_closed(pts, t=0.22):
    n = len(pts)
    d = f"M{pts[0][0]:.1f},{pts[0][1]:.1f}"
    for i in range(n):
        p0 = pts[(i - 1) % n]
        p1 = pts[i]
        p2 = pts[(i + 1) % n]
        p3 = pts[(i + 2) % n]
        c1 = (p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t)
        c2 = (p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t)
        d += f" C{c1[0]:.1f},{c1[1]:.1f} {c2[0]:.1f},{c2[1]:.1f} {p2[0]:.1f},{p2[1]:.1f}"
    return d + "Z"


def leaf_path(length, width):
    """Feuille en amande orientée vers +x, base à l'origine."""
    L, W = length, width
    return (
        f"M0,0 C{L*0.25:.1f},{-W:.1f} {L*0.75:.1f},{-W*0.9:.1f} {L:.1f},0 "
        f"C{L*0.75:.1f},{W*0.9:.1f} {L*0.25:.1f},{W:.1f} 0,0Z"
    )
