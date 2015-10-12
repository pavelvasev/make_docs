# make_docs

> Generates an HTML file for every MD file found in a directory tree.

## Install

``` bash
npm install make_docs
```

## Usage
``` bash
make_docs
```
This will generate html files for all markdown files in the current working directory and it's subdirectories.

## Features
* Html files are placed in the same directory where the original md file is located. This allows making links from md files to other files without hassle.
* Links to markdown files are converted to the links to html files. [test link](readme.md).
* Generates Table of Contents (toc).

## Internals and customization
The program code is in [make_docs.js](make_docs.js). The output template is in [template.html](template.html). Feel free to customize them.

The alrogythm is:
1. Find all `**/*.md` files. 
2. Process each file using `marked` module.
3. Save result to `$file.md.html`. When saving, use `template.html` as template:
   * replace $body$ with body
   * replace $toc$ with toc.
   * replace $year$ with current year.
   
## Help
Please use Github for posting issues and questions: https://github.com/pavelvasev/make_docs/issues

## License
(c) 2015 Pavel Vasev (MIT license)

See LICENSE for more info.