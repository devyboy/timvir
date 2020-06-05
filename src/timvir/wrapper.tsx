import { MDXProviderComponents } from "@mdx-js/react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Code } from "../components/Code";
import { Search } from "../components/Search";
import { defaultSearch } from "../components/Search/Search";
import { Page } from "../packages/core";
import toc from "./toc";
import routes from "./routes";

const search = {
  Component: (props: { open: boolean }) => (
    <Search location={useRouter()} Link={Link} toc={toc} {...props} {...defaultSearch(toc)} />
  ),
};

const mdxComponents: MDXProviderComponents = {
  code: (props) => {
    const [, language = "markdown"] = (props.className || "").match(/^language-(.*)$/) || [];
    return <Code language={language}>{props.children}</Code>;
  },
};

export default ({ children }) => (
  <Page location={useRouter()} Link={Link_ as any} toc={toc} search={search} mdxComponents={mdxComponents}>
    {children}
  </Page>
);

const getHref = (to: string) => {
  if (routes[to]) {
    return to;
  } else {
    for (const [pathname, re] of Object.entries(routes)) {
      const match = to.match(re);
      if (match) {
        return { pathname, query: { ...match.groups } };
      }
    }
  }
};

function Link_(props: LinkProps) {
  if (typeof props.href === "string") {
    return <Link {...props} href={getHref(props.href)} as={props.href} />;
  } else {
    return <Link {...props} />;
  }
}
