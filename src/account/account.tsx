import * as React from 'react';
import * as GovUK from 'govuk-react';
import {Route, Routes} from "react-router";

const Account: React.FC = () => (
    <Routes>
        <Route path="/" element={
            <>
            <GovUK.H2>Account</GovUK.H2>
            <GovUK.Paragraph>This is the account page</GovUK.Paragraph>
            </>
        }
        />
    </Routes>
);

export default Account;