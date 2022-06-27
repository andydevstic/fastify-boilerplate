import { expect } from 'chai';
import { Op } from 'sequelize';

import { IFilterCriteria } from '../../src/lib/shared/types';
import { MongooseFilterCriteriaParser, parseFilterCriteria, SequelizeFilterCriteriaParser } from '../../src/lib/shared/utils/query-parser';

describe('query parser utils', () => {
  describe('sequelize query parser', () => {
    it('should throw if criteria is missing field', () => {
      expect(() => parseFilterCriteria([{ field: '', operator: '$eq', value: '123' }], new SequelizeFilterCriteriaParser())).to.throw(
        'must provide field and operator'
      );
    });

    it('should parse $eq operator correctly', () => {
      const queryFilter: IFilterCriteria[] = [
        {
          field: 'name',
          operator: '$eq',
          value: 'Andy',
        },
        {
          field: 'age',
          operator: '$lt',
          value: 26,
        },
      ];

      const parsed = parseFilterCriteria(queryFilter, new SequelizeFilterCriteriaParser());

      expect(parsed).to.be.deep.equal({
        name: {
          [Op.eq]: 'Andy',
        },
        age: {
          [Op.lt]: 26,
        },
      });
    });

    it('should throw error if dont provide array for value in $in operator', () => {
      const queryFilter: IFilterCriteria[] = [
        {
          field: 'location',
          operator: '$in',
          value: 123,
        },
      ];

      expect(() => parseFilterCriteria(queryFilter, new SequelizeFilterCriteriaParser())).to.throw('value must be an array');
    });

    it('should parse criteria correctly for $in operator', () => {
      const queryFilter: IFilterCriteria[] = [
        {
          field: 'location',
          operator: '$in',
          value: ['HCMC', 'Hanoi'],
        },
      ];

      expect(() => parseFilterCriteria(queryFilter, new SequelizeFilterCriteriaParser())).to.not.throw();

      const parsed = parseFilterCriteria(queryFilter, new SequelizeFilterCriteriaParser());

      expect(parsed).to.be.deep.equal({
        location: {
          [Op.in]: ['HCMC', 'Hanoi'],
        },
      });
    });
  });

  describe('mongodb query parser', () => {
    it('should throw if criteria is missing field', () => {
      expect(() => parseFilterCriteria([{ field: '', operator: '$eq', value: '123' }], new MongooseFilterCriteriaParser())).to.throw(
        'must provide field and operator'
      );
    });

    it('should parse $eq operator correctly', () => {
      const queryFilter: IFilterCriteria[] = [
        {
          field: 'name',
          operator: '$eq',
          value: 'Andy',
        },
        {
          field: 'age',
          operator: '$lt',
          value: 26,
        },
      ];

      const parsed = parseFilterCriteria(queryFilter, new MongooseFilterCriteriaParser());

      expect(parsed).to.be.deep.equal({
        name: {
          $eq: 'Andy',
        },
        age: {
          $lt: 26,
        },
      });
    });

    it('should throw error if dont provide array for value in $in operator', () => {
      const queryFilter: IFilterCriteria[] = [
        {
          field: 'location',
          operator: '$in',
          value: 123,
        },
      ];

      expect(() => parseFilterCriteria(queryFilter, new MongooseFilterCriteriaParser())).to.throw('value must be an array');
    });

    it('should parse criteria correctly for $in operator', () => {
      const queryFilter: IFilterCriteria[] = [
        {
          field: 'location',
          operator: '$in',
          value: ['HCMC', 'Hanoi'],
        },
      ];

      expect(() => parseFilterCriteria(queryFilter, new MongooseFilterCriteriaParser())).to.not.throw();

      const parsed = parseFilterCriteria(queryFilter, new MongooseFilterCriteriaParser());

      expect(parsed).to.be.deep.equal({
        location: {
          $in: ['HCMC', 'Hanoi'],
        },
      });
    });
  });
});
