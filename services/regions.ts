import { API } from 'lib/api';

export const fetchRegions = (
  params = {},
) => API.get('/regions', {
  params,
})
  .then(({ data }) => data);

export const fetchRegion = (
  id: string,
  params,
  headers = {},
) => API.get(`/regions/${id}`, {
  headers: {
    ...headers,
  },
  params,
})
  .then(({ data }) => {
    console.log(data);
    return data;
    // geometry: {
    //   ...data?.data?.geometry,
    //   geometry: {
    //     ...data?.geometry,
    //     ...(data?.geometry?.tooltip_properties && { tooltip_properties: {
    //       ...data.geometry?.tooltip_properties,
    //       name: params?.locale === 'cn' ? data.name_cn : data.name_en,
    //       value: params?.locale === 'cn' ? data.value_cn : data.value_en,
    //     } }),
    //   },
    // },

  },
  );
