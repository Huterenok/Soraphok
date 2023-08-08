import { compose } from "shared/lib/compose";
import { EffectorProvider } from "./with-effector";
import { ThemeProvider } from "./with-theme";

export const ProvidersContext = compose(ThemeProvider);
export const ProvidersApplication = compose(EffectorProvider);

export { HtmlProvider } from "./with-html";
