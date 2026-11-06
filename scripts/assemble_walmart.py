"""Restore original Walmart materials from checked repository chunks for Pages."""
from pathlib import Path
import hashlib, json

ROOT = Path(__file__).resolve().parent.parent
manifest = json.loads((ROOT / 'walmart-source/manifest.json').read_text())
for item in manifest['files']:
    content = b''.join((ROOT / part).read_bytes() for part in item['parts'])
    assert len(content) == item['bytes'], item['output']
    assert hashlib.sha256(content).hexdigest() == item['sha256'], item['output']
    target = ROOT / item['output']
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(content)
    print(f"Verified {item['output']} ({len(content)} bytes)")
