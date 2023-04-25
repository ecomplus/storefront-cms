import fs from 'fs';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import path from 'path';

import { getAnchor } from '../components/docs/components/headers/hooks/useAnchor';
import { SUMMARY_MIN_PARAGRAPH_LENGTH } from '../constants';
import menu from './menu';

import type { GetStaticProps } from 'next';
import type {
  DocsData,
  DocsGroup,
  DocsGroupLink,
  DocsPage,
  FileMatter,
  SearchablePage,
} from '../interface';

export interface SearchProps {
  searchablePages: SearchablePage[];
}

export interface DocsMenuProps extends SearchProps {
  docsGroups: DocsGroup[];
}

const docsDirectory = path.join(process.cwd(), 'content/docs');

let docsMatterCache: FileMatter[];
let docsCache: [DocsPage[], DocsGroup[]];

export function fetchDocsMatter(): FileMatter[] {
  if (docsMatterCache && process.env.NODE_ENV !== 'development') {
    return docsMatterCache;
  }
  // Get file names under /docs
  const fileNames = fs.readdirSync(docsDirectory);
  const allDocsMatter = fileNames
    .filter(it => it.endsWith('.mdx'))
    .map(fileName => {
      // Read file as string
      const fullPath = path.join(docsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the doc metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: s => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      return { fileName, fullPath, matterResult };
    });

  // Sort docs by date
  docsMatterCache = allDocsMatter.sort(
    (a, b) => a.matterResult.data.weight - b.matterResult.data.weight,
  );

  return docsMatterCache;
}

function getHeadings(content: string): string[] {
  const headingRegex = /^## ([^\n]+)/gm;
  let matches = headingRegex.exec(content);

  const headings: string[] = [];
  while (matches && matches.length === 2) {
    headings.push(matches[1]);
    matches = headingRegex.exec(content);
  }

  return headings;
}

function getTextContent(content: string): string {
  const textContentRegex =
    /^(?:-|\*|\n)((?!```|<| |const|interface|export|import|let|var|CMS\.)(?:[`\-# {*]*)[a-zA-Z]+[^|\n]+)$/gm;
  let matches = textContentRegex.exec(content);

  const paragraphs: string[] = [];
  while (matches && matches.length === 2) {
    paragraphs.push(
      matches[1]
        .replace(/(^- )|(`)|(^[#]+ )|(\*\*)|((?<= )_)|(^_)|(_(?=[ .]{1}))|(_$)/gm, '')
        .replace(/\[([^\]]+)\]\((?:[^)]+)\)/gm, '$1'),
    );
    matches = textContentRegex.exec(content);
  }

  return paragraphs.join('\n');
}

export function fetchDocsContent(): [DocsPage[], DocsGroup[]] {
  if (docsCache && process.env.NODE_ENV !== 'development') {
    return docsCache;
  }

  const allDocsData: DocsPage[] = fetchDocsMatter().map(
    ({ fileName, fullPath, matterResult: { data, content } }) => {
      const slug = fileName.replace(/\.mdx$/, '');

      const summaryRegex = /^<p>([\w\W]+?)<\/p>/i;
      let summaryMatch = summaryRegex.exec(content);

      const htmlSummaryRegex =
        /^([\s\n]*(?:<(?:p|ul|ol|h1|h2|h3|h4|h5|h6|div)>(?:[\s\S])*?<\/(?:p|ul|ol|h1|h2|h3|h4|h5|h6|div)>[\s\n]*){1,2})/i;
      if (
        !summaryMatch ||
        summaryMatch.length < 2 ||
        summaryMatch[1].length < SUMMARY_MIN_PARAGRAPH_LENGTH
      ) {
        summaryMatch = htmlSummaryRegex.exec(content);
      }

      return {
        fullPath,
        data: {
          ...data,
          slug,
        } as DocsData,
        textContent: getTextContent(content),
        headings: getHeadings(content).map(heading => ({
          title: heading,
          anchor: getAnchor(heading),
        })),
        content,
      };
    },
  );

  const pagesByGroup: Record<string, DocsGroupLink[]> = allDocsData.reduce((acc, doc) => {
    if (!(doc.data.group in acc)) {
      acc[doc.data.group] = [];
    }
    acc[doc.data.group].push({
      title: doc.data.title,
      slug: doc.data.slug,
      beta: doc.data.beta ?? false,
    });
    return acc;
  }, {} as Record<string, DocsGroupLink[]>);

  const docsGroups: DocsGroup[] = menu.docs.map(group => ({
    ...group,
    links: pagesByGroup[group.name] ?? [],
  }));

  docsCache = [allDocsData, docsGroups];

  return docsCache;
}

export function getSearchablePages(): SearchablePage[] {
  const pages = fetchDocsContent()[0];

  return pages.map(page => ({
    title: page.data.title,
    textContent: page.textContent,
    url: `/docs/${page.data.slug}`,
    headings: page.headings,
  }));
}

export const getSearchStaticProps: GetStaticProps = (): { props: SearchProps } => {
  return {
    props: {
      searchablePages: getSearchablePages(),
    },
  };
};

export const getDocsMenuStaticProps: GetStaticProps = (): { props: DocsMenuProps } => {
  return {
    props: {
      docsGroups: fetchDocsContent()[1],
      searchablePages: getSearchablePages(),
    },
  };
};
