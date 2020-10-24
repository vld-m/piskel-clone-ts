export function isHTMLElement(element: EventTarget): element is HTMLElement {
  return element instanceof HTMLElement;
}
