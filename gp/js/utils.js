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
      this.req.setRequestHeader(`Content-Type`, `application/json`); //x-www-form-urlencoded
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
    
    modelStringify: function (model) {

      if (typeof model !== `object`) return;

      for (let lev = 0; lev < model.length; lev++) {

        let a = model[lev][0];
        let t2, lv2, z = a;

        if (a === `html`) a = `!doctype html><html`;

        this.appendString += `<` + a;

        for (let lev_ = 0; lev_ < model[lev].length; lev_++) {

          let l2 = model[lev][lev_];

          if (typeof l2 === `string` && l2.split(`@`)[0] === `#`) {
            this.appendString += ` id='` + l2.split(`@`)[1] + `'`;
          }

          else if (typeof l2 === `string` && l2.split(`@`)[0] === `.`) {
            this.appendString += ` class='` + l2.split(`@`)[1] + `'`;
          }

          else if (typeof l2 === `string` && l2.split(`@`)[0] === `&`) {
            let plus = l2.split(`@`)[1].split(`>`);
            this.appendString += ` ` + plus[0] + `='` + plus[1] + `'`;
          }

          if (typeof l2 === `object`) {lv2 = l2;}

          if (typeof l2 === `string` && l2.split(`@`)[0] === `~`) { t2 = l2;}

        }

        this.appendString += `>`;

        if (typeof t2 === `string` && t2.split(`@`)[0] === `~`) {this.appendString += t2.substring(2, t2.length+1);}

        if (typeof lv2 === `object`) {this.modelStringify(lv2);}

        let queer = [`img`, `input`, `meta`];

        if (queer.indexOf(z) === -1) this.appendString += `</` + z + `>`; 
      }

      return this.appendString;
    },

    locusValidView: function (pool) {

      return [
      `div`, `.@_-gAZ _aA2`, [[
        `div`, `.@_AZc`, [[
          `div`, `.@_oPQ`, [[
            `div`, `.@_AZx`, [[
              `div`, `.@_AZs _gxM gs0`, [[
                `div`, `.@_aXZ _gp0`, [[
                  `div`, `.@_uxq _gBA oPQ`, [[
                    `div`, `.@_gMB _gcQ`, `&@style>padding: 20px 15px 0`, [[
                      `span`, `.@_cCq`, `&@style>width: 60px;height: 60px`, [[`img`, `.@_aWz`, `&@alt>`, `&@src>/${pool.ava}`]]], [
                      `div`, `.@tXx _eYG`, [[
                        `div`, `.@_QxM`, [[`span`, `.@_tXx`, `~@${pool.full}`]]], [
                        `div`, [[`span`, `.@_aA6`, `~@${pool.gps.toString()}`]]]]], [
                      `div`, `.@_QZg`, [[`div`, [[`span`, `.@_tXx`, `~@$${pool.per}`], [`span`, `.@_aA6`, `~@Hourly`]]]]]]], [
                    `div`, `&@style>padding: 10px 15px 20px`, `.@_`, [[
                      `div`, `.@caZ`, [[`span`, `.@_tXx`, `~@expertise`]]], [
                      `div`, `.@_aA6`, `&@style>padding: 4px 0 0`, [[`p`, `~@${pool.fields.toString()}`]]]]], [
                    `div`, `.@_pV0 _gxM`, [[
                      `div`, `.@_axS`, [[
                        `div`, `.@_gM_a _agM _guZ`, [[`a`, `#@validclose`, `.@_TX_a _atX _qXS _utQ`, `&@href>javascript:;`, `~@Return to Map`]]]]], [
                      `div`, `.@_QZg gMz`, [[`div`, `.@_gM_a _agM _guZ`, [[`a`, `.@_TX_a _atX _qXS _utQ`, `&@href>javascript:;`, `~@Book`]]]]]]]]]]]]]]]]]]]]]
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

const AJXFile = (function () {

  function AJXFile () {
    this.init = (navigator.msie && intval(navigator.version) < 10) ? window.XDomainRequest : window.XMLHttpRequest;
    this.req = new this.init();
  }
  
  AJXFile.prototype = {
    /**
     * @override
     */
    call: function (url, mail, file) {
      this.req.open(`POST`, url, true);
      this.req.setRequestHeader(`corrde-reqs`, mail.value);
      this.req.onload = function () {
        mail.to();
      };
      this.req.send(file);
    }
  };
  
  return AJXFile;

})();

const GPS = (function () {

  function GPS (dealGPS, dealError) {

    this.coords = [];
    this.bugPool = false;

    this.dealBugs = dealError;
    this.dealGPS = dealGPS
  }
  
  GPS.prototype = {
    /**
     * @override
     */
    geo: function (position) {

      let gps = position.coords,
        lat = gps.latitude,
        long = gps.longitude;

      if (typeof lat === `number` && typeof long === `number`) {

        this.coords.push(long);
        this.coords.push(lat);
      }

      return this.coords;
    },

    isError: function (errorObj) {

      if (errorObj.message && errorObj.message.length > 0) {
        
        this.bugPool = errorObj;
      }

      this.dealBugs(this.bugPool);
    },

    isgps: function () {

      navigator.geolocation.getCurrentPosition(this.geo, this.isError);
      //return {gps: this.coords, error: this.bugPool};
    }
  };
  
  return GPS;

})();

let JSStore = new WebStore();