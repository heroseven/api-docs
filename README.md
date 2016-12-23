# Culqi API  

> "An API is the user interface for a developer."

<p class="warning">

[ATENCIÓN] This version of the API (v2.0-beta) is in testing, if you want to access 8 test it and help us, you have to follow the <a href="#" jump-to-id="testear-la-beta">following steps</a> previously. In addition, we invite you to read the [publication](https://medium.com/team-culqi/el-nuevo-api-v2-de-culqi-eb68c835bdcd#.bbkglso8i) with all the news.

</p>

## Introduction


```
URL Base:  'https://api.culqi.com/api/v2'

```


The API of [Culqi](http://culqi.com) Is built to the standards of [REST](https://es.wikipedia.org/wiki/Transferencia_de_Estado_Representacional).That is, our API has URLs oriented to ** resources **, and makes use of HTTP ** ** [codes] (https://httpstatuses.com/) ** to indicate possible API errors. It is important to note that an [HTTP authentication] (https://tools.ietf.org/html/rfc6750) (* Bearer Token *), implemented on each * request * or request, is implemented. In addition, we support [cross-origin HTTP requests] (https://developer.mozilla.org/en/docs/Web/HTTP/Access_control_CORS) (* CORS *), allowing your site and Culqi to be able to securely interact with our API From a client application (although you should NEVER expose your ** API Key ** in the client web application code). On the other hand, a ** JSON ** object is returned on each request to the API, including [errors] (#/?id=errors).<br>







Finalmente, para que puedas comenzar a experimentar con nuestra API, todas las cuentas registradas en [Culqi]() poseen llaves en **modo de pruebas** ([Regístrate](https://integ-panel.culqi.com/#/registro) y obtén tu API Key) y en el modo de producción. Usando las **llaves de prueba** las transacciones nunca pasan por las redes bancarias y no tienen ningún costo. (¡Recuerda usar [tarjetas de prueba](https://developers.culqi.com/pruebas/#tarjetas), no tarjetas reales al probar!).


<p class="tip">
¡Happy coding!
</p>



### Testear la beta

La presente versión del API se encuentra como una versión en prueba. Si deseas ser parte y ayudarnos a mejorar por favor sigue los siguientes pasos.

1. Ingresar al panel de Integración de Culqi.
2. Dirigirte a la sección Desarrolladores -> API Keys.
3. Encontrar el botón "Actualizar API v2" y darle click. Una vez que hayas confirmado la actualización. Obtendrás nuevas llaves y código de comercio. :)


<img src="https://cdn-images-1.medium.com/max/800/1*IoSK0H5wgk7ZrwCW6Nv2lA.gif" alt="preview" width="500">



### Autenticación

Para poder acceder y utilizar el Culqi API necesitas previamente conocer y tener tus API Keys (llaves de autenticación). Bajo autenticación HTTP, en cada request.  

Las llaves las puedes obtener en Desarrollo > API Keys de tu [panel Culqi](http://integ-panel.culqi.com).

Todas las peticiones al API deben ser fechas bajo HTTPS, las llamadas hechas bajo HTTP plano fallarán (en producción) y las peticiones sin autenticación también fallarán.


***Código de Comercio (llave pública)*** <br>

```md
Authorization: Code <<CodigoComercio>>  
```

Ejemplo: `pk_test_J0BnI4vcidMGdxxx`

***API Key (llave privada)*** <br>   

```md
Authorization: Bearer <<ApiKey>>  
```
Ejemplo: `sk_test_ujVxc7JMCr0ivxxx`

### Errores

Por medio de nuestro API, podrás ser notificado con toda la información en caso
de cualquier error al momento de crear cualquier llamada a nuestro servicio.

La API de Culqi utiliza el standard **códigos de estado HTTP** ([HTTP status codes](http://www.ietf.org/assignments/http-status-codes/http-status-codes.xml)) en todas sus respuestas para indicar si se pudieron procesar las solicitudes con éxito o fallaron.

Ejemplo de respuesta de error (JSON):


```json
{
    "object": "error",
    "type": "{TIPO DE ERROR}",
    "code" : "{CODIGO DE ERROR CULQI}",
    "message": "{Descripción del error}",
    "user_message": "{Descripción del error para el usuario/cliente}"    
}
```

- `type` *(string)*:  Refiere el tipo de error obtenido.<br>
- `code` *(string)* opcional: Refiere al código de error definido en Culqi.<br>
- `message` *(string)*: Mensaje de uso interno para que puedas conocer el detalle del error.<br>
- `user_message` *(string)*: Mensaje que debes de mostrar al usuario.<br>


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




### ID de Rastreo

Cada petición API esta asociada un identificador de petición (request). Tu puedes encontrar este valor en los headers de respuesta, bajo el nombre de **`x-culqi-tracking-id`**. Este ID de rastreo también lo puedes encontrar en el panel de Culqi, en Desarrollo > API Log y en el detalle de cada petición. **Si necesitas contactar con nosotros para ayudarte con alguna petición en específico, brindando este ID de rastreo hará más fácil la ubicación y posterior solución del problema o incidencia.**


Headers de respuesta ejemplo:
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
---

### Versiones

| Versión API    | Fecha  | Docs |
| :------------- |:-------------:| ------------:|
| v1.0      | 23-07-2015 | *Descontinuada*  |
| v1.2      | 23-08-2016   |  [API 1.2](https://culqi.api-docs.io/v1.2)  |
| **v2.0-beta (latest)** | 23-12-2016 | [API 2.0]() |

---


## Tokens
*¿Qué son los tokens?* Los tokens podrían definirse como una forma de brindar seguridad a la información de tus clientes, recolectarla de manera segura es todo un ret y sin almacenar la información sentitiva en tus servidores. Por ello, Culqi ofrece una integración fácil con Culqi.JS en el navegador, pero tu puedes usar la misma técnica en otros entornos con el API en Tokens. Siempre teniendo en mente la seguridad.

Los *tokens* deben ser creados con tu **Código de Comercio** (llave ṕublica), dicha llave debe estar incrustada en tu código seguramente en tu web o aplicaciones descargables como iPhone y Android. Luego de creado, puedes utilizar el *token* para la mayoría de nuestros recursos del API disponibles, como crear **cargos** y **suscripciones**.




| Endpoints     | Funcionalidad |
| :-------------| -----------:|
| `POST` /tokens/ | Crear un token |


### Crear un token

**POST** https://api.culqi.com/api/v2/tokens <br>
Autenticación: <a href="#" jump-to-id="autenticación">`Cod. Comercio`</a>

Crea un token de operación, con duración temporal. El token luego es requerido para
crear un **Cargo** o una **Suscripción**. Este token representa a una tarjeta de crédito o débito.

**Request**

Headers:

```md
Content‐Type: application/json
Authorization: Code <<CodigoComercio>>  
```

Cuerpo del *request*:

```json
{
  "first_name": "Erlich",
  "last_name": "Bachman",  
  "email": "erlich@bachmanity.com",
  "currency": "PEN",
  "card_number": 4444333322221111,  
  "cvv": 123,
  "expiration_month": 12,
  "expiration_year": 2020
}
```

| Campo    | Tipo de dato  | Descripción  |
| :------- |:-------------:| :------------|
| *first_name <br> Min: 2 Max: 50 | *string* | Nombres del tarjetahabiente. **Ejemplo**: `Richard`  |
| *last_name <br> Min: 2 Max: 50 | *string* | Apellidos del tarjetahabiente. **Ejemplo**: `Hendricks` |
| *email <br> Min: 5 Max: 50 | *string* |  Dirección de correo electrónico del cliente. **Ejemplo**: `richard@piedpiper.com`  |
| *currency_code <br> Min: 3 Max: 3 | *string* | Código de la moneda en tres letras (Formato ISO 4217).   **Ejemplo**: `PEN` |
| *card_number <br> Min: Max: | *integer* | Numero de la tarjeta. **Ejemplo**: `4444333322221111` |
| *cvv <br> Min: Max: | *integer* | CVV de la tarjeta. **Ejemplo**: `123` |
| *expiration_month <br> Min: Max: | *integer* |  Mes de expiración de la tarjeta. **Ejemplo**: `09` |
| *expiration_year <br> Min: Max: | *integer* | Año de expiración de la tarjeta. **Ejemplo**: `2020` |


**Respuesta**

Cuerpo de la respuesta:

```json
{
  "object": "token",
  "id": "tkn_live_j2C0VXVH4Ze2huxe",
  "card_number": "444433******1111",
  "cardholder": {
    "first_name": "Erlich",
    "email": "erlich@bachmanity.com",
    "last_name": "Bachman",
    "object": "cardholder"
  },
  "brand_name": "Visa",
  "bank_name": "",
  "bank_country": "United States"  
}
```

| Campo    | Tipo de dato  | Descripción  |
| :------- |:-------------:| :------------|
| id <br> Min: Max: | *integer* | Identificador del token, esto lo usarás luego en la creación de Cargo o Suscriṕción. |
| card_number <br> Min: 3 Max: 3 | *integer* | Número de la tarjeta (enmascarado). |
| cardholder | *objeto* | Objeto con información del tarjetahabiente. |
| brand_name <br> Min: 5 Max: 50 | *string* |  Marca de la tarjeta. Ejemplo: VISA, MasterCard.|
| bank_name <br> Min: 2 Max: 50 | *string* | Nombre del banco |
| bank_country <br> Min: 2 Max: 50 | *string* | País del banco.  |



---


## Cargos

Para realizar el cobro con tarjeta de crédito o débito, debes crear un objeto de cargo para tarjeta. En caso de utilizar la llave en modo de prueba, la tarjeta no será cargada pero todo lo demás será simulado como si fuera un cargo real para que puedas realizar las pruebas necesarias. Al utilizar la llave en modo de producción (solamente si tu cuenta está activada), podrás realizar cargos reales a la tarjeta.
Para realizar un cargo con tarjeta, primero debes tokenizar los datos de la misma.


| Endpoints     | Funcionalidad |
| :-------------| -----------:|
| `POST` /charges/ | Crear un cargo |


### Crear un cargo

<p class="tip">
**Novedad**: Ahora en la creación de un cargo puedes hacer uso de **coutas**, dentro del
request se encuentra como el campo "installments".
</p>


**POST** https://api.culqi.com/api/v2/charges <br>
Autenticación: <a href="#" jump-to-id="autenticación">`API Key`</a>

Crea un cargo (cobro) hacia el cliente mediante este método. Previamente debes haber generado
un token de la tarjeta.

**Request**

Headers:

```md
Content‐Type: application/json
Authorization: Bearer <<Apikey>>  
```

Cuerpo del *request*:

```json
{
  "token": "tkn_live_d3nJ5ibVV2gGCy26",
  "order_id": "fsfsdfds129f",
  "first_name" : "William",
  "last_name": "Muro",
  "email": "willi@me.com",
  "address": "Avenida Lima 34234",
  "address_city": "Lima",
  "phone_number": 123456787,
  "country_code": "PE",
  "currency_code": "PEN",
  "amount": 1000,
  "installments" :0,
  "product_description": "Venta de prueba",
  "cvv": 0
}
```

| Campo    | Tipo de dato  | Descripción  |
| :------- |:-------------:| :------------|
| *token <br> Min: 32 Max: 32 | *string* | Token de tarjeta creado anteriormente.   |
| *order_id <br> Min: 5 Max: 80 | *string* | Identificador de la orden o pedido, debe ser único por cargo. **Ejemplo**: `P000007`  |
| *first_name <br> Min: 2 Max: 50 | *string* | Nombres del cliente. **Ejemplo**: `Richard`  |
| *last_name <br> Min: 2 Max: 50 | *string* | Apellidos del cliente. **Ejemplo**: `Hendricks` |
| *email <br> Min: 5 Max: 50 | *string* | Nombres del cliente. **Ejemplo**: `richard@piedpiper.com` |
| *address <br> Min: 5 Max: 100 | *string* | Dirección del cliente. **Ejemplo**: `Av. Brasil 123` |
| *address_city <br> Min: 2 Max: 30 | *string* | Ciudad del cliente. **Ejemplo**: `Lima` |
| *phone_number <br> Min: 5 Max: 15 | *integer* | Número de teléfono del cliente. **Ejemplo**: `34343443434` |
| *country_code <br> Min: 2 Max: 2 | *string* | Código ISO‐3166‐1 Alfa 2 del país del cliente. **Ejemplo**: `PE`, `US`  |
| *currency_code <br> Min: 3 Max: 3 | *string* | Código de la moneda en tres letras (Formato ISO 4217).   **Ejemplo**: `PEN` |
| *amount <br> Min: 3 Max: 8 | *integer* | Monto de la venta o cargo. Sin punto decimal. **Ejemplo**: `19900`  (199.00 soles) |
| *installments <br> Min: 1 Max: 2 | *integer* | (opcional) Coutas, con un valor máximo de 36  **Ejemplo**: `2` |
| *description <br> Min: 5 Max: 80 | *string* | Descripción de la venta. **Ejemplo**: `Zapatillas Snoke Rojas` |
| cvv <br> Min: 3 Max: 4 | *string* | (opcional) CVV de la tarjeta. **Ejemplo**: `123` |


**Respuesta**

Cuerpo de la respuesta:

```json
{
  "id": 63624,
  "request_number": "fsfsdfds125f",
  "original_amount": 1000,
  "actual_amount": 1000,
  "net_amount": 955,
  "description": "Venta de prueba",
  "ticket": "XRAkBGZ2OIHJSdLbAZtbp7fB",
  "date": 1482274214042,
  "fraud_score": 15.53,
  "reference_code": "hZv4J6gzkD",
  "response_code": "venta_exitosa",
  "merchant_message": "La operación de venta ha sido autorizada exitosamente",
  "user_message": "Su compra ha sido exitosa.",
  "device_ip": null,
  "device_country": null,
  "ip_country": null,
  "product": "token",
  "state": "Exitosa",
  "client": {
    "country": "PE",
    "name": "William",
    "lastname": "Muro",
    "city": "Lima",
    "address": "Avenida Lima 34234",
    "email": "willi@me.com",
    "phone": "123456787"
  },
  "token": {
    "id": 25387,
    "value": "nl5mmx7Mp7STqQFMiyNpo0Se6ZnyRR8E",
    "card_number": "411111******1111",
    "cardholder": {
      "name": "William",
      "email": "willi@me.com",
      "last_name": "Muro"
    },
    "brand_name": "Visa",
    "bank_name": "JPMORGAN CHASE BANK, N.A.",
    "bank_country": "United States"
  },
  "operations": []
}
```






---
## Planes

Los planes permiten a tu negocio manejar suscripciones (pagos recurrentes). Mediante la creación de uno tus usuarios
podrán suscribirse al mismo y estar sujetos a cargos/cobros recurrentes. Tal como lo hacen muchos modelos de negocio actualmente (Spotify, Netflix, etc). Por ejemplo: Creación de un plan premium (mensual o anual) para ofrecer tus contenidos especiales en tu sitio.


| Endpoints     | Funcionalidad |
| :-------------| -----------:|
| `POST` /plans/ | Crear un plan |


### Crear un plan

**POST** https://api.culqi.com/api/v2/plans <br>
Autenticación: <a href="#" jump-to-id="autenticación">`API Key`</a>

Se crea un plan mediante una petición POST.

**Request**

Headers:

```md
Content‐Type: application/json
Authorization: Bearer <<Apikey>>  
```

Cuerpo del *request*:

```json
{
  "alias": "plan-mensual",
  "name": "Plan Mensual",
  "amount": 4500,
  "currency_code": "PEN",
  "interval": "month",
  "interval_count": 1,
  "trial_days": 5,
  "limit": 0
}
```
<p class="tip">
**Nota:** El ejemplo de la parte superior crearía un plan que cobraría cada mes **45 Soles**, y con **5 días** de prueba (sin cobro).
</p>


| Campo    | Tipo de dato  | Descripción  |
| :------- |:-------------:| :------------|
| *alias <br> Min: 5 Max: 80 | *string* | ID designado para el plan a crear. **Ejemplo**: `plan-premium`, `PLAN002` |
| *name <br> Min: 2 Max: 50 | *string* | Nombre de tu plan. **Ejemplo**: `Plan Premium` |
| *amount <br> Min: 3 Max: 8 | *integer* | Monto del plan a cobrar recurrentemente. Sin punto decimal.  **Ejemplo**: `5000` |
| *currency_code <br> Min: 3 Max: 3 | *string* | Código de la moneda en tres letras (Formato ISO 4217). **Ejemplo**: `PEN` o `USD` |
| *interval <br> Min: 3 Max: 5 | *string* | Los valores disponibles son day, week, month y year.  **Ejemplo**: `month` |
| *interval_count <br> Min: 1 Max: 3 | *integer* | Cantidad de cada cuanto se deben ejecutar los cargos. **Ejemplo**: `1` |
| *trial_days <br> Min: 1 Max: 3 | *integer* | Número de días del periodo de prueba (sin costo).  **Ejemplo**: `5` |
| *limit <br> Min: 1 Max: 3 | *integer* | (opcional) Limite de cargos a realizar. Si no se define, es automáticamente 0 (sin límite). **Ejemplo**: `12` (cobrar 12 veces) |

**Respuesta**

Cuerpo de la respuesta:

```json
{
  "object": "plan",
  "id": "pln_live_4NoWqhpKa4nmn2GM",
  "creation_date": 1482363876,
  "alias": "plan-mensual",
  "name": "Plan Mensual",
  "amount": 4500,
  "currency_code": "PEN",
  "interval": "Meses",
  "interval_count": 1,
  "limit": 0,
  "trial_days": 5
}
```

| Campo    | Tipo de dato  | Descripción  |
| :------- |:-------------:| :------------|
| *id<br> Min: 2 Max: 50 | *string* | Identificador del plan, es generado automáticamente.  |
| *creation_date<br> Min: 2 Max: 50 | *integer* | Fecha de creación en formato UNIX Timestamp. |
| *alias<br> Min: 2 Max: 50 | *string* | ID designado para el plan creado.  |
| *name <br> Min: 2 Max: 50 | *string* | Nombre de tu plan.  |
| *amount <br> Min: 3 Max: 8 | *integer* | Monto del plan a cobrar recurrentemente. Sin punto decimal. |
| *currency_code <br> Min: 3 Max: 3 | *string* | Código de la moneda en tres letras (Formato ISO 4217).  |
| *interval <br> Min: 3 Max: 5 | *string* | Los valores disponibles son day, week, month y year.  **Ejemplo**: `month` |
| *interval_count <br> Min: 1 Max: 3 | *integer* | Cantidad de cada cuanto se deben ejecutar los cargos. **Ejemplo**: `1` |
| *limit <br> Min: 1 Max: 3 | *integer* | Limite de cargos a realizar. |
| *trial_days <br> Min: 1 Max: 3 | *integer* | Número de días de periodo de prueba.|


---

## Suscripciones

Las suscripciones te permiten realizarles cargos a tu cliente de forma recurrente. Esta suscripción tiene como base a un plan y a un token. El plan define como se realizarán los cargos y el token identifica la tarjeta a la que se realizarán los cargos.


### Crear una suscripción


**POST** https://api.culqi.com/api/v2/suscriptions <br>
Autenticación: `Bearer`

Crea una nueva suscripción.

<p class="warning">
**Nota:** Para crear una suscripción a un cliente, previamente debes tener <a href="#" jump-to-id="planes">planes</a> creados.
</p>
**Request**

Headers:

```md
Content‐Type: application/json
Authorization: Bearer <<Bearer>>  
```

Cuerpo del *request*:

```json
{
  "plan_alias": "plan-basic2",
  "token_id": "tkn_live_BhIYiucKMYH6YJoj",
  "first_name": "William",
  "last_name": "Muro",
  "email": "wmuro@me.com",
  "address": "Avenida Lima 123",
  "address_city": "Lima",
  "country_code": "PE",
  "phone_number": 123456789,
}
```

| Campo    | Tipo de dato  | Descripción  |
| :------- |:-------------:| :------------|
| *plan_alias <br> Min: 5 Max: 80 | *string* | Alias del plan que se asignará a la suscripción. p. ej: PLAN002.   |
| *token_id <br> Min: 32 Max: 32 | *string* | El ID del Token de tarjeta creado anteriormente.   |
| *first_name <br> Min: 2 Max: 50 | *string* | Nombre del cliente.   |
| *last_name <br> Min: 2 Max: 50 | *string* | Apellido del cliente   |
| *email <br> Min: 5 Max: 50 | *string* | Correo electrónico del cliente.  |
| *address <br> Min: 5 Max: 100 | *string* | Dirección del cliente.   |
| *address_city <br> Min: 2 Max: 30 | *string* | Ciudad del cliente. p. ej: Lima.   |
| *country_code <br> Min: 2 Max: 2 | *string* | Código ISO‐3166‐1 Alfa 2 del país del cliente. p. ej: PE (Perú)   |
| *phone_number <br> Min: 5 Max: 15 | *integer* | Número de teléfono del cliente   |

**Respuesta**

Cuerpo de la respuesta:

```json
{
  "object": "subscription",
  "id": "sub_live_eLNPJvaYO1IjIlci",
  "creation_date": 1482363416000,
  "next_billing_date": 1483592400000,
  "first_name": "William",
  "last_name": "Muro",
  "email": "wmuro@me.com",
  "address": "Avenida Lima 123",
  "address_city": "Lima",
  "country_code": "PE",
  "phone": 123456789,
  "token": {
    "object": "token",
    "id": "tkn_live_BhIYiucKMYH6YJoj",
    "card_number": "411111******1111",
    "cardholder": {
      "first_name": "Nño",
      "email": "wmuro@me.com",
      "last_name": "Muro",
      "object": "cardholder"
    },
    "brand_name": "Visa",
    "bank_name": "JPMORGAN CHASE BANK, N.A.",
    "bank_country": "United States",
  },
  "plan": {
    "object": "plan",
    "id": "pln_null_g4O3jJJJ6wwZH7Ce",
    "creation_date": 1482359074000,
    "alias": "plan-basic2",
    "name": "Plan de Prueba 35",
    "amount": 1000,
    "currency_code": "PEN",
    "interval": "Meses",
    "interval_count": 1,
    "limit": 0,
    "trial_days": 15,
  },
  "current": null,
}
```

| Campo    | Tipo de dato  | Descripción  |
| :------- |:-------------:| :------------|
| *object <br> Min: 2 Max: 10 | *string* | El nombre del objeto retornado, en este caso "subscription"  |
| *id <br> Min: 2 Max: 50 | *string* | El ID de la suscripción.  |
| *creation_date <br> Min: 2 Max: 50 | *string* | La fecha de creación de la suscripción en formatio UNIX Timestamp.  |
| *next_billing_date <br> Min: 2 Max: 50 | *string* | La fecha del siguiente cargo en formato UNIX Timestamp.  |
| *first_name <br> Min: 2 Max: 50 | *string* | Nombres del cliente.  |
| *last_name <br> Min: 2 Max: 50 | *string* | Apellido del cliente. |
| *email <br> Min: 5 Max: 50 | *string* | Dirección de correo electrónico del cliente  |
| *address <br> Min: 5 Max: 100 | *string* | Dirección del cliente. |
| *address_city <br> Min: 2 Max: 30 | *string* | Ciudad del cliente. p. ej: Lima  |
| *country_code <br> Min: 2 Max: 2 | *string* | Código ISO‐3166‐1 Alfa 2 del país del cliente. p. ej: PE (Perú)  |
| *phone <br> Min: 5 Max: 15 | *string* | Número de teléfono del cliente.  |
| *token <br> | *objeto* | El objeto Token con el que se creó la suscripción.  |
| *plan <br>  | *objeto* | El objeto plan asociado a la suscripción.  |




---
