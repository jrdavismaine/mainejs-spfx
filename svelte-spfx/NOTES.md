The following needs to be done to get svelte to work with SPFx.

Reference: REF: https://github.com/sp-sveltejs/spfx-svelte-templates/blob/master/svelte-webpart-online/gulpfile.js

NODE MODULES
npm install svelte
npm install -D svelte-loader
npm install -D svelte-preprocess
npm install -D svelte-preprocess-sass

CODE UPDATES
1. Need to add "svelte" to the tsconfig.json types array.
2. Need to add a file named copy-static-assets.json to the config folder with this config.
{
    "includeExtensions": [
        "svelte"
    ]
}
3. Add this command to the gulpfile.js, add above the initialize statement.
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

