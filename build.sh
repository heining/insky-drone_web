npm run build

mkdir /temp 

git clone xx /temp

cd /temp 

cp -r .git ../dist

cd ../dist


cp -r dist/* ../build/drone_web
cd ../build/drone_web
git add .
git commit -m "Osborny push "$(date "+%Y年%m月%d日")" "$(date "+%H:%M:%S") --no-verify
git push origin master