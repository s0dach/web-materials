import { remark } from "remark";

import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import remarkHtml from "remark-html";

export function markdownToHtml(markdownText) {
  const file = remark().use(remarkHtml).processSync(markdownText);
  return String(file);
}

export function htmlToMarkdown(htmlText) {
  const file = remark()
    .use(rehypeParse, { emitParseErrors: true, duplicateAttribute: false })
    .use(rehypeRemark)
    .use(remarkStringify)
    .processSync(htmlText);

  return String(file);
}
