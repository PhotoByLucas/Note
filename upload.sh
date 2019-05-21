#!/bin/zsh
git add .
let ls_date=`date +%F `
echo $ls_date
git commit -m $ls_date