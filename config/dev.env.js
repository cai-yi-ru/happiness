'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //單引號內要加雙引號
  APIPATH:'"https://vue-course-api.hexschool.io"',
  CUSTOMPATH:'"yirushopping"',
})
