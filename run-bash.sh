IFS='
'
export $(egrep -v '^#' .env | xargs -0)

docker-compose up -d --build