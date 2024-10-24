import { getContext } from '@wordpress/interactivity';
import { Context } from '../types/state';
import { QuestionItem } from '../types/question';

export function isGraphVisible () {
    const { xValue, yValue, survey } = getContext<Context>();
    return xValue && yValue && !!isSurveyLoaded();
}

function isSurveyLoaded () {
    const { survey } = getContext<Context>();
    return !!survey
}

function questionItems (): QuestionItem[] {
    const { survey } = getContext<Context>();
    return survey ? Object.values(survey.meta.questionDefs) : [];
}
function quantityQuestionItems (): QuestionItem[] {
    const qis = questionItems()
    return qis.filter(qi => qi.type !== 'category');
}

// computables
export default {
    isGraphVisible,
    isSurveyLoaded,
    questionItems,
    quantityQuestionItems,
}
