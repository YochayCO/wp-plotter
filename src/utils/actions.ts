import { getContext } from '@wordpress/interactivity';
import { Context } from '../types/state';
import { fetchSurveyData } from './api';
import { isGraphVisible } from './extraContext';

// Runs due to watcher.
async function updateGraph () {
    const { xValue, yValue, survey } = getContext<Context>();
    if (isGraphVisible()) {
        console.log(xValue, yValue, survey);
    }
}

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

    if (!context.surveyId) {
        cleanSurvey()
        return;
    }

    context.survey = undefined;
    const survey = await fetchSurveyData(context.surveyId);
    context.survey = survey;
}

const actions = {
    selectX,
    selectY,
    selectSurvey,
    updateGraph,
}

export default actions;
