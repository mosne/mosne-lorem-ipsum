import os
from PIL import Image, ImageDraw

def generate_brand_icons():
    # We will draw the logo on a high-res 800x800 canvas and then downscale for perfect quality.
    # Canvas size
    H_SIZE = 800
    
    # Create the high-res image (black background to match brand identity)
    img = Image.new('RGBA', (H_SIZE, H_SIZE), (0, 0, 0, 255))
    draw = ImageDraw.Draw(img)
    
    # Logo color is white (#ffffff)
    logo_color = (255, 255, 255, 255)
    
    # The logo coordinate system is 80x64.
    # We want to center it on the 800x800 canvas.
    # Let's scale it by 8x. The logo size will be 640x512.
    scale = 8.0
    
    # Centers
    dx = (H_SIZE - (80 * scale)) / 2 # (800 - 640)/2 = 80
    dy = (H_SIZE - (64 * scale)) / 2 # (800 - 512)/2 = 144
    
    def get_coords(x, y):
        return dx + x * scale, dy + y * scale
    
    # Helper to draw a circle centered at (cx, cy) with radius r
    def draw_circle(cx, cy, r):
        x1, y1 = get_coords(cx - r, cy - r)
        x2, y2 = get_coords(cx + r, cy + r)
        draw.ellipse([x1, y1, x2, y2], fill=logo_color)

    # Let's render each of the 6 components of the SVG logo:
    # 1. Bottom-left component (M16 56a8 8 0 1 1-8-8h8v8Z)
    draw_circle(8, 56, 8)
    px1, py1 = get_coords(8, 48)
    px2, py2 = get_coords(16, 56)
    draw.rectangle([px1, py1, px2, py2], fill=logo_color)

    # 2. Bottom-middle component (M48 56a8 8 0 1 1-16 0v-8h16v8Z)
    draw_circle(40, 56, 8)
    px1, py1 = get_coords(32, 48)
    px2, py2 = get_coords(48, 56)
    draw.rectangle([px1, py1, px2, py2], fill=logo_color)

    # 3. Bottom-right component (M80 56a8 8 0 1 1-16 0v-8h8a8 8 0 0 1 8 8Z)
    draw_circle(72, 56, 8)
    px1, py1 = get_coords(64, 48)
    px2, py2 = get_coords(72, 56)
    draw.rectangle([px1, py1, px2, py2], fill=logo_color)

    # 4. Middle-left component (M32 48H16v-8a8 8 0 1 1 16 0v8Z)
    draw_circle(24, 40, 8)
    px1, py1 = get_coords(16, 40)
    px2, py2 = get_coords(32, 48)
    draw.rectangle([px1, py1, px2, py2], fill=logo_color)

    # 5. Middle-right component (M64 48H48v-8a8 8 0 1 1 16 0v8Z)
    draw_circle(56, 40, 8)
    px1, py1 = get_coords(48, 40)
    px2, py2 = get_coords(64, 48)
    draw.rectangle([px1, py1, px2, py2], fill=logo_color)

    # 6. Top-middle component (M48 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z)
    draw_circle(40, 8, 8)

    # Create folder
    os.makedirs('icons', exist_ok=True)
    
    # Save the icons in various sizes using Lanzcos downsampling
    for size in [16, 48, 128]:
        resized = img.resize((size, size), Image.Resampling.LANCZOS)
        resized.save(f'icons/icon-{size}.png')
        print(f'Created icons/icon-{size}.png ({size}x{size})')

if __name__ == '__main__':
    generate_brand_icons()
