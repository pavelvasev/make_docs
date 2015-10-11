// Recursive MD generator
// (c) Pavel Vasev, 2014-2015

// Uses
// * Marked for markdown to html conversion https://github.com/chjj/marked
// * and this as html template: https://github.com/tonyblundell/pandoc-bootstrap-template

var fs = require('fs');
var path = require('path');
var marked = require('marked');
//var querystring = require('querystring');

var toc, toclevel;

var renderer = new marked.Renderer();

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

// we must manually create table of contents (toc)

renderer.heading = function (text, level) {
//  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
//  var escapedText = querystring.escape(text);
// see also https://github.com/chjj/marked/pull/317/files
  var escapedText = text.replace(/[-'"@#$%^&*()!~?\/\\ ]+/g, '-');

  if (level <= 2)
  {
    while (level > toclevel) {
      toc += "<ul>";
      toclevel++;
    }
    while (level < toclevel) {
      toc += "</ul>";
      toclevel--;
    }
    toc += "<li><a href='#" + escapedText + "'>" + text + "</a></li>";
  }
  
  return '<h' + level + '><a name="' + escapedText + '" class="anchor" href="#' + escapedText +'"><span class="header-link"></span></a>' +
                  text + '</h' + level + '>';
};

// https://github.com/chjj/marked#inline-level-renderer-methods
renderer.link = function (href, title, text) {
  // if ends with .md and do not have :// part (e.g. do not points to external md file)
  // -> fix the link
  // Special case 1: if link have #Anchor, it is OK and we have to save the #Anchor in link to html
  if (/\.md\s*(#.+)*$/.test(href) && !/:\/\//.test(href)) href = href.replace(/\.md\s*/,".md.html");
  
  return marked.Renderer.prototype.link.call(this,href,title,text );
};

/*
Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};
*/

var templ = 0;
function make( filepath )
{
  console.log( "making file "+filepath );
  // reset toc data
  toc = "";
  toclevel = 0;

  if (templ == 0)
    templ = fs.readFileSync( __dirname+"/template.html","utf-8" );
    
  var markdownString = "\n\n" + fs.readFileSync( filepath,"utf-8" );
  
  var body = marked( markdownString );

/*
  console.log("===");
  console.log(markdownString)
  console.log("===>>>>");  
  console.log(body);
  */
  
  bn = path.basename( filepath );
  body += "<div style='float:right;'><small><a href='"+bn+"'>"+bn+"</a></small></div>";
  
  var html = templ.replace( /\$body\$/,body ).replace( /\$toc\$/,toc ).replace( /<!--[\s\S]*?-->/g,"").replace( /&lt;!--[\s\S]*?--&gt;/g,"");
  
  fs.writeFileSync( filepath+".html", html );
};

// http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
var walk = function(dir) {
    console.log("inspecting dir ",dir );
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) 
        {
          if (!/node_modules|poco-dev|boost|IronRuby/.test(file) && !/publish$/.test(file)) results = results.concat(walk(file));
        }
        else 
        {
          if (/\.md$/.test(file)) {
            results.push(file);
            make(file);
          }
        }
    })
    return results;
};

walk( process.cwd() );