# getStorefront()
Gets the account's store, parses and returns it
</br>

### Example
```js
const store = await <ValorantClient>.getStorefront(parse: boolean);
console.log(store);
```

### Parameters
* `parse` - Wether to parse or return raw response (standard: true)
* `<ValorantClient>` - A [client](https://valorant-js.stoplight.io/docs/valorant-js/docs/client/Constructor.md) instance

### Returns
* Typeof `object`
* Parsed/Not parsed store in JSON Format


