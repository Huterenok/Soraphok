import { compose } from 'shared/lib/compose';
import { WithLayout } from './with-layout';
import { StyledComponentsRegistry } from './with-styled';

export const WithProviders = compose(
  WithLayout,
  StyledComponentsRegistry
);
