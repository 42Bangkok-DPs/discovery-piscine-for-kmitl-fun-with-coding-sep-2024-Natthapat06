files=$(find . -maxdepth 1 -type f | wc -l)
directories=$(find . -maxdepth 1 -type d | wc -l)
total=$((files + directories))
echo $total
