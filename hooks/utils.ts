import { chartDefaultColors } from 'constants';
import chroma from 'chroma-js';

export const useColors = (
  colorsNumber: number,
) => chroma.scale(chartDefaultColors).colors(colorsNumber || 0);

export default {
  useColors,
};
