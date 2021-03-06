rm -rf dist

npm run build

mkdir /temp

mkdir /dist

cp -r dist/* /dist

git clone http://git.inskydrone.cn/web/drone_web_build.git /temp

cp -r /temp/.git /dist/.git

cd /dist

git add .

git commit -m "Osborny push "$(date "+%Y年%m月%d日")" "$(date "+%H:%M:%S") --no-verify

git push origin master

# find /temp | grep -v .git | xargs rm -rf

# cd ../dist


# cp -r dist/* ../build/drone_web
# cd ../build/drone_web
# git add .
# git commit -m "Osborny push "$(date "+%Y年%m月%d日")" "$(date "+%H:%M:%S") --no-verify
# git push origin master
rm -rf /temp

rm -rf /dist