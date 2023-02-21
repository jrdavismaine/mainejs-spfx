import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import 'jquery';
import 'datatables.net';

export interface IDatatablesJQuerySpFxWebPartProps {
}

export default class DatatablesJQuerySpFxWebPart extends BaseClientSideWebPart<IDatatablesJQuerySpFxWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">
    <div>
      <table id="data">
          <thead>
              <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Cast</th>
                  <th>Genres</th>
              </tr>
          </thead>
      </table>
    </div>`;
    require('./movies.js');
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
