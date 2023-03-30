import { useDHConnect } from '@daohaus/connect';
import { FormBuilder } from '@daohaus/form-builder';
import {
  Bold,
  Button,
  FieldAlert,
  H2,
  ParLg,
  ParMd,
  SingleColumnLayout,
  Spinner,
} from '@daohaus/ui';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { TARGET_DAO } from '../constants';
import { customFields } from '../legos/config';
import { FORM } from '../legos/forms';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useMembership } from '../hooks/useMembership';
import { useShamanData } from '../hooks/useShamanData';

export const Claim = () => {
  const { chainId, switchNetwork, isConnected, connectWallet, address } =
    useDHConnect();

  const wrongNetwork = chainId !== TARGET_DAO.CHAIN_ID;
  const { isMember, isLoading: isMemberLoading } = useMembership({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    memberAddress: address,
  });

  const { shaman, isLoading: isShamanLoading } = useShamanData({
    shamanAddress: TARGET_DAO.ROS_V2_SHAMAN,
  });

  const isLoadingAny = isMemberLoading || isShamanLoading;

  if (isLoadingAny)
    return (
      <SingleColumnLayout>
        <H2>Loading</H2>
        <Spinner size="12rem" />
      </SingleColumnLayout>
    );

  if (!isConnected) {
    return (
      <WarningDisplay
        title="Not Connected"
        topLineText={`Connect your wallet to claim make a claim`}
        TopLineEl={
          <Button size="sm" onClick={connectWallet}>
            Connect
          </Button>
        }
      />
    );
  }
  if (wrongNetwork) {
    return (
      <WarningDisplay
        title="Wrong Network"
        topLineText={`This DAO is on ${TARGET_DAO.CHAIN_NAME}`}
        TopLineEl={
          <Button size="sm" onClick={() => switchNetwork(TARGET_DAO.CHAIN_ID)}>
            Switch Network
          </Button>
        }
      />
    );
  }

  if (!isMember) {
    return (
      <WarningDisplay
        title="Not a Member"
        topLineText={`Only members can make claims in this DAO`}
      />
    );
  }

  if (shaman?.isLocked) {
    return (
      <WarningDisplay
        title="Claims are Locked"
        topLineText={`Project team lead has locked the claim module for this DAO`}
      />
    );
  }

  return <FormBuilder form={FORM.CLAIM} customFields={customFields} />;
};

const PageAlert = styled(FieldAlert)`
  width: 100%;
  margin-bottom: 2rem;
  flex-direction: column;
  align-items: flex-start;

  .top-section {
    display: flex;
    align-items: center;
    width: 100%;
    svg {
      margin-right: 1rem;
    }
    .top-line-el {
      margin-left: auto;
    }
  }
  .action-section {
    display: flex;
    align-items: center;
    width: 100%;
  }
`;

const WarningDisplay = ({
  topLineText,
  TopLineEl,
  title,
  bottomSection,
}: {
  title: string;
  topLineText: string;
  TopLineEl?: ReactNode;
  bottomSection?: ReactNode | string;
}) => {
  return (
    <SingleColumnLayout>
      <H2 className="mb-lg">{title}</H2>
      <PageAlert message="" className="warning">
        <div className="top-section">
          <HiOutlineExclamationCircle size="2rem" />
          <ParMd>{topLineText}</ParMd>
          <div className="top-line-el">{TopLineEl}</div>
        </div>
        <div className="bottom-section">{bottomSection}</div>
      </PageAlert>
    </SingleColumnLayout>
  );
};
