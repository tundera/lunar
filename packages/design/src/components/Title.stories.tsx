import React from "react";
import { Title } from "ui_library/components/Title";
import { CenteredContentWrapper } from "ui_library/helpers/CenteredContentWrapper";
import { Background } from "ui_library/elements/Background";
import "../index.css";

const defaultTitle = "Let us up your game";
const defaultSubheading = "Services";

export const JustTitle = () => (
  <Title subheading={defaultSubheading} title={defaultTitle} />
);
export const withConfetti = () => (
  <CenteredContentWrapper>
    <Title subheading={defaultSubheading} title={defaultTitle} />
  </CenteredContentWrapper>
);

export const withConfettiAndBackground = () => (
  <CenteredContentWrapper>
    <Background />
    <Title subheading={defaultSubheading} title={defaultTitle} />
  </CenteredContentWrapper>
);

export default { title: "Components/Title" };
