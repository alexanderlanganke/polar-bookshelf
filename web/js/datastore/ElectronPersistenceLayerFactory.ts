import {PersistenceLayer} from './PersistenceLayer';
import {Logger} from '../logger/Logger';

const log = Logger.create();

export class ElectronPersistenceLayerFactory {

    public static create(): PersistenceLayer {

        log.info("Using electron persistence layer and disk store");

        const remote = require('electron').remote;

        log.info("Accessing datastore...");
        let datastore = remote.getGlobal("datastore" );
        log.info("Accessing datastore...done");

        return new PersistenceLayer(datastore);

    }

}
