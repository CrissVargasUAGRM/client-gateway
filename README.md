## Cliente Gateway
El gateway es el punto de comunicación entre nuestros clientes y nuestros servicios.

## Dev

1. Clonar el repositorio `git clone ...`
2. Instalar dependencias `npm install`
3. Crear un archivo `.env` basado en el `env.template`
4. Levantar el servidor de NATS - BROKER
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```
5. Tener levantados los microservicios  que se van a consumir
6. Levantar proyecto con `npm run start:dev`


## Nats
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```
```
CLIENT GATEWAY
Los microservicios se conectan por NATS, las enviroments PRODUCTS_MICROSERVICE_HOST, PRODUCTS_MICROSERVICE_PORT, ORDERS_MICROSERVICE_HOST, ORDERS_MICROSERVICE_PORT,
AUTH_MICROSERVICE_HOST, AUTH_MICROSERVICE_PORT ya no tienen uso porque se usaban para una comunicacion por TCP.

```