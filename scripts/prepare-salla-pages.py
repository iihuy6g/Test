"""Extract copy-ready Salla information page bodies from the original storefront.

Run from the repository root with the original site directory as the argument.
The produced files are content for Salla's merchant pages, not Twilight routes.
"""

from pathlib import Path
from lxml import html
import sys


if len(sys.argv) != 2:
    raise SystemExit('Usage: python scripts/prepare-salla-pages.py ORIGINAL_SITE_DIR')

source = Path(sys.argv[1])
target = Path('migration/pages-qa')
target.mkdir(parents=True, exist_ok=True)

for slug in ('about', 'shipping', 'returns', 'privacy', 'terms'):
    document = html.parse(str(source / f'{slug}.html'))
    sections = document.xpath('//section[contains(concat(" ", normalize-space(@class), " "), " tight ")]')
    if not sections:
        raise RuntimeError(f'No content section in {slug}.html')
    section = sections[0]
    # The page title and its shared header/footer come from the Twilight theme.
    body = ''.join(html.tostring(child, encoding='unicode', method='html') for child in section)
    body = body.replace('href="index.html"', 'href="/"')
    body = body.replace('href="shop.html"', 'href="/products"')
    body = body.replace('href="contact.html"', 'href="/pages/contact"')
    (target / f'{slug}.html').write_text(body + '\n', encoding='utf-8')
    print(f'{slug}: {len(body)} characters')

(target / 'contact.html').write_text(
    '<div class="two-col-text"><p>يسعدنا تواصلكم معنا:</p>'
    '<p>واتساب: <a href="https://wa.me/97460010506">+97460010506</a></p>'
    '<p>إنستغرام: <a href="https://instagram.com/limitedoud">@limitedoud</a></p></div>\n',
    encoding='utf-8',
)
print('contact: Qatar contact information')
