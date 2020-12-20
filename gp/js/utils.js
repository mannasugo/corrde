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

      return this.avail_esc_Chars(this.appendString);
    },

    avail_esc_Chars: (String) => {

      String = String.replace(new RegExp(`u/0026`, `g`), `&`);

      String = String.replace(new RegExp(`u/0027`, `g`), `'`);

      String = String.replace(new RegExp(`u/0022`, `g`), `"`);

      return String;
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
    },

    listCart: (Cart) => {

      let ModelCart = [];

      let ModelBuy = [];

      if (Cart.length > 0) {

        ModelBuy = [
        `div`, `.@_yZS gxM _geQ gMX uZM`, [[
          `div`, `.@yZS _gMX _eYG _xC3`, [[
            `div`, `.@_eYG`, [[
              `div`, `.@_gxM _gMX`, [[
                `div`, `.@_gMX gcQ`, [[
                  `div`, `.@_gM_a _agM _guZ _gMX`, `&@style>max-width: 450px`, [[
                    `a`, `.@_TX_a _atX _utQ _gMX`, `#@CartBuy`, `&@href>javascript:;`, `~@Checkout`]]]]]]]]]]]]]
      }

      Cart.forEach(Stock => {

        ModelCart.push([
          `div`, `.@_cX3`, `&@item>${Stock.store_md5}/${Stock.stock_md5}`, [[
            `div`, `.@_gcQ _aA0 _aA2`, [[
              `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, [[
                  `span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[
                    `img`, `.@_aWz`, `&@src>/${Stock.stock_img}`, `&@style>height:auto`, `&@alt>thumbnail`]]]]], [
                `div`, `.@_eYG`, [[
                  `div`, `.@_QxM`, [[`span`, `.@_tXx _aA2`, `~@${Stock.stock_alt}`]]], [
                  `div`, `.@_gxM _geQ`, [[
                `span`, `#@itemsCharge`, `.@_aA6`, `~@$ ${Stock.stock_USD} * ${Stock.items}`]]]]]]], [
          `div`, `.@_QZg _gMz _-Zz`, [[
            `div`, `.@_axS`, [[
              `div`, `#@{U.sum}`, `.@_gM_a _agM _guZ`, [[`a`, `#@text`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Message`]]]]]]]]], [
            `div`, `.@yZS gxM _geQ gMX _uZM`, [[
              `div`, `.@yZS _gMX _eYG _xC3`, [[
                `div`, `.@_gcQ _aXZ`, [[
                  `div`, `.@_axS`, [[
                    `div`, `.@_gM_a _agM _guZ`, [[
                      `a`, `#@StockRemove`, `.@_TX_a _atX qXS _utQ`, `&@for>${Stock.store_md5}/${Stock.stock_md5}`, `&@href>javascript:;`, `~@Subtract`]]]]], [
                  `div`, `.@_dMG _geQ _aA2 _tXx`, [[`span`, `#@items`, `.@_tXx`, `~@${Stock.items}`]]], [
                  `div`, `.@_QZg _gMz`, [[
                    `div`, `.@_gM_a _agM _guZ`, [[
                      `a`, `#@StockAdd`, `.@_TX_a _atX qXS _utQ`, `&@for>${Stock.store_md5}/${Stock.stock_md5}`, `&@href>javascript:;`, `~@Add`]]]]]]]]]]]]])
      })

      return [
        `div`, [[
          `div`, `.@_cX3`, [[
            `div`, `.@_yZS _gxM _geQ _gMX uZM`, [[
              `div`,`.@_gxM cX3`, [[`span`, `.@_aA6 _aA2`, `~@My Cart`]]], [
                `div`, `.@_QZg _gxM`, [[`span`, `.@_tXx _aA6`, `~@${Cart.length}`]]]]]]], [
          `div`, ModelCart], ModelBuy]]
    },

    payCart: Cart => {

      let ModelCart = [];

      Cart.forEach(Stock => {

        ModelCart.push([`div`, `&@style>margin:0 0 2rem;padding: 0 2rem`, [[
          `span`, `&@style>border-top: 1px solid #e4e4e4;margin: 0 0 2rem`], [
          `div`, `.@cX3`, `&@item>${Stock.store_md5}/${Stock.stock_md5}`, [[
            `div`, `.@_gcQ _aA0 _aA2`, [[
              `div`, `.@_ZSg _ZCg _eYG _gcQ`, [[
                `div`, [[
                  `span`, `.@_cCq`, `&@style>width:40px;height:40px`, [[
                    `img`, `.@_aWz`, `&@src>/${Stock.stock_img}`, `&@style>height:auto`, `&@alt>thumbnail`]]]]], [
                `div`, `.@_eYG`, [[
                  `div`, `.@_QxM`, [[`span`, `.@_tXx _aA2`, `~@${Stock.stock_alt}`]]], [
                  `div`, `.@_gxM _geQ`, [[
                `span`, `#@itemsCharge`, `.@_aA6 _tXx`, `~@$${Stock.stock_USD * Stock.items}`]]]]]]], [
          `div`, `.@_QZg _gMz _-Zz`, [[
            `div`, `.@_axS`, [[
              `div`, `#@{U.sum}`, `.@_gM_a _agM _guZ`, [[`a`, `#@text`, `.@_TX_a _atX qXS _utQ`, `&@href>javascript:;`, `~@Message`]]]]]]]]]]]]])
      })

      return [
        `div`, [[
          `div`, `&@style>border: 1px solid #e4e4e4;border-radius:4px;width: 100%`, `.@_sZ2`, ModelCart]]]
    },

    MyCart: MyCart => {

      let ModelMyCart = [];

      MyCart.forEach(Stock => {

          let ModelJSON = `&@data>{
            &quot;alpha&quot;: &quot;${Stock.alpha}&quot;,
            &quot;dollars&quot;: &quot;${Stock.dollars}&quot;,
            &quot;file&quot;: &quot;${Stock.file}&quot;,
            &quot;items&quot;: &quot;${Stock.items}&quot;,
            &quot;MD5&quot;: &quot;${Stock.MD5}&quot;,
            &quot;swap&quot;: &quot;${Stock.swap}&quot;,
            &quot;swapAlpha&quot;: &quot;${Stock.swapAlpha}&quot;}`,

        dollars = (Stock.dollars*Stock.swap*Stock.items).toFixed(2);

        ModelMyCart.push([
          `div`, `.@_gxM _geQ _yZS _uZM`, [[
            `div`, `.@_`, `&@style>max-width:60px`, [[
              `img`, `&@alt>${Stock.alpha}`, `&@style>max-width:100%`, `&@src>/${Stock.file}`]]], [
            `div`, `.@_eYG _geQ`, [[
              `div`, [[
                `span`, `&@style>text-transform:uppercase;font-weight:700`, `~@${Stock.alpha}`]]], [
              `div`, `.@_gxM _geQ`, `&@style>width:100%`, [[
                `div`, `&@style>margin: 8px 0`, [[
                  `div`, `.@_gxM _geQ`, `&@style>border:1px solid #e7e7e7;padding:4px 8px`, [[
                    `div`, [[`a`, `#@sliceCart`, `.@-_tX Minus`, ModelJSON, `&@href>javascript:;`]]], [
                    `div`, `.@_tXx`, `#@items_${Stock.MD5}_${MyCart.indexOf(Stock)}`, `&@style>padding:0 8px`, `~@${Stock.items}`], [
                    `div`, [[`a`, `#@alterCart`, `.@-_tX Plus`, ModelJSON, `&@forPlus>${Stock.MD5}-${MyCart.indexOf(Stock)}`, `&@href>javascript:;`]]]]]]], [
                `div`, `.@_QZg`, [[`span`, `.@_tXx`, `#@dollars_${Stock.MD5}_${MyCart.indexOf(Stock)}`, `~@${Stock.swapAlpha}${dollars.toLocaleString()}`]]]]]]]]])
      });

      return [
        `div`, `.@_g0`, [[`div`, ModelMyCart]]];
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

      sessionStorage.setItem(`u`, JSON.stringify(this.allValues).replace(new RegExp(/&/g, `g`), `u/0026`));
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