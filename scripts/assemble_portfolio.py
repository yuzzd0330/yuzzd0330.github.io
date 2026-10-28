"""Restore the published portfolio byte-for-byte using existing original files."""
import hashlib
import json
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'portfolio-source'


def assemble():
    manifest = json.loads((SOURCE / 'manifest.json').read_text())
    residual = b''.join(p.read_bytes() for p in sorted(SOURCE.glob('portfolio.part*')))
    output = ROOT / 'site/assets/jingwei-liu-portfolio.pdf'
    digest = hashlib.sha256()
    size = 0
    with output.open('wb') as target:
        for segment in manifest['segments']:
            if segment['kind'] == 'residual':
                start = segment['offset']
                data = residual[start:start + segment['length']]
            else:
                sources = segment['source']
                if isinstance(sources, str):
                    sources = [sources]
                original = b''.join((ROOT / source).read_bytes() for source in sources)
                data = zlib.compress(original, segment['level'])
                if hashlib.sha256(data).hexdigest() != segment['sha256']:
                    raise ValueError('Original material verification failed: ' + str(sources))
            if len(data) != segment['length']:
                raise ValueError('Portfolio segment length mismatch')
            target.write(data)
            digest.update(data)
            size += len(data)
    if size != manifest['bytes'] or digest.hexdigest() != manifest['sha256']:
        output.unlink()
        raise ValueError('Complete portfolio verification failed')
    print(f'Complete portfolio verified: {size} bytes, SHA-256 {digest.hexdigest()}')


if __name__ == '__main__':
    assemble()
