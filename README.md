# kuuid

[![Build Status](https://travis-ci.org/glynnbird/kuuid.svg?branch=master)](https://travis-ci.org/glynnbird/kuuid) [![npm version](https://badge.fury.io/js/kuuid.svg)](https://badge.fury.io/js/kuuid)

If you need unique identifiers in your Node.js app for use in a database such as Apache CouchDB or Cloudant, then *kuuid* can generate them. The ids it generates are:

- uniform - all ids are 32 characters long.
- unique - no two ids will be the same, or at least the likelihood of a clash is vanishingly small.
- time-sortable - the ids sort into time order, with one second precision.

If a `kuuid`-generated id were used as a database's unique identifier, it would sort roughly in time order.

## Installation

Add *kuuid* to your Node.js project with:

```sh
npm install --save kuuid
```

Import the library into your code with:

```js
let kuuid = require('kuuid')
```

## Generating an id

Simply call the `kuuid` function to get an id:

```js
let id = kuuid()
// 0001AKWJ2fG1h23DMFgI473u2G4JbUvy
```

You can use such an id as a unique identifier in your database records:

```js
let doc = {
  _id: kuuid(),
  name: 'Glynn',
  location: 'UK',
  verified: true
}
// {"_id":"0001AKY50w6w4833bGxL26pDWU4UFhTX","name":"Glynn","location":"UK","verified":true}
db.insert(doc)
```

## How does it work?

A `kuuid` string has two parts:

- 8 characters representing the number of seconds since 1st January 2018.
- 24 characters containing random data.

The front eight characters allow the string to be sorted by time. Two ids created in the same second will have the same front eight characters. The remaining 24 characters contain 128 bits of random data.

The strings are encoded in "base 62" (i.e using digits and uppercase/lowercase letters) to pack more information into a smaller space.

## Points to note

1) The `kuuid` library can only be used to store dates after `2018-01-01` as it uses that date as its "epoch".
2) The random number is genreated using Node.js's [crypto.randomBytes](https://nodejs.org/dist/latest-v8.x/docs/api/crypto.html#crypto_crypto_randombytes_size_callback) which is a secure, if slow, source of random information.
3) The character set used by the base-62 encoding algorithm differs from other algorithms I've seen to ensure that it sorts correctly in a CouchDB `_id` field.