### Ativação de PostgreSQL com Docker

docker run \
  --name postgres \
  -e POSTGRES_USER=leanfj \
  -e POSTGRES_PASSWORD=senhasecreta \
  -e POSTGRES_DB=facs \
  -p 5432:5432 \
  -d \
  postgres


docker run \
  --name adminer \
  -p 8080:8080 \
  --link postgres:postgres \
  -d \
  adminer

### MongoDb

docker run \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
  -d \
  mongo:4

docker run \
  --name mongoclient \
  -p 3000:3000 \
  --link mongodb:mongodb \
  -d \
  mongoclient/mongoclient