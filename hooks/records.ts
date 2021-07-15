export function useRecord(records) {
  const dataBars = records.filter(({ visualizationTypes }) => visualizationTypes.contains('bar'))
  return records;
}

export default {
  useRecord,
};
