#!/bin/bash
DIR_NAME=$(dirname "$0")
cp $DIR_NAME/pre-commit $DIR_NAME/../.git/hooks/pre-commit
echo "🚄hook安装成功"
