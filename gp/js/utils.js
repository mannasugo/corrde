`use strict`;

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