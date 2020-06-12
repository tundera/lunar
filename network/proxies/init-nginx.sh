#! /bin/bash

# clean up old certs
rm -f ./network/proxies/nginx/certs/*

echo """
==================================================
  Installing local CA in system trust store
==================================================
"""

mkcert -install

echo """
==================================================
  Creating certificate for localhost
==================================================
"""

mkcert -cert-file ./network/proxies/nginx/certs/localhost.pem \
  -key-file ./network/proxies/nginx/certs/localhost-key.pem \
  -ecdsa \
  localhost '*.localhost' 127.0.0.1 ::1

echo "Done!"
