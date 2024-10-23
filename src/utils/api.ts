import Papa from 'papaparse';
import SURVEY_META_JSON from '../assets/2022_meta.json'
import { Survey, SurveyData, SurveyMeta } from '../types/survey';

type CSVData = any[];
type JSONData = Record<string, any>;

async function fetchCSV(url: string): Promise<CSVData> {
    return new Promise((resolve, reject) => {
        Papa.parse(url, {
            download: true,
            header: true,
            complete: (result) => resolve(result.data),
            error: (error) => reject(error),
        });
    });
}

// TODO: really fetch when I know the data format
async function fetchJSON(url: string): Promise<JSONData> {
    return Promise.resolve(SURVEY_META_JSON);
    // const response = await fetch(url);
    // if (!response.ok) {
    //     throw new Error(`Failed to fetch JSON from ${url}`);
    // }
    // return response.json();
}

export async function fetchSurveyData(surveyId: string): Promise<Survey> {
    if (!surveyId) return Promise.reject('Invalid surveyId');

    const dataUrl = `/wp-content/uploads/2024/10/${surveyId}_STATA.csv`
    const metaUrl = 'stub' // TODO: really fetch

    try {
        // Fetch CSV and JSON in parallel
        const [dataRes, metaRes] = await Promise.all([
            fetchCSV(dataUrl),
            fetchJSON(metaUrl)
        ]);

        const data = dataRes as SurveyData;
        const meta = metaRes as SurveyMeta;
        return Promise.resolve({ data, meta })
    } catch (error) {
        console.error("Error fetching data:", error);
        return Promise.reject(error);
    }
}