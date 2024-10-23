import { getContext } from '@wordpress/interactivity';
import { Context } from '../types/state';

export function isGraphVisible () {
    const { xValue, yValue, survey } = getContext<Context>();
    return xValue && yValue && !!isSurveyLoaded();
}

function isSurveyLoaded () {
    const { survey } = getContext<Context>();
    return !!survey
}

// computables
export default {
    isGraphVisible,
    isSurveyLoaded,
}
