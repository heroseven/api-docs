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


Finally, so that you can start experimenting with our API, all accounts registered in [Culqi] () have keys in ** test mode ** ([Register] (https://integ-panel.culqi.com/# / Register) and get your API Key) and in production mode. Using the ** test keys ** transactions never go through the banking networks and have no cost. (Remember to use [test cards] (https://developers.culqi.com/tests/#cards), not actual cards when testing!).


<p class="tip">
¡Happy coding!
</p>



### Testing the beta 
The current version of the API is found as a trial version. If you want to be a part and help us to improve, please follow the next steps.

1. Enter the Culqi Integration panel.
2. Go to the Developers -> API Keys section.
3. Find the button "Update API v2" and click. Once you have confirmed the update. You will get new keys and trade code. :)


<img src="https://cdn-images-1.medium.com/max/800/1*IoSK0H5wgk7ZrwCW6Nv2lA.gif" alt="preview" width="500">



### Authentication 
In order to access and use the Culqi API you need to know and have your API Keys (authentication keys) previously. Under HTTP authentication, on each request. 

The keys can be obtained in Development> API Keys of your [Culqi panel] (http://integ-panel.culqi.com). 
All requests to the API must be dates under HTTPS, calls made under flat HTTP will fail (in production) and requests without authentication will also fail.


***Código de Comercio (llave pública)*** <br>

```md
Authorization: Code <<CodigoComercio>>  
```

Example: `pk_test_J0BnI4vcidMGdxxx`

***API Key (llave privada)*** <br>   

```md
Authorization: Bearer <<ApiKey>>  
```
Example: `sk_test_ujVxc7JMCr0ivxxx`

###Errors 

Through our API, you can be notified with all the information in case of any error when creating any call to our service. 

The Culqi API uses the standard ** HTTP status codes ** (http://www.ietf.org/assignments/http-status-codes/http-status-codes.xml) 

In all their responses to indicate whether the applications could be processed successfully or failed. Example of Error Response (JSON):


```json
{
    "object": "error",
    "type": "{TIPO DE ERROR}",
    "code" : "{CODIGO DE ERROR CULQI}",
    "message": "{Descripción del error}",
    "user_message": "{Descripción del error para el usuario/cliente}"    
}
```

- `type` *(string)*:  It refers to the type of error obtained.<br>
- `code` *(string)* opcional: Refers to the error code defined in Culqi.<br>
- `message` *(string)*: Internal usage message so you can know the detail of the error.<br>
- `user_message` *(string)*: Message that you must show the user.<br>


<hr>

#### Types of errors

`type` depends on HTTP Status.


| type  (string)       |               |
|:------------- |:--------------|
| **error_peticion**| HTTP 400 - An error occurred when the call has an invalid syntax. |
| **error_autenticacion**   | HTTP 401 Error - The request could not be processed due to issues with the API key|
| **error_tarjeta**       | HTTP 402 - Could not charge or charge a card.|
| **error_recurso** | HTTP 404 Error - The resource can not be found, is invalid or has a different state to that allowed. |
| **error_parametro** | HTTP 422 - This error occurs when any parameter of any request is invalid. |
| **error_api_limite** | HTTP 429- You are making many requests quickly to the API. |
| **error_api** | HTTP 500 y 503 Errors - It encompasses any other type of error (eg, temporary problem with Culqi servers) and should occur very rarely. |


<hr>

#### Error codes 

Error codes (`code_error`) are detailed specifications of the errors, in these tables you will locate the error codes for each resource.

- Authentication


| codigo_error (string)       |               |
|:------------- |:--------------|
| **auth_error_header** | The authentication header is not present. You must authenticate using your Trade Code (public key) or API Key (secret key) as Bearer Token. |
| **auth_api_key** | The API Key used is invalid. |
| **auth_cod_comercio** | The Used Trade Code is invalid. |
| **auth_deshabilitado** | Authentication failed. Your trade is disabled. |


- Tokens

| codigo_error (string)       |               |
|:------------- |:--------------|
| **token_invalido**| Invalid token or expired token. |
| **token_corrupto**| Token with corrupted data, some parameter invalid. Try to create a new one. |
| **a_invalido**   | The card's expiration year is invalid.|
| **m_invalido**   | The card's expiration month is invalid.|
| **cvv_invalido**       | The security code (CVV) of the card is invalid.|

- Charges

| codigo_error (string)       |               |
|:------------- |:--------------|
| **operacion_denegada** | The transaction has been denied by the bank that issued the card. |
| **fondos_insuficientes** | The card does not have sufficient funds to perform the charge.|
| **tarjeta_perdida** | The card has been reported as lost. |
| **tarjeta_robada** | The card has been reported stolen. |
| **tarjeta_vencida** | The card has expired. |


- Plans

| codigo_error (string)       |               |
|:------------- |:--------------|
| **plan_hecho**| This plan has already been created previously. |

- Suscriptions

| codigo_error (string)       |               |
|:------------- |:--------------|
| **plan_invalido**| The plan does not exist. Try to create a new one |
| **suscripcion_invalida**| The subscription does not exist or has a different status to that required to perform the operation. |

- Refunds

| codigo_error (string)       |               |
|:------------- |:--------------|
| **devolucion_inexistente** | The charge does not exist. |
| **devolucion_hecha** | The charge has already been returned previously. |
| **devolucion_cargo** | The charge can not be refunded. |
| **devolucion_monto_mayor** | The amount indicated to return can not be greater than the amount of the charge. |
| **devolucion_monto_invalido** | The amount indicated is invalid. |
| **devolucion_tiempo** | The time limit for returning the charge was exceeded. |
| **devolucion_imposible** |Unable to return this transaction. Please contact soporte@culqi.com for assistance. |
| **devolucion_rechazada** | The repayment was rejected by the payment processor.  |




#### HTTP status codes

Culqi uses the following HTTP status codes in their responses.

| HTTP Status      |               |
|------------- |--------------|
| **200 - OK**|  Everything has come to perfection.  |
| **201 - Created**|  A new resource has been created. (POST)|
| **204 - No Content**|  The resource was successfully removed. (DELETE) |
| **400 - Bad Request**|  Everything has come to perfection. |
| **401 - Unauthorized**| The Key API used is invalid. |
| **402 - Payment Required**| Payment could not be processed. |
| **404 - Not Found**|  The resource requested in the call does not exist. |
| **422 - Unprocessable Entity**|  The call syntax is valid but the information inside the parameters is invalid. |
| **500 y 503 - Server Errors**| Failed on Culqi servers and the request could not be processed. |




### Tracking ID

Each request API is associated with a request identifier (request). You can find this value in the response headers, under the name of ** `x-culqi-tracking-id` **. This crawl ID can also be found in the Culqi panel, in Development> API Log, and in the detail of each request. ** If you need to contact us to help you with any specific request, providing this tracking ID will make it easier to locate and then resolve the problem or incident. **


Response headers example:
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

### Versions

| Versión API    | Fecha  | Docs |
| :------------- |:-------------:| ------------:|
| v1.0      | 23-07-2015 | *Descontinuada*  |
| v1.2      | 23-08-2016   |  [API 1.2](https://culqi.api-docs.io/v1.2)  |
| **v2.0-beta (latest)** | 23-12-2016 | [API 2.0]() |

---


## Tokens

Tokens can be defined as a way to provide security to the information of your customers, to collect it safely is a complete ret without storing sentimental information on your servers. Therefore, Culqi offers easy integration with Culqi.JS in the browser, but you can use the same technique in other environments with the API in Tokens. 

Always keeping safety in mind. * tokens * must be created with your ** Business Code **, this key must be embedded in your code, surely on your website or downloadable applications such as iPhone and Android. Once created, you can use the * token * for most of our available API resources, such as creating ** charges ** and ** subscriptions **.




| Endpoints     | Functionality |
| :-------------| -----------:|
| `POST` /tokens/ | Crear un token |


### Crear un token

**POST** https://api.culqi.com/api/v2/tokens <br>
Autenticación: <a href="#" jump-to-id="autenticación">`Cod. Comercio`</a>

Creates an operation token, with a temporary duration. The token is then required to create a ** Cargo ** or a ** Subscription **. 
This token represents a credit or debit card. 

**Request**

Headers:

```md
Content‐Type: application/json
Authorization: Code <<CodigoComercio>>  
```

Body of *request*:

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

| Field   | Datatype  | Description |
| :------- |:-------------:| :------------|
| *first_name <br> Min: 2 Max: 50 | *string* | Cardholder Names. **Example**: `Richard`  |
| *last_name <br> Min: 2 Max: 50 | *string* | Cardholder surnames. **Example**: `Hendricks` |
| *email <br> Min: 5 Max: 50 | *string* |  Client email address. **Example**: `richard@piedpiper.com`  |
| *currency_code <br> Min: 3 Max: 3 | *string* | Three-letter currency code (Formato ISO 4217).   **Example**: `PEN` |
| *card_number <br> Min: Max: | *integer* | Card number. **Ejemplo**: `4444333322221111` |
| *cvv <br> Min: Max: | *integer* | CVV of the card. **Ejemplo**: `123` |
| *expiration_month <br> Min: Max: | *integer* |  Card expiration month. **Ejemplo**: `09` |
| *expiration_year <br> Min: Max: | *integer* | Card expiration year. **Ejemplo**: `2020` |

** Response ** 

Body Response:

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

| Field   | Datatype  | Description |
| :------- |:-------------:| :------------|
| id <br> Min: Max: | *integer* | Token identifier, this you will use later in the creation of Cargo or Suscription. |
| card_number <br> Min: 3 Max: 3 | *integer* | Number of the card (masked). |
| cardholder | *objeto* | Object with cardholder information. |
| brand_name <br> Min: 5 Max: 50 | *string* |  Mark the card. Example: VISA, MasterCard.|
| bank_name <br> Min: 2 Max: 50 | *string* | Name of the bank |
| bank_country <br> Min: 2 Max: 50 | *string* | Bank country.  |



---


##Charges

To make a charge with a credit or debit card, you must create a charge object for the card. In case of using the key in test mode, the card will not be charged but everything else will be simulated as if it were a real charge so that you can carry out the necessary tests. When using the key in production mode (only if your account is activated), you can charge the card. 320 To perform a card charge, you must first tokenize the card data.


| Endpoints     | Funcionality |
| :-------------| -----------:|
| `POST` /charges/ | Create a Charge |


### reate a Charge

<p class="tip">
** New **: Now in the creation of a charge you can make use of ** coutas **, within the request it is found as the "installments" field.
</p>


**POST** https://api.culqi.com/api/v2/charges <br>
Autenticación: <a href="#" jump-to-id="autenticación">`API Key`</a>

Create a charge to the customer using this method. Previously you must have generated a token on the card.

**Request**

Headers:

```md
Content‐Type: application/json
Authorization: Bearer <<Apikey>>  
```

Body of *request*:

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

| Field   | Datatype  | Description |
| :------- |:-------------:| :------------|
| *token <br> Min: 32 Max: 32 | *string* | Previously created card token.  |
| *order_id <br> Min: 5 Max: 80 | *string* | Identifier of the order or order, must be unique per charge. **Example**: `P000007`  |
| *first_name <br> Min: 2 Max: 50 | *string* | Customer names. **Example**: `Richard`  |
| *last_name <br> Min: 2 Max: 50 | *string* | Surname of the client. **Example**: `Hendricks` |
| *email <br> Min: 5 Max: 50 | *string* | Customer names. **Example**: `richard@piedpiper.com` |
| *address <br> Min: 5 Max: 100 | *string* | Customer's city. **Example**: `Av. Brasil 123` |
| *address_city <br> Min: 2 Max: 30 | *string* | Customer's city. **Example**: `Lima` |
| *phone_number <br> Min: 5 Max: 15 | *integer* | Customer's telephone number. **Example**: `34343443434` |
| *country_code <br> Min: 2 Max: 2 | *string* | Code ISO-3166-1 Alpha 2 of the customer's country. **Example**: `PE`, `US`  |
| *currency_code <br> Min: 3 Max: 3 | *string* | Three-letter currency code (ISO 4217 format).   **Example**: `PEN` |
| *amount <br> Min: 3 Max: 8 | *integer* | Amount of the sale or charge. No decimal point. **Example**: `19900`  (199.00 soles) |
| *installments <br> Min: 1 Max: 2 | *integer* | (opcional) Installments, with a maximum value of 36 ** Example **: `2` |
| *description <br> Min: 5 Max: 80 | *string* | Description of the sale. **Example**:: `Zapatillas Snoke Rojas` |
| cvv <br> Min: 3 Max: 4 | *string* | (opcional) CVV of the card. **Example**: `123` |


** Response ** 

Response Body:

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
## Plans 

Plans allow your business to handle subscriptions (recurring payments). By creating one, your 446 users can subscribe to it and be subject to recurring charges / charges. As do many business models today (Spotify, Netflix, etc). For example: Create a premium plan (monthly or annual) to offer your special content on your site.

| Endpoints     | Funcionality |
| :-------------| -----------:|
| `POST` /plans/ | Create plan |


### Create a plan

**POST** https://api.culqi.com/api/v2/plans <br>
Authentication: <a href="#" jump-to-id="autenticación">`API Key`</a>

A plan is created by a POST request.

**Request**

Headers:

```md
Content‐Type: application/json
Authorization: Bearer <<Apikey>>  
```

Body of *request*:

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
** Note: ** The example above would create a plan that would charge each month ** 45 Suns **, and with ** 5 days ** of trial (no charge).
</p>


| Field   | Datatype  | Description |
| :------- |:-------------:| :------------|
| *alias <br> Min: 5 Max: 80 | *string* | ID assigned to the plan to be created. **Example**: `plan-premium`, `PLAN002` |
| *name <br> Min: 2 Max: 50 | *string* | Name of your plan. **Example**: `Plan Premium` |
| *amount <br> Min: 3 Max: 8 | *integer* | Amount of the plan to be recalculated. No decimal point. **Example**: `5000` |
| *currency_code <br> Min: 3 Max: 3 | *string* | Three-letter currency code (ISO 4217 format). **Example**: `PEN` o `USD` |
| *interval <br> Min: 3 Max: 5 | *string* | The available values are day, week, month and year. **Example**: `month` |
| *interval_count <br> Min: 1 Max: 3 | *integer* | Amount of each how much the charges must be executed. **Example**: `1` |
| *trial_days <br> Min: 1 Max: 3 | *integer* | Number of days of the trial period (no cost). **Example**: `5` |
| *limit <br> Min: 1 Max: 3 | *integer* | (opcional) Limit of charges to be made. If not defined, it is automatically 0 (no limit). **Example*: `12` (Charge 12 times) |

**Response**

Body of the response:

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

| Field   | Datatype  | Description |
| :------- |:-------------:| :------------|
| *id<br> Min: 2 Max: 50 | *string* | Identifier of the plan, it is generated automatically.  |
| *creation_date<br> Min: 2 Max: 50 | *integer* | Date created in UNIX Timestamp format. |
| *alias<br> Min: 2 Max: 50 | *string* | ID assigned to the created plan. |
| *name <br> Min: 2 Max: 50 | *string* | Name of your plan.  |
| *amount <br> Min: 3 Max: 8 | *integer* | Amount of the plan to be recalculated. No decimal point. |
| *currency_code <br> Min: 3 Max: 3 | *string* | Three-letter currency code (ISO 4217 format).  |
| *interval <br> Min: 3 Max: 5 | *string* | The available values are day, week, month and year. **Example**: `month` |
| *interval_count <br> Min: 1 Max: 3 | *integer* | Amount of each how much the charges must be executed. **Example**: `1` |
| *limit <br> Min: 1 Max: 3 | *integer* | Limit of charges to be made. |
| *trial_days <br> Min: 1 Max: 3 | *integer* | Number of days of trial period.|


---

## Subscriptions 

Subscriptions allow you to charge customers on a recurring basis. This subscription is based on a plan and a token. The plan defines how the charges will be made and the token identifies the card to which the charges will be made. 537 538 539 

### Create a Subscription

**POST** https://api.culqi.com/api/v2/suscriptions <br>
Authentication: `Bearer`

Create a new subscription.

<p class="warning">
** Note: ** To create a customer subscription, you must first have <a href="#" jump-to-id="planes">plans</a> created.
</p>
**Request**

Headers:

```md
Content‐Type: application/json
Authorization: Bearer <<Bearer>>  
```

Body of *request*:

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

| Field   | Datatype  | Description |
| :------- |:-------------:| :------------|
| *plan_alias <br> Min: 5 Max: 80 | *string* | Alias of the plan to be assigned to the subscription. P. Eg PLAN002.   |
| *token_id <br> Min: 32 Max: 32 | *string* | The Card Token ID created earlier.   |
| *first_name <br> Min: 2 Max: 50 | *string* | Customer name.   |
| *last_name <br> Min: 2 Max: 50 | *string* | Customer last name   |
| *email <br> Min: 5 Max: 50 | *string* | Customer email. |
| *address <br> Min: 5 Max: 100 | *string* | Customer address.   |
| *address_city <br> Min: 2 Max: 30 | *string* | Customer's city. P. Ex: Lima.   |
| *country_code <br> Min: 2 Max: 2 | *string* | Code ISO-3166-1 Alpha 2 of the customer's country. P. Eg PE (Peru)  |
| *phone_number <br> Min: 5 Max: 15 | *integer* | Customer's telephone number   |


**Response**

Body of the response:


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


| Field   | Datatype  | Description |
| :------- |:-------------:| :------------|
| *object <br> Min: 2 Max: 10 | *string* | The name of the returned object, in this case "subscription"  |
| *id <br> Min: 2 Max: 50 | *string* | The subscription ID.  |
| *creation_date <br> Min: 2 Max: 50 | *string* | The date of creation of the subscription in formatio UNIX Timestamp.  |
| *next_billing_date <br> Min: 2 Max: 50 | *string* | The date of the next charge in UNIX Timestamp format.  |
| *first_name <br> Min: 2 Max: 50 | *string* | Customer names. |
| *last_name <br> Min: 2 Max: 50 | *string* | Client's last name. |
| *email <br> Min: 5 Max: 50 | *string* | Customer email address.  |
| *address <br> Min: 5 Max: 100 | *string* | Customer address. |
| *address_city <br> Min: 2 Max: 30 | *string* | Customer's city. P. Ex: Lima  |
| *country_code <br> Min: 2 Max: 2 | *string* | Code ISO-3166-1 Alpha 2 of the customer's country. P. Eg PE (Peru)  |
| *phone <br> Min: 5 Max: 15 | *string* | Customer's telephone number.  |
| *token <br> | *objeto* | The Token object with which the subscription was created.  |
| *plan <br>  | *objeto* | The plan object associated with the subscription.  |




---
