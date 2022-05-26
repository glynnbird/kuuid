# kuuid

[![npm version](https://badge.fury.io/js/kuuid.svg)](https://badge.fury.io/js/kuuid)

If you need unique identifiers in your Node.js app for use in a database such as Apache CouchDB or Cloudant, then *kuuid* can generate them. The ids it generates are:

- uniform - all ids are 32 characters long.
- unique - no two ids will be the same, or at least the likelihood of a clash is vanishingly small.
- time-sortable - the ids sort into time order, with one second precision.

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

Supplying no parameter to `kuuid.id()` uses the current time to generate the timestamp part of the id. You may also supply your own date/time:

```js
// 'now'
kuuid.id()

// ISO String 
kuuid.id('2018-07-20T10:10:34.234Z')

// millseconds since 1970
kuuid.id(1514764800000)
```

## Reverse mode

If you want your data to sort into "newest first" order, then `kuuid.idr()` returns an id that sorts in the opposite order:

```js
// 'now'
kuuid.idr()
// zzyIy6DZ2SKTqh2WpV6D0DTbkK0kbn5u

// Epoch
kuuid.idr('1970-01-01T00:00:00Z')
// zzzzzzzz2v3VKT4Sl9yV2f6v673SDt5v
```

## Millisecond mode

If you want your ids to have millsecond prevision then use `idms()`:

```js
// 'now'
kuuid.idms()
// 0T6vppV82RX4Nx1ZzGqB0Exjjs4fkuhh
```

```js
// 'now' reverse
kuuid.idmsr()
// zWt4A9Wz3TxK0h4MRkec06xADk3kIemn
```

## Short ids

If you want your ids shorter (timestamp + 64 bits of random data ), then use `ids()` & `idsr()` for forward and reverse, respectively:

```js
// forward
kuuid.ids()
// 0S9QEzP23Wyk3p4IfNi6

// reverse
kuuid.idsr()
// zzyFmalU06RfUZ3zMoay
```

## Generating a prefix

If you only need the time-based prefix, you can call `kuuid.prefix()`:

```js
// 'now'
kuuid.prefix()

// ISO String 
kuuid.prefix('2018-07-20T10:10:34.234Z')

// millseconds since 1970
kuuid.prefix(1514764800000)
```

or for a reverse-mode prefix:

```js
kuuid.prefixReverse()
```

or for a millisecond-precision version:

```js
kuuid.prefixms()
```

or for a millisecond-precision reversed version:

```js
kuuid.prefixReverseMs()
```

## How does it work?

A `kuuid.id()` string has two parts:

- 8 characters representing the number of seconds since 1st January 1970.
- 24 characters containing random data.

The front eight characters allow the string to be sorted by time. Two ids created in the same second will have the same front eight characters. The remaining 24 characters contain 128 bits of random data.

The strings are encoded in "base 62" (i.e using digits and uppercase/lowercase letters) to pack more information into a smaller space.

## Points to note

1) The `kuuid` library can only be used to store dates after the epoch on `1970-01-01`.
2) The random number is genreated using Node.js's [crypto.randomBytes](https://nodejs.org/dist/latest-v8.x/docs/api/crypto.html#crypto_crypto_randombytes_size_callback) which is a secure, if slow, source of random information.
3) The character set used by the base-62 encoding algorithm differs from other algorithms I've seen to ensure that it sorts correctly in a CouchDB `_id` field.

## Further reading

- [A Brief History of the UUID](https://segment.com/blog/a-brief-history-of-the-uuid/)
