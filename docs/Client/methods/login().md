# login()
Logins into the provided account credentials (Must be done before using any methods).\
Also gets authorization headers and sets it into a [property](https://valorant-js.stoplight.io/docs/valorant-js/docs/client/properties/Authorization.md)
</br>

### Example
```js
const account = await <ValorantClient>.login();
console.log(account);
```

### Parameters
* `<ValorantClient>` - A [client](https://valorant-js.stoplight.io/docs/valorant-js/docs/client/Constructor.md) instance

### Returns
* Typeof `object`
* Account data in JSON Format