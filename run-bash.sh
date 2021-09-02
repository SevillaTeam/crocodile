IFS='
'
cd /var/www/croco-test1

export $(egrep -v '^#' .env | xargs -0)

pwd
ls

docker-compose up -d --build