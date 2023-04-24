import escapeRegExp from 'lodash/escapeRegExp';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';

import { selectEntrySlug } from './util/collection.util';
import { set } from './util/object.util';

import type {
  BaseField,
  Collection,
  Entry,
  EntryData,
  Field,
  I18nInfo,
  I18nStructure,
  i18nCollection,
} from '../interface';
import type { EntryDraftState } from '../reducers/entryDraft';

export const I18N = 'i18n';

export const I18N_STRUCTURE_MULTIPLE_FOLDERS = 'multiple_folders';
export const I18N_STRUCTURE_MULTIPLE_FILES = 'multiple_files';
export const I18N_STRUCTURE_SINGLE_FILE = 'single_file';

export const I18N_FIELD_TRANSLATE = 'translate';
export const I18N_FIELD_DUPLICATE = 'duplicate';
export const I18N_FIELD_NONE = 'none';

export function hasI18n<EF extends BaseField>(
  collection: Collection<EF> | i18nCollection<EF>,
): collection is i18nCollection<EF> {
  return I18N in collection;
}

export function getI18nInfo<EF extends BaseField>(collection: i18nCollection<EF>): I18nInfo;
export function getI18nInfo<EF extends BaseField>(collection: Collection<EF>): I18nInfo | null;
export function getI18nInfo<EF extends BaseField>(
  collection: Collection<EF> | i18nCollection<EF>,
): I18nInfo | null {
  if (!hasI18n(collection) || typeof collection[I18N] !== 'object') {
    return null;
  }
  return collection.i18n;
}

export function getI18nFilesDepth<EF extends BaseField>(collection: Collection<EF>, depth: number) {
  const { structure } = getI18nInfo(collection) as I18nInfo;
  if (structure === I18N_STRUCTURE_MULTIPLE_FOLDERS) {
    return depth + 1;
  }
  return depth;
}

export function isFieldTranslatable(field: Field, locale?: string, defaultLocale?: string) {
  return locale !== defaultLocale && field.i18n === I18N_FIELD_TRANSLATE;
}

export function isFieldDuplicate(field: Field, locale?: string, defaultLocale?: string) {
  return locale !== defaultLocale && field.i18n === I18N_FIELD_DUPLICATE;
}

export function isFieldHidden(field: Field, locale?: string, defaultLocale?: string) {
  return locale !== defaultLocale && field.i18n === I18N_FIELD_NONE;
}

export function getLocaleDataPath(locale: string) {
  return [I18N, locale, 'data'];
}

export function getDataPath(locale: string, defaultLocale: string) {
  const dataPath = locale !== defaultLocale ? getLocaleDataPath(locale) : ['data'];
  return dataPath;
}

export function getFilePath(
  structure: I18nStructure,
  extension: string,
  path: string,
  slug: string,
  locale: string,
) {
  switch (structure) {
    case I18N_STRUCTURE_MULTIPLE_FOLDERS:
      return path.replace(`/${slug}`, `/${locale}/${slug}`);
    case I18N_STRUCTURE_MULTIPLE_FILES:
      return path.replace(new RegExp(`${escapeRegExp(extension)}$`), `${locale}.${extension}`);
    case I18N_STRUCTURE_SINGLE_FILE:
    default:
      return path;
  }
}

export function getLocaleFromPath(structure: I18nStructure, extension: string, path: string) {
  switch (structure) {
    case I18N_STRUCTURE_MULTIPLE_FOLDERS: {
      const parts = path.split('/');
      // filename
      parts.pop();
      // locale
      return parts.pop();
    }
    case I18N_STRUCTURE_MULTIPLE_FILES: {
      const parts = path.slice(0, -`.${extension}`.length);
      return parts.split('.').pop();
    }
    case I18N_STRUCTURE_SINGLE_FILE:
    default:
      return '';
  }
}

export function getFilePaths<EF extends BaseField>(
  collection: Collection<EF>,
  extension: string,
  path: string,
  slug: string,
) {
  const { structure, locales } = getI18nInfo(collection) as I18nInfo;

  if (structure === I18N_STRUCTURE_SINGLE_FILE) {
    return [path];
  }

  const paths = locales.map(locale =>
    getFilePath(structure as I18nStructure, extension, path, slug, locale),
  );

  return paths;
}

export function normalizeFilePath(structure: I18nStructure, path: string, locale: string) {
  switch (structure) {
    case I18N_STRUCTURE_MULTIPLE_FOLDERS:
      return path.replace(`${locale}/`, '');
    case I18N_STRUCTURE_MULTIPLE_FILES:
      return path.replace(`.${locale}`, '');
    case I18N_STRUCTURE_SINGLE_FILE:
    default:
      return path;
  }
}

