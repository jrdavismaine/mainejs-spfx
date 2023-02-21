# svelte-spfx

This repo provides an example of how to integrate Svelte into a Sharepoint site using SPFx.

## Install
From the mainejsspfx root, type `cd svelte-spfx` then `npm install`. All dependencies will be installed.

Note the scaffolding in this example is "no framework". No framework just creates the minimum amount of code needed to run a sharepoint app.

Then install these modules.
```
npm install svelte
npm install -D svelte-loader
npm install -D svelte-preprocess
npm install -D svelte-preprocess-sass
```

Once finished make these updates.

1. Need to add "svelte" to the tsconfig.json types array.
```
    "types": [
      "webpack-env",
      "svelte"
    ],
```

2. Need to add a file named `copy-static-assets.json` to the `config folder` with this code.
```
{
    "includeExtensions": [
        "svelte"
    ]
}
```

3. Add this command to the gulpfile.js, add above the initialize statement.
```
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
```

## Important files
1. svelte-spfx\src\webparts\svelteSpFx\SvelteSpFxWebPart.ts
The code in the `onInit` method explains to bind a Svelte component to the SharePoint page. Basically assign the object to the `BaseClientSideWebPart` `domElement` property.

2. components
Basic svelte components.

## References
- [spfx-svelte-templates](https://github.com/sp-sveltejs/spfx-svelte-templates/tree/master/svelte-webpart-online) - Main reference for setting up Svelte in SPFx. All install steps copied from this github repo.
- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
