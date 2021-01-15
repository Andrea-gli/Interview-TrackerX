import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../routes/useAuth';
import ApplicationsTable from './Applications/ApplicationsTable';
import PageLayout from '../../common/PageLayout';
import styled from 'styled-components';
import {
  StyledFormLabel,
  StyledFormInput,
  StyledFormPWDInput,
  StyledButton,
  StyledFormWrapper,
  StyledH1,
  StyledH3,
  StyledSpinner,
  StyledTableWrapper,
} from '../../common';

const H1 = styled(StyledH1)`
  margin-bottom: 20px;
`;

const H3 = styled(StyledH3)``;

const DashboardContainer = () => {
  const auth = useAuth();

  return (
    <PageLayout>
      <H1 center>Applications Dashboard</H1>
      <>
        {auth.user.id ? (
          <ApplicationsTable />
        ) : (
          <H3 light>
            Sign in first <Link to="/signin">here</Link>
          </H3>
        )}
      </>
    </PageLayout>
  );
};
export default DashboardContainer;
