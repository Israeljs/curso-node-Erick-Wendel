docker ps ()
docker run \
    --name postgres \ (nome do serviço, servidor)
    -e POSTGRES_USER=erickwendel \                 (-e vriável de ambiente)
    -e POSTGRES_PASSWORD=minhasenhasecreta \       (senha)
    -e POSTGRES_DB=heroes \                        (nome do banco)
    -p 5432:5432 \ porta interna e externa
    -d \                        (baixar e rodar em segundo plano)
    postgres                (até aqui copiar e colar no terminal)

docker ps
docker exec -it postgres/bin/bash (entra nesse container )
exit (sair)

docker run \ (vai rodar uma instância concorrente)
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \ (vão estar lincados, vai ter permição para acessar a nossa imagem do postgres
    -d \ (segundo plano)
    adminer (p nome dele)

## ---- MONGODB
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d \
    mongo:4 (imagem do mongo na versão 4) cola no terminal

    docker ps para verificar de tá tudo bem

docker run \ (criando um cliente para nosso imagem do mongo )
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

docker exec -it mongodb \ (criando  )
    mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \ (vai fazer login, usuario, senha e autenticação: será o admin, vai poder criar outros usuários)
    "você vai entrar vai dá um comando e liberá o terminal pramim:
    criar o banco, criar um usuário de aplicação, senha e vai ter uma sequencias de roles(permilções): ler e escrever no db herois."
    --eval "db.getSiblingDB('herois').createUser({user: 'jeronimo', pwd: '1234', roles: [{role: 'readWrite', db: 'herois'}]})"

    http://donwebajuda.com.br/tutorial-mongodb-criacao-de-banco-de-dados-conexao-remota-e-segura/


    startando o
    servidor  C:\Program Files\MongoDB\Server\4.2\bin> mongod --dbpath c:\data
    cliente   C:\Program Files\MongoDB\Server\4.2\bin> mongo
    https://www.luiztools.com.br/post/tutorial-crud-em-node-js-com-driver-nativo-do-mongodb/