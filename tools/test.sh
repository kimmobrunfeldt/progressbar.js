#!/bin/bash
# NOTE: Run this only from project root!

# Run all commands and if one fails, exit non-zero return code

EXIT_STATUS=0

echo -e "\n---- Linting code..\n"
npm run lint || EXIT_STATUS=$?

exit $EXIT_STATUS
