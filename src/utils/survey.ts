import { ParseError } from 'papaparse';

export function cleanSurvey (data: unknown[], errors: ParseError[]) {
    let invalidRows: number[] = [];
    errors.forEach(e => {
        if (e.code === 'TooFewFields' && e.row) {
            invalidRows.unshift(e.row);
        }
    })
    invalidRows.forEach(row => {
        delete data[row]
    })

    return data;
}