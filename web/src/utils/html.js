import React, {
  Component,
  useState,
  memo,
  useRef,
  isValidElement,
  useEffect,
} from "react";

export function TheHtml(html) {
  return isValidElement(html) ? (
    html
  ) : (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
export function removeHTMLTags(html) {
  return html.replace(/<[^>]*>/g, "");
}
