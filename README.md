http://alisa-ky-chen-code.tumblr.com/post/115207199393/backbone-marionette-mixins-and-the-problem-of

Example:

var mixin = {
    jQMModalDialog: function(target) {
        return _utils.mixinToView(target, jQMModalDialog, "initialize", "onRender", "onShow", "onClose");
    }
};

var jQMModalDialog = {
    attributes: {
        'data-role': 'dialog',
        'data-theme': 'a',
        'data-close-btn': 'right',
        'transition': 'fade'
    },
    regions: {
        'headerRegion': 'div[data-role=header]',
        'footerRegion': 'div[data-role=footer]',
        'contentRegion': 'div[data-role=content]'
    },
    events: {
        'pagehide': '_onPageHide',
        'pageshow': '_onPageShow',
        'pagebeforeshow': '_onPageBeforeShow'
    },
    initialize: function(options) { ... },
    openDialog: function() { ... },
    closeDialog: function() { ... },
    onRender: function() { ... },
    _onPageBeforeShow: function() { ... },
    _onPageShow: function() { ... },
    onClose: function() { ... },
    _onPageHide: function() { ... }
}

var targetLayout = {
    template: template,
    className: 'dialog-form',
    regions: { ... }
    initialize: function(options) { ... },
    onShow: function() { ... },
    onClose: function() { ... },
    // NOTE: because "_onPageHide" was not listed among the methodNames,
    // this function replaces jQMModalDialog's _onPageHide()
    _onPageHide: function() { ... },
    otherFunction: function() { ... }
}

return Backbone.Marionette.Layout.extend( Mixin.jQMModalDialog(targetLayout) );