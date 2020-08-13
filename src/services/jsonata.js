const jsonata = require('jsonata');
const _ = require('lodash');
const safeEval = require('safe-eval');

const ResultTypes = {
  JSONATA: 'jsonata',
  MERGE: 'merge',
  ASSIGN: 'assign',
  EXTEND: 'extend',
};

/**
 * Convert multi lines string to single line
 * @param {string} value
 * @returns {string}
 */
const _convertToSingleLine = (value) => value.replace(/\n/g, '');

/**
 * Get jsonata extensions array from string
 * @param {string} jsonataExtensionsValue
 * @returns {object}
 */
const _getJsonataExtensions = (jsonataExtensionsValue) => {
  const singleLineExtensionsValue = _convertToSingleLine(jsonataExtensionsValue);
  return JSON.parse(singleLineExtensionsValue);
};

/**
 * Get Jsonata process from Expression & Extensions values
 * @param {string} jsonataExpressionValue
 * @param {string} jsonataExtensionsValue
 * @returns {object}
 */
const _getJsonataProcess = (jsonataExpressionValue, jsonataExtensionsValue) => {
  const jsonataExtensions = _getJsonataExtensions(jsonataExtensionsValue);
  const expression = jsonata(jsonataExpressionValue);
  // eslint-disable-next-line no-restricted-syntax
  for (const extension of jsonataExtensions) {
    const singleLineCodeValue = _convertToSingleLine(extension.code);
    // eslint-disable-next-line no-eval, no-loop-func
    const extensionMethod = safeEval(singleLineCodeValue);
    expression.registerFunction(extension.name, extensionMethod);
  }
  return expression;
};

/**
 * Return Jsonata evaluation result.
 * @param {{itemB: object, itemA: object}} evaluatedObjects - two objects/items (item A & item B)
 * @param {string} jsonataExpressionValue
 * @param {string} jsonataExtensionsValue
 * @param {ResultTypes} resultType
 * @returns {string}
 */
const getJsonataResult = (
  evaluatedObjects,
  jsonataExpressionValue,
  jsonataExtensionsValue,
  resultType = ResultTypes.JSONATA,
) => {
  const jsonataExpression = _getJsonataProcess(
    jsonataExpressionValue, jsonataExtensionsValue,
  );
  const evaluatedObject = {
    ...evaluatedObjects.itemB,
    _local: {
      ...evaluatedObjects.itemA,
    },
  };
  const jsonataResult = jsonataExpression.evaluate(evaluatedObject);
  switch (resultType.value) {
    case ResultTypes.JSONATA:
      return JSON.stringify(jsonataResult, null, 1);
    case ResultTypes.ASSIGN:
      const assignResult = _.assign(evaluatedObjects.itemA, jsonataResult);
      return JSON.stringify(assignResult, null, 1);
    case ResultTypes.MERGE:
      const mergeResult = _.merge(evaluatedObjects.itemA, jsonataResult);
      return JSON.stringify(mergeResult, null, 1);
    case ResultTypes.EXTEND:
      const extendResult = _.extend(evaluatedObjects.itemA, jsonataResult);
      return JSON.stringify(extendResult, null, 1);
    default:
      return JSON.stringify(jsonataResult, null, 1);
  }
};

module.exports = {
  ResultTypes,
  getJsonataResult,
};
