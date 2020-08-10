const jsonataDefaultExtensions = `[{
  "name": "toUpperCase",
  "code": "(value) => value.toUpperCase();"
},
{
  "name": "toLowerCase",
  "code": "(value) => value.toLowerCase();"
}]`;

const syncRulesDefault = `{
  "firstName": $toLowerCase(_local.fields.firstName),
  "lastName": $toUpperCase(fields.lastName)
}`;

const itemADefault = `{
  "fields": {
    "firstName": "FIRSTNAME"
  }
}`;

const itemBDefault = `{
  "fields": {
    "lastName": "lastname"
  }
}`;

module.exports = {
  jsonataDefaultExtensions,
  syncRulesDefault,
  itemADefault,
  itemBDefault,
};
