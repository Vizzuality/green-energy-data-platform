import chroma from 'chroma-js';

export const useColors = (
  colorsNumber: number,
) => chroma.scale([
  '#1B5183',
  '#1E6D86',
  '#2A8FAF',
  '#C9E6E8',
  '#929292',
  '#766964',
  '#F8981C',
  '#760015',
]).colors(colorsNumber || 0);

export default {
  useColors,
};
