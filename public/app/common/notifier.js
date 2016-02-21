angular.module('Blogram').config(['toastyConfigProvider', function(toastyConfigProvider) {
    toastyConfigProvider.setConfig({
        position: 'top-right',
    });
}]);

angular.module('commonNotifier', [])

.factory('Notifier', function(toasty){
  return{
    notify: function(type, message){
      if(type == 'success'){
        toasty.success({
          title: 'Success!',
          msg: message,
          showClose: true,
          clickToClose: true,
          position: 'top-right',
          timeout: 3000,
          sound: false,
          html: true,
          shake: false,
          theme: 'bootstrap'
        });
      }else if(type == 'info'){
        toasty.info({
          title: 'Info',
          msg: message,
          showClose: true,
          clickToClose: true,
          position: 'top-right',
          timeout: 3000,
          sound: false,
          html: true,
          shake: false,
          theme: 'bootstrap'
        });
      }
    },
    error: function(message){
      toasty.error({
        title: 'Error!',
        msg: message,
        showClose: true,
        clickToClose: true,
        position: 'top-right',
        timeout: 3000,
        sound: false,
        html: true,
        shake: false,
        theme: 'bootstrap'
      });
    }
  }
});
