import { QuestionItem } from "./question";
import { SurveyData, SurveyMeta, SurveyOption } from "./survey";

// Global state
export type ServerState = {
	state: {
		urlBase: string;
	};
};

// Local state
export type Context = {
	xValue: string;
	yValue: string;
    surveyId: string;
    questionItems: QuestionItem[];
    surveyOptions: SurveyOption[];
    survey?: {
        data: SurveyData;
        meta: SurveyMeta;
    };
};
