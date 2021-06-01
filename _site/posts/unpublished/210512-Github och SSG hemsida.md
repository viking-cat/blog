---
layout: layouts/post.njk
title: "Gthub och SSG hemsida"
date: "2021-05-13"
tags:
    - post
    - 2021
    - unpublished
---
Gratis smakar gott! Är man lite teknisk och vill ha en hemsida så kan man 
enkelt skapa sig SSG på Github där man enkelt delar det man finner intressant.

Github är baserat på Git, ägs idag av Microsoft och är en gratis resurs där man
kan spara kod och andra text-baserade filer i molnet. Det är inte en Goodle Drive
eller OneDrive för dina kontorsdokument, det är mer specialiserat för utvecklare 
och tycker inte om binära filer som bilder, musik eller byggda applikationer.

*SSG* står för "*Static Site Generator*" (*SE: Statisk Hemside-generator*) och 
handlar om ett verktyg som genererar din hemsida från dina konfigurationer, 
templates, bilder och text.

# Guide
Jag har inte prövat alla templateverktyg där ute och kommer aldrig hinna göra det.
Däremot så har jag hunnit uppleva Ruby, Jekyll och Liquid som Github frontar i sin
information och där sprang jag på det ena efter det andra.

Medan jag arbetade på sidan så sprang jag på 11ty som är i stort sett detsamma, en 
evolution men miljön kombinerar Node.js, 11ty och Nunjucks. Sen gör inte 11ty lika 
många antaganden som Jekyll och därför är inte SASS inkluderat, utan det är något 
som du måste installera och konfigurera på egen hand (*det är enkelt*).

## Installera Node.js

## Configurera Nunjucks

## SASS
För att få igång SASS så valde jag att följa denna video: https://egghead.io/lessons/11ty-add-sass-compiling-and-watch-for-changes-in-eleventy-11ty
1. Försäkra dig om att du är i rot mappem för ditt projekt och använd följande kommando 
(*exkludera "$" tecken*): ``` bash $ npm install sass npm-run-all ``` Detta kommer kommer 
även uppdatera din *package.json* fil.
2. Se till att informationen nedan finns i din *package.json* fil:
``` json
{
    ...
    "scripts": {
        "watch:sass": "npx sass _site/sass:dist/css --watch",
        "build:sass": "npx sass _site/sass:dist/css",
        "watch:eleventy": "npx @11ty/eleventy --serve",
        "build:eleventy": "npx @11ty/eleventy",
        "start": "npm run watch:eleventy && watch:sass",
        "build": "npm run build:eleventy && build:sass"
    }
    ...
}
```
Efter detta så kan du bygga och servera sidan genom att skriva följande saker i din terminal
``` bash
$ npm install sass npm-run-all
```

## NPM-RUN-ALL

https://stackoverflow.com/questions/30950032/how-can-i-run-multiple-npm-scripts-in-parallel

Jag sitter på Windows och det finns en stor risk att ni också gör det. För att automatiskt uppdatera 
sidan när en SASS fil ändras samtidigt som du "serverar" 11ty sidan så måste du köra två skript samtidigt.
Det finns olika sätt att lösa detta på med varierande problem men en lösning passar alla.

Vi kommer installera npm-run-all globalt och göra det tillgängligt i projektet. Se det som en förlängning
av NPM just för att köra mer än ett skript samtigt.

``` bash
# Installera i din globala Node.js installation
$ npm i -g npm-run-all

# Installera och spara i projektet där package.json existerar
$ npm i npm-run-all --save-dev

```
Sen måste vi uppdatera package.json filen med några skript som gör livet enklare
``` json
{
    ...
    "scripts": {
        "watch:sass": "npx sass _site/sass:dist/css --watch",
        "build:sass": "npx sass _site/sass:dist/css",
        "watch:eleventy": "npx @11ty/eleventy --serve",
        "build:eleventy": "npx @11ty/eleventy",
        "start": "npm run watch:eleventy && watch:sass",
        "build": "npm run build:eleventy && build:sass"
    }
    ...
}
```


## Github Actions

## Hemsidans Sökväg