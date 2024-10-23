import { getContext } from '@wordpress/interactivity';
import { Context } from '../types/state';

export function isGraphVisible () {
    const { xValue, yValue, survey } = getContext<Context>();
    return xValue && yValue && !!survey;
}

export default {
    isGraphVisible,
}
