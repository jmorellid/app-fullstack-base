# Trabajo Práctico Final

Autor:
* Julián Morelli Desanzo

Docentes:
* Agustin Bassi
* Brian Ducca
* Matias Ramos

# Descripción:

El proyecto consiste en un prototipo básico de una Single Page Application (SPA) para el control de un Smart Home. Permite accionar distintos dispositivos mediante switches.
Para concretar las objetivos propuestos, se desarrollaron distintas funcionalidades tanto en el FrontEnd como en el BackEnd.

# Funcionalidades Implementadas:

## FrontEnd:

* Listado de dispositivos creado dinámicamente al cargar la SPA.
* Accionamiento de switches y persistencia del estado.
* Agregar un nuevo dispositivo con todos sus campos.
* Eliminar un dispositivo.


## Backend:

Métodos para:    
- Obtener todos los campos de todos los dispositivos.
- Crear un nuevo dispositivo.
- Eliminar un dispositivo por id.
- Modificar el valor del estado del switch de un dispositivo por id.


# Dependencias:

Los requisitos para correr esta aplicación son:

## Tener instalado: 

* Docker 
* Docker-compose

## Tener las siguiente Imagenes de Docker instaladas:

* mysql                   5.7                 d589ea3123e0        6 weeks ago         448MB
* phpmyadmin/phpmyadmin   latest              dfd1f4649053        7 weeks ago         469MB
* abassi/nodejs-server    10.0-dev            921893dceae7        5 months ago        925MB
* harmish/typescript      latest              bfec44dee8d2        2 years ago         458MB

### Conteniendo las siguientes versiones:

* express: "^4.17.1"
* mysql: "^2.18.1"

Nota: phpmyadmin se emplea para verificar y/o realizar cambios en la base de datos y no es requerido para correr la SPA.

## Configuración de Docker-compose

Se requiere un archivo docker-compose.yml con la configuración necesaria para inicar las imágenes y demás configuraciones (red) necesarias para el proyecto.

### Permisos de usuario correctamente configurados


Al final de este documento se incluye una guía indicando como instalar y configurar las requerimientos y dependencias del proyecto.


# Estructura del proyecto

El proyecto se encuentra conformado principalmente por los siguientes elementos:

## FrontEnd:
- index.html
- ts:
  - Main.ts
  - MyFramework.ts
  - ViewMainPage.ts
- static/images
  - Imagenes...

## BackEnd:
- index.js
- mysql-connector.js


# Iniciando la Aplicación:

Cumpliendo con las prerequisitos y dependencias, el proyecto se puede iniciar haciendo:

La primera vez que se inicia: (Para evitar que cargue el listado de dispositivos vacio porque no se encuentra creada la base de datos mySql.)
```
    git clone https://github.com/jmorelli/app-fullstack-base.git
    cd app-fullstack-base
    sh -c 'docker-compose up mysql-server&' && sleep 15 && docker-compose up
```

Las veces subsiguientes:
```
    cd app-fullstack-base
    docker-compose up
```

Luego, se acceder a la SPA desde: http://localhost:8000/?#!


## Licence

This project is published under GPLV3+ licence.
