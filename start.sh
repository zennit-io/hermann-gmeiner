#!/bin/sh
/wait-for-postgres.sh db
npm run build
npm start