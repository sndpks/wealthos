import { Dimensions } from 'react-native';
import { spacing } from '../theme';

const CHART_INSET = 48;

/** Width for charts inside a full-width card with standard page + panel padding */
export function getChartWidth(extraInset = 0): number {
  const pagePad = spacing.lg * 2;
  const panelPad = spacing.md * 2;
  return (
    Dimensions.get('window').width -
    pagePad -
    panelPad -
    CHART_INSET -
    extraInset
  );
}
