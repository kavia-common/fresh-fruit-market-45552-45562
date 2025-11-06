#!/bin/bash
cd /home/kavia/workspace/code-generation/fresh-fruit-market-45552-45562/fruit_shop_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

