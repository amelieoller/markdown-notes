// Remirror extension imports
import { ListPreset } from 'remirror/preset/list';
import { BoldExtension } from 'remirror/extension/bold';
import { ItalicExtension } from 'remirror/extension/italic';
import { CodeBlockExtension } from 'remirror/extension/code-block';
import { CodeExtension } from 'remirror/extension/code';
import { HeadingExtension } from 'remirror/extension/heading';
import { BlockquoteExtension } from 'remirror/extension/blockquote';
import { UnderlineExtension } from 'remirror/extension/underline';
import { ImageExtension } from 'remirror/extension/image';
import { HorizontalRuleExtension } from 'remirror/extension/horizontal-rule';
import { LinkExtension } from 'remirror/extension/link';
import { EmojiExtension } from 'remirror/extension/emoji';
import { CorePreset } from 'remirror/preset/core';
import { EmbedPreset } from 'remirror/preset/embed';
import { TablePreset } from 'remirror/preset/table';

// Remirror language imports
import javascript from 'refractor/lang/javascript';
import jsx from 'refractor/lang/jsx';
import ruby from 'refractor/lang/ruby';
import json from 'refractor/lang/json';
import bash from 'refractor/lang/bash';
import python from 'refractor/lang/python';
import erb from 'refractor/lang/erb';
import css from 'refractor/lang/css';
import markdown from 'refractor/lang/markdown';
import regex from 'refractor/lang/regex';
import sass from 'refractor/lang/sass';
import sql from 'refractor/lang/sql';
import typescript from 'refractor/lang/typescript';
import handlebars from 'refractor/lang/handlebars';

export const EXTENSIONS = () => [
  new TablePreset(),
  new CorePreset(),
  new EmbedPreset(),
  new ListPreset(),
  new HeadingExtension(),
  new BlockquoteExtension(),
  new CodeExtension(),
  new ImageExtension(),
  new HorizontalRuleExtension(),
  new LinkExtension(),
  new BoldExtension(),
  new ItalicExtension(),
  new UnderlineExtension(),
  new EmojiExtension(),
  new CodeBlockExtension({
    supportedLanguages: [
      javascript,
      jsx,
      ruby,
      json,
      bash,
      python,
      erb,
      css,
      markdown,
      regex,
      sass,
      sql,
      typescript,
      handlebars,
    ],
  }),
];
