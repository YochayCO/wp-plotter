import { QuestionItem } from "./question";

export interface SurveyMeta {
    id: string;
    demography: {
        "Age Group": string;
        "Sex": string;
        "Education": string;
        "Religiousness": string;
        "Sector": string;
    };
    weights: {
        all: {
            pre?: string;
            post?: string;
        } | string;
        jews: {
            pre: string;
            post: string;
        } | string;
        arabs: {
            pre: string;
            post: string;
        } | string;
    };
    questions: {
        [key: number | string]: QuestionItem;
    }
}

export interface SurveyDataPoint {
    [columnTitle: string]: number;
}

export type SurveyData = SurveyDataPoint[];

export type Survey = {
    data: SurveyData;
    meta: SurveyMeta;
}