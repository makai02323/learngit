export default {
  install(Vue,options){


      Vue.prototype.basicsUrl = 'http://ceshiapi.ibmcapital.co:11111/ibm';
      function api() {
          if(sessionStorage.getItem('in')==11 || sessionStorage.getItem('in1')==11){
              Vue.prototype.basicsUrl = 'http://ceshiapi.ibmcapital.co:11111/ibm';
          }else if(sessionStorage.getItem('in')==31 || sessionStorage.getItem('in1')==31){
              Vue.prototype.basicsUrl = 'http://ceshiapi.ibmcapital.co:11131/ibm';
          }
      }

      Vue.prototype.basicsUrl_login = 'http://ceshiapi.ibmcapital.co:10000/service';
      /********请求路径********/
       // Vue.prototype.basicsUrl = 'http://192.168.0.11:11111';
       // Vue.prototype.basicsUrl_login = 'http://192.168.0.11:10000';
      // Vue.prototype.payUrl = 'https://www.xcoinpayment.com:18888/at-pay';
      //Vue.prototype.basicsUrl = 'http://ceshiapi.ibmcapital.co:11111/ibm';
      //action="http://192.168.0.11:8080/file/upload"


      //配合永强，获取验证码
      Vue.prototype.ajax_code=function(url,params,type,ok){
          var setData,setParams;
          if(type==='post'){
              setData=params;
          }else{
              setParams=params;
          }
          this.axios({
              method:type,
              url:url,
              baseURL:this.basicsUrl_login,
              data:setData,
              params: setParams,
              responseType: 'arraybuffer',
          }).then(function(data){
              // loading.close();
              ok(data);
          }).catch(function(data){
              console.log(data);
          })
      };
      //配合永强，登录用的
      Vue.prototype.ajax_login=function(url,params,type,ok){
          //loading的显示
          const loading = this.$loading({
              lock: true,
              // text: 'Loading',
              text:'',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
          });
          var setData,setParams;
          if(type==='post'){
              setData=params;
          }else{
              setParams=params;
          }
          this.axios({
              method:type,
              url:url,
              baseURL:this.basicsUrl_login,
              data:setData,
              params: setParams,
              //headers:{'token': JSON.parse(localStorage.getItem('IBM_user_userInfor')).token}
          }).then(function(data){
              loading.close();
              ok(data);
          }).catch(function(data){
              loading.close();
              document.querySelector('.msgzz').style.display='block';
              document.querySelector('.msgzz .msg').innerHTML='网络原因，请稍后再试！';
              setTimeout(function () {
                  document.querySelector('.msgzz').style.display='none';
              },1200)
              console.log(data);
          })
      };
      //配合永强,注册用的
      Vue.prototype.ajax_re=function(url,params,type,ok,bas){
          //loading的显示
          const loading = this.$loading({
              lock: true,
              text: '',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
          });
          var Qs=require('qs');
          var setData,setParams;
          if(type==='post'){
              setData=params;
          }else{
              setParams=params;
          }
          this.axios({
              method:type,
              url:url,
              baseURL:bas,
              data:Qs.stringify(setData),
              params: setParams,
              headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
              // headers:{'tokenId': JSON.parse(sessionStorage.getItem('trans_user_userInfor')).tokenId,
              //  },
          }).then(function(data){
              loading.close();
              ok(data);
          }).catch(function(data){
              loading.close();
              document.querySelector('.msgzz').style.display='block';
              document.querySelector('.msgzz .msg').innerHTML='网络原因，请稍后再试！';
              setTimeout(function () {
                  document.querySelector('.msgzz').style.display='none';
              },1200)
              console.log(data);
          })
      }



      //异步请求A,获取验证码
      Vue.prototype.ajaxA=function(url,params,type,ok){
          var setData,setParams;
          if(type==='post'){
              setData=params;
          }else{
              setParams=params;
          }
          this.axios({
              method:type,
              url:url,
              baseURL:this.basicsUrl,
              data:setData,
              params: setParams,
              responseType: 'arraybuffer',
          }).then(function(data){
              // loading.close();
              ok(data);
          }).catch(function(data){
              console.log(data);
          })
      };
    //异步请求B，登录用的
    Vue.prototype.ajaxB=function(url,params,type,ok){
       api();
      //loading的显示
      const loading = this.$loading({
        lock: true,
        // text: 'Loading',
        text:'',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      var setData,setParams;
      if(type==='post'){
        setData=params;
      }else{
        setParams=params;
      }
      this.axios({
        method:type,
        url:url,
        baseURL:this.basicsUrl,
        data:setData,
        params: setParams,
        //headers:{'token': JSON.parse(localStorage.getItem('IBM_user_userInfor')).token}
      }).then(function(data){
        loading.close();
        ok(data);
      }).catch(function(data){
        loading.close();
        document.querySelector('.msgzz').style.display='block';
        document.querySelector('.msgzz .msg').innerHTML='网络原因，请稍后再试！';
        setTimeout(function () {
            document.querySelector('.msgzz').style.display='none';
        },1200)
        console.log(data);
      })
    }

    //异步请求C,json数据类型
    Vue.prototype.ajaxC=function(url,params,type,ok){
      api();
      //loading的显示
      const loading = this.$loading({
        lock: true,
        text: '',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      var setData,setParams;
      if(type==='post' || type==='delete'){
        setData=params;
      }else{
        setParams=params;
      }
      this.axios({
        method:type,
        url:url,
        baseURL:this.basicsUrl,
        data:setData,
        params: setParams,
        headers:{'token': JSON.parse(sessionStorage.getItem('trans_user_userInfor')).token},
      }).then(function(data){
        loading.close();
        ok(data);
      }).catch(function(data){
          loading.close();
          document.querySelector('.msgzz').style.display='block';
          document.querySelector('.msgzz .msg').innerHTML='网络原因，请稍后再试！';
          setTimeout(function () {
              document.querySelector('.msgzz').style.display='none';
          },1200)
          console.log(data);
      })
    }
      //异步请求F,国家登录不闪烁
      Vue.prototype.ajaxF=function(url,params,type,ok){
        api();
          var setData,setParams;
          if(type==='post' || type==='delete'){
              setData=params;
          }else{
              setParams=params;
          }
          this.axios({
              method:type,
              url:url,
              baseURL:this.basicsUrl,
              data:setData,
              params: setParams,
              headers:{'token': JSON.parse(sessionStorage.getItem('trans_user_userInfor')).token},
          }).then(function(data){
              ok(data);
          }).catch(function(data){
              console.log(data);
          })
      }
    //异步请求D,formdate类型,不带token
    Vue.prototype.ajaxD=function(url,params,type,ok){
       api();
      //loading的显示
      const loading = this.$loading({
        lock: true,
        text: '',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      var Qs=require('qs');
      var setData,setParams;
      if(type==='post'){
        setData=params;
      }else{
        setParams=params;
      }
      this.axios({
        method:type,
        url:url,
        baseURL:this.basicsUrl,
        data:Qs.stringify(setData),
        params: setParams,
        headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        // headers:{'tokenId': JSON.parse(sessionStorage.getItem('trans_user_userInfor')).tokenId,
        //  },
      }).then(function(data){
        loading.close();
        ok(data);
      }).catch(function(data){
        loading.close();
          document.querySelector('.msgzz').style.display='block';
          document.querySelector('.msgzz .msg').innerHTML='网络原因，请稍后再试！';
          setTimeout(function () {
              document.querySelector('.msgzz').style.display='none';
          },1200)
        console.log(data);
      })
    }
      //异步请求E,formdate类型,带token
      Vue.prototype.ajaxE=function(url,params,type,ok){
          api();
          //loading的显示
          const loading = this.$loading({
              lock: true,
              text: '',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
          });
          var Qs=require('qs');
          var setData,setParams;
          if(type==='post'){
              setData=params;
          }else{
              setParams=params;
          }
          this.axios({
              method:type,
              url:url,
              baseURL:this.basicsUrl,
              data:Qs.stringify(setData),
              params: setParams,
              headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','token': JSON.parse(sessionStorage.getItem('trans_user_userInfor')).token},
          }).then(function(data){
              loading.close();
              ok(data);
          }).catch(function(data){
              loading.close();
              document.querySelector('.msgzz').style.display='block';
              document.querySelector('.msgzz .msg').innerHTML='网络原因，请稍后再试！';
              setTimeout(function () {
                  document.querySelector('.msgzz').style.display='none';
              },1200)
              console.log(data);
          })
      }


    //弹出框,没有确认取消
      Vue.prototype.case=function(msg){
        var the=this;
        this.isShow=true;
        this.msg=msg;
        setTimeout(function(){
          the.isShow=false;
        },1200);
      }
      // //弹出框，有确认取消按钮
      // Vue.prototype.caseB=function(msg){
      //   this.isShows=true;
      //   this.msgs=msg;
      // }
    //弹出框,会员登录过期
    Vue.prototype.cases=function(msg){
      var the=this;
      this.isShow=true;
      this.msg=msg;
      setTimeout(function(){
        the.isShow=false;
        the.$router.push('/login')
      },1600);
    }
    //弹出框,管理员登录过期
    Vue.prototype.cases1=function(msg){
      var the=this;
      this.isShow=true;
      this.msg=msg;
      setTimeout(function(){
        the.isShow=false;
        the.$router.push('/admin/login')
      },1600);
    }
    //弹出框,代理登录过期
    Vue.prototype.cases2=function(msg){
      var the=this;
      this.isShow=true;
      this.msg=msg;
      setTimeout(function(){
        the.isShow=false;
        the.$router.push('/agent_login')
      },1600);
    }

     //转化时间
     Vue.prototype.myFormDate=function(mytime){
       // var mytime = new Date();
       var y = mytime.getFullYear();
       var m = mytime.getMonth() + 1;
       m = m < 10 ? ('0' + m) : m;
       var d = mytime.getDate();
       d = d < 10 ? ('0' + d) : d;
       var h = mytime.getHours();
       var minute = mytime.getMinutes();
       minute = minute < 10 ? ('0' + minute) : minute;
       var second = mytime.getSeconds();
       second = second < 10 ? ('0' + second) : second;
       return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
     }
    //转化时间
    Vue.prototype.myFormDate1=function(mytime){
      var mytime = new Date(mytime);
      var y = mytime.getFullYear();
      var m = mytime.getMonth() + 1;
      var d = mytime.getDate();
      return y + '-' + m + '-' + d
    }

    Vue.prototype.getViewportSize = function(){
      return {
        height: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-72
      };
    };


      Vue.prototype.getParamsFromURL=function(url){
          if ('undefined' == url) {
              return {};
          }
          let paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
          let paraObj = {};
          for (let i = 0; i < paraString.length; i++) {
              let j = paraString[i];
              paraObj[j.substring(0, j.indexOf("="))] = j.substring(j.indexOf("=") + 1, j.length);
          }
          return paraObj;
      }

    /**********将金额转为三位数一个**********/
    Vue.prototype.moneyToFloat = function(num){
      var string = num + '';//将数字转换成字符串形式
      var arr = string.split('.');//分割整数、小数;
      var num1 = arr[0];
      var num2 = arr[1] ? '.' + arr[1] : '';//若有小数则添加逗号；
      var num3 = num1.replace(/\d(?=(?:\d{3})+\b)/g, '$&,');
      return num3 + num2;
    }

    /**********将银行卡转为四位数一个**********/
    Vue.prototype.moneyToFloat1 = function(num){
      var string = num + '';//将数字转换成字符串形式
      return string.replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");
    }

  }

}
