import JsonFormatter from './JsonFormatter';
import TomlFormatter from './TomlFormatter';
import YamlFormatter from './YamlFormatter';
import { FrontmatterInfer, frontmatterJSON, frontmatterTOML, frontmatterYAML } from './frontmatter';

import type { BaseField, Collection, Entry, Format } from '../interface';
import type FileFormatter from './FileFormatter';
import type { Delimiter } from './frontmatter';

export const frontmatterFormats = ['yaml-frontmatter', 'toml-frontmatter', 'json-frontmatter'];

export const formatExtensions = {
  yml: 'yml',
  yaml: 'yml',
  toml: 'toml',
  json: 'json',
  frontmatter: 'md',
  'json-frontmatter': 'md',
  'toml-frontmatter': 'md',
  'yaml-frontmatter': 'md',
};

export const extensionFormatters: Record<string, FileFormatter> = {
  yml: YamlFormatter,
  yaml: YamlFormatter,
  toml: TomlFormatter,
  json: JsonFormatter,
  md: FrontmatterInfer,
  markdown: FrontmatterInfer,
  html: FrontmatterInfer,
};

function formatByName(name: Format, customDelimiter?: Delimiter): FileFormatter {
  const fileFormatter: Record<string, FileFormatter> = {
    yml: YamlFormatter,
    yaml: YamlFormatter,
    toml: TomlFormatter,
    json: JsonFormatter,
    frontmatter: FrontmatterInfer,
    'json-frontmatter': frontmatterJSON(customDelimiter),
    'toml-frontmatter': frontmatterTOML(customDelimiter),
    'yaml-frontmatter': frontmatterYAML(customDelimiter),
  };

  return fileFormatter[name];
}

export function resolveFormat<EF extends BaseField>(
  collection: Collection<EF>,
  entry: Entry,
): FileFormatter | undefined {
  // Check for custom delimiter
  const frontmatter_delimiter = collection.frontmatter_delimiter;

  // If the format is specified in the collection, use that format.
  const formatSpecification = collection.format;
  if (formatSpecification) {
    return formatByName(formatSpecification, frontmatter_delimiter);
  }

  // If a file already exists, infer the format from its file extension.
  const filePath = entry && entry.path;
  if (filePath) {
    const fileExtension = filePath.split('.').pop();
    if (fileExtension) {
      return extensionFormatters[fileExtension];
    }
  }

  // If creating a new file, and an `extension` is specified in the
  //   collection config, infer the format from that extension.
  const extension = collection.extension;
  if (extension) {
    return extensionFormatters[extension];
  }

  // If no format is specified and it cannot be inferred, return the default.
  return formatByName('frontmatter', frontmatter_delimiter);
}
