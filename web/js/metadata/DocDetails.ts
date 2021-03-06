import {DocDetail, UpdatableDocDetails} from './DocDetail';
import {Objects} from '../util/Objects';
import {isPresent} from '../Preconditions';
import {Logger} from '../logger/Logger';
import {DocInfo} from './DocInfo';

const log = Logger.create();

export class DocDetails {

    public static merge(docInfo: DocInfo, docDetail?: DocDetail): UpdatableDocDetails | undefined {

        // we basically now need to 'gift' additional fields to the doc model
        // here including title, filename, etc.
        if(docDetail !== undefined) {

            log.debug("Merging docDetail: ", docDetail);

            let targetDocDetails: UpdatableDocDetails = docInfo;

            let typedKeys: (keyof UpdatableDocDetails)[]
                = ['title', 'subtitle', 'description', 'url', 'filename'];

            let sourceDocDetails: UpdatableDocDetails = docDetail;

            typedKeys.forEach(typedKey => {

                if(! isPresent(targetDocDetails[typedKey]) && isPresent(sourceDocDetails[typedKey])) {
                    targetDocDetails[typedKey] = sourceDocDetails[typedKey];
                }

            });

            return targetDocDetails;

        }

        return undefined;

    }
}
