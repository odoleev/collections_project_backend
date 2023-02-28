import { Query } from 'express-serve-static-core';
import { SortOrder } from 'mongoose';

export function returnQuery(
  query: Query,
  defaultSort: string,
): [string, { [key: string]: SortOrder }, number, number] {
  const currentLimit = Number(query.limit) || 5;
  const currentPage = Number(query.page) || 1;
  const skip = currentLimit * (currentPage - 1);
  const search = query.search || '';
  const sort = query.sort ? String(query.sort).split(',') : [defaultSort, -1];
  const sortBy = {};
  sortBy[sort[0]] = Number(sort[1]);
  return [search as string, sortBy, currentLimit, skip];
}
