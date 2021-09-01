FROM node:14
# создаем рабочую директорию
WORKDIR /var/www/game-server/
# копируем весь исходный код
COPY . .

# если делать установку зависимостей в CMD через npm ci
# - не хватает времени и падает с ошибкой Error R10 (Boot timeout)
RUN npm install

EXPOSE 8081
# запускается приложение
CMD npm run start:game-server



