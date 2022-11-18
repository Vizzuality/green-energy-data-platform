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
    '#007CA1',
    '#35B8E0',
    '#BBE4F0',
    '#8E4C00',
    '#ED8B16',
    '#FFD09B',
    '#00957C',
    '#00CBA9',
    '#B4EBE2',
    '#A40505',
    '#FB9A99',
  ]).colors(colorsNumber || 0);
};

export const useOpacityColors = (colors) => colors.map((color) => chroma(color).luminance(0.5));

// export const useOpacityColors = (colors) => colors
// .map((color) => ({ [Object.keys(color)[0]]: chroma(Object.values(color)[0]).luminance(0.5) }));

export default {
  useColors,
  useOpacityColors,
};
