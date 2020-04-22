import React from "react";
import { Font } from "..";
import { Code } from "../../Code";

export default (props: Partial<React.ComponentPropsWithoutRef<typeof Font>>) => {
  return (
    <Font
      name="Heading 1"
      font={{ style: { fontFamily: "system-ui", fontWeight: 700, fontSize: "5vw", lineHeight: 1.3 } }}
      info={
        <>
          <p>
            Heading 1 is used for this and that. Its font size is defined in terms of viewport width, as such it
            automatically scales with the viewport.
          </p>

          <Code language="css">{`font-family: system-ui;
font-weight: 700;
font-size: 5vw;
line-height: 1.3;`}</Code>
        </>
      }
      {...props}
    >
      Lateropulsion
    </Font>
  );
};