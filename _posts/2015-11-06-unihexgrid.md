---
layout: post
title: Unihexgrid
date: 2015-11-06
header: "&nbsp;&nbsp;&nbsp;&nbsp;A hexagonal grid spiral/ring indexation model that stores each hexagon index in a simple array. Each index is automatically mapped to it`s position in the grid. The model consists of an abstraction that allows the use of efficient algorithms guided for this specific space orientation."
image: hexgrid.png
tags: [js,hexagons]
comments: true
---

## What is it?

See for yourself: [A* demo](https://pboueke.github.io/b/public/projects/hex/demos/AS/gridAS.html)

It's a hexagonal grid spiral/ring indexation model that stores each hexagon index in a simple array. Each index is automatically mapped to it`s position in the grid.

The model consists of an abstraction that allows the use of efficient algorithms guided for this specific space orientation.

The source code header has more information on the specifics of the grid shape and notations. I should write a better documentation... some day.

## Why?

Someone challenged me... IIRC.

It was part of a bigger project and possibly will be used as the map grid in a game.

## Is it any good?

Yes. But it <del>probably</del> may not be your best choice, it really depends on what you want. You should check the [ultimate hexagonal grids reference](http://www.redblobgames.com/grids/hexagons/) first.

Feel free to use it ([source](https://github.com/pboueke/b/blob/gh-pages/public/projects/hex/demos/AS/unihexgridAS.js)/[license](https://github.com/pboueke/b/blob/gh-pages/public/projects/hex/demos/AS/LICENSE.txt)).
