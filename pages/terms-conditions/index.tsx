import React, { FC } from 'react';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Hero from 'layout/hero';
import i18next from 'i18next';

const TermsAndConditionsPage: FC = () => {
  // language keys
  const terms = i18next.t('terms');
  const termsTitle = i18next.t('termsTitle');
  const termsIntro1 = i18next.t('termsIntro1');
  const termsIntro2 = i18next.t('termsIntro2');
  const termsIntro3 = i18next.t('termsIntro3');
  const terms1Title = i18next.t('terms1Title');
  const terms1Text1 = i18next.t('terms1Text1');
  const terms1Text2 = i18next.t('terms1Text2');
  const terms2Title = i18next.t('terms2Title');
  const terms2Text1 = i18next.t('terms2Text1');
  const terms2Text2 = i18next.t('terms2Text2');
  const terms2List1 = i18next.t('terms2List1');
  const terms2List2 = i18next.t('terms2List2');
  const terms2List3 = i18next.t('terms2List3');
  const terms2List4 = i18next.t('terms2List4');
  const terms2List5 = i18next.t('terms2List5');
  const terms2List6 = i18next.t('terms2List6');
  const terms2List7 = i18next.t('terms2List7');
  const terms2List8 = i18next.t('terms2List8');
  const terms3Title = i18next.t('terms3Title');
  const terms3Text1 = i18next.t('terms3Text1');
  const terms3List1 = i18next.t('terms3List1');
  const terms3List2 = i18next.t('terms3List2');
  const terms3List3 = i18next.t('terms3List3');
  const terms3List4 = i18next.t('terms3List4');
  const terms3List5 = i18next.t('terms3List5');
  const terms4Title = i18next.t('terms4Title');
  const terms4Text1 = i18next.t('terms4Text1');
  const terms5Title = i18next.t('terms5Title');
  const terms5Text1 = i18next.t('terms5Text1');
  const terms6Title = i18next.t('terms6Title');
  const terms6Text1 = i18next.t('terms6Text1');
  const terms6List1 = i18next.t('terms6List1');
  const terms6List2 = i18next.t('terms6List2');
  const terms6List3 = i18next.t('terms6List3');
  const terms6Text2 = i18next.t('terms6Text2');
  const terms6Text3 = i18next.t('terms6Text3');
  const terms6Text4 = i18next.t('terms6Text4');
  const terms6Text5 = i18next.t('terms6Text5');
  const terms7Title = i18next.t('terms7Title');
  const terms7Text1 = i18next.t('terms7Text1');
  const terms8Title = i18next.t('terms8Title');
  const terms8Text1 = i18next.t('terms8Text1');
  const terms9Title = i18next.t('terms9Title');
  const terms9Text1 = i18next.t('terms9Text1');
  const terms10Title = i18next.t('terms10Title');
  const terms10Text1 = i18next.t('terms10Text1');
  const terms11Title = i18next.t('terms11Title');
  const terms11Text1 = i18next.t('terms11Text1');

  return (
    <LayoutPage className="pb-48 text-white bg-gradient-gray1">
      <Head title="Green Energy Data Platform" />
      <Hero className="px-8 lg:px-32 md:px-24 sm:px-16">
        <h1 className="text-5.5xl pt-3 text-left">{terms}</h1>
      </Hero>
      <div className="container m-auto bg-white rounded-2.5xl text-grayProfile divide-grayProfile divide-opacity-50 shadow -mt-40 divide-x flex px-10">
        <section className="my-3 text-justify lg:mx-28 md:mx-16 md:my-14">
          <div className="py-1 space-y-6">
            <h2 className="text-3.5xl mt-3 font-bold">
              {termsTitle}
            </h2>
            <div className="space-y-6 py-2">

              <p className="font-bold">
                {termsIntro1}
              </p>
              <p>{termsIntro2}</p>
              <p>{termsIntro3}</p>

            </div>
            <div className="py-1">
              <h2 className="text-2.5xl mt-3">
                {terms1Title}
              </h2>
              <div className="space-y-6 py-2">
                <p>{terms1Text1}</p>
                <p>{terms1Text2}</p>
              </div>
            </div>
            <div className="py-1">
              <h2 className="text-2.5xl mt-3">
                {terms2Title}
              </h2>
              <div className="space-y-6 py-2">
                <p>{terms2Text1}</p>
                <p>{terms2Text2}</p>
                <ul className="space-y-2 list-decimal list-inside">
                  <li>{terms2List1}</li>
                  <li>{terms2List2}</li>
                  <li>{terms2List3}</li>
                  <li>{terms2List4}</li>
                  <li>{terms2List5}</li>
                  <li>{terms2List6}</li>
                  <li>{terms2List7}</li>
                  <li>{terms2List8}</li>
                </ul>
              </div>
            </div>
            <div className="py-1">
              <h2 className="text-2.5xl mt-3">
                {terms3Title}
              </h2>
              <div className="space-y-6 py-2">
                <p>{terms3Text1}</p>
                <ul className="space-y-2 list-decimal list-inside">
                  <li>{terms3List1}</li>
                  <li>{terms3List2}</li>
                  <li>{terms3List3}</li>
                  <li>{terms3List4}</li>
                  <li>{terms3List5}</li>
                </ul>
              </div>
            </div>
            <div className="py-1">
              <h2 className="text-2.5xl mt-3">
                {terms4Title}
              </h2>
              <div className="space-y-6 py-2">
                <p>{terms4Text1}</p>
              </div>
            </div>
            <div className="py-1">
              <h2 className="text-2.5xl mt-3">
                {terms5Title}
              </h2>
              <div className="space-y-6 py-2">
                <p>{terms5Text1}</p>

              </div>
            </div>
            <div className="py-1">
              <h2 className="text-2.5xl mt-3">
                {terms6Title}
              </h2>
              <div className="space-y-6 py-2">
                <p>{terms6Text1}</p>
                <ul className="space-y-2 list-decimal list-inside">
                  <li>{terms6List1}</li>
                  <li>{terms6List2}</li>
                  <li>{terms6List3}</li>
                </ul>
                <p>{terms6Text2}</p>
                <p>{terms6Text3}</p>
                <p>{terms6Text4}</p>
                <p>{terms6Text5}</p>
              </div>
            </div>
            <div className="py-1">
              <h2 className="text-2.5xl mt-3">
                {terms7Title}
              </h2>
              <div className="space-y-6 py-2">
                <p>{terms7Text1}</p>
              </div>
            </div>
            <div className="py-1">
              <h2 className="text-2.5xl mt-3">
                {terms8Title}
              </h2>
              <div className="space-y-6 py-2">
                <p>{terms8Text1}</p>
              </div>
            </div>
            <div className="py-1">
              <h2 className="text-2.5xl mt-3">
                {terms9Title}
              </h2>
              <div className="space-y-6 py-2">
                <p>{terms9Text1}</p>
              </div>
            </div>
            <div className="py-1">
              <h2 className="text-2.5xl mt-3">
                {terms10Title}
              </h2>
              <div className="space-y-6 py-2">
                <p>{terms10Text1}</p>
              </div>
            </div>
            <div className="py-1">
              <h2 className="text-2.5xl mt-3">
                {terms11Title}
              </h2>
              <div className="space-y-6 py-2">
                <p>{terms11Text1}</p>
              </div>
            </div>
          </div>

        </section>
      </div>
    </LayoutPage>
  );
};

export const getServerSideProps = async (context) => ({
  props: ({
    locale: context.query?.locale ?? 'en',
  }),
});

export default TermsAndConditionsPage;
