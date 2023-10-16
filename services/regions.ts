import { API } from 'lib/api';

export const fetchRegions = (
  params = {
    locale: 'en',
  },
) => API.get('/regions', {
  params,
})
  .then(({ data }) => {
    const  parsed  = data?.map((d) => ({
      ...d,
      geometry: {
        ...d.geometry,
        ...(!!d?.geometry?.tooltip_properties && { tooltip_properties: 
          d.geometry?.tooltip_properties.map((t) => ({
            [(params?.locale === 'cn' ? t.name_cn : t.name_en)]: (params?.locale === 'cn' ? t.value_cn : t.value_en),
            name: params?.locale === 'cn' ? t.name_cn : t.name_en,
            value:  params?.locale === 'cn' ? t.value_cn : t.value_en,
            ...t,
          })),
        }),
     
      },
    }));
    return data;
    
  });


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
  .then(({ data }) => data,
  );
