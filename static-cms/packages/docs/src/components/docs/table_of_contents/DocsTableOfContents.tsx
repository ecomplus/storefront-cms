import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { isNotEmpty } from '../../../util/string.util';
import DocsHeadings from './DocsHeadings';
import { getAnchor } from '../components/headers/hooks/useAnchor';

export interface Heading {
  id: string;
  title: string;
}

export interface NestedHeading extends Heading {
  items: Heading[];
}

export const getId = (headingsSoFar: string[], potentialHeading: string): string => {
  let heading = potentialHeading;

  let index = 1;
  while (headingsSoFar.includes(heading)) {
    heading = `${potentialHeading}-${index}`;
    index++;
  }

  return heading;
};

const getNestedHeadings = (
  headingElements: HTMLHeadingElement[],
  headingsSoFar: string[],
): NestedHeading[] => {
  const nestedHeadings: NestedHeading[] = [];

  headingElements.forEach(heading => {
    const { innerText } = heading;
    const title = innerText
      .replace(/\n/g, '')
      .replace(/Beta Feature$/g, '')
      .trim();

    const id = getAnchor(title);

    const finalId = getId(headingsSoFar, id);

    headingsSoFar.push(finalId);
    heading.id = finalId;

    if (heading.nodeName === 'H1' || heading.nodeName === 'H2') {
      nestedHeadings.push({ id: finalId, title, items: [] });
    } else if (heading.nodeName === 'H3' && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id: finalId,
        title,
      });
    }
  });

  return nestedHeadings;
};

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState<NestedHeading[]>([]);
  const { asPath } = useRouter();

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>('main h1, main h2, main h3'),
    );

    const headingsSoFar: string[] = [];

    // Created a list of headings, with H3s nested
    const newNestedHeadings = getNestedHeadings(headingElements, headingsSoFar);
    setNestedHeadings(newNestedHeadings);
  }, [asPath]);

  return { nestedHeadings };
};

const useIntersectionObserver = (setActiveId: (activeId: string) => void) => {
  const headingElementsRef = useRef<Record<string, IntersectionObserverEntry>>({});
  const { asPath } = useRouter();
  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>('main h1, main h2, main h3'),
    );

    if (headingElementsRef.current) {
      headingElementsRef.current = {};
    }

    const callback: IntersectionObserverCallback = headings => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current as Record<string, IntersectionObserverEntry>);

      // Get all headings that are currently visible on the page
      const visibleHeadings: IntersectionObserverEntry[] = [];
      Object.keys(headingElementsRef.current).forEach(key => {
        const headingElement = (
          headingElementsRef.current as Record<string, IntersectionObserverEntry>
        )[key];
        if (headingElement.isIntersecting && isNotEmpty(headingElement.target.textContent)) {
          visibleHeadings.push(headingElement);
        }
      });

      const getIndexFromId = (id: string) =>
        headingElements.findIndex(heading => heading.id === id);

      // If there is only one visible heading, this is our "active" heading
      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
        // If there is more than one visible heading,
        // choose the one that is closest to the top of the page
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort((a, b) =>
          getIndexFromId(a.target.id) > getIndexFromId(b.target.id) ? 1 : -1,
        );

        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -36px 0px',
    });

    headingElements.forEach(element => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [setActiveId, asPath]);
};

const StyledNav = styled('nav')(
  ({ theme }) => `
    width: 100%;
    padding: 0 20px 16px 0;
    align-self: flex-start;
    position: sticky;
    top: 0;
    max-height: calc(100vh - 72px);
    overflow-y: auto;
    top: 16px;

    ${theme.breakpoints.between('md', 'lg')} {
      top: 24px;
    }

    ${theme.breakpoints.down('md')} {
      display: none;
    }
  `,
);

const DocsTableOfContents = () => {
  const [activeId, setActiveId] = useState<string>();
  const { nestedHeadings } = useHeadingsData();
  useIntersectionObserver(setActiveId);

  return (
    <StyledNav aria-label="Table of contents">
      <DocsHeadings headings={nestedHeadings} activeId={activeId} />
    </StyledNav>
  );
};

export default DocsTableOfContents;
