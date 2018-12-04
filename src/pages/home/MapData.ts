import gapi from 'gapi-client';

const SPREADSHEETID = '12uplyLstGU8m5404Xj_q2RbyVBnuOcIbP1ZgZYvEA_o';
const WORKBOOKINDEX = 1;
export class MapData {
    private longlat: Array<number>;
    private name: string;
    private status: boolean;

    get locationCoordinates() {
        return this.longlat;
    }

    get locationName() {
        return this.name;
    }

    get fridgeStatus() {
        return this.status;
    }

    constructor(coords: Array<number>, name: string, status: boolean) {
        this.longlat = coords;
        this.name = name;
        this.status = status;
    }

    public static async retrieveMapData(): Promise<Array<MapData>> {
        await gapi.load('client:auth2', this.initGapi);
        await this.accessSpreadsheet();
        
        const data = await this.accessSpreadsheet();
        return data;
    }

    private static async initGapi() {
        await gapi.client.init({
            apiKey: 'AIzaSyBQnYkNcTjiWhTtB8E5MSO2LJ7z9qN9ckg',
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
            clientId: '69668555707-7o6e8bkqf0blp4140ofk790f65q9fi9f.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
        });
    }

    private static async accessSpreadsheet(): Promise<Array<MapData>> {
        await gapi.client.init({
            apiKey: 'AIzaSyBQnYkNcTjiWhTtB8E5MSO2LJ7z9qN9ckg',
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
            clientId: '69668555707-7o6e8bkqf0blp4140ofk790f65q9fi9f.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
        })
            
        const names = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEETID,
            range: 'Locations!A2:A5',
        });

        const statuses = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEETID,
            range: 'Locations!B2:B5'
        });

        const coords = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEETID,
            range: 'Locations!C2:C5'
        });

        console.log(`GOT: ${names}, ${statuses}, ${coords}`);

        let mapDatas: MapData[] = [];

        for(let i = 0; i < names.length; i++) {
            mapDatas.push(new MapData(JSON.parse(coords[i]), names[i], statuses[i]));
        }

        return mapDatas;
    }

}