import { compose } from 'shared/lib/compose';
import { StyledComponentsRegistry } from './with-styled';
import { WithLayout } from './with-layout';

export const WithProviders = compose(
	WithLayout,
	StyledComponentsRegistry
);