export function getI18nFiles<EF extends BaseField>(
  collection: Collection<EF>,
  extension: string,
  entryDraft: Entry,
  entryToRaw: (entryDraft: Entry) => string,
  path: string,
  slug: string,
  newPath?: string,
) {
  const {
    structure = I18N_STRUCTURE_SINGLE_FILE,
    defaultLocale,
    locales,
  } = getI18nInfo(collection) as I18nInfo;

  if (structure === I18N_STRUCTURE_SINGLE_FILE) {
    const data = locales.reduce((map, locale) => {
      const dataPath = getDataPath(locale, defaultLocale);
      if (map) {
        map[locale] = get(entryDraft, dataPath);
      }
      return map;
    }, {} as EntryData);

    entryDraft.data = data;

    return [
      {
        path: getFilePath(structure, extension, path, slug, locales[0]),
        slug,
        raw: entryToRaw(entryDraft),
        ...(newPath && {
          newPath: getFilePath(structure, extension, newPath, slug, locales[0]),
        }),
      },
    ];
  }

  const dataFiles = locales
    .map(locale => {
      const dataPath = getDataPath(locale, defaultLocale);
      entryDraft.data = get(entryDraft, dataPath);
      return {
        path: getFilePath(structure, extension, path, slug, locale),
        slug,
        raw: entryDraft.data ? entryToRaw(entryDraft) : '',
        ...(newPath && {
          newPath: getFilePath(structure, extension, newPath, slug, locale),
        }),
      };
    })
    .filter(dataFile => dataFile.raw);
  return dataFiles;
}

export function getI18nBackup(
  collection: Collection,
  entry: Entry,
  entryToRaw: (entry: Entry) => string,
) {
  const { locales, defaultLocale } = getI18nInfo(collection) as I18nInfo;

  const i18nBackup = locales
    .filter(l => l !== defaultLocale)
    .reduce((acc, locale) => {
      const dataPath = getDataPath(locale, defaultLocale);
      const data = get(entry, dataPath);
      if (!data) {
        return acc;
      }
      return {
        ...acc,
        [locale]: {
          raw: entryToRaw({
            ...entry,
            data,
          }),
        },
      };
    }, {} as Record<string, { raw: string }>);

  return i18nBackup;
}

export function formatI18nBackup(
  i18nBackup: Record<string, { raw: string }>,
  formatRawData: (raw: string) => Entry,
) {
  const i18n = Object.entries(i18nBackup).reduce((acc, [locale, { raw }]) => {
    const entry = formatRawData(raw);
    return { ...acc, [locale]: { data: entry.data } };
  }, {});

  return i18n;
}

function mergeValues<EF extends BaseField>(
  collection: Collection<EF>,
  structure: I18nStructure,
  defaultLocale: string,
  values: { locale: string; value: Entry }[],
) {
  let defaultEntry = values.find(e => e.locale === defaultLocale);
  if (!defaultEntry) {
    defaultEntry = values[0];
    console.warn(`[StaticCMS] Could not locale entry for default locale '${defaultLocale}'`);
  }
  const i18n = values
    .filter(e => e.locale !== defaultEntry!.locale)
    .reduce((acc, { locale, value }) => {
      const dataPath = getLocaleDataPath(locale);
      return set(acc, dataPath.join('.'), value.data);
    }, {});

  const path = normalizeFilePath(structure, defaultEntry.value.path, defaultLocale);
  const slug = selectEntrySlug(collection, path) as string;
  const entryValue: Entry = {
    ...defaultEntry.value,
    raw: '',
    ...i18n,
    path,
    slug,
  };

  return entryValue;
}

function mergeSingleFileValue(entryValue: Entry, defaultLocale: string, locales: string[]): Entry {
  const data = (entryValue.data?.[defaultLocale] ?? {}) as EntryData;
  const i18n = locales
    .filter(l => l !== defaultLocale)
    .map(l => ({ locale: l, value: entryValue.data?.[l] }))
    .filter(e => e.value)
    .reduce((acc, e) => {
      return { ...acc, [e.locale]: { data: e.value } };
    }, {});

  return {
    ...entryValue,
    data,
    i18n,
    raw: '',
  };
}

