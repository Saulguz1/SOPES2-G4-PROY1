# MANUAL TECNICO PROYECTO
---
![a](./images/Logo.png)
## Laboratorio Sistemas Operativos 2
### Vacaciones de Diciembre 2020
---

| Carnet | Nombre |
| ------ | ------ |
|200511819     |     Pablo Gerardo Garcia Perusina |
|201602517     |     Marvin Saul Guzman Garcia|
|201602811     |     Oscar Ariel Corleto Soto|



> Guatemala, 29/12/2020

---
---
## INDICE

- Introduccion

- Requerimientos Tecnicos y Herramientas

- Descripcion de la Aplicacion 

- Desarrollo de la Configuracion
    - Frontend
    - Backend

- Pasos para realizar un Deploy en Kubernete

---
---
## Introduccion

> El siguiente Manual Técnico se realizó para que el lector con conocimientos básicos de sistemas operativos , se le proporcione la lógica con la que se ha desarrollado la aplicación, También a detallar mínimas especificaciones de las funciones de cada uno de los elementos de la aplicación

---
---
## Requerimientos Tecnicos y Herramientas
Es necesario crear un cluster en GCP utilizando dos nodos de la máquina e2-standard-2.
Se debe crear una VM con mongoDB instalado, para lo cual utilizaremos el _docker-file_ ubicado en /Backend/db.

---
---
## Descripcion de la Aplicacion 
La aplicación es una pequeña web app para el manejo de descargas de juegos y manejo básico de usuarios.
Cuenta con control de usuarios, creación de usuarios, login, catálogo de juegos y descarga de juegos por usuario.

---
---
## Desarrollo de la Configuracion
Se siguieron los siguientes pasos para crear la aplicación.

---
*Creación del cluster:*

```gcloud container clusters create proyecto1 --num-nodes=2 --tags=allin,allout --enable-legacy-authorization --enable-basic-auth --issue-client-certificate --machine-type=e2-standard-2```

*Creación de namespace*
```kubectl create namespace project```

> Frontend

*Creación y exposición del deployment para frontend utilizando Load Balancer*

```
kubectl create deployment frontend --image=registry.hub.docker.com/petzydrummer/frontendso2 -n project
```

```
kubectl expose deployment frontend  --name=frontendservice  --port=80 --target-port=80 --type=LoadBalancer -n project
```


---

> Backend

*Creación de deployment de backend y exposición del mismo utilizando un Load Balancer*


```
kubectl create deployment backend --image=registry.hub.docker.com/petzydrummer/gamesapi -n project
```
```
kubectl expose deployment backend  --name=backendservice  --port=80 --target-port=8091 --type=LoadBalancer -n project
```

---
---
## Pasos para realizar un Deploy en Kubernete
Para realizar un deployment podemos seguir los pasos anteriormente mencionados o también podremos utlizar los archivos declarativos YAML para cada parte de la aplicación (Backend y Frontend), de la siguiente manera.

```
kubectl replace -f backend.yaml
kubectl replace -f frontend.yaml
```

---
---