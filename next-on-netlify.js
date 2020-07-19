#!/usr/bin/env node

const { logTitle } = require('./lib/logger')
const prepareFolders  = require('./lib/prepareFolders')
const copyPublicFiles = require('./lib/copyPublicFiles')
const copyNextAssets  = require('./lib/copyNextAssets')
const setupSsrPages   = require('./lib/setupSsrPages')
const setupSsgPages   = require('./lib/setupSsgPages')
const setupHtmlPages  = require('./lib/setupHtmlPages')
const setupRedirects  = require('./lib/setupRedirects')

prepareFolders()

copyPublicFiles()

copyNextAssets()

setupSsrPages()

setupSsgPages()

setupHtmlPages()

setupRedirects()

logTitle("✅ Success! All done!")
