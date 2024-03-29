export const GROUPS = [
  {
    id: '066bc939-a3cb-40f3-a4b3-21ad8fe9aef9',
    slug: 'energy',
    name: 'Energy',
    subtitle: 'Global Energy Investment.',
    description: 'Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus.',
    status: 'active',
    default_subgroup: 'energy-balance',
    subgroups: [
      { id: 1, name: 'Energy Balance', slug: 'energy-balance' },
      { id: 2, name: 'Energy Supply', slug: 'energy-supply' },
      { id: 3, name: 'Energy Efficiency', slug: 'energy-efficiency' },
      { id: 4, name: 'Energy Trade', slug: 'energy-trade' },
      { id: 5, name: 'Energy Investment', slug: 'energy-investment' },
      { id: 6, name: 'Electricity', slug: 'rlectricity' },
      { id: 7, name: 'Energy Price', slug: 'energy-price' },
      { id: 8, name: 'Energy Technology', slug: 'energy-technology' },
      { id: 9, name: 'Energy Consumption', slug: 'energy-consumption' },
      { id: 10, name: 'Internantional Comparison', slug: 'internantional-comparison' },
      { id: 11, name: 'Emissions & Natural Disaters', slug: 'emissions&natural-disaters' },
      { id: 12, name: 'Transporation sector', slug: 'transporation-sector' },
      { id: 13, name: 'Industry sector', slug: 'industry-sector' },
      { id: 14, name: 'Buildings', slug: 'buildings' },
      { id: 15, name: 'Energy Resources Reserves', slug: 'energy-esources-reserves' },
    ],
  },
  {
    id: 2,
    slug: 'socioeconomic',
    name: 'Socio economic',
    subtitle: 'Agriculture.',
    description: 'Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus.',
    default_subgroup: 'transportation',
    status: 'disabled',
    subgroups: [
      { id: 1, name: 'Transportation', slug: 'transportation' },
      { id: 2, name: 'Energy Supply', slug: 'energy-supply' },
      { id: 3, name: 'Energy Efficiency', slug: 'energy-efficiency' },
      { id: 4, name: 'Energy Trade', slug: 'energy-trade' },
      { id: 5, name: 'Energy Investment', slug: 'energy-investment' },
      { id: 6, name: 'Electricity', slug: 'rlectricity' },
      { id: 7, name: 'Energy Price', slug: 'energy-price' },
      { id: 8, name: 'Energy Technology', slug: 'energy-technology' },
      { id: 9, name: 'Energy Consumption', slug: 'energy-consumption' },
      { id: 10, name: 'Internantional Comparison', slug: 'internantional-comparison' },
      { id: 11, name: 'Emissions & Natural Disaters', slug: 'emissions&natural-disaters' },
      { id: 12, name: 'Transporation sector', slug: 'transporation-sector' },
      { id: 13, name: 'Industry sector', slug: 'industry-sector' },
      { id: 14, name: 'Buildings', slug: 'buildings' },
      { id: 15, name: 'Energy Resources Reserves', slug: 'energy-esources-reserves' },
    ],
  },
  {
    id: 3,
    slug: 'coal-power-plant',
    name: 'Coal power plants',
    subtitle: 'Capacity power plants in China.',
    description: 'Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus.',
    default_subgroup: 'capacity',
    status: 'disabled',
    subgroups: [
      { id: 1, name: 'Capacity', slug: 'capacity' },
      { id: 2, name: 'Energy Supply', slug: 'energy-supply' },
      { id: 3, name: 'Energy Efficiency', slug: 'energy-efficiency' },
      { id: 4, name: 'Energy Trade', slug: 'energy-trade' },
      { id: 5, name: 'Energy Investment', slug: 'energy-investment' },
      { id: 6, name: 'Electricity', slug: 'rlectricity' },
      { id: 7, name: 'Energy Price', slug: 'energy-price' },
      { id: 8, name: 'Energy Technology', slug: 'energy-technology' },
      { id: 9, name: 'Energy Consumption', slug: 'energy-consumption' },
      { id: 10, name: 'Internantional Comparison', slug: 'internantional-comparison' },
      { id: 11, name: 'Emissions & Natural Disaters', slug: 'emissions&natural-disaters' },
      { id: 12, name: 'Transporation sector', slug: 'transporation-sector' },
      { id: 13, name: 'Industry sector', slug: 'industry-sector' },
      { id: 14, name: 'Buildings', slug: 'buildings' },
      { id: 15, name: 'Energy Resources Reserves', slug: 'energy-esources-reserves' },
    ],
  },
];

