import chroma from 'chroma-js';

export const useColors = (
  colorsNumber: number,
) => {
  if (colorsNumber <= 3) {
    return ([
      '#35B8E0',
      '#FDD6AA',
      '#A40505',
    ]);
  }
  return chroma.scale([
    '#1B5183',
    '#1E6D86',
    '#2A8FAF',
    '#C9E6E8',
    '#929292',
    '#766964',
    '#F8981C',
    '#760015',
  ]).colors(colorsNumber || 0);
};

export const useOpacityColors = (colors) => colors.map((color) => chroma(color).luminance(0.7));

export default {
  useColors,
  useOpacityColors,
};
