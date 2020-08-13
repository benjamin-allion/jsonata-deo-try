const sampleCollection = [{
  name: 'Get fields from B to A',
  itemA:
`{
  "fields": {
    "firstName": "FIRSTNAME"
  }
}`,
  itemB:
`{
  "fields": {
    "lastName": "lastname"
  }
}`,
  jsonataExpression:
`{
  "firstName": $toLowerCase(_local.fields.firstName),
  "lastName": $toUpperCase(fields.lastName)
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
{
  name: 'Sample fields injection from A to B',
  itemA:
      `{
  "fields": {
    "firstName": "FIRSTNAME"
  }
}`,
  itemB:
      `{
  "fields": {
    "lastName": "lastname"
  }
}`,
  jsonataExpression:
      `{
  "firstName": $toLowerCase(_local.fields.firstName),
  "lastName": $toUpperCase(fields.lastName)
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
