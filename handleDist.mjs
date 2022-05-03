#!/usr/bin/env zx
import readdirp from 'readdirp'

for await (const entry of readdirp('./dist/src', {
  fileFilter: '*.html',
})) {
  const { fullPath } = entry
  await $`mv ${fullPath} ./dist/`
}

await $`rm -rf ./dist/src`

