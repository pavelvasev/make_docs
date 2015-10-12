# make_docs

Convert all markdown files in a directory tree

[![npm version](https://badge.fury.io/js/make_docs.svg)](https://badge.fury.io/js/make_docs)

## Install

``` bash
npm install -g make_docs
```

## Usage
``` bash
make_docs
```
The command will:

1. Find all `**/*.md` files. 
2. Process each file using `marked` module.
3. Save result to `$file.md.html`.

## Features
* Html files are placed in the same directory where the original md file is located. This allows making links from md files to other files without hassle.
* Links to markdown files are converted to the links to html files. [test link](readme.md).
* Generates Table of Contents (local).

## Internals and customization
The program code is in [make_docs.js](make_docs.js). 
The output template is in [template.html](template.html). Replaced tokens are: `$body$`, `$toc$`, `$year$`.
   
## Help
Please use Github for posting [issues and questions](https://github.com/pavelvasev/make_docs/issues).

## License
(c) 2015 Pavel Vasev (MIT license)

See LICENSE for more info.