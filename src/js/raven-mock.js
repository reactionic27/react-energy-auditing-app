var Raven = {
    config: function() {
    return {install: function() {}}
    },
    setUserContext: function() {},
    captureException: function(e) {
        console.error(e)
    },
    captureMessage: function(msg) {
        console.log(msg)
    }
}
