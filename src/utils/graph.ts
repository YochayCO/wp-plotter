import uniq from 'lodash/uniq'
import { getContext } from '@wordpress/interactivity';
import { SurveyRows } from "../types/survey";
import { Context } from '../types/state';
import { Survey } from '../types/survey';
import { isGraphVisible } from './extraContext';

const unpack = (data: SurveyRows, prop: string): number[] => {
    return data.map(d => Number(d[prop].split('.')[0]));
}

// Runs due to watcher.
export async function updateGraph () {
    const { xValue, yValue, survey: maybeSurvey } = getContext<Context>();
    if (!isGraphVisible()) return; 

    const survey = maybeSurvey as Survey;
    const xData = unpack(survey.data, xValue);
    const yData = unpack(survey.data, yValue);
    const groups = uniq(xData);
}