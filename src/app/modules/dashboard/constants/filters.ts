export const FilterFiche = [
  {
    name: 'document_num',
    description: 'document_num'
  },
  {
    name: 'external_document_num',
    description: 'external_document_num'
  },
  {
    name: 'current_account',
    description: 'current_account_code',
    objectKey: 'code',
    prefix: 'current_account_code',
    parameterName: 'current_account_code'
  },
  {
    name: 'current_account',
    description: 'current_account_description',
    objectKey: 'description',
    prefix: 'current_account_description',
    parameterName: 'current_account_description'
  }
];

export const FilterCardWithCode = [
  {
    name: 'code',
    description: 'code'
  },
  {
    name: 'description',
    description: 'description'
  }
];

export const FilterCardWithNo = [
  {
    name: 'number',
    description: 'number'
  },
  {
    name: 'description',
    description: 'description'
  }
];
