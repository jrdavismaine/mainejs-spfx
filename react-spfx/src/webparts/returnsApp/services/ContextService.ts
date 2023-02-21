import { WebPartContext } from '@microsoft/sp-webpart-base';

// REF: https://laurakokkarinen.com/how-to-use-the-service-locator-pattern-in-spfx-react-solutions/
export default class ContextService {
    private static context: WebPartContext;

    public static init(context: WebPartContext) {
        this.context = context;
    }

    public static getContext(): WebPartContext {
        return this.context;
    }
}
