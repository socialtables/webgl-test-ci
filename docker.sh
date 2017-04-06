#!/bin/sh
Xvfb -ac -screen scrn 1280x800x16 :9.0 & npm run test-images && cp -R ./generated-images/* /generated-images/
