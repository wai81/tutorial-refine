import { CrudFilters } from '@pankod/refine-core';
import { mapOperator } from './mapOperator';

export const generateFilter = (filters?: CrudFilters) => {
  const queryFilters: { [key: string]: string } = {};

  if (filters) {
    // eslint-disable-next-line array-callback-return
    filters.map((filter) => {
      if (filter.operator === 'or' || filter.operator === 'and') {
        throw new Error(
          `[@pankod/refine-simple-rest]: \`operator: ${filter.operator}\` is not supported. You can create custom data provider. https://refine.dev/docs/api-reference/core/providers/data-provider/#creating-a-data-provider`
        );
      }

      if ('field' in filter) {
        const { field, operator, value } = filter;

        if (field === 'q') {
          queryFilters[field] = value;
          // eslint-disable-next-line array-callback-return
          return;
        }

        const mappedOperator = mapOperator(operator);
        queryFilters[`${field}${mappedOperator}`] = value;
      }
    });
  }

  return queryFilters;
};
