import { Accordion } from "melt/builders";

export const accordionContextKey = Symbol("pinya-accordion-context");

export type AccordionInstance = InstanceType<typeof Accordion>;
export type AccordionContext = AccordionInstance["getItem"];
