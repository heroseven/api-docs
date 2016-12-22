# Culqi API  

> "Un API es la interfaz de usuario para un desarrollador."

## Introducción

```
URL Base:  'https://api.culqi.com/api/v2'

```

El API de [Culqi](http://culqi.com) está construido bajo los estándares de [REST](https://es.wikipedia.org/wiki/Transferencia_de_Estado_Representacional). Es decir, nuestra API posee URLs orientada a **recursos**, y hace uso de los **[códigos](https://httpstatuses.com/) de respuesta HTTP**  para indicar los posibles errores en el API. Es importante indicar que se encuentra implementada una [autenticación HTTP](https://tools.ietf.org/html/rfc6750) (*Bearer Token*), solicitada en cada *request* o petición. Además, soportamos las [solicitudes HTTP de origen cruzado](https://developer.mozilla.org/es/docs/Web/HTTP/Access_control_CORS) (*CORS*), permitiendo que tu sitio y Culqi puedan interactuar seguramente mediante nuestra API desde una aplicación cliente (aunque NUNCA deberías exponer tu **API Key** en el código de la aplicación web cliente). Por otro lado, un objeto **JSON** es retornado en cada una las peticiones hacia el API, incluyendo los [errores](#/?id=errores).<br>


Pero tranquilo

Finalmente, para que puedas comenzar a experimentar con nuestra API, todas las cuentas registradas en [Culqi]() poseen llaves en **modo de pruebas** ([Regístrate](https://integ-panel.culqi.com/#/registro) y obtén tu API Key) y en el modo de producción. Usando las **llaves de prueba** las transacciones nunca pasan por las redes bancarias y no tienen ningún costo. (¡Recuerda usar [tarjetas de prueba](https://developers.culqi.com/pruebas/#tarjetas), no tarjetas reales al probar!).


<p class="tip">
¡Happy coding!
</p>




--- Un coso aqui, bloques por cada recurso --


### Autenticación


### Errores

Por medio de nuestro API, podrás ser notificado con toda la información en caso
de cualquier error al momento de crear cualquier llamada a nuestro servicio.

La API de Culqi utiliza el standard **códigos de estado HTTP** ([HTTP status codes](http://www.ietf.org/assignments/http-status-codes/http-status-codes.xml)) en todas sus respuestas para indicar si se pudieron procesar las solicitudes con éxito o fallaron.

Ejemplo de respuesta de error (JSON):


```json
{
    "objeto": "error",
    "tipo": "{TIPO DE ERROR}",
    "codigo_error" : "{CODIGO DE ERROR CULQI}",
    "mensaje": "{Descripción del error}",
    "mensaje_usuario": "{Descripción del error para el usuario/cliente}",
    "param": "{Parametro que causa el error}"
}
```

- `tipo` *(string)*:  Refiere el tipo de error obtenido.<br>
- `codigo_error` *(string)* opcional: Refiere al código de error definido en Culqi.<br>
- `mensaje` *(string)*: Mensaje de uso interno para que puedas conocer el detalle del error.<br>
- `mensaje_usuario` *(string)*: Mensaje que debes de mostrar al usuario.<br>
- `param` *(string)* opcional: Si es que hubo algun error en algun parámetro de envio, mostrará nombre del parametro.<br>

<hr>

#### Tipos de errores

`tipo` depende del HTTP Status.


| tipo (string)       |               |
|:------------- |:--------------|
| **error_peticion**| HTTP 400 - Error cuando la llamada tiene una sintaxis inválida. |
| **error_autenticacion**   | HTTP 401 Error - La petición no pudo ser procesada debido a problemas con la llave API|
| **error_tarjeta**       | HTTP 402 - No se pudo realizar el cargo o cobro a una tarjeta.|
| **error_recurso** | HTTP 404 Error - El recurso no puede ser encontrado, es inválido o tiene un estado diferente al permitido. |
| **error_parametro** | HTTP 422 - Este error ocurre cuando algún parámetro de cualquier petición es inválido. |
| **error_api_limite** | HTTP 429- Estás haciendo muchas peticiones rápidamente al API. |
| **error_api** | HTTP 500 y 503 Errors - Engloba cualquier otro tipo de error (ejemplo: problema temporal con los servidores de Culqi) y debería de ocurrir muy pocas veces. |


<hr>

#### Códigos de error

Los códigos de error (`codigo_error`) son especificaciones detalladas de los errores, en estas tablas ubicaras los códigos de error por cada recurso.

- Autenticación

| codigo_error (string)       |               |
|:------------- |:--------------|
| **auth_error_header** | No está presente el header de autenticación. Debes autenticarte usando tu Código de Comercio (llave pública) o API Key (llave secreta) como Bearer Token. |
| **auth_api_key** | El API Key usado es inválido. |
| **auth_cod_comercio** | El Código de comercio usado es inválido. |
| **auth_deshabilitado** | Error de autenticación. Tu comercio está deshabilitado. |


- Tokens

| codigo_error (string)       |               |
|:------------- |:--------------|
| **token_invalido**| Token inválido o token expirado. |
| **token_corrupto**| Token con data corrupta, algun parametro invalido. Intentar crear uno nuevo. |
| **a_invalido**   | El año de vencimiento de la tarjeta es inválido.|
| **m_invalido**   | El mes de vencimiento de la tarjeta es inválido.|
| **cvv_invalido**       | El código de seguridad (CVV) de la tarjeta es inválido.|

- Cargos

| codigo_error (string)       |               |
|:------------- |:--------------|
| **operacion_denegada** | La operación ha sido denegada por el banco que emitió la tarjeta. |
| **fondos_insuficientes** | La tarjeta no tiene fondos suficientes para realizar el cargo. |
| **tarjeta_perdida** | La tarjeta ha sido reportada como perdida. |
| **tarjeta_robada** | La tarjeta ha sido reportada como robada. |
| **tarjeta_vencida** | La tarjeta ha vencido. |


- Planes

| codigo_error (string)       |               |
|:------------- |:--------------|
| **plan_hecho**| Este plan ya ha sido creado anteriormente. |

- Suscripciones

| codigo_error (string)       |               |
|:------------- |:--------------|
| **plan_invalido**| El plan no existe. Intenta crear uno nuevo |
| **suscripcion_invalida**| La suscripción no existe o tiene un estado difrente al requerido para realizar la operación. |

- Devoluciones

| codigo_error (string)       |               |
|:------------- |:--------------|
| **devolucion_inexistente** | El cargo no existe. |
| **devolucion_hecha** | El cargo ya ha sido devuelto anteriormente. |
| **devolucion_cargo** | El cargo no puede ser devuelto. |
| **devolucion_monto_mayor** | El monto indicado para devolver no puede ser mayor al monto del cargo. |
| **devolucion_monto_invalido** | El monto indicado es inválido. |
| **devolucion_tiempo** | El tiempo limite para devolver el cargo fue excedido. |
| **devolucion_imposible** | Imposible devolver esta transacción. Por favor, contacta soporte@culqi.com para recibir asistencia. |
| **devolucion_rechazada** | La devolución fue rechazada por el procesador de pagos.  |




#### Códigos de estado HTTP

Culqi usa los siguientes códigos de estado HTTP en sus respuestas.

| HTTP Status      |               |
|------------- |--------------|
| **200 - OK**|  Todo ha salido a la perfección.  |
| **201 - Created**|  Un nuevo recurso ha sido creado. (POST)|
| **204 - No Content**|  El recurso fue exitosamente eliminado. (DELETE) |
| **400 - Bad Request**|  Todo ha salido a la perfección. |
| **401 - Unauthorized**|  La API Key (llave API) utilizada es inválida. |
| **402 - Payment Required**| El pago no pudo ser procesado. |
| **404 - Not Found**|  El recurso solicitado en la llamada no existe. |
| **422 - Unprocessable Entity**|  La sintaxis de la llamada es válida pero la información dentro de los parámetros es inválida. |
| **500 y 503 - Server Errors**| Error en los servidores Culqi y la petición no pudo ser procesada. |


### Metadata

### ID de Rastreo


Explicar sobre lo que se devuelve en el header y que sirve para identificar
problemas.

- Se puede ver en el panel

Headers de respuesta
```json
{
  "date": "Fri, 16 Dec 2016 20:27:50 GMT",
  "x-culqi-environment": "test",
  "server": "Apache-Coyote/1.1",
  "x-culqi-tracking-id": "1042594",
  "x-culqi-version": "2.0.0",
  "transfer-encoding": "chunked",
  "content-type": null
}
```

### Versiones


| Versión API    | Fecha  | Docs |
| :------------- |:-------------:| ------------:|
| v1.0      | 23-08-2016 | :url  |
| v1.2      | 23-08-2016   |  :url |
| **v2.0 (latest)** | 23-08-2016     | :url |

---


## Tokens
*¿Qué son los tokens?* Los tokens podrían definirse como una forma de brindar seguridad a la información de tus clientes, recolectarla de manera segura es todo un ret y sin almacenar la información sentitiva en tus servidores. Por ello, Culqi ofrece una integración fácil con Culqi.JS en el navegador, pero tu puedes usar la misma técnica en otros entornos con el API en Tokens. Siempre teniendo en mente la seguridad.

Los *tokens* deben ser creados con tu **Código de Comercio** (llave ṕublica), dicha llave debe estar incrustada en tu código seguramente en tu web o aplicaciones descargables como iPhone y Android. Luego de creado, puedes utilizar el *token* para la mayoría de nuestros recursos del API disponibles, como crear **cargos** y **suscripciones**.

<p class="warning">
  **Nota:** Los tokens solo deben usarse al momento de una operación. Esto indica que los tokens no deben ser almacenados o usarse más de de una vez. Para operaciones de usos posteriores puedes consultar Tarjetas.
</p>


| Endpoints     | Funcionalidad |
| :-------------| -----------:|
| `POST` /tokens/ | Crear un token |
| `GET` /tokens/{tokenId}   | Consultar un token |
| `GET` /tokens/  | Listado de tokens |



### Crear un token

**POST** https://api.culqi.com/api/v2/tokens <br>
Autenticación: `Cod. Comercio`

Crea un token de operación, con duración temporal. El token luego es requerido para
crear un **Cargo** o una **Suscripción**.  

**Request**

| Headers     | Valor |
| :-------------| :-----------|
| Authorization | Bearer <CodigoComercio> |



Cuerpo del *request*:

```json
{
  "card_number": "4444333322221111",
  "currency": "PEN",
  "cvv": 123,
  "expiration_month": 12,
  "expiration_year": 2020,
  "fingerprint": "Android Device ID - MiDispositivo123465",
  "last_name": "Bachman",
  "email": "erlich@bachmanity.com",
  "name": "Erlich"
}
```


| Campo    | Tipo de dato  | Descripción  |
| :------- |:-------------:| ------------:|
| col 3 is <br> Min: Max: | right-aligned | Lorem ipsum dolor sit amet.   |
| col 2 is | centered      |   $12        |
| zebra stripes | are neat |    $1 |


**Respuesta**

Cuerpo de la respuesta:

```json


{
  "bank_country": "string",
  "bank_name": "string",
  "brand_name": "string",
  "card_number": "string",
  "cardholder": {
    "last_name": "string",
    "mail": "string",
    "name": "string"
  },
  "id": 0,
  "value": "string"
}
```



### Consultar un token


### Listado de tokens


---


## Tarjeta

Tarjetas te permite guardar y procesar tarjetas de clientes sin tener qué tocar la información de la tarjeta. A diferencia de los tokens, las tarjetas pueden ser utilizadas si son incrustadas en un cliente.

You can store multiple cards on a customer in order to charge the customer later. You can also store multiple debit cards on a recipient in order to transfer to those cards later.


### Crear una tarjeta

Crea una nueva tarjeta utilizando un token.

### Consultar una tarjeta

Returns a single card object which match CARD_ID and belongs to the customer which match CUSTOMER_ID.


### Listado de tarjetas

Returns a list of cards objects.

Return all cards that belongs to the customer CUSTOMER_ID. You can learn more about lists in the pagination documentation.

### Eliminar una tarjeta

Destroy the card which match CARD_ID and belongs to the customer which match CUSTOMER_ID.

Elimina la información de la tarjeta.

---


## Cargos

Para poder crear un cargo con tarjeta, OXXO o bancos, necesitas crear un objeto de cargo. Los cargos son identificados con un identificador único (id) asignado al azar.

### Crear un cargo

Para realizar el cobro con tarjeta de crédito o débito, debes crear un objeto de cargo para tarjeta. En caso de utilizar la llave en modo de prueba, la tarjeta no será cargada pero todo lo demás será simulado como si fuera un cargo real para que puedas realizar las pruebas necesarias. Al utilizar la llave en modo de producción (solamente si tu cuenta está activada), podrás realizar cargos reales a la tarjeta.
Para realizar un cargo con tarjeta, primero debes tokenizar los datos de la misma.
Puedes revisar nuestros tutoriales para cargos con tarjeta o cargos on-demand

### Consultar un cargo

Crea una consulta de cargos. Esta función acepta condiciones básicas de búsqueda que te permitirá filtrar, ordenar y paginar resultados. Información adicional sobre las consultas y operadores pueden ser encontrados en la sección de consultas. Solo puedes utilizar las llaves privadas de API para poder crear una consulta de cargos.

### Listado de cargos


### Devolver un cargo
Crea una devolución de un cargo ‘card_payment’ creado anteriormente. Puedes crear una devolución total o una devolución parcial si especificas una cantidad menor al total del cargo original. Necesitas utilizar las llaves privadas de API para poder realizar una devolución.



 --- Revisar ---


---
## Planes

### Crear un plan
### Consultar un plan
### Listado de planes


---


## Suscripciones
### Crear una suscripción
### Consultar una suscripción
### Actualizar suscripción
### Cancelar suscripción
### Listado de suscripciones


---

## Eventos (Webhooks)
### Creación de Token
### Creación de cargo
### Creación de cargo exitoso (Suscripción)
### Creación de cargo fallido (Suscripción)
### Creación de suscripción
