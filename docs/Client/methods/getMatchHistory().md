# getMatchHistory()
Gets the account's match history, parses and returns it
</br>

### Example
```js
const matchhistory = await <ValorantClient>.getMatchHistory(parse: boolean);
console.log(matchhistory);
```

### Parameters
* `parse` - Wether to parse or return raw response (standard: true)
* `<ValorantClient>` - A [client](https://valorant-js.stoplight.io/docs/valorant-js/docs/client/Constructor.md) instance

### Returns
* Typeof `object`
* Parsed/Not parsed history in JSON Format