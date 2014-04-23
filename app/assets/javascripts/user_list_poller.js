Pairlist.UserListPoller = function(notifier, opts) {
  this.DEFAULT_UPDATE_LIST_QUERY_TIME = 2003;
  this.notifier = notifier;
  this.opts = opts;
}

Pairlist.UserListPoller.prototype = {
  retrieve: function(){
    var cb,
      pollUrl = this.opts.pollUrl || "/users/active",
      poller = this;

    $.ajax({
      url: pollUrl,
    }).done(function(serverData){
      if (cb = poller.opts.doneCallback) {
        cb.apply(poller, [serverData]);
      } else {
        poller.defaultDoneCallback.apply(poller, [serverData]);
      }
    })
  },

  defaultDoneCallback: function(serverData) {
                         var userClass = this.opts.userClass || Pairlist.User,
                           users = serverData.activeUsers.map(function(userJson) {
                             return new userClass(userJson);
                           }),
                           pollInterval = this.opts.pollInterval ||
                             this.DEFAULT_UPDATE_LIST_QUERY_TIME,
                           poller = this;

                         this.notifier.updateActiveUsers(users);

                         if (this.opts.doNotPollForUpdate ||
                             this.interval) return;
                         this.interval = setInterval(function() {
                           poller.retrieve();
                         }, pollInterval);
                       },

  stopPolling: function() {
                 clearInterval(this.interval);
               }
};