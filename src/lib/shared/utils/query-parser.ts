import createHttpError from 'http-errors';
import isArray from 'lodash/isArray';
import { FindOptions, Op } from 'sequelize';
import { FilterQuery } from 'mongoose';

import { IFilterCriteria } from '../types';

abstract class FilterCriteriaParser<Input extends IFilterCriteria, Result = any> {
  protected _data: Input;

  public wrap(data: Input): this {
    this._data = data;

    return this;
  }

  public validate(): void {
    if (!this._data?.field || !this._data?.operator) {
      throw new createHttpError.BadRequest('must provide field and operator');
    }

    switch (this._data.operator) {
      case '$in':
      case '$nin':
        if (!isArray(this._data.value)) {
          throw new createHttpError.BadRequest('value must be an array');
        }
    }
  }

  public abstract parse(): Result;
}

export class SequelizeFilterCriteriaParser extends FilterCriteriaParser<IFilterCriteria, FindOptions> {
  public parse(): FindOptions<any> {
    switch (this._data.operator) {
      case '$eq':
        return {
          [this._data.field]: {
            [Op.eq]: this._data.value,
          },
        };
      case '$gt':
        return {
          [this._data.field]: {
            [Op.gt]: this._data.value,
          },
        };
      case '$gte':
        return {
          [this._data.field]: {
            [Op.gte]: this._data.value,
          },
        };
      case '$lt':
        return {
          [this._data.field]: {
            [Op.lt]: this._data.value,
          },
        };
      case '$lte':
        return {
          [this._data.field]: {
            [Op.lte]: this._data.value,
          },
        };
      case '$in':
        return {
          [this._data.field]: {
            [Op.in]: this._data.value,
          },
        };
      case '$nin':
        return {
          [this._data.field]: {
            [Op.notIn]: this._data.value,
          },
        };
    }
  }
}

export class MongooseFilterCriteriaParser extends FilterCriteriaParser<IFilterCriteria, FilterQuery<any>> {
  public parse(): FindOptions<any> {
    switch (this._data.operator) {
      case '$eq':
        return {
          [this._data.field]: {
            $eq: this._data.value,
          },
        };
      case '$gt':
        return {
          [this._data.field]: {
            $gt: this._data.value,
          },
        };
      case '$gte':
        return {
          [this._data.field]: {
            $gte: this._data.value,
          },
        };
      case '$lt':
        return {
          [this._data.field]: {
            $lt: this._data.value,
          },
        };
      case '$lte':
        return {
          [this._data.field]: {
            $lte: this._data.value,
          },
        };
      case '$in':
        return {
          [this._data.field]: {
            $in: this._data.value,
          },
        };
      case '$nin':
        return {
          [this._data.field]: {
            $nin: this._data.value,
          },
        };
    }
  }
}

export function parseFilterCriteria<Result>(
  criterias: IFilterCriteria[],
  criteriaParser: FilterCriteriaParser<IFilterCriteria, Result>
): Result {
  return criterias.reduce((parsedFilter, currentCriteria) => {
    const wrapped = criteriaParser.wrap(currentCriteria);

    wrapped.validate();

    return Object.assign(parsedFilter, wrapped.parse());
  }, {} as Result);
}
