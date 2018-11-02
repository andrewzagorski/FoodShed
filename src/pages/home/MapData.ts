import GoogleSpreadsheet from 'google-spreadsheet';
const credentials = require('../../service-account.json');
const spreadsheetID = '12uplyLstGU8m5404Xj_q2RbyVBnuOcIbP1ZgZYvEA_o';

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

    public static async retrieveMapData(): Array<MapData> {

    }

    private static async accessSpreadsheet() {
        const doc = new GoogleSpreadsheet(SPREADSHEET_ID)
        await promisify(doc.useServiceAccountAuth)(creds)
        const info = await promisify(doc.getInfo)()
        console.log(`Loaded doc: ` + info.title + ` by ` + info.author.email)
        const sheet = info.worksheets[0]
        console.log(
            `sheet 1: ` + sheet.title + ` ` + sheet.rowCount + `x` + sheet.colCount
        )
    }

}