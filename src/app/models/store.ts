export class Store {
    _id: string;
      name: string;
      source: string;
      accessToken?: string;
    constructor(_id?: string, name?: string, source?: string, accessToken?: string) {
            this._id = '';
            this.name = '';
            this.source = '';
            this.accessToken = '';
    }
}