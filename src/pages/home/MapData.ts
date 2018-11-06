import GoogleSpreadsheet from 'google-spreadsheet';
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
        return null;
    }

    private static async accessSpreadsheet() {
        const doc = new GoogleSpreadsheet(SPREADSHEETID);

        // get the column containing location names
        // returns an array of cell data
        const locNames = await doc.getCells(WORKBOOKINDEX, {
           // min-row: 1,
            
        });

        const statuses = await doc.
    }

}