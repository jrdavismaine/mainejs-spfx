import { Version } from '@microsoft/sp-core-library';
import App from './SvelteApp.svelte';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import styles from './SvelteSpFxWebPart.module.scss';


export interface ISvelteSpFxWebPartProps {
}

export default class SvelteSpFxWebPart extends BaseClientSideWebPart<ISvelteSpFxWebPartProps> {
  private app: App;

  public render(): void {
    this.app.description = 'test'
  }

  protected async onInit(): Promise<void> {
    // Create root component the svelte way.
    this.app = new App({
      target: this.domElement,
      props: {
        description: 'Test', 
        styles: styles
      }      
    })
    return Promise.resolve();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }  
}
