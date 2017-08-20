---
layout: post
title: You are using a PWA
date: 2017-08-20
header: "&nbsp;&nbsp;&nbsp;&nbsp; Some time ago Google started talking about [progressive web apps](https://developers.google.com/web/progressive-web-apps/). The idea is simple: making regular web pages more reliable, fast and engaging, with the possibility of having them appear as an app in your homescreen. If any of this sounds attractive to you, you will be glad to hear of how simple it is to actually get it working. If it doesn't... I dont't think you got the idea just yet."
image: pwa.png
tags: [pwa,blog,ux,jekyll]
comments: true
---

## You are using a progressive web app

&nbsp;&nbsp;&nbsp;&nbsp; Some time ago Google started talking about [progressive web apps](https://developers.google.com/web/progressive-web-apps/). The idea is simple: making regular web pages more reliable, fast and engaging, with the possibility of having them appear as an app in your homescreen. In fact, if you wonder around in this domain for long enough using chrome in an Android device, you may be asked if you want to add this page to your homescreen. If you accept this suspicious offer, you will have my face and name in  your homescreen as an app with all of my content available offline.

&nbsp;&nbsp;&nbsp;&nbsp; Okay, but you don't want my page as an app in your phone, right? Of course not. But progressive web apps are not about just that. The concept encompass a range of new web APIs, patterns and benefits for developers and users. Whether it is PWA or something else, you can expect the future of web to be filled with technologies aiming to make the it better for the end user, which means more security, agility and reliability. So you probabily should give PWA a chance. It both works and feels great.

## Benefits

&nbsp;&nbsp;&nbsp;&nbsp; Although the app-like feature is not supported by all systems, the overall benefits of following PWA patterns are seen everywhere. Quoting [Alex Russel](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/), the main characteristics of progressive web apps are:

> * **Responsive**: *to fit any form factor*
> * **Connectivity independent**: *Progressively-enhanced with Service Workers to let them work offline*
> * **App-like-interactions**: *Adopt a Shell + Content application model to create appy navigations & interactions*
> * **Fresh**: *Transparently always up-to-date thanks to the Service Worker update process*
> * **Safe**: *Served via TLS (a Service Worker requirement) to prevent snooping*
> * **Discoverable**: *Are identifiable as “applications” thanks to W3C Manifests and Service Worker registration scope allowing search engines to find them*
> * **Re-engageable**: *Can access the re-engagement UIs of the OS; e.g. Push Notifications*
> * **Installable**: *to the home screen through browser-provided prompts, allowing users to “keep” apps they find most useful without the hassle of an app store*
> * **Linkable**: *meaning they’re zero-friction, zero-install, and easy to share. The social power of URLs matters.*

&nbsp;&nbsp;&nbsp;&nbsp; So... yeah. Pretty good, regardless of any app-like related functionality. And the best part is that making this work is already quite simple. I'll go ahead and explain how I did it, integrating with my already existing personal page, which uses [Jekyll](https://jekyllrb.com/) on top of [GitHub Pages](https://pages.github.com/).

## Doing it

&nbsp;&nbsp;&nbsp;&nbsp; My hole motivation for this came after reading [this blog post](https://alexjoverm.github.io/2017/08/07/How-I-made-a-Progressive-Web-App-out-of-my-Blog/) by Alex Jover while browsing [r/web_design](https://www.reddit.com/r/web_design/) and thinking that the future finally reached us. After reading about progressive web apps back in 2015 and thinking of not having to bother publishing real native apps for very simple projects, seeing this in action made me happy.

&nbsp;&nbsp;&nbsp;&nbsp; It wouldn't make much sense going trhough all the details with you here since Alex himself covered all the steps in his [entry](https://alexjoverm.github.io/2017/08/07/How-I-made-a-Progressive-Web-App-out-of-my-Blog/), so I will just add a few comments and sugest you to go through the [starting guide](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0) to make sure you are making everything right.

&nbsp;&nbsp;&nbsp;&nbsp; To kick things off, use [lighthouse](https://github.com/GoogleChrome/lighthouse) to gather insights on your page. Adding a [manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) is easy enough. The same goes for all the metadata and requiring HTTPS, which you should be doing anyway. The thing which may require an extra thought is adding the pre-cache service worker. Fortunatelly, it is also easy.

&nbsp;&nbsp;&nbsp;&nbsp; If you, same as me, is not using any framework to manage this part of the process, making sure your content is properly cached with a [service worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) is simple enough. Quickly installing [sw-precache](https://github.com/GoogleChrome/sw-precache) using `npm` and running it with your config file, you will generate a `sw-precache-config.js` file, which you will [register at the top level page of your domain](https://github.com/GoogleChrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js). Running this with Jekyll doesn't really make any difference - [this is my config file](https://github.com/pboueke/b/blob/gh-pages/sw-precache-config.js). Just remember to update your `sw-precache-config.js` file whenever content is added or updated.

## Is this the future yet?

&nbsp;&nbsp;&nbsp;&nbsp; The usability of my page improved greatly after all this. Now I have an "app", which handles great on my phone, for minimal effort. The audits made on my page all show high scores. And I have no costs. Looking back, this does look like the future I pictured a few years ago. Now I am looking forward to use this knowledge in real projects. I can already see some wanna be apps that only require minimal changes to become great progressive web apps. Awesome.
