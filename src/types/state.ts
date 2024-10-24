import { SurveyData, SurveyMeta, SurveyOption } from "./survey";

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
        data: SurveyData;
        meta: SurveyMeta;
    };
};
