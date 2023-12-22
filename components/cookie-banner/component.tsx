import React, { useState } from 'react';

import i18next from 'i18next';

import Button from 'components/button';
import Icon from 'components/icon';
import { AnimatePresence, motion } from 'framer-motion';

export interface CookiesProps {
  /**
   * Whether the modal is opened
   */
  open: boolean;
  /**
   * Callback executed when the cookies are accepted
   */
  onAccept: () => void;
  /**
   * Callback executed when the cookies are rejected
   */
  onReject: () => void;
}


const Cookies: React.FC<CookiesProps> = ({
  open,
  onAccept,
  onReject,
}: CookiesProps) => {
  const [loadBanner, setLoadBanner] = useState(true);
  const siteCookiesTranslation = i18next.t('siteCookies');

  return (
    <>{
      loadBanner && (
        <AnimatePresence> {open && (<div>
          <motion.div
            initial={{
              opacity: 0,
              y: '100%',
            }}
            animate={{
              opacity: 1,
              y: '0%',
              transition: {
                delay: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              y: '100%',
              transition: {
                delay: 0,
              },
            }}
            className="fixed m-auto items-center bottom-0 z-10 flex justify-between w-full h-16 bg-gray1 border-b border-white border-opacity-10 text-sm"
          >
            <div className="flex mx-11">
              <div className="inline flex-wrap h-full items-center justify-center m-auto w-full text-sm text-white pr-3">
              <div dangerouslySetInnerHTML={{ __html:   siteCookiesTranslation }} />
              </div>
              {/* <div className="flex justify-between items-center space-x-2">
                <Button
                  type="button"
                  className="text-xs"
                  onClick={() => onAccept()}
                >
                  Accept
                </Button>
                <Button
                  type="button"
                  className="text-xs"
                  onClick={() => onReject()}
                >
                  Reject
                </Button>
              </div> */}
                       <button
                  type="button"
                  className="absolute text-white right-14 top-1/2 -translate-y-[50%]"
                  onClick={() => setLoadBanner(false)}
                >
                  <Icon
                    ariaLabel="close"
                    name="close"
                    size="md"
                  />
                </button>
            </div>
          </motion.div>
        </div>)}
      
        </AnimatePresence>
      )
    }</>

  );
};

export default Cookies;