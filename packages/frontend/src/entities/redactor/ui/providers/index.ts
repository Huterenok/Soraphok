import { compose } from "shared/lib/compose";
import { FeatureToggleProvider } from "./featureToggle";
import { MilkdownProvider } from "@milkdown/react";
import { ProsemirrorAdapterProvider } from "@prosemirror-adapter/react";
import { ProseStateProvider } from "./prose";
import { ShareProvider } from "./share";
import { InspectorProvider } from "./inspector";

const ProviderRedactor = compose(
  FeatureToggleProvider,
  MilkdownProvider,
  ProsemirrorAdapterProvider,
  ProseStateProvider,
  ShareProvider,
  InspectorProvider
);

export {
  ProviderRedactor,
  FeatureToggleProvider,
  ProseStateProvider,
  ShareProvider,
  InspectorProvider,
};
