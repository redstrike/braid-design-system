import React, { ReactNode, useState } from 'react';
import classnames from 'classnames';
import { useStyles } from 'sku/treat';
import { Box } from '../Box/Box';
import { IconChevron } from '../icons';
import { Hidden } from '../Hidden/Hidden';
import { Text, TextProps } from '../Text/Text';
import { FieldOverlay } from '../private/FieldOverlay/FieldOverlay';
import { useTouchableSpace } from '../../hooks/typography';
import * as styleRefs from './Expander.treat';

interface ExpanderProps {
  id: string;
  expanded: boolean;
  title: string;
  size?: TextProps['size'];
  onOpen?: () => void;
  onClose?: () => void;
  children: ReactNode;
}

export const Expander = ({
  id,
  title,
  expanded = false,
  size = 'standard',
  onOpen,
  onClose,
  children,
}: ExpanderProps) => {
  const contentId = `${id}_content`;
  const styles = useStyles(styleRefs);
  const [open, setState] = useState(expanded);
  const currentState = expanded || open;

  return (
    <Box>
      <Box
        component="button"
        display="flex"
        width="full"
        position="relative"
        className={classnames(styles.button, useTouchableSpace(size))}
        id={id}
        aria-expanded={currentState}
        aria-controls={contentId}
        onClick={() => {
          const newExpand = !currentState;
          setState(newExpand);

          if (typeof onOpen === 'function' && newExpand) {
            onOpen();
          }

          if (typeof onClose === 'function' && !newExpand) {
            onClose();
          }
        }}
      >
        <Text size={size} baseline={false}>
          {title}
        </Text>
        <Text size={size} baseline={false}>
          <IconChevron direction={currentState ? 'up' : 'down'} />
        </Text>
        <FieldOverlay variant="focus" className={styles.focusOverlay} />
      </Box>
      <Box
        role="region"
        aria-labelledby={id}
        id={contentId}
        hidden={!currentState}
      >
        <Hidden screen={!currentState}>{children}</Hidden>
      </Box>
    </Box>
  );
};
