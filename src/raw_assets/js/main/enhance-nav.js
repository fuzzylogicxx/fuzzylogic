;(function () {

    'use strict';

    // Our nav list has a "Locations" item which links to a "Locations" page containing a list of links to wonderworld locations pages.
    // That nav item also contains a nested subnavigation menu which is a list of links to those wonderworld location pages.
    // Here’s our enhancement:
    // So long as we have Houdini https://github.com/cferdinandi/houdini available, remove the parent nav link
    // And have houdini hide the subnav and make it togglable open/shut via a button (the right element for accessibility) injected into the DOM above the subnav.

    // var removeSubnavParentAnchor = function() {
    //   var navLink = document.querySelector('#nav-locations a');
    //   navLink.parentNode.removeChild(navLink);
    // };

    // var enhanceNav = function() {
    //   var disclosure = new Houdini('[data-houdini]', {
    //     icon: -1, // If true, include an expand/collapse icon
    //     iconClass: 'houdini-toggle-icon', // The class to use for the expand/collapse icon
    //     iconAttribute: 'data-houdini-icon', // The data attribute to use for the expand/collapse icon
    //     iconShow: '<svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M7.112 2.391L4.63 7.328a1 1 0 0 1-1.773.026L.187 2.418a1 1 0 0 1 .88-1.476h5.151a1 1 0 0 1 .894 1.45z" fill-rule="evenodd"/></svg>', // The icon to expand an accordion
    //     iconHide: '<svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path transform="rotate(180 4 4)" d="M7.112 2.391L4.63 7.328a1 1 0 0 1-1.773.026L.187 2.418a1 1 0 0 1 .88-1.476h5.151a1 1 0 0 1 .894 1.45z" fill-rule="evenodd"/></svg>' // The icon to collapse an accordion
    //   });

    //   // Our initial markup has the 'hidden' attribute on the (now togglable) subnav because we didn’t want it flashing visible then hiding.
    //   // It was OK to do this because the subnav wasn’t necessary for screen readers because there was a link to a page with locations links.
    //   // But now that houdini has done its thing let’s delete the hidden attribute so our new JS-powered nav is available to screen-reader folks too.
    //   var toggleableSubmenu = document.querySelector('#global-locations-menu');
    //   toggleableSubmenu.removeAttribute('hidden');
    // };

    // // Running order should be:
    // // 1) enhanceNav() kicks off Houdini
    // // 2) houdini emits houdiniInitialize which is heard by our eventListener which calls removeSubnavParentAnchor()
    // // 3) houdini continues with other stuff
    // // 4) we remove attribute 'hidden' from the toggleable submenu

    // document.addEventListener('houdiniInitialize', removeSubnavParentAnchor, false);

    // enhanceNav();

})();
