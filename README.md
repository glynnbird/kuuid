# kuuid

[![npm version](https://badge.fury.io/js/kuuid.svg)](https://badge.fury.io/js/kuuid)

If you need unique identifiers in your Node.js app for use in a database such as Apache CouchDB or Cloudant, then *kuuid* can generate them. The ids it generates are:

- uniform - all ids are 32 characters long.
- unique - no two ids will be the same, or at least the likelihood of a clash is vanishingly small.
- time-sortable - the ids sort into time order (or reverse time order), with one second (or millisecond) precision.

If a `kuuid`-generated id were used as a database's unique identifier, it would sort roughly in time order (`kuuid.id()`), or reverse time order (`kuuid.idr()`)

## Installation

Add *kuuid* to your Node.js project with:

```sh
npm install --save kuuid
```

Import the library into your code with:

```js
const kuuid = require('kuuid')
```

## Generating an id

Simply call the `kuuid.id()` function to get an id:

```js
let id = kuuid.id()
// 001fgS7k4gJxqY1aXpni3gHuOy0WusLe
```

You can use such an id as a unique identifier in your database records:

```js
let doc = {
  _id: kuuid.id(),
  name: 'Glynn',
  location: 'UK',
  verified: true
}
// {"_id":"001fgS954GN35e4NJPyK1W9aiE44m2xD","name":"Glynn","location":"UK","verified":true}
db.insert(doc)
```

## Parameters

By default, the `id()` function returns an id made up of a timestamp derived from "now" to second precision, 128 bits of data and it will sort in oldest-first order. This can be configured by overriding these defaults:

```js
const id = kuuid.id({
  timestamp: '2000-01-01T10:24:22.000Z', // use a known timestamp
  random: 1, // use less random data
  reverse: true, // sort in newest first order
  millisecond: true // the timestamp should be to millisecond precision
})
```

- `timestamp` - an ISO string representing the date/time required or an integer representing the number of milliseconds since 1970. Default "now"
- `random` - the quantity of random data. Between 1 and 4. Default `4`.
- `reverse` - if true, the id will sort in newest-first order. Default `false`.
- `millisecond` - if true, the id's time component will be stored with milliecond precision. Default `false`.

For backwards compatibility, the `id()` function will also accept a string or number parameter representing the timestamp.

```js
// 'now'
kuuid.id()

// ISO String 
kuuid.id('2018-07-20T10:10:34.234Z')

// millseconds since 1970
kuuid.id(1514764800000)
```

## Shortcut functions

- `idr()` - returns an id that sorts in newest-first order.
- `idms()` - returns an id with millisecond precision.
- `ids()` - returns a shorter id (64-bits of random data).
- `idsr()` - returns a short it in newest-first order.
- `prefix()` - returns only the time prefix.
- `prefixReverse()` - returns only the time prefix (reverse order).
- `prefixms()` - returns only the time prefix with ms precision.
- `prefixReverseMs()` - returns only the time prefix with ms precision. (reverse order).
- `rand()` - returns the random portion of the id.

## How does it work?

A `kuuid.id()` string has two parts:

- 8 characters representing the number of seconds since 1st January 1970.
- 24 characters containing random data (for the default 128-bits)

The front eight characters allow the string to be sorted by time. Two ids created in the same second will have the same front eight characters. The remaining 24 characters contain 128 bits of random data.

The strings are encoded in "base 62" (i.e using digits and uppercase/lowercase letters) to pack more information into a smaller space.

## Points to note

1) The `kuuid` library can only be used to store dates after the epoch on `1970-01-01`.
2) The random number is genreated using Node.js's [crypto.randomBytes](https://nodejs.org/dist/latest-v8.x/docs/api/crypto.html#crypto_crypto_randombytes_size_callback) which is a secure, if slow, source of random information.
3) The character set used by the base-62 encoding algorithm differs from other algorithms I've seen to ensure that it sorts correctly in a CouchDB `_id` field.

## Further reading

- [A Brief History of the UUID](https://segment.com/blog/a-brief-history-of-the-uuid/)
