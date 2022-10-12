const fs = require('fs');
import { marked } from 'marked';

export const readFile = (path) => {
  let content = fs.readFileSync(path, 'utf8');
  return content;
}

export const md2html = (markdown) => {
  return marked.parse(markdown);
}

export const readFileAndRenderHtml = (path) => {
  return md2html(readFile(path));
}