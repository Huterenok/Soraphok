
import * as Accordion from '@radix-ui/react-accordion';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import styles from './style.module.css';

type AccordionItemProps = {
  name: string;
  value: string;
  children: ReactNode;
};
export const AccordionItem: FC<AccordionItemProps> = ({
  children,
  value,
  name
}) => (
  <Accordion.Item value={value} className={styles['accordion-item']}>
    <Accordion.Header
      className={clsx(
        'h-10 border-b border-nord4 dark:border-gray-600'
      )}
    >
      <Accordion.Trigger
        className={clsx(
          styles['accordion-trigger'],
          'group flex w-full items-center gap-2 px-4 py-2'
        )}
      >
        <span className="material-symbols-outlined group-data-[state=open]:rotate-180">
          expand_more
        </span>
        <span>{name}</span>
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content
      forceMount
      className={clsx(
        styles['accordion-content'],
        "h-[calc(100% - 10rem)] overflow-hidden border-nord-4 dark:border-gray-600 [&[data-state='open']]:border-b"
      )}
    >
      {children}
    </Accordion.Content>
  </Accordion.Item>
);
