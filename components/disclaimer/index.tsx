import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/dialog';

import i18next from 'i18next';

const Disclaimer = () => (
    <div className='flex flex-col items-end text-xs w-full text-gray-900'>
        <p><span className="font-bold">{i18next.t('database')}:</span> {i18next.t('databaseText')}</p>
        <p>{i18next.t('attributionText')}</p>
        <Dialog>
            <DialogTrigger> {i18next.t('databaseDisclaimer')} </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{i18next.t('databaseDisclaimer')}</DialogTitle>
                    <DialogDescription>
                        {i18next.t('databaseDisclaimerText')}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
);

export default Disclaimer;