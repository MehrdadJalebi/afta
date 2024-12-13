'use client';

import { css } from '@emotion/react';
import type { ReactNode } from 'react';

import { themeVariables } from 'src/styles/bootstrap/variables';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div css={authLayoutBox}>
      <div css={authFormContainer}>{children}</div>
    </div>
  );
}

const authLayoutBox = css`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const authFormContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  margin: 2rem;
  padding: 2rem;
  flex: 3;
  border-radius: 1rem;
  box-shadow: ${themeVariables.boxShadows.shadowOne};
  @media (max-width: ${themeVariables.breakpoints.lg}) {
    padding: 1.5rem;
    margin: 0;
    border-radius: 0;
  }
`;