export const SUBGROUPS = [
  {
    slug: 'energy-balance', id: '69598aad-9db8-4e7a-9594-7125fc3a4d20', name: 'Energy Balance', group: '1', default_indicator: 'ff168071-2310-4da4-bae4-95a780c353e4',
  },
  {
    slug: 'energy-supply', id: 2, name: 'Energy Supply', group: '1',
  },
  {
    slug: 'energy-efficiency', id: 3, name: 'Energy Efficiency', group: '1',
  },
  {
    slug: 'energy-trade', id: 4, name: 'Energy Trade', group: '1',
  },
  {
    slug: 'energy-investment', id: 5, name: 'Energy Investment', group: '1',
  },
  {
    slug: 'electricity', id: 6, name: 'Electricity', group: '1',
  },
  {
    slug: 'energy-price', id: 7, name: 'Energy Price', group: '1',
  },
  {
    slug: 'energy-technology', id: 8, name: 'Energy Technology', group: '1',
  },
  {
    slug: 'energy-consumption', id: 9, name: 'Energy Consumption', group: '1',
  },
  {
    slug: 'internantional-comparison', id: 10, name: 'Internantional Comparison', group: '1',
  },
  {
    slug: 'emissions&natural-disaters', id: 11, name: 'Emissions & Natural Disaters', group: '1',
  },
  {
    slug: 'transporation-sector', id: 12, name: 'Transporation sector', group: '1',
  },
  {
    slug: 'industry-sector', id: 13, name: 'Industry sector', group: '1',
  },
  {
    slug: 'buildings', id: 14, name: 'Buildings', group: '1',
  },
  {
    slug: 'energy-resources-reserves', id: 15, name: 'Energy Resources Reserves', groupId: '1',
  },
  {
    slug: 'Agriculture', id: 16, name: 'Agriculture', groupId: '2',
  },
  {
    slug: 'building', id: 26, name: 'Building', groupId: '2',
  },
  {
    slug: 'employment', id: 36, name: 'Employment', groupId: '2',
  },
  {
    slug: 'exchange-rRate', id: 47, name: 'Exchange Rate', groupId: '2',
  },
  {
    slug: 'GDP', id: 57, name: 'GDP', groupId: '2',
  },
  {
    slug: 'imports&exports', id: 68, name: 'Imports and exports', groupId: '2',
  },
  {
    slug: 'industry', id: 79, name: 'Industry', groupId: '2',
  },
  {
    slug: 'whatever33', id: 89, name: 'Energy Technology', groupId: '2',
  },
  {
    slug: 'whatever37', id: 99, name: 'Energy Consumption', group: '1',
  },
  {
    slug: 'whatever99', id: 101, name: 'Internantional Comparison', group: '1',
  },
  {
    slug: 'whatever100', id: 111, name: 'Emissions & Natural Disaters', group: '1',
  },
  {
    slug: 'whatever222', id: 121, name: 'Transporation sector', group: '1',
  },
  {
    slug: 'whatever33333', id: 131, name: 'Industry sector', group: '1',
  },
  {
    slug: 'whatever451', id: 141, name: 'Buildings', group: '1',
  },
  {
    slug: 'whatever432', id: 151, name: 'Energy Resources Reserves', group: '1',
  },
];

