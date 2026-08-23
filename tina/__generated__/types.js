export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const WorkPartsFragmentDoc = gql`
    fragment WorkParts on Work {
  __typename
  title
  category
  image
  link
  description
  gallery
  meta_description
  body
}
    `;
export const PagesPartsFragmentDoc = gql`
    fragment PagesParts on Pages {
  __typename
  title
  meta_description
  heroTitle
  backgroundVideo
  buttons {
    __typename
    text
    link
    isExternal
  }
}
    `;
export const AboutPartsFragmentDoc = gql`
    fragment AboutParts on About {
  __typename
  title
  meta_description
  body
  contactLinks {
    __typename
    text
    link
    isExternal
  }
}
    `;
export const Work_PagePartsFragmentDoc = gql`
    fragment Work_pageParts on Work_page {
  __typename
  title
  meta_description
  subtitle
}
    `;
export const ContactPartsFragmentDoc = gql`
    fragment ContactParts on Contact {
  __typename
  title
  meta_description
  body
  actionButton {
    __typename
    text
    link
  }
}
    `;
export const WorkDocument = gql`
    query work($relativePath: String!) {
  work(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...WorkParts
  }
}
    ${WorkPartsFragmentDoc}`;
export const WorkConnectionDocument = gql`
    query workConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: WorkFilter) {
  workConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...WorkParts
      }
    }
  }
}
    ${WorkPartsFragmentDoc}`;
export const PagesDocument = gql`
    query pages($relativePath: String!) {
  pages(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PagesParts
  }
}
    ${PagesPartsFragmentDoc}`;
export const PagesConnectionDocument = gql`
    query pagesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PagesFilter) {
  pagesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PagesParts
      }
    }
  }
}
    ${PagesPartsFragmentDoc}`;
export const AboutDocument = gql`
    query about($relativePath: String!) {
  about(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...AboutParts
  }
}
    ${AboutPartsFragmentDoc}`;
export const AboutConnectionDocument = gql`
    query aboutConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AboutFilter) {
  aboutConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...AboutParts
      }
    }
  }
}
    ${AboutPartsFragmentDoc}`;
export const Work_PageDocument = gql`
    query work_page($relativePath: String!) {
  work_page(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...Work_pageParts
  }
}
    ${Work_PagePartsFragmentDoc}`;
export const Work_PageConnectionDocument = gql`
    query work_pageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: Work_pageFilter) {
  work_pageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...Work_pageParts
      }
    }
  }
}
    ${Work_PagePartsFragmentDoc}`;
export const ContactDocument = gql`
    query contact($relativePath: String!) {
  contact(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ContactParts
  }
}
    ${ContactPartsFragmentDoc}`;
export const ContactConnectionDocument = gql`
    query contactConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ContactFilter) {
  contactConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ContactParts
      }
    }
  }
}
    ${ContactPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    work(variables, options) {
      return requester(WorkDocument, variables, options);
    },
    workConnection(variables, options) {
      return requester(WorkConnectionDocument, variables, options);
    },
    pages(variables, options) {
      return requester(PagesDocument, variables, options);
    },
    pagesConnection(variables, options) {
      return requester(PagesConnectionDocument, variables, options);
    },
    about(variables, options) {
      return requester(AboutDocument, variables, options);
    },
    aboutConnection(variables, options) {
      return requester(AboutConnectionDocument, variables, options);
    },
    work_page(variables, options) {
      return requester(Work_PageDocument, variables, options);
    },
    work_pageConnection(variables, options) {
      return requester(Work_PageConnectionDocument, variables, options);
    },
    contact(variables, options) {
      return requester(ContactDocument, variables, options);
    },
    contactConnection(variables, options) {
      return requester(ContactConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/2.4/content/600328db-6ac1-42b6-adea-85d038fa5aa3/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
