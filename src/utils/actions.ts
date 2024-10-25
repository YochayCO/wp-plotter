import { getContext } from '@wordpress/interactivity';
import { Context } from '../types/state';
import { fetchSurveyData } from './api';
import { updateGraph } from './graph';

// Note: Do not clean surveyId, since the function is used for cleaning between surveys as well
function cleanSurvey() {
    const context = getContext<Context>();
    context.xValue = '';
    context.yValue = '';
    context.survey = undefined;
}
function selectX(event: Event) {
    const context = getContext<Context>();
    context.xValue = (event.target as HTMLSelectElement)?.value || '';
}
function selectY(event: Event) {
    const context = getContext<Context>();
    context.yValue = (event.target as HTMLSelectElement)?.value || '';
}

// Called from survey select component onChange
async function selectSurvey (event: Event) {
    const context = getContext<Context>();
    context.surveyId = (event.target as HTMLSelectElement)?.value || '';
    cleanSurvey()

    if (!context.surveyId) return;

    try {
        context.survey = await fetchSurveyData(context.surveyId);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const actions = {
    handleSelectX: selectX,
    handleSelectY: selectY,
    handleSelectSurvey: selectSurvey,
    updateGraph,
}

export default actions;
