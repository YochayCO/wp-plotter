import { SurveyRows, SurveyMeta, SurveyOption } from "./survey";

// Global state
export type ServerState = {
	state: {
		urlBase: string;
        surveyOptions: SurveyOption[];
	};
};

// Local state
export type Context = {
	xValue: string;
	yValue: string;
    surveyId: string;
    survey?: {
        data: SurveyRows;
        meta: SurveyMeta;
    };
};
