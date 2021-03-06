"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../web/js/logger/Logger");
const BrowserProfiles_1 = require("../web/js/capture/BrowserProfiles");
const DiskDatastore_1 = require("../web/js/datastore/DiskDatastore");
const Args_1 = require("../web/js/electron/capture/Args");
const Capture_1 = require("../web/js/capture/Capture");
const BrowserRegistry_1 = __importDefault(require("../web/js/capture/BrowserRegistry"));
const electron = require('electron');
const app = electron.app;
const { Cmdline } = require("../web/js/electron/Cmdline");
const log = Logger_1.Logger.create();
let diskDatastore = new DiskDatastore_1.DiskDatastore();
let args = Args_1.Args.parse(process.argv);
let browser = BrowserRegistry_1.default[args.browser];
if (!browser) {
    throw new Error("No browser defined for: " + args.browser);
}
log.info("Using browser profile: " + args.profile);
let browserProfile = BrowserProfiles_1.BrowserProfiles.toBrowserProfile(browser, args.profile);
app.on('ready', function () {
    (() => __awaiter(this, void 0, void 0, function* () {
        yield diskDatastore.init();
        let url = Cmdline.getURLArg(process.argv);
        if (!url) {
            if (!url) {
                console.warn("URL is required.");
                app.quit();
                return;
            }
            url = "https://www.example.com";
        }
        console.log("Going to capture URL: " + url);
        let captureOpts = {
            amp: args.amp
        };
        let capture = new Capture_1.Capture(url, browserProfile, diskDatastore.stashDir, captureOpts);
        yield capture.start();
        if (args.quit) {
            log.info("Capture finished.  Quitting now");
            app.quit();
        }
        else {
            log.info("Not quitting (yielding to --no-quit=true).");
        }
    }))().catch(err => console.error(err));
});
//# sourceMappingURL=capture.js.map