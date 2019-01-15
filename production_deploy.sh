#!/bin/bash

ember build -e production
scp -r dist/* jonchoukroun.com:/var/www/jonchoukroun.com/html
