import os
from PIL import Image

def make_square(img):
    width, height = img.size
    new_size = max(width, height)
    # Create a new transparent image
    square_img = Image.new("RGBA", (new_size, new_size), (0, 0, 0, 0))
    # Paste the original image in the center
    offset = ((new_size - width) // 2, (new_size - height) // 2)
    square_img.paste(img, offset)
    return square_img

def main():
    source_path = "public/images/shiveshwar/cdn.prod.website-files.com/699c95622d9783a33a533b90/699e230609649f301ffe4dbd_Shree Shiveshwar Weavetech LLP - 1 - Edited.png"
    if not os.path.exists(source_path):
        print(f"Error: Source image not found at {source_path}")
        return

    print(f"Loading source image from {source_path}...")
    img = Image.open(source_path)
    square_img = make_square(img)

    # Output directory
    out_dir = "public"
    os.makedirs(out_dir, exist_ok=True)

    # 1. Generate PNGs of various sizes
    sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "apple-touch-icon.png": 180,
        "android-chrome-192x192.png": 192,
        "android-chrome-512x512.png": 512,
    }

    for filename, size in sizes.items():
        dest_path = os.path.join(out_dir, filename)
        resized = square_img.resize((size, size), Image.Resampling.LANCZOS)
        resized.save(dest_path, "PNG")
        print(f"Saved {dest_path} ({size}x{size})")

    # 2. Generate multi-resolution ICO file
    ico_path = os.path.join(out_dir, "favicon.ico")
    ico_sizes = [16, 32, 48, 64]
    ico_images = [square_img.resize((s, s), Image.Resampling.LANCZOS) for s in ico_sizes]
    # Save the first image, appending the rest in ico format
    ico_images[0].save(ico_path, format="ICO", sizes=[(s, s) for s in ico_sizes], append_images=ico_images[1:])
    print(f"Saved {ico_path} with sizes {ico_sizes}")

if __name__ == "__main__":
    main()
