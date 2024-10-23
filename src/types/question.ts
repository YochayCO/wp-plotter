export interface QuestionItemBase {
    column: string;
    description: string;
    type: "quantity" | "category";
}

export interface CategoryQuestionItem extends QuestionItemBase {
    type: "category";
    values: {
        [key: number | string]: string;
    };
    special_responses: {
        [key: number | string]: Array<number>
    };
}

export interface QuantityQuestionItem extends QuestionItemBase {
    type: "quantity";
    range: {
        [key: number | string]: string;
    };
}

export type QuestionItem = CategoryQuestionItem | QuantityQuestionItem;
