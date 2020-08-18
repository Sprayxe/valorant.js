# refreshAccount()
Gets account data and sets it into a [property](https://valorant-js.stoplight.io/docs/valorant-js/docs/client/properties/account.md)\
Tip: [login()](https://valorant-js.stoplight.io/docs/valorant-js/docs/client/methods/login().md) automatically does that
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