'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

// REF: https://github.com/sp-sveltejs/spfx-svelte-templates/blob/master/svelte-webpart-online/gulpfile.js
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
   
      generatedConfiguration.module.rules.push(
          {
            test: /\.(html|svelte)$/,
            exclude: /node_modules/,
            use: {
              loader: 'svelte-loader',
              options: {
                preprocess: require('svelte-preprocess')({
  
              }),
              },
            },
          },
          
          
        );
      
     
    return generatedConfiguration;
  }
});


build.initialize(require('gulp'));
