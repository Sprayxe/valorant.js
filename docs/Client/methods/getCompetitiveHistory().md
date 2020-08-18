# getCompetitiveHistory()
Gets the account's competitive history, parses and returns it
</br>

### Example
```js
const comphistory = await <ValorantClient>.getCompetitiveHistory(parse: boolean);
console.log(comphistory);
```

### Parameters
* `parse` - Wether to parse or return raw response (standard: true)
* `<ValorantClient>` - A [client](https://valorant-js.stoplight.io/docs/valorant-js/docs/client/Constructor.md) instance

### Returns
* Typeof `object`
* Parsed/Not parsed history in JSON Format


