const sampleCollection = [{
  name: 'Get fields from B to A',
  itemA:
`{
  "fields": {
    "firstName": "John",
    "birthDate": "1886-10-04"
  }
}`,
  itemB:
`{
  "fields": {
    "lastName": "Jax"
  }
}`,
  jsonataExpression:
`{
  "fields": {
    "firstName": $toLowerCase(_local.fields.firstName),
    "lastName": $toUpperCase(fields.lastName)
  }
}`,
  jsonataExtensions:
`[{
  "name": "toUpperCase",
  "code": "(value) => value.toUpperCase();"
},
{
  "name": "toLowerCase",
  "code": "(value) => value.toLowerCase();"
}]`,
},
];

module.exports = sampleCollection;
