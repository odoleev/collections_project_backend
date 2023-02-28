export const itemsPipelineCollection = (
  search: string,
  collectionId: string,
) => {
  return [
    {
      $search: {
        index: 'searchItems',
        compound: {
          filter: [
            {
              text: {
                query: search,
                path: [
                  'name',
                  'tags',
                  'string1',
                  'string2',
                  'string3',
                  'text1',
                  'text2',
                  'text3',
                ],
              },
            },
          ],
          must: [
            {
              text: {
                query: collectionId,
                path: 'collectionId',
              },
            },
          ],
        },
      },
    },
  ];
};

export const itemsPipeline = (search: string) => {
  return [
    {
      $search: {
        index: 'searchItems',
        regex: {
          query: search,
          path: [
            'name',
            'tags',
            'string1',
            'string2',
            'string3',
            'text1',
            'text2',
            'text3',
          ],
          allowAnalyzedField: true,
        },
      },
    },
  ];
};
