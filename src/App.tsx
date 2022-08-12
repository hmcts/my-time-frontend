import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router';
import * as GovUK from 'govuk-react';

import { Link } from 'react-router-dom';

import Home from './home';
import Forms from './forms/forms';

function App() {
    return (
        <div className="App">
              <MyTimeApp />
        </div>
    );
}

const MyTimeApp: React.FC<MyTimeAppProps> = ({ routerEntries }: MyTimeAppProps) => (
    <React.StrictMode>
        <Router initialEntries={routerEntries}>
            <GovUK.GlobalStyle />
            <GovUK.TopNav
                serviceTitle={
                    <GovUK.TopNav.Anchor as={Link} to="/">
                        React
                    </GovUK.TopNav.Anchor>
                }
                search={
                    <GovUK.SearchBox>
                        {/*// @ts-ignore*/}
                        <GovUK.SearchBox.Input placeholder="Search GOV.UK" />
                        {/*// @ts-ignore*/}
                        <GovUK.SearchBox.Button />
                    </GovUK.SearchBox>
                }
            >
                <GovUK.TopNav.NavLink as={Link} to="/">
                    Home
                </GovUK.TopNav.NavLink>
                <GovUK.TopNav.NavLink as={Link} to="/forms">
                    Forms
                </GovUK.TopNav.NavLink>
            </GovUK.TopNav>
            <GovUK.Page.WidthContainer>
                <GovUK.Page.Main>
                    <Routes>
                        <Route path="/forms/*" element={<Forms />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </GovUK.Page.Main>
            </GovUK.Page.WidthContainer>
            <GovUK.Footer />
        </Router>
    </React.StrictMode>
);

export interface MyTimeAppProps {
    routerEntries?: string[];
}

MyTimeApp.defaultProps = {
    routerEntries: undefined,
};

export default App;
