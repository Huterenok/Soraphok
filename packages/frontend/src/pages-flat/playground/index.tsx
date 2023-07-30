
import { MilkdownProvider } from '@milkdown/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useCallback, useRef } from 'react';
import Loading from 'components/loading';
import type { MilkdownRef } from 'components/playground-editor';
import { FeatureToggleProvider } from 'components/playground-editor/FeatureToggleProvider';
import { InspectorProvider } from 'components/playground-editor/InspectorProvider';
import { ProseStateProvider } from 'components/playground-editor/ProseStateProvider';
import { ShareProvider } from 'components/playground-editor/ShareProvider';
import { compose } from 'utils/compose';

const PlaygroundMilkdown = dynamic(
  () => import('components/playground-editor').then(module => ({
    default: module.PlaygroundMilkdown
  })),
  {
    ssr: false,
    loading: () => <Loading />
  }
);

// const ControlPanel = dynamic(
//   () =>
//     import("components/playground/control-panel").then((module) => ({
//       default: module.ControlPanel,
//     })),
//   {
//     ssr: false,
//     loading: () => <Loading />,
//   }
// );

const Provider = compose(
  FeatureToggleProvider,
  MilkdownProvider,
  ProsemirrorAdapterProvider,
  ProseStateProvider,
  ShareProvider,
  InspectorProvider
);


export function Playground () {
  const milkdownRef = useRef<MilkdownRef>(null);

  const onMilkdownChange = useCallback((markdown: string) => {
    // console.log(markdown)
  }, []);

  // const onCodemirrorChange = useCallback((getCode: () => string) => {
  //   const { current } = milkdownRef;
  //   if (!current) return;
  //   const value = getCode();
  //   current.update(value);
  // }, []);

  return (
    <>
      <Head>
        <title>Playground</title>
      </Head>
      <div className="m-0 mt-16 grid border-b border-gray-300 dark:border-gray-600 md:ml-20 md:mt-0 md:grid-cols-2">
        <Provider>
          <div className="h-[calc(100vh-2rem)] overflow-auto overscroll-none md:h-screen">
            <PlaygroundMilkdown
              milkdownRef={milkdownRef}
              content={"Hello"}
              onChange={onMilkdownChange}
            />
          </div>
          {/* <div className="h-[calc(50vh-2rem)] overflow-auto overscroll-none border-l border-gray-300 dark:border-gray-600 md:h-screen">
            <ControlPanel
              codemirrorRef={codemirrorRef}
              content={content}
              onChange={onCodemirrorChange}
              lock={lockCodemirror}
            />
          </div> */}
        </Provider>
      </div>
    </>
  );
}
