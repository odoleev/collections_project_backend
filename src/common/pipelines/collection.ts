export const collectionsPipeline = (search: string, userId: string) => {
  return [
    {
      $search: {
        index: 'searchCollections',
        compound: {
          filter: [
            {
              text: {
                query: search,
                path: ['name', 'description', 'theme', 'creatorUsername'],
              },
            },
          ],
          must: [
            {
              text: {
                query: userId,
                path: 'creatorId',
              },
            },
          ],
        },
      },
    },
  ];
};
