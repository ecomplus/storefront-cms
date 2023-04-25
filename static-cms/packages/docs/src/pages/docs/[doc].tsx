import { styled, useTheme } from '@mui/material/styles';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

import BetaImage from '../../components/docs/BetaImage';
import DocsContent from '../../components/docs/DocsContent';
import DocsLeftNav from '../../components/docs/DocsLeftNav';
import DocsRightNav from '../../components/docs/DocsRightNav';
import Alert from '../../components/docs/components/Alert';
import Anchor from '../../components/docs/components/Anchor';
import Blockquote from '../../components/docs/components/Blockquote';
import CodeTabs from '../../components/docs/components/CodeTabs';
import Deprecated from '../../components/docs/components/Deprecated';
import Template from '../../components/docs/components/Template';
import Templates from '../../components/docs/components/Templates';
import Header1 from '../../components/docs/components/headers/Header1';
import Header2 from '../../components/docs/components/headers/Header2';
import Header3 from '../../components/docs/components/headers/Header3';
import Header4 from '../../components/docs/components/headers/Header4';
import Header5 from '../../components/docs/components/headers/Header5';
import Header6 from '../../components/docs/components/headers/Header6';
import DocsTable from '../../components/docs/components/table/Table';
import TableBody from '../../components/docs/components/table/TableBody';
import TableBodyCell from '../../components/docs/components/table/TableBodyCell';
import TableHead from '../../components/docs/components/table/TableHead';
import TableHeaderCell from '../../components/docs/components/table/TableHeaderCell';
import Page from '../../components/layout/Page';
import { fetchDocsContent, getSearchablePages } from '../../lib/docs';

import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { GetStaticPaths, GetStaticProps } from 'next/types';
import type { DocsGroup, DocsPage, SearchablePage } from '../../interface';

const StyledDocsView = styled('div')(
  ({ theme }) => `
    display: grid;
    grid-template-columns: calc(100% - 240px) 240px;
    margin-left: 280px;
    width: calc(100% - 280px);
    padding-top: 16px;

    ${theme.breakpoints.down('lg')} {
      margin-left: 0;
      padding-top: 24px;
      width: 100vw;
    }

    ${theme.breakpoints.down('md')} {
      grid-template-columns: 1fr;
    }
  `,
);

const StyledDocsContentWrapper = styled('main')(
  ({ theme }) => `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    margin-bottom: 40px;

    ${theme.breakpoints.between('md', 'lg')} {
      width: calc(100vw - 250px);
    }

    ${theme.breakpoints.down('lg')} {
      margin-bottom: 32px;
    }

    ${theme.breakpoints.down('md')} {
      width: 100vw;
    }
  `,
);

interface DocsProps {
  docsGroups: DocsGroup[];
  searchablePages: SearchablePage[];
  title: string;
  slug: string;
  beta: boolean;
  description: string;
  source: MDXRemoteSerializeResult;
}

const Docs = ({
  docsGroups,
  searchablePages,
  title,
  slug,
  description,
  source,
  beta,
}: DocsProps) => {
  const theme = useTheme();

  return (
    <Page
      title={title}
      url={`/docs/${slug}`}
      description={description}
      docsGroups={docsGroups}
      searchablePages={searchablePages}
      fullWidth
    >
      <DocsLeftNav docsGroups={docsGroups} />
      <StyledDocsView className={theme.palette.mode}>
        <StyledDocsContentWrapper>
          <DocsContent>
            <Header1>
              {title}
              {beta ? <BetaImage /> : null}
            </Header1>
            <MDXRemote
              {...source}
              components={{
                h1: Header1,
                h2: Header2,
                h3: Header3,
                h4: Header4,
                h5: Header5,
                h6: Header6,
                blockquote: Blockquote,
                table: DocsTable,
                thead: TableHead,
                tbody: TableBody,
                th: TableHeaderCell,
                td: TableBodyCell,
                a: Anchor,
                CodeTabs,
                Alert,
                Template,
                Templates,
                BetaImage,
                Deprecated,
              }}
            />
          </DocsContent>
        </StyledDocsContentWrapper>
        <DocsRightNav />
      </StyledDocsView>
    </Page>
  );
};

export default Docs;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchDocsContent()[0].map(docs => `/docs/${docs.data.slug}`);
  return {
    paths,
    fallback: false,
  };
};

const buildSlugToDocsContent = (docsContents: DocsPage[]) => {
  const hash: Record<string, DocsPage> = {};
  docsContents.forEach(docs => (hash[docs.data.slug] = docs));
  return hash;
};

let slugToDocsContent = buildSlugToDocsContent(fetchDocsContent()[0]);
let docsGroups = fetchDocsContent()[1];

export const getStaticProps: GetStaticProps = async ({ params }): Promise<{ props: DocsProps }> => {
  const slug = params?.doc as string;

  if (process.env.NODE_ENV === 'development') {
    slugToDocsContent = buildSlugToDocsContent(fetchDocsContent()[0]);
    docsGroups = fetchDocsContent()[1];
  }

  const { content, data } = slugToDocsContent[slug];
  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });

  return {
    props: {
      docsGroups,
      searchablePages: getSearchablePages(),
      title: data.title,
      slug: data.slug,
      beta: data.beta ?? false,
      description: '',
      source,
    },
  };
};
