import { SurveyData, SurveyMeta } from "./survey";

// Global state
export type ServerState = {
	state: {
		urlBase: string;
	};
};

// Local state
export type Context = {
    surveyId: string;
	xValue: string;
	yValue: string;
    survey?: {
        data: SurveyData;
        meta: SurveyMeta;
    }
};
