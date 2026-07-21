import fitz
import os

pdfs = {
    "MaterialsScienceNotes.pdf": {
        "dir": "src/content/en/guides/materials-science-guide",
        "pages": [26, 64, 89, 90, 103],
    },
    "Thermodynamics Study Guide.pdf": {
        "dir": "src/content/en/guides/materials-thermodynamics-notes",
        "pages": [23, 56, 91],
    },
    "Semiconductor Process Lab Notebook.pdf": {
        "dir": "src/content/en/reviews/semiconductor-lab-notebook",
        "pages": [3, 4],
    },
    "Materials Characterization Lab Notebook.pdf": {
        "dir": "src/content/en/reviews/materials-characterization-notebook",
        "pages": [3, 4],
    },
    "Kyoto No-Regrets Travel Guide with Photos - Un-named.pdf": {
        "dir": "src/content/en/guides/kyoto-travel-guide",
        "pages": [4, 6, 8, 11, 13, 15, 16, 18, 20, 22, 25],
    },
    "Healthy_Mind_Puzzles_80pages_DRAFT.pdf": {
        "dir": "src/content/en/guides/healthy-mind-puzzles",
        "pages": [5, 7, 15, 22, 23, 27, 37, 53, 55, 59],
    },
}

base = r"C:\Users\hujerry\Desktop\網站"
pdf_dir = os.path.join(base, "電子檔")

for pdf_name, cfg in pdfs.items():
    article_dir = os.path.join(base, cfg["dir"])
    os.makedirs(article_dir, exist_ok=True)
    pdf_path = os.path.join(pdf_dir, pdf_name)
    if not os.path.exists(pdf_path):
        print(f"SKIP: {pdf_path} not found")
        continue
    doc = fitz.open(pdf_path)
    for pn in cfg["pages"]:
        if pn < 1 or pn > len(doc):
            print(f"SKIP: {pdf_name} p{pn} out of range (1-{len(doc)})")
            continue
        page = doc[pn - 1]
        # render at 2x resolution for crisp images
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
        out = os.path.join(article_dir, f"p{pn}.png")
        pix.save(out)
        print(f"OK: {os.path.relpath(out, base)} ({pix.width}x{pix.height})")
    doc.close()
