#!/bin/bash
git add .
ls_date=$(date "+%Y-%m-%d")
echo $ls_date
git commit -m "$ls_date"