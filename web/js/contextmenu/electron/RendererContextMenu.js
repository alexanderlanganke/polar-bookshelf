// const remote = require('electron').remote;
// const {ContextMenuType} = require("./ContextMenuType");

/**
 * Listens in the renderer for the proper context menu then sends a request
 * to the electron ElectronContextMenu system to raise the native context menu.
 *
 * @type {RendererContextMenu}
 */
class RendererContextMenu {

    constructor() {

        //console.log("FIXME: here at least..");

    }

    static register(element, contextMenuType) {

        //
        // console.log("FIXME: here... part 1.")
        //
        // element = document.querySelector(".page");
        //
        // element.addEventListener("contextmenu", function (event) {
        //
        //     // FIXME: determine which context menu we should bring up first...
        //     //
        //     //
        //
        //     let electronContextMenu = remote.getGlobal("electronContextMenu" );
        //
        //     console.log("FIXME: electronContextMenu: ", electronContextMenu)
        //
        //     console.log("FIXME: Got context menu!");
        //
        //     //remote.getCurrentWindow(), event.screenX, event.screenY
        //
        //     console.log(event);
        //
        //     console.log("FIXME4: " + contextMenuType)
        //
        //     electronContextMenu.popup(remote.getCurrentWindow(), event.screenX, event.screenY, contextMenuType);
        //
        // }.bind(this));

    }

    determineContextMenuType(element) {

        while(element != null) {

            if(element.classList.contains("text-highlight")) {
                return ContextMenuType.TEXT_HIGHLIGHT;
            }

            element = element.parentElement;

        }

        return null;

    }

}

module.exports.RendererContextMenu = RendererContextMenu;
