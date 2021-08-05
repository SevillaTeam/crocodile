# crocodile

Содержимое файла .env (только в учебных целях)

```bash
DATABASE_URL=postgres://postgres:newPassword@postgres:5432/croco-db
NODE_ENV=development
PORT=5000
PORT_GAME_SERVER=8081
DB_USER=postgres
DB_HOST=localhost
DB_NAME=croco-db
DB_PASSWORD=newPassword
POSTGRES_USER=postgres
POSTGRES_PASSWORD=newPassword
POSTGRES_DB=croco-db
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=secret
PGADMIN_LISTEN_PORT=80
PORT_SERVER_THEME_MANAGER=80
```

Для запуска в контейнерах приложения необходимо создать рядом с .env файл .env.docker
c содержимым (изменен параметр DB_HOST=postgres):

```bash
DATABASE_URL=postgres://postgres:newPassword@postgres:5432/croco-db
NODE_ENV=development
PORT=5000
PORT_GAME_SERVER=8081
DB_USER=postgres
DB_HOST=postgres
DB_NAME=croco-db
DB_PASSWORD=newPassword
POSTGRES_USER=postgres
POSTGRES_PASSWORD=newPassword
POSTGRES_DB=croco-db
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=secret
PGADMIN_LISTEN_PORT=80
PORT_SERVER_THEME_MANAGER=80
```

## Установка SSL сертификатов и авторизованного хранилища на локальной машине

Утилита mkcert

```bash
brew install mkcert
brew install nss # if you use Firefox
mkcert -install
```

Создать сертификаты и ключи для localhost local.ya-praktikum.tech в корне:

```bash
mkcert localhost
mkcert local.ya-praktikum.tech
```

Далее необходимо в корне создать папку certsFiles и положить туда сертификаты local.ya-praktikum.tech, а так же в папке server-game создать папку certsFiles и положить туда сертификаты localhost
