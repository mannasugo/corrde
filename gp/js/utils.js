`use strict`;

const Auxll = (function () {
  
  function Auxll () {}
  
  Auxll.prototype = {
    
    longSlim: function (longMail) {
      if (!longMail || longMail.length < 1 || longMail.match(/^(\s+)$/)) return;
      return longMail;
    },
    
    limitSlim: function (mail) {
      if (mail.length === 0 || mail.match(/^(\s+)$/) || mail.length > 30) return;
      return mail;
    },
    
    WSSlim: function (mail) {
      mail = mail.replace(/\s/g, ``);
      return mail;
    }
  }
  
  return Auxll;
})();

const Req = (function () {
  /**
  * @constructor
  */  
  function Req () {
    this.init = (navigator.msie && intval(navigator.version) < 10) ? window.XDomainRequest : window.XMLHttpRequest;
    this.req = new this.init();
  }
  
  Req.prototype = {
    /**
     * @override
     */
    call: function (type, url, tag) {
      this.req.open(type, url, true);
      this.req.setRequestHeader(`Content-Type`, `application/x-www-form-urlencoded`);
      this.req.onload = function () {
        tag.to();
      };
      this.req.send(`${tag.title}=${tag.JSON}`);
    }
  };
  
  return Req;
})();

const Model = (function () {
  
  function Model () {
    this.appendString = ``;
  }
  
  Model.prototype = {
    
    modelString: function (stack) {
      if (typeof stack !== `object`) return;
      stack.forEach(cluster => {
        let a = cluster.tag;
        let z = a;
        if (cluster.tag_) a = cluster.tag_;
        this.appendString += `<` + a;
        if (cluster.flags) {
          for (let flag in cluster.flags) {
            this.appendString += ` ${flag}='${cluster.flags[flag]}'`;
          }
        }
        this.appendString += `>`;
        if (cluster.closure) this.appendString += cluster.closure;
        if (cluster.tagChild) this.modelString(cluster.tagChild);
        let queer = [`img`, `input`, `meta`];
        if (queer.indexOf(cluster.tag) === -1) this.appendString += `</${z}>`;  
      });
      return this.appendString;
    }
  }
  
  return Model;
})();

const WebStore = (function () {

  function WebStore () {
    this.allValues = {};
  }

  WebStore.prototype = {
    to: function (allValues) {

      if (sessionStorage.u) {
        this.allValues = JSON.parse(sessionStorage.u);
      }

      if (this.allValues.u) {
        if (allValues.u) {
          allValues.u = this.allValues.u;
        }
      }

      for (let value in allValues) {
        this.allValues[value] = allValues[value];
      }

      sessionStorage.setItem(`u`, JSON.stringify(this.allValues));
      return sessionStorage;
    },

    avail: function () {
      return JSON.parse(sessionStorage.u);
    }
  }

  return WebStore;
})();

let JSStore = new WebStore();