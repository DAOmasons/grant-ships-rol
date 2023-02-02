import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ParMd } from '@daohaus/ui';
const Container = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 1rem;
    color: ${(props) => props.theme.warning.step11};
  }
`;

export const MetadataWarning = ({ text }: { text: string }) => {
  return (
    <Container>
      <HiOutlineExclamationCircle size="2rem" />
      <ParMd className="warning">{text}</ParMd>
    </Container>
  );
};
