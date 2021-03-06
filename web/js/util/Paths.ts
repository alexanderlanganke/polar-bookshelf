import {isPresent} from '../Preconditions';

const libpath = require('path');

export class Paths {

    /**
     * Create a path from the given parts regardless of their structure.
     *
     * Don't allow double // or trailing /.  The output is always sane.
     *
     * @param dirname
     * @param basename
     */
    static create(dirname: string, basename: string) {

        if(! isPresent(dirname))
            throw new Error("Dirname required");

        if(! isPresent(basename))
            throw new Error("Basename required");

        if(dirname.indexOf("//") !== -1 || basename.indexOf("//") !== -1  ) {
            // don't allow // in dirname already as we would corrupt
            throw new Error("No // in dirname");
        }

        let result = dirname + "/" + basename;

        // replace multiple slashes in directory parts
        result = result.replace(/\/\/+/g, "/");

        // remove any trailing slashes
        result = result.replace(/\/$/g, "");

        return result;

    }

    /**
     * Return the last portion of the path.
     *
     */
    static basename(data: string) {

        let end = data.lastIndexOf("/");

        if(end <= -1) {
            // TODO: might want to return an Optional here.
            return data;
        }

        return data.substring(end+1, data.length);

    }

    static dirname(path: string) {
        return libpath.dirname(path);
    }

}