export async function getI18nEntry<EF extends BaseField>(
  collection: Collection<EF>,
  extension: string,
  path: string,
  slug: string,
  getEntryValue: (path: string) => Promise<Entry>,
) {
  const {
    structure = I18N_STRUCTURE_SINGLE_FILE,
    locales,
    defaultLocale,
  } = getI18nInfo(collection) as I18nInfo;

  let entryValue: Entry;
  if (structure === I18N_STRUCTURE_SINGLE_FILE) {
    entryValue = mergeSingleFileValue(await getEntryValue(path), defaultLocale, locales);
  } else {
    const entryValues = await Promise.all(
      locales.map(async locale => {
        const entryPath = getFilePath(structure, extension, path, slug, locale);
        const value = await getEntryValue(entryPath).catch(() => null);
        return { value, locale };
      }),
    );

    const nonNullValues = entryValues.filter(e => e.value !== null) as {
      value: Entry;
      locale: string;
    }[];

    entryValue = mergeValues(collection, structure, defaultLocale, nonNullValues);
  }

  return entryValue;
}

export function groupEntries<EF extends BaseField>(
  collection: Collection<EF>,
  extension: string,
  entries: Entry[],
): Entry[] {
  const {
    structure = I18N_STRUCTURE_SINGLE_FILE,
    defaultLocale,
    locales,
  } = getI18nInfo(collection) as I18nInfo;
  if (structure === I18N_STRUCTURE_SINGLE_FILE) {
    return entries.map(e => mergeSingleFileValue(e, defaultLocale, locales));
  }

  const grouped = groupBy(
    entries.map(e => ({
      locale: getLocaleFromPath(structure, extension, e.path) as string,
      value: e,
    })),
    ({ locale, value: e }) => {
      return normalizeFilePath(structure, e.path, locale);
    },
  );

  const groupedEntries = Object.values(grouped).reduce((acc, values) => {
    const entryValue = mergeValues(collection, structure, defaultLocale, values);
    return [...acc, entryValue];
  }, [] as Entry[]);

  return groupedEntries;
}

export function getI18nDataFiles(
  collection: Collection,
  extension: string,
  path: string,
  slug: string,
  diffFiles: { path: string; id: string; newFile: boolean }[],
) {
  const { structure } = getI18nInfo(collection) as I18nInfo;
  if (structure === I18N_STRUCTURE_SINGLE_FILE) {
    return diffFiles;
  }
  const paths = getFilePaths(collection, extension, path, slug);
  const dataFiles = paths.reduce((acc, path) => {
    const dataFile = diffFiles.find(file => file.path === path);
    if (dataFile) {
      return [...acc, dataFile];
    } else {
      return [...acc, { path, id: '', newFile: false }];
    }
  }, [] as { path: string; id: string; newFile: boolean }[]);

  return dataFiles;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function duplicateDefaultI18nFields(collection: Collection, dataFields: any) {
  const { locales, defaultLocale } = getI18nInfo(collection) as I18nInfo;

  const i18nFields = Object.fromEntries(
    locales
      .filter(locale => locale !== defaultLocale)
      .map(locale => [locale, { data: dataFields }]),
  );

  return i18nFields;
}

export function duplicateI18nFields(
  entryDraft: EntryDraftState,
  field: Field,
  locales: string[],
  defaultLocale: string,
  fieldPath: string,
) {
  const value = get(entryDraft, ['entry', 'data', ...fieldPath.split('.')]);
  if (field.i18n === I18N_FIELD_DUPLICATE) {
    locales
      .filter(l => l !== defaultLocale)
      .forEach(l => {
        entryDraft = set(
          entryDraft,
          ['entry', ...getDataPath(l, defaultLocale), fieldPath].join('.'),
          value,
        );
      });
  }

  if ('fields' in field && !Array.isArray(value)) {
    field.fields?.forEach(field => {
      entryDraft = duplicateI18nFields(
        entryDraft,
        field,
        locales,
        defaultLocale,
        `${fieldPath}.${field.name}`,
      );
    });
  }

  return entryDraft;
}

export function getPreviewEntry(
  entry: Entry,
  locale: string | undefined,
  defaultLocale: string | undefined,
) {
  if (!locale || locale === defaultLocale) {
    return entry;
  }
  return {
    ...entry,
    data: entry.i18n?.[locale]?.data as EntryData,
  };
}

export function serializeI18n(
  collection: Collection,
  entry: Entry,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serializeValues: (data: any) => any,
) {
  const { locales, defaultLocale } = getI18nInfo(collection) as I18nInfo;

  locales
    .filter(locale => locale !== defaultLocale)
    .forEach(locale => {
      const dataPath = getLocaleDataPath(locale);
      entry = set(entry, dataPath.join('.'), serializeValues(get(entry, dataPath)));
    });

  return entry;
}
