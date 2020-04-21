
### Onboarding Endava
Onboarging-Endava es una aplicación web que permite realizar seguimiento al proceso de ONBOARDING de los nuevos empleados de la organización.

Entre las funcionalidades más importantes tenemos:

- Registro de nuevos empleados.

- Asignación de tareas de los procesos de onboarding y los respectivos responsables de ejecución.

- Como usuario del sistema tengo una visualización eficiente de mis tareas.

- Tableros de seguimiento.

- Emails de notificación de asignación de tareas, de cercanía de vencimiento, reportes semanales.

### Ejecutar instalación de paquetes de Node
Ejecutar el comando npm install tanto en el directorio del back, (/back), como del Front (/front).

### Crear Base de Datos
Ejecutar desde la terminal de psql el comando createdb endava (previa instalacion de Postgress SQL DB).

### npm start
Ejecutar el comando npm start en el directorio del back, (/back) para levantar el servidor. El mismo estará disponible en el puerto 3000 (http://localhost:3000)

IMP: Modificar el estado de la db en el archivo server (/back/server.js), a true, para levantar la estructura de las tablas. Luego setearlo a false, para evitar el reinicio constante de la base. db.sync({ force: false }). Esto deberá hacerse ante cada modificación que suceda en el modelo de dicha base.

### npm run build
Ejecutar el comando npm run build en el directorio del front, (/front) para correr webpack.

### Seedeo de la DB
Ejecutar el comando node seed.js en el directorio del back, (/back) para realizar un carga automática de disciplinas y usuario administrador.
Cabe destacar que en la carpeta "back" podrán encontrar cuatro archivos más de seed, los cuales no son indispensables para el funcionamiento de la aplicación. Fueron utilizados para testear el desarrollo.

### Datos Usuario Administrador
email: m.gonzalez@endava.com 
pass: 123

### Importante:
Una vez que se encuentren completas todas las tablas de la base de datos, dentro de la carpeta "back/followUpMail" descomentar la ejecución de las funciones para el envío de mails. Las mismas se encuentran señaladas en la última línea de código de los archivos "daily.js y weekly.js".


### Datos de contacto:
Laura Limon            lauralimonmolina@gmail.com
Celeste Colamarino     celestecolamarino@gmail.com
Jose Layana            jooselayan@gmail.com 
Ignacio Rodríguez      ignaciorodvil@gmail.com 
