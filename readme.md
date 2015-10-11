# make_docs

> Generates HTML file for every MD file found in directory tree.

## Install

``` bash
npm install make_docs
```

## Usage
``` bash
make_docs
```
This will generate html files for all markdown files in current working directory and subdirectories.

## Features
* Html files are placed in the same directory where original md file located. This allows making links from md files to other files without hassle.
* Links to markdown files are converted to html files. [test link](readme.md)
* Generates Table of Contents (toc).

## Internals and customization
Program code is in [make_docs.js](make_docs.js). Output template is in [template.html](template.html). Feel free to customize them.

Alrogythm is:
1. Find all `**/*.md` files. 
2. Process each file using `marked` module.
3. Save result to `$file.md.html`. When saving, use `template.html` as template:
   * replace $body to body
   * replace $toc to toc.
   
## Help
Please use Github for posting issues and questions.

## License
(c) 2015 Pavel Vasev (MIT license)

See LICENSE for more info.