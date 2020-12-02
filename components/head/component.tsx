import React, {
  FC,
} from 'react';
import Head from 'next/head';

interface HeadProps {
  title?: string,
  description?: string,
}

const HeadApp: FC<HeadProps> = ({
  title,
  description,
}: HeadProps) => (
  <Head>
    <meta name="viewport" content="width=1024, initial-scale=1, shrink-to-fit=no" />
    <title key="title">{`${title ? `${title} | ` : ''}Green Energy Data Platform`}</title>
    <meta key="description" name="description" content={description} />
  </Head>
);

HeadApp.defaultProps = {
  title: null,
  description: 'description TBD',
};

export default HeadApp;
