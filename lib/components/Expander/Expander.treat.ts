import { style } from 'sku/treat';

export const button = style({
  justifyContent: 'space-between',
  outline: 'none',
  userSelect: 'none',
  cursor: 'pointer',
});

export const focusOverlay = style({
  selectors: {
    [`${button}:focus &`]: {
      opacity: 1,
    },
  },
});
