import { mdx } from "@mdx-js/react";
import { css, cx } from "linaria";
import React from "react";
import * as Icons from "react-feather";
import { Code } from "../../Code";

interface Props {
  src: string;
  code?: string;
}

function Caption(props: Props) {
  const { src, code } = props;

  const [codeRef, setCodeRef] = React.useState<null | HTMLDivElement>(null);

  return (
    <>
      <figcaption
        className={css`
          font-size: 0.75rem;
          color: #999;
          white-space: nowrap;

          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <div>
          Source:{" "}
          {mdx("a", { href: src, target: "_blank"}, src)}
        </div>

        {code && (
          <div
            className={css`
              cursor: pointer;
              &:hover {
                color: var(--c-p-4);
                opacity: 1;
              }

              & > svg {
                display: block;
              }
            `}
            onClick={() => {
              if (codeRef) {
                const infoParent = codeRef.parentElement;

                if (infoParent.style.height === "0px") {
                  infoParent.style.height = `${codeRef.getBoundingClientRect().height}px`;
                  infoParent.style.opacity = "1";
                } else {
                  infoParent.style.height = "0px";
                  infoParent.style.opacity = "0";
                }
              }
            }}
          >
            <Icons.Code size={"1.6em"} />
          </div>
        )}
      </figcaption>

      {code && (
        <div
          className={cx(
            css`
              overflow: hidden;
              transition: height 0.2s, opacity 0.2s 0.1s;
            `
          )}
          style={{ height: 0, opacity: 0 }}
        >
          <div
            ref={setCodeRef}
            className={cx(
              css`
                margin-top: 12px;
              `
            )}
          >
            <Code language="jsx">{code}</Code>
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(Caption);
