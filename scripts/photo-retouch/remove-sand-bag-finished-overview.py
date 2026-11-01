"""Retouch the sand bag (and its torn plastic) out of the pavilion overview photo.

The original stays untouched; this writes a retouched full-size copy to the output path.
Usage: python3 scripts/photo-retouch/remove-sand-bag-finished-overview.py \
         public/images/projects/frontier-patio-gable-roof/after/finished-overview.jpg /tmp/overview.jpg
Then resize the output to 2400px wide webp (quality 80) as finished-overview-preview.webp.
Background behind the bag is rebuilt from the strip just to its right at the same height,
so the siding courses stay level; the post's right edge is rebuilt from the post above.
"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

src, out = sys.argv[1], sys.argv[2]
im = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)
H, W, _ = im.shape

# Bag outline (original pixel coordinates), traced on a 5x grid.
bag = [(1990, 2249), (2032, 2248), (2043, 2262), (2042, 2281), (2039, 2300), (2032, 2330),
       (2025, 2352), (2020, 2368), (2031, 2371), (2032, 2386), (2026, 2401), (1990, 2402)]
mask_img = Image.new("L", (W, H), 0)
ImageDraw.Draw(mask_img).polygon(bag, fill=255)
# Grow 3px so the fully replaced core covers every bag pixel, then soften the outer fringe.
mask_img = mask_img.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(2))
mask = np.asarray(mask_img).astype(np.float32) / 255.0
mask[:, :1991] = 0.0  # hard edge at the post: never paint over it here

# Clone source: 56px to the right and 3px lower. The siding courses slope slightly, and a
# vertical-profile match above the bag puts the same course 3px lower at x+56.
dx, dy = 56, 3
clone = np.zeros_like(im)
clone[: H - dy, : W - dx] = im[dy:, dx:]
result = im * (1 - mask[..., None]) + clone * mask[..., None]

# The bag overlapped the post's right edge by a few pixels (x 1983-1990, y 2250-2372).
# Rebuild that strip from the clean post edge 122px higher (a straight vertical edge).
y0, y1, x0, x1 = 2250, 2373, 1983, 1991
result[y0:y1, x0:x1] = im[y0 - 122 : y1 - 122, x0:x1]

# A few red pixels of the bag were left at the base's top corner (x 1982-1990, y 2369-2378);
# cover them with the patio surface 12px below.
result[2369:2379, 1982:1991] = result[2381:2391, 1982:1991]

Image.fromarray(np.clip(result, 0, 255).astype(np.uint8)).save(out, quality=95)
print("saved", out)
