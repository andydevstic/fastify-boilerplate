import pick from 'lodash/pick';

interface ValidationObject {
  [keys: string]: {
    type: string;
  };
}

export const generateValidationFieldsPicker = (validationObject: ValidationObject) => (fields?: string[]) => {
  if (fields && fields.length) {
    return pick(validationObject, fields);
  }

  return validationObject;
};