export const INDICATORS = [
  {
    id: 'ff168071-2310-4da4-bae4-95a780c353e4',
    name: 'Total Power of Agricultural Machinery',
    description: null,
    published: false,
    records: [
      {
        id: '84326fd3-59cc-4e66-9f8c-38764e45df21',
        value: 11749.9067,
        year: 1978,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: 'a8fd3435-c22e-426a-a780-987152055cfa',
        value: 14745.7453,
        year: 1980,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: '7d41609c-dec0-45e0-bec5-2749146385a5',
        value: 20912.54505,
        year: 1985,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: 'a6197a91-a868-426c-b948-01a22a69c2a5',
        value: 28707.7,
        year: 1990,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: 'e6d4dfc5-f9d7-4454-86a6-c39cc962e9d2',
        value: 36118.05,
        year: 1995,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: 'f393476a-5439-40cd-8edd-2e32386e4ee6',
        value: 52573.6063,
        year: 2000,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: '4256fdaf-82ca-497e-b601-abcfa7b93825',
        value: 68397.8486,
        year: 2005,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: '9d9a94f3-ea9e-4c8d-88ec-305182078c85',
        value: 72522.1234,
        year: 2006,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: 'a4348b37-fc8f-4b4d-bb9f-5ca169ca7652',
        value: 76589.563462,
        year: 2007,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: '17053388-08a5-4000-843f-b87f9cdfcece',
        value: 82190.4132,
        year: 2008,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: 'ec793d5f-c5c2-4909-b0c4-d711160100fe',
        value: 87496.1013,
        year: 2009,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: 'c867028d-c7a2-4b78-a01a-ad34c872a0a5',
        value: 92780.4757,
        year: 2010,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: '1e7c0b12-5e1b-4a1c-a351-241471033406',
        value: 97734.658521,
        year: 2011,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: 'f0ffa3ae-9b21-4b02-b6b5-6e26f9699cca',
        value: 102558.96,
        year: 2012,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: '287456b6-183b-4b3a-970d-c96adce9a66f',
        value: 103906.7505,
        year: 2013,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: '222fec55-8587-423c-98e3-10d2b17dc32e',
        value: 108056.58,
        year: 2014,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: 'f33e2315-eeeb-4fbe-95b0-bf6a1f05e9fa',
        value: 111728.0676,
        year: 2015,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: 'c3b172d5-d3ac-4cb3-90e9-01266bf363da',
        value: 97245.5853,
        year: 2016,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: '63c3816b-7e49-42d5-9599-f6eb61f7d263',
        value: 98783.347,
        year: 2017,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: 'db6e45c4-313b-4d4b-b756-513a44137085',
        value: 100371.744,
        year: 2018,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: '692baec1-2c29-4085-bcff-8463c44e2e26',
        value: 102758.261123,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '273443d5-efe5-4795-889a-5806806074b5',
          name: 'China',
          region_type: 0,
        },
      },
      {
        id: '810952be-0de9-4b9b-ab5b-4b4613909fb1',
        value: 122.842167,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: 'eb5b1e41-320e-41a3-af1c-f248a787ff7f',
          name: '  Beijing       ',
          region_type: 0,
        },
      },
      {
        id: '0f358c66-f95e-4200-8983-0230cdc59a80',
        value: 359.8381,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: 'c611fa98-19e4-4855-b2cb-e3b484236381',
          name: '  Tianjin       ',
          region_type: 0,
        },
      },
      {
        id: 'ffe6a8d8-f4e3-4aa0-bc54-75befe48a092',
        value: 7830.72308,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '60d2a871-4894-4814-b5c4-ed4eb18b7a1d',
          name: '  Hebei         ',
          region_type: 0,
        },
      },
      {
        id: '04c05435-e366-423c-8a78-a45856f32340',
        value: 1517.5697525,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '595398f6-7399-4ca2-a103-0914bdc2bcba',
          name: '  Shanxi        ',
          region_type: 0,
        },
      },
      {
        id: '49ad9e3a-aba2-42ef-bb33-8a7bebb88c1f',
        value: 3866.41556,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: 'de91c98e-588c-4286-93f4-28ea8310a8e5',
          name: '  Inner Mongolia',
          region_type: 0,
        },
      },
      {
        id: '42050cc1-5b3f-4ccf-88e4-1a19191bda33',
        value: 2353.886412,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '15a91fa0-e473-47ff-a7c4-af6ae519b42a',
          name: '  Liaoning      ',
          region_type: 0,
        },
      },
      {
        id: '646db415-31f9-4581-bf34-76e21c5e8488',
        value: 3653.742291,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '1f28174f-1741-41ad-9e19-abcb571e44ad',
          name: '  Jilin         ',
          region_type: 0,
        },
      },
      {
        id: '4bbeaa60-1aaa-404f-b7c4-89577c401f45',
        value: 6359.083965,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: 'dfe1b7a1-7e70-4cba-9572-8daac7121cdb',
          name: '  Heilongjiang  ',
          region_type: 0,
        },
      },
      {
        id: '61c84641-8dae-428f-80e6-fd4015a97b63',
        value: 98.038088,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '5daa68b4-616c-474c-b912-f0d9a8355d74',
          name: '  Shanghai      ',
          region_type: 0,
        },
      },
      {
        id: 'ee572bdc-c787-48de-aa7f-332c88d32b57',
        value: 5111.9519454,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '67956a57-7f39-4d58-a1e8-ee62111c1861',
          name: '  Jiangsu       ',
          region_type: 0,
        },
      },
      {
        id: '38c21b0e-97d4-4996-828c-cc886e012664',
        value: 1908.03976,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: 'faa95dad-f531-434e-bd3f-7bed0ba6eb5d',
          name: '  Zhejiang      ',
          region_type: 0,
        },
      },
      {
        id: 'a36a3a15-1427-4387-bf2f-b8215f02cc44',
        value: 6650.4725,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '2eb5a6e0-d537-405d-a957-cbe4743ccd04',
          name: '  Anhui         ',
          region_type: 0,
        },
      },
      {
        id: '8be7ba3f-db19-49a3-bb37-a10293b7509b',
        value: 1237.729053,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '0aa2e12b-2d36-40b7-bbe8-0cd6ff3cd616',
          name: '  Fujian        ',
          region_type: 0,
        },
      },
      {
        id: '42d131fd-8daa-45a8-8bc5-45348b963487',
        value: 2470.655839,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: 'f9481b91-b649-420d-94a4-5f5b0478523f',
          name: '  Jiangxi       ',
          region_type: 0,
        },
      },
      {
        id: '409c84cc-37b8-4fe9-ade1-2f7a32439b31',
        value: 10679.83695,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '7145e767-0dce-4714-b36c-fc3500744827',
          name: '  Shandong      ',
          region_type: 0,
        },
      },
      {
        id: 'a99b0266-b809-415a-8ce3-197a9fe636ec',
        value: 10356.972186,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '7d478815-8b6b-4f30-bae8-cf693d951837',
          name: '  Henan         ',
          region_type: 0,
        },
      },
      {
        id: 'a54a9249-cf00-4fc9-9534-d4bad7e23db1',
        value: 4515.73186,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '6a7d7a17-e35e-4d32-9854-7ddd520c637b',
          name: '  Hubei         ',
          region_type: 0,
        },
      },
      {
        id: 'c0e5fbe0-8a25-45cc-b1b6-d9f9fd5488fb',
        value: 6471.815217,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '3d7cd613-6246-4ffd-9a7a-2ac6037b1c63',
          name: '  Hunan         ',
          region_type: 0,
        },
      },
      {
        id: 'a6d1e650-8d71-4a15-b897-a7d0932b3ae1',
        value: 2455.7896,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: 'ed24dbef-a98b-42e7-9c07-e2a693fe2202',
          name: '  Guangdong     ',
          region_type: 0,
        },
      },
      {
        id: 'cfd9877e-2aa5-4a7a-8871-2afa965588dd',
        value: 3840.0371,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '2247f952-6d62-46d4-8702-f10a0101cc2c',
          name: '  Guangxi       ',
          region_type: 0,
        },
      },
      {
        id: '929d44f0-c6bf-48ab-a689-944001e7c824',
        value: 581.231644,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '0b9277c2-1b0b-478f-9883-83f24a530c4a',
          name: '  Hainan        ',
          region_type: 0,
        },
      },
      {
        id: '1f17c51f-62a8-4dfa-b4a5-ba8ad1b4bc49',
        value: 1464.6672625,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '08efae2c-4082-45d6-a9e6-95c3ef4522b8',
          name: '  Chongqing',
          region_type: 0,
        },
      },
      {
        id: 'cb528317-72dc-4a00-82eb-7cc60ab6c12a',
        value: 4682.2981149,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '4ffc3407-b0e2-47a7-a9d5-2a3035f184e4',
          name: '  Sichuan       ',
          region_type: 0,
        },
      },
      {
        id: '6378d1cb-1673-4b67-97ac-da99b912cd4b',
        value: 2484.6015,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: 'd33dbfe0-faff-4add-9ea5-0725eee30bd9',
          name: '  Guizhou       ',
          region_type: 0,
        },
      },
      {
        id: '9c9c8b61-4eec-4107-a6df-f33e6f49c88b',
        value: 2714.4016976,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: 'f865afae-3751-4a2b-92f3-f7490987fd3b',
          name: '  Yunnan        ',
          region_type: 0,
        },
      },
      {
        id: '3140d933-fa02-4019-8d76-529aab9222ca',
        value: 559.0217,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '7594153d-e703-4380-9cfc-b7c2fc63e65c',
          name: '  Tibet         ',
          region_type: 0,
        },
      },
      {
        id: 'b8d4ba9b-ec61-4460-9ca9-cae3745a00fd',
        value: 2331.4932435,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '2bfde8cb-d7f9-406f-9625-1eaffb77559b',
          name: '  Shaanxi       ',
          region_type: 0,
        },
      },
      {
        id: '60e2fb5b-d857-4d4e-b32d-311efcddaf9b',
        value: 2174.0114977,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: 'f61e7674-5da3-4885-adfa-3f3f705e401f',
          name: '  Gansu         ',
          region_type: 0,
        },
      },
      {
        id: 'f35e0b88-fb08-462e-95eb-5d8622c08b82',
        value: 484.236477,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: 'a511bb7f-9e87-4b0a-9c77-8874e42e597f',
          name: '  Qinghai       ',
          region_type: 0,
        },
      },
      {
        id: 'ed8d6913-b2dc-4e33-8849-2960da1d11c7',
        value: 632.1529,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: '990a6374-45f0-4f74-9007-2b618dfda1c1',
          name: '  Ningxia       ',
          region_type: 0,
        },
      },
      {
        id: '2c5c37df-eeba-44cd-9586-1f3e2a07813d',
        value: 2788.9736599,
        year: 2019,
        category_1: null,
        category_2: null,
        unit: {
          id: '75513bf0-0699-443f-9097-7a211d7f84f8',
          name: '10 000 kw',
        },
        region: {
          id: 'b91d5feb-bfb2-411f-8286-0880a9c77c99',
          name: '  Xinjiang      ',
          region_type: 0,
        },
      },
    ],
  },
];

export const RELATED_INDICATORS = ['widget1', 'widget2', 'widget3', 'widget4', 'widget5'];

export default {
  GROUPS,
  SUBGROUPS,
  INDICATORS,
  RELATED_INDICATORS,
};
