import { extendTheme } from '@chakra-ui/react';
import styles from './styles';
import foundations from './foundations';
import typography from './foundations/typography';
import components from './components';

const theme = {
  ...foundations,
  ...typography,
  styles,
  components,
};

export default extendTheme(theme);
