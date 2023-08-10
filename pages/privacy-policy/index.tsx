import React, { FC } from 'react';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Hero from 'layout/hero';
import i18next from 'i18next';

// language keys
const privacy = i18next.t('privacy');
const policyTitle = i18next.t("policyTitle");
const policyDate1 = i18next.t("policyDate1");
const policyDate2 = i18next.t("policyDate2");
const policyIntro1 = i18next.t("policyIntro1");
const policyIntro2 = i18next.t("policyIntro2");
const policyIntro3 = i18next.t("policyIntro3");
const policyIntroList1 = i18next.t("policyIntroList1");
const policyIntroList2 = i18next.t("policyIntroList2");
const policyIntroList3 = i18next.t("policyIntroList3");
const policyIntroList4 = i18next.t("policyIntroList4");
const policyIntroList5 = i18next.t("policyIntroList5");
const policyIntroList6 = i18next.t("policyIntroList6");
const policyIntroList7 = i18next.t("policyIntroList7");
const policyIntroList8 = i18next.t("policyIntroList8");
const policyIntroList9 = i18next.t("policyIntroList9");
const policyIntroList10 = i18next.t("policyIntroList10");
const policyIntroList11 = i18next.t("policyIntroList11");
const policyIntroList12 = i18next.t("policyIntroList12");
const policy1Title = i18next.t("policy1Title");
const policy1Text1 = i18next.t("policy1Text1");
const policy2Title = i18next.t("policy2Title");
const policy2Text1 = i18next.t("policy2Text1");
const policy2Text2 = i18next.t("policy2Text2");
const policy2Text3 = i18next.t("policy2Text3");
const policy2Text4 = i18next.t("policy2Text4");
const policy2List1 = i18next.t("policy2List1");
const policy2List2 = i18next.t("policy2List2");
const policy2Text5 = i18next.t("policy2Text5");
const policy2Text6 = i18next.t("policy2Text6");
const policy2Text7 = i18next.t("policy2Text7");
const policy3Title = i18next.t("policy3Title");
const policy3Text1 = i18next.t("policy3Text1");
const policy3List1 = i18next.t("policy3List1");
const policy3List2 = i18next.t("policy3List2");
const policy3List3 = i18next.t("policy3List3");
const policy3List4 = i18next.t("policy3List5");
const policy3List5 = i18next.t("policy3List5");
const policy3List6 = i18next.t("policy3List6");
const policy3List7 = i18next.t("policy3List7");
const policy3List8 = i18next.t("policy3List8");
const policy3List9 = i18next.t("policy3List9");
const policy3List10 = i18next.t("policy3List10");
const policy3List11 = i18next.t("policy3List11");
const policy3List12 = i18next.t("policy3List12");
const policy4Title = i18next.t("policy4Title");
const policy4Text1 = i18next.t("policy4Text1");
const policy5Title = i18next.t("policy5Title");
const policy5_1Subtitle = i18next.t("policy5_1Subtitle");
const policy5_1Text1 = i18next.t("policy5_1Text1");
const policy5_2Subtitle = i18next.t("policy5_2Subtitle");
const policy5_2Text1 = i18next.t("policy5_2Text1");
const policy5List1 = i18next.t("policy5List1");
const policy5List2 = i18next.t("policy5List2");
const policy5List3 = i18next.t("policy5List3");
const policy5List4 = i18next.t("policy5List4");
const policy5Text5 = i18next.t("policy5Text5");
const policy5Text6 = i18next.t("policy5Text6");
const policy6Title = i18next.t("policy6Title");
const policy6_1Subtitle = i18next.t("policy6_1Subtitle");
const policy6_1Text1 = i18next.t("policy6_1Text1");
const policy6_1List1 = i18next.t("policy6_1List1");
const policy6_1List2 = i18next.t("policy6_1List2");
const policy6_1List3 = i18next.t("policy6_1List3");
const policy6_2Subtitle = i18next.t("policy6_2Subtitle");
const policy6_2Text1 = i18next.t("policy6_2Text1");
const policy6_2List1 = i18next.t("policy6_2List1");
const policy6_2List2 = i18next.t("policy6_2List2");
const policy6_2List3 = i18next.t("policy6_2List3");
const policy6_2List4 = i18next.t("policy6_2List4");
const policy6_3Subtitle = i18next.t("policy6_3Subtitle");
const policy6_3Text1 = i18next.t("policy6_3Text1");
const policy6_3List1 = i18next.t("policy6_3List1");
const policy6_3List2 = i18next.t("policy6_3List2");
const policy7Title = i18next.t("policy7Title");
const policy7Text1 = i18next.t("policy7Text1");
const policy8Title = i18next.t("policy8Title");
const policy8Text1 = i18next.t("policy8Text1");
const policy8_1Subtitle = i18next.t("policy8_1Subtitle");
const policy8_1Text1 = i18next.t("policy8_1Text1");
const policy8_2Subtitle = i18next.t("policy8_2Subtitle");
const policy8_2Text1 = i18next.t("policy8_2Text1");
const policy8_2List1 = i18next.t("policy8_2List1");
const policy8_2List2 = i18next.t("policy8_2List2");
const policy8_2List3 = i18next.t("policy8_2List3");
const policy8_2List4 = i18next.t("policy8_2List4");
const policy8_2List5 = i18next.t("policy8_2List5");
const policy8_2Text2 = i18next.t("policy8_2Text2");
const policy8_2Text3 = i18next.t("policy8_2Text3");
const policy8_3Subtitle = i18next.t("policy8_3Subtitle");
const policy8_3Text1 = i18next.t("policy8_3Text1");
const policy8_4Subtitle = i18next.t("policy8_4Subtitle");
const policy8_4Text1 = i18next.t("policy8_4Text1");
const policy9Title = i18next.t("policy9Title");
const policy9Text1 = i18next.t("policy9Text1");
const policy9Text2 = i18next.t("policy9Text2");
const policy10Title = i18next.t("policy10Title");
const policy10Text1 = i18next.t("policy10Text1");
const policy10Text2 = i18next.t("policy10Text2");
const policy10Text3 = i18next.t("policy10Text3");
const policy10List1 = i18next.t("policy10List1");
const policy10List2 = i18next.t("policy10List2");
const policy10List3 = i18next.t("policy10List3");
const policy10List4 = i18next.t("policy10List4");
const policy10List5 = i18next.t("policy10List5");
const policy10List6 = i18next.t("policy10List6");
const policy11Title = i18next.t("policy11Title");
const policy11Text1 = i18next.t("policy11Text1");
const policy11Text2 = i18next.t("policy11Text2");
const policy12Title = i18next.t("policy12Title");
const policy12Text1 = i18next.t("policy12Text1");
const PrivacyPolicyPage: FC = () => (
  <LayoutPage className="pb-48 text-justify text-white bg-gradient-gray1">
    <Head title="Green Energy Data Platform" />
    <Hero className="px-8 lg:px-32 md:px-24 sm:px-16">
      <h1 className="text-5.5xl pt-3 text-left">{privacy}</h1>
    </Hero>
    <div className="container m-auto bg-white rounded-2.5xl text-grayProfile divide-grayProfile divide-opacity-50 shadow -mt-40 divide-x flex px-10">
      <section className="my-3 text-justify lg:mx-28 md:mx-16 md:my-14 space-y-2">
        <div className="space-y-4">
        <h2 className="text-3.5xl pt-3 text-left">{policyTitle}</h2>
        <div className="space-y-2 py-2">
          <p className="font-bold">{policyDate1}</p>
          <p className="font-bold">{policyDate2}</p>
        </div>
        </div>
        <div className="space-y-6">
          <p className="font-bold">{policyIntro1}</p>
          <p>{policyIntro2}</p>
          <p>{policyIntro3}</p>
          <ul className="space-y-2">
            <li>{policyIntroList1}</li>
            <li>{policyIntroList2}</li>
            <li>{policyIntroList3}</li>
            <li>{policyIntroList4}</li>
            <li>{policyIntroList5}</li>
            <li>{policyIntroList6}</li>
            <li>{policyIntroList7}</li>
            <li>{policyIntroList8}</li>
            <li>{policyIntroList9}</li>
            <li>{policyIntroList10}</li>
            <li>{policyIntroList11}</li>
            <li>{policyIntroList12}</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2.5xl mt-3">{policy1Title}</h2>
          <p>{policy1Text1}</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2.5xl mt-3">{policy2Title}</h2>
          <p>{policy2Text1}</p>
          <p>{policy2Text2}</p>
          <p>{policy2Text3}</p>
          <p>{policy2Text4}</p>
          <ul>
            <li>{policy2List1}</li>
            <li>{policy2List2}</li>
          </ul>
          <p>{policy2Text5}</p>
          <p>{policy2Text6}</p>
          <p>{policy2Text7}</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2.5xl mt-3">{policy3Title}</h2>
          <p>{policy3Text1}</p>
          <ul className="space-y-2 list-decimal list-inside">
            <li>{policy3List1}</li>
            <li>{policy3List2}</li>
            <li>{policy3List3}</li>
            <li>{policy3List4}</li>
            <li>{policy3List5}</li>
            <li>{policy3List6}</li>
            <li>{policy3List7}</li>
            <li>{policy3List8}</li>
            <li>{policy3List9}</li>
            <li>{policy3List10}</li>
            <li>{policy3List11}</li>
            <li>{policy3List12}</li>
          </ul>

        </div>


        <div className="space-y-6">
          <h2 className="text-2.5xl mt-3">{policy4Title}</h2>
          <p>{policy4Text1}</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2.5xl mt-3">{policy5Title}</h2>
          <h4>{policy5_1Subtitle}</h4>
          <p>{policy5_1Text1}</p>
          <h4>{policy5_2Subtitle}</h4>
          <p>{policy5_2Text1}</p>
          <ul>
            <li>{policy5List1}</li>
            <li>{policy5List2}</li>
            <li>{policy5List3}</li>
            <li>{policy5List4}</li>
          </ul>
          <p>{policy5Text5}</p>
          <p>{policy5Text6}</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2.5xl mt-3">{policy6Title}</h2>
          <h4>{policy6_1Subtitle}</h4>
          <p>{policy6_1Text1}</p>
          <p>{policy6_2Text1}</p>
    
          <ul>
            <li>{policy6_1List1}</li>
            <li>{policy6_1List2}</li>
            <li>{policy6_1List3}</li>
          </ul>
          <h4>{policy6_2Subtitle}</h4>
          <p>{policy6_2Text1}</p>
        
          <ul>
            <li>{policy6_2List1}</li>
            <li>{policy6_2List2}</li>
            <li>{policy6_2List3}</li>
            <li>{policy6_2List4}</li>
          </ul>
          <h4>{policy6_3Subtitle}</h4>
          <p>{policy6_3Text1}</p>
        
          <ul>
            <li>{policy6_3List1}</li>
            <li>{policy6_3List2}</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2.5xl mt-3">{policy7Title}</h2>
          <p>{policy7Text1}</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2.5xl mt-3">{policy7Title}</h2>
          <p>{policy5Text6}</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2.5xl mt-3">{policy8Title}</h2>
          <p>{policy8Text1}</p>
          <h4>{policy8_1Subtitle}</h4>
          <p>{policy8_1Text1}</p>
          <h4>{policy8_1Subtitle}</h4>
          <p>{policy8_1Text1}</p>
          <h4>{policy8_2Subtitle}</h4>
          <p>{policy8_2Text1}</p>
    
          <ul>
            <li>{policy8_2List1}</li>
            <li>{policy8_2List2}</li>
            <li>{policy8_2List3}</li>
            <li>{policy8_2List4}</li>
            <li>{policy8_2List5}</li>
          </ul>
          <p>{policy8_2Text2}</p>
          <p>{policy8_2Text3}</p>

          <h4>{policy8_3Subtitle}</h4>
          <p>{policy8_3Text1}</p>

          <h4>{policy8_4Subtitle}</h4>
          <p>{policy8_4Text1}</p>
    
        </div>
        <div className="space-y-6">
        <h3 className="text-2.5xl mt-3">{policy9Title}</h3>

          <p>{policy9Text1}</p>
          <p>{policy9Text2}</p>
        </div>

        <div className="space-y-6">
        <h3 className="text-2.5xl mt-3">{policy10Title}</h3>

          <p>{policy10Text1}</p>
          <p>{policy10Text2}</p>
          <p>{policy10Text3}</p>

          <ul className="space-y-2 list-decimal list-inside">
            <li>{policy10List1}</li>
            <li>{policy10List2}</li>
            <li>{policy10List3}</li>
            <li>{policy10List4}</li>
            <li>{policy10List5}</li>
            <li>{policy10List6}</li>
          </ul>
          <p>{policy10Text3}</p>
        </div>
        
        <div className="space-y-6">
        <h3 className="text-2.5xl mt-3">{policy11Title}</h3>

          <p>{policy11Text1}</p>
          <p>{policy11Text2}</p>
        </div>
        <div className="space-y-6">
        <h3 className="text-2.5xl mt-3">{policy12Title}</h3>

          <p>{policy12Text1}</p>
        </div>
        

      </section>
    </div>
  </LayoutPage>
);

export const getServerSideProps = async (context) => ({
  props: ({
    locale: context.query?.locale ?? 'en',
  }),
});

export default PrivacyPolicyPage;
