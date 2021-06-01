---
layout: layouts/page.njk
title: "Resurser"
date: "2021-05-15"
tags:
    - page
---
# Resurser
Här försöker jag samla länkar till olika resurser för både er och min egen skull. 

## IDE
* Vim
* VS Code
* Visual Studio
* Eclipse
* IntelliJ

## Git
* Git
* Git Doc
* Git Interaktiv Kurs
* Git LFS
* Github

## Applikationsutveckling
* C
* C++
* C#
* Java
* Rust

## Web FrontEnd Utveckling
* [Global Stats](https://gs.statcounter.com/)

### HTML
* [HTML Elements (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

### CSS
* [Can I Use](https://caniuse.com)

### Javascript
* [Javascript (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics#what_is_javascript)

## Web BackEnd Utveckling

## PHP
*

## Node Development
* [Node.js](https://nodejs.org/en/)
* [Node Package Manager (NPM)](https://docs.npmjs.com/)
  * [NPM Commands](https://docs.npmjs.com/cli/v7/commands)
* [11ty](https://www.11ty.dev/)
  * [Liquid](https://shopify.github.io/liquid/)
  * [Nunjucks](https://mozilla.github.io/nunjucks/)
    * [Templating Dokumentation](https://mozilla.github.io/nunjucks/templating.html)
    * [API Dokumentation](https://mozilla.github.io/nunjucks/api.html)

{% for tag in collections.tagList %}
  <!--<div> {{ tag[1].name }} is repeated {{ tag[1].value }} times</div>-->
  <div> Tag "{{ tag[0] }}" is used {{ tag[1] }} times</div>
{% endfor %}

{% tagCloud %}