# Builds a single-page preview (CSS and JS inlined) for the hosted Artifact preview.
import re, pathlib
d = pathlib.Path('dist'); html = (d / 'index.html').read_text()
css = (d / 'assets' / re.search(r'assets/(index-[^"]+\.css)', html).group(1)).read_text()
js = (d / 'assets' / re.search(r'assets/(index-[^"]+\.js)', html).group(1)).read_text()
assert '</script' not in js.lower()
fonts = re.search(r'<link rel="stylesheet" href="(https://fonts[^"]+)"', html).group(1)
out = f'''<title>H.I.T. Negotiation Course</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="{fonts}">
<style>{css}</style>
<div id="root"></div>
<script type="module">{js}</script>
'''
p = pathlib.Path('preview'); p.mkdir(exist_ok=True)
(p / 'index.html').write_text(out)
print(len(out))
