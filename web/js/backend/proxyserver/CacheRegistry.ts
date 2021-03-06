import {ProxyServerConfig} from './ProxyServerConfig';
import {Preconditions} from '../../Preconditions';
import {CachedRequestsHolder} from './CachedRequestsHolder';
import {CacheEntry} from './CacheEntry';
import {CachedRequest} from './CachedRequest';
import {CacheEntriesFactory} from './CacheEntriesFactory';
import {forDict} from '../../util/Functions';
import {Logger} from '../../logger/Logger';

const log = Logger.create();

export class CacheRegistry {

    private readonly proxyServerConfig: ProxyServerConfig;

    private readonly registry: {[url: string]: CacheEntry} = {};

    /**
     *
     */
    constructor(proxyServerConfig: ProxyServerConfig) {

        this.proxyServerConfig = Preconditions.assertNotNull(proxyServerConfig);

        this.registry = {};

    }

    /**
     *
     * @param path
     * @return {Promise<CachedRequestsHolder>}
     */
    async registerFile(path: string) {

        let cacheEntriesHolder = await CacheEntriesFactory.createEntriesFromFile(path);

        let cachedRequestsHolder = new CachedRequestsHolder({
            metadata: cacheEntriesHolder.metadata
        });

        if(! cacheEntriesHolder.cacheEntries) {
            throw new Error("No cache entries!");
        }

        forDict(cacheEntriesHolder.cacheEntries, (key, cacheEntry) => {
            let cacheMeta = this.register(cacheEntry);
            cachedRequestsHolder.cachedRequests[cacheMeta.url] = cacheMeta;
        });

        return cachedRequestsHolder;

    }


    /**
     * Register a file to be served with the given checksum.  Then return
     * metadata about what we registered including how to fetch the file we
     * registered.
     *
     */
    register(cacheEntry: CacheEntry) {

        Preconditions.assertNotNull(cacheEntry, "cacheEntry");
        Preconditions.assertNotNull(cacheEntry.statusCode, "cacheEntry.statusCode");
        Preconditions.assertNotNull(cacheEntry.headers, "cacheEntry.headers");

        let url = cacheEntry.url;

        Preconditions.assertNotNull(url, "url");

        log.info(`Registered new cache entry at: ${url}`);

        this.registry[url] = cacheEntry;

        return new CachedRequest({
            url,
            proxyRules: `http=localhost:${this.proxyServerConfig.port}`,
            proxyBypassRules: "<local>"
        });

    }

    /**
     * Return true if the given hashcode is registered.
     *
     * @param url The key we should fetch.
     */
    hasEntry(url: string) {
        return url in this.registry;
    }

    /**
     * Get metadata about the given key.
     *
     * @return {CacheEntry}
     */
    get(url: string): CacheEntry {

        if(!this.hasEntry(url)) {
            throw new Error("URL not registered: " + url);
        }

        return this.registry[url];

    }

}
