# Ideas and todo

1. Allow customize template.html by user by placing it in the directory path being processed.
E.g. for every MD, lookup it's template by going up to the disk root.

2. Embed mode: place the content of linked MD files inside procesed file. Do it recursively.
Propable profit: all the docs in one html file.

# Hints

* Run as npm script: `npm run make_docs`

* Npm publishing
  * https://gist.github.com/coolaj86/1318304
  * https://docs.npmjs.com/getting-started/publishing-npm-packages
  * npm version patch