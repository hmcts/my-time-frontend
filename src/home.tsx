import * as React from 'react';
import * as GovUK from 'govuk-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <>
    <GovUK.Paragraph>Click Start to continue.</GovUK.Paragraph>
    <GovUK.Button start as={Link} to="/forms">
      Start now
    </GovUK.Button>
  </>
);

export default Home;
