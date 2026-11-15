#!/usr/bin/env python3
"""Static server that gzips HTML like GitHub Pages (for representative LH runs)."""
import gzip
import http.server
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8770


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        path = self.translate_path(self.path)
        if os.path.isfile(path) and path.endswith(('.html', '.css', '.js', '.svg')):
            with open(path, 'rb') as fh:
                data = gzip.compress(fh.read(), 9)
            self.send_response(200)
            self.send_header('Content-Type', self.guess_type(path))
            self.send_header('Content-Length', str(len(data)))
            self.send_header('Content-Encoding', 'gzip')
            self.send_header('Vary', 'Accept-Encoding')
            self.end_headers()
            self.wfile.write(data)
            return
        return super().do_GET()

    def log_message(self, *args):
        pass


http.server.ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()
