import React, {
  FC,
} from 'react';

// authentication
import { withAuthentication } from 'hoc/auth';

// components
import LayoutPage from 'layout';
import Head from 'components/head';

const ProfilePage: FC = () => (
  <LayoutPage>
    <Head title="Green Energy Data Platform" />
    <section>
      <p className="text-color1">Profile</p>
    </section>
  </LayoutPage>
);

export const getServerSideProps = withAuthentication();

export default ProfilePage;
