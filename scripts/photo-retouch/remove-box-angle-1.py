"""Retouch the cardboard box off the back step in the pavilion front photo (angle-1).

The original stays untouched. Like the far end of the step (left of the door), the wall here
is siding all the way down to the stone step, so the siding behind the box is rebuilt from
clean siding past the dryer vent at the same height (130px right, 1px lower keeps the courses
level), tone-matched to the wall around it. Hard edges are kept at the door trim (left) and
the step's top edge (bottom).
Usage: python3 scripts/photo-retouch/remove-box-angle-1.py \
         public/images/projects/frontier-patio-gable-roof/after/angle-1.jpg /tmp/angle-1.jpg
Then resize the output to 2400px wide webp (quality 80) as angle-1-preview.webp.
"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

src, out = sys.argv[1], sys.argv[2]
im = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)
H, W, _ = im.shape

box = [2110, 2004, 2174, 2086]
core = Image.new("L", (W, H), 0)
ImageDraw.Draw(core).rectangle(box, fill=255)
mask = np.asarray(core.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(2))).astype(np.float32) / 255.0
mask[:, :2110] = 0.0  # door trim stays crisp
mask[2087:, :] = 0.0  # the step's top edge (rows 2087+) stays as photographed

dx, dy = 130, 1
clone = np.zeros_like(im)
clone[: H - dy, : W - dx] = im[dy:, dx:]

# Tone match: compare the wall just above and right of the patch with what the clone would
# put there, and scale the clone per channel so the patch blends with its surroundings.
ring = np.zeros((H, W), bool)
ring[1990:2000, 2110:2183] = True   # above
ring[2004:2086, 2176:2183] = True   # right, between the box and the dryer vent (x 2185+)
gain = im[ring].mean(axis=0) / np.maximum(clone[ring].mean(axis=0), 1.0)
clone *= gain

result = im * (1 - mask[..., None]) + clone * mask[..., None]
Image.fromarray(np.clip(result, 0, 255).astype(np.uint8)).save(out, quality=95)
print("saved", out, "gain", np.round(gain, 3))
