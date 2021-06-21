FROM node:14
# создаем рабочую директорию
WORKDIR /var/www
# копируем весь исходный код
COPY . .
# если делать установку зависимостей в CMD через npm ci 
# - не хватает времени и падает с ошибкой Error R10 (Boot timeout)
RUN npm install
RUN npm run build

EXPOSE 4000
# запускается приложение
CMD [ "node", "server.ts" ]