# OSGEO Slovenija Webpage

This is a simple webpage for OSGEO Slovenija. It is built with Vue.js and uses Vuetify for styling. 
The webpage is hosted on GitHub pages.

## Deployment

For deployment we use GitHub pages. The deployment is done manually by running the following commands:

### Compiles and minifies for production and deploys to GitHub pages
```
npm run build
gh-pages -d dist
```

If you do not have `gh-pages` installed, you can install it with the following command: `npm install -g gh-pages`
We have custom domain [osgeo.si](https://osgeo.si) configured in the GitHub repository settings. __Important__: CNAME file in the root of the repository must contain the domain name and be copied to ./dist folder.


## Local development

### Project setup

```
git@github.com:OSGeo-si/landing-page.git
cd landing-page
npm install
```

### Compiles and hot-reloads for development
To build a local development server run and follow the instructions in termianl:
```
npm run serve
```

### Lints and fixes files
We like to have clean code, so please run the following command before pushing your changes:
```
npm run lint
```


### TODO

* [x] Style, flex, Center the content
* [x] Fill content V1 
* [x] Add dynamic events loader and event component
* [x] Add background contour
* [x] Add icons for GitHub, Discord, Email, LinkedIn
* [x] Have "public" version until GeoDev
* [x] Filter events by type (GeoDev, OSGeo Konf, etc)
* [x] Check responsive design 
* [x] Configure domains
* [x] Add script that will auto generate the events json (Add option to pull event events from github GeoDev Repo and OSGeo Konf repo)
* [ ] Add events page for individual event
* [ ] Order and filter events by date
* [ ] Add translations to english
* [ ] Add other relevant pages