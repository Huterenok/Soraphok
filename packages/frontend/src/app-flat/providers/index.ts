import { compose } from "shared/lib/compose";
import { EffectorProvider } from "./with-effector";
import { ThemeProvider } from "./with-theme";
import { Apollo } from "./apollo";

export const ProvidersContext = compose(ThemeProvider);
export const ProvidersApplication = compose(EffectorProvider, Apollo);

export { HtmlProvider } from "./with-html";
