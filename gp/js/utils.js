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

      return this.avail_esc_Chars(this.avail_esc_Chars(this.appendString));
    },

    avail_esc_Chars: (String) => {

      String = String.replace(new RegExp(`u/0026`, `g`), `&`);

      String = String.replace(new RegExp(`u/0027`, `g`), `'`);

      String = String.replace(new RegExp(`u/0022`, `g`), `"`);

      String = String.replace(new RegExp(`u/002F`, `g`), `/`);

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
                `span`, `&@style>text-transform:capitalize;font-weight:700`, `~@${Stock.alpha}`]]], [
              `div`, `.@_gxM _geQ`, `&@style>width:100%`, [[
                `div`, `&@style>margin: 8px 0`, [[
                  `div`, `.@_gxM _geQ`, `&@style>border:1px solid #e7e7e7;padding:4px 8px`, [[
                    `div`, [[`a`, `#@sliceCart`, `.@-_tX Minus`, ModelJSON, `&@href>javascript:;`]]], [
                    `div`, `.@_tXx`, `#@items_${Stock.MD5}_${MyCart.indexOf(Stock)}`, `&@style>padding:0 8px`, `~@${Stock.items}`], [
                    `div`, [[`a`, `#@alterCart`, `.@-_tX Plus`, ModelJSON, `&@forPlus>${Stock.MD5}-${MyCart.indexOf(Stock)}`, `&@href>javascript:;`]]]]]]], [
                `div`, `.@_QZg`, [[`span`, `.@tXx`, `#@dollars_${Stock.MD5}_${MyCart.indexOf(Stock)}`, `~@${Stock.swapAlpha}${dollars.toLocaleString()}`]]]]]]]]])
      });

      return [
        `div`, `.@_g0`, [[`div`, ModelMyCart]]];
    },

    ModelWait: () => {

      return [`div`, `.@_geQ`, `&@style>justify-content:center`, [[`span`, `.@-_tX Store`, `&@style>width:56px;height:56px`]]]
    },

    ModelBill: function (MyCart, myRegion, region) {

      return [[
      `main`, `.@_xC2`, [[
        `div`, `.@_tY0`, [[
          `section`, `#@ModelBilling`, [[
            `div`, `.@_g0`, `&@style>border-bottom:1px solid #e6e7e8;margin-top:16px`, [[
              `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px;font-weight:600`, [[`div`, [[`p`, `~@cart items`]]]]], [
              `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, [
              this.billing(MyCart)]]]]]], 
          this.ModelSum(MyCart, myRegion, region), this.ModelShipping()]]]], [
      `nav`, `.@_uHC _tY0`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `div`, `.@_-Xg _gxM _geQ`, [[
                `a`, `.@-_tX AppMedium`, `&@href>/`, `~@corrde`], [`span`, `&@style>padding:0 7px`, `~@| BILLING & DELIVERY`]]]]]]]]]]]]
    },

    billing: function (MyCart) {

      let ModelMyCart = [];

      MyCart.forEach(Stock => {

          let ModelJSON = `&@data>{
            &quot;alpha&quot;: &quot;${Stock.alpha}&quot;,
            &quot;dollars&quot;: &quot;${Stock.dollars}&quot;,
            &quot;file&quot;: &quot;${Stock.file}&quot;,
            &quot;items&quot;: &quot;${Stock.items}&quot;,
            &quot;mass&quot;: &quot;${Stock.mass}&quot;,
            &quot;MD5&quot;: &quot;${Stock.MD5}&quot;,
            &quot;swap&quot;: &quot;${Stock.swap}&quot;,
            &quot;swapAlpha&quot;: &quot;${Stock.swapAlpha}&quot;}`,

        dollars = (Stock.dollars*Stock.swap*Stock.items).toFixed(2);

        ModelMyCart.push([
          `div`, `.@_gxM _geQ _yZS uZM`, [[
            `div`, `.@_`, `&@style>max-width:60px`, [[
              `img`, `&@alt>${Stock.alpha}`, `&@style>max-width:100%`, `&@src>/${Stock.file}`]]], [
            `div`, `.@_eYG _geQ`, [[
              `div`, [[
                `span`, `&@style>text-transform:capitalize;font-weight:300`, `~@${Stock.alpha}`]]], [
                `div`, `.@_gxM _geQ`, [[
                  `div`, [[
                    `span`, `#@mass_${Stock.MD5}_${MyCart.indexOf(Stock)}`, `.@_a2X`, `&@style>font-size:10px;letter-spacing:.9px`, `~@${Stock.mass*Stock.items} grams`]]], [`div`, `.@_QZg`]]], [
              `div`, `.@_gxM _geQ`, `&@style>width:100%`, [[
                `div`, `&@style>margin: 8px 0`, [[
                  `div`, `.@_gxM _geQ`, `&@style>border:1px solid #e7e7e7;padding:4px 8px`, [[
                    `div`, [[`a`, `#@sliceCart`, `.@-_tX Minus`, ModelJSON, `&@href>javascript:;`]]], [
                    `div`, `.@_tXx`, `#@items_${Stock.MD5}_${MyCart.indexOf(Stock)}`, `&@style>padding:0 8px`, `~@${Stock.items}`], [
                    `div`, [[`a`, `#@alterCart`, `.@-_tX Plus`, ModelJSON, `&@forPlus>${Stock.MD5}-${MyCart.indexOf(Stock)}`, `&@href>javascript:;`]]]]]]], [
                `div`, `.@_QZg`, [[`span`, `.@_tXx`, `#@dollars_${Stock.MD5}_${MyCart.indexOf(Stock)}`, `~@${Stock.swapAlpha}${dollars.toLocaleString()}`]]]]]]]]])
      });

      return [`div`, ModelMyCart]
    },

    ModelSum: function (MyCart, MyRegion, Billto) {

      if (MyCart.length === 0) return [];

      let sum = 0,

        mass = 0;

      MyCart.forEach(Stock => {

        sum += Stock.dollars*Stock.items

        mass += Stock.mass*Stock.items

      });

      let Meta = MyCart[0];

      let Sum = (sum*Meta.swap).toFixed(2);

      let RegionSet, Range, Grams, Sell;

      MyRegion.zones.forEach(Region => {

        if (Region.locale === Billto[0]) RegionSet = Region;
      });

      RegionSet.rates.forEach(Rate => {

        if (Rate.saleSetAlpha[1] > sum && sum > Rate.saleSetAlpha[0]) {

          Range = Rate.saleSetAlpha;

          Rate.grams.forEach(Mass => {

            if (Mass.gramSetAlpha[0] < mass && mass < Mass.gramSetAlpha[1]) {

              Grams = Mass.gramSetAlpha;

              Sell = Mass.sale;
            }
          })
        }
      })

      let Gross = parseFloat(Sum) + parseFloat(Sell[1])*Meta.swap

      return [
      `section`, `#@ModelSum`, [[
        `div`, `.@_g0`, `&@style>border-bottom:1px solid #e6e7e8;margin-top:16px`, [[
          `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px;font-weight:600`, [[`div`, [[`p`, `~@Order Summary`]]]]], [
          `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, [[
            `div`, `.@_uZM`, [[
              `div`, `.@_gxM _yZS`, [[
                `div`, [[`span`, `.@_a2X`, `&@style>font-size:12px;letter-spacing:.9px`, `~@items (${MyCart.length})`]]], [
                `div`, `.@_QZg`, [[
                  `span`, `&@style>font-size:10px;text-transform:uppercase`, `~@${Meta.swapAlpha}`, [[
                    `span`, `#@StockSum`, `&@style>font-size:17px`, `~@${Sum}`]]]]]]], [
              `div`, `.@yZS`, [[
                `span`, `.@_a2X`, `&@style>font-size:10px;letter-spacing:.9px`, `~@weight class (${Grams[0]} grams - ${Grams[1]} grams)`]]], [
              `div`, `.@yZS`, [[`span`, `.@_a2X`, `&@style>font-size:10px;letter-spacing:.9px`, `~@price range (${Meta.swap*Range[0]} - ${Meta.swap*Range[1]})`]]], [
              `div`, `.@yZS`, [[`span`, `.@_a2X`, `&@style>font-size:10px;letter-spacing:.9px`, `~@mean weight (${mass} grams)`]]], [
              `div`, `.@_gxM yZS`, [[
                `div`, [[
                  `span`, `.@_a2X`, `&@style>font-size:12px;letter-spacing:.9px;text-transform:uppercase`, `~@delivery cost`, [[
                    `span`, `&@style>font-size:10px`, `~@ (m.w/p.r)`]]]]], [
                `div`, `.@_QZg`, [[
                  `span`, `&@style>font-size:10px;text-transform:uppercase`, `~@${Meta.swapAlpha}`, [[
                    `span`, `#@StockSum`, `&@style>font-size:17px`, `~@${(Sell[1]*Meta.swap).toFixed(2)}`]]]]]]]]], [
              `div`, `.@_gxM _yZS`, [[
                `div`, [[
                  `span`, `.@_a2X`, `&@style>font-size:12px;letter-spacing:.9px;text-transform:uppercase`, `~@order total`]]], [
                `div`, `.@_QZg`, [[
                  `span`, `&@style>font-size:10px;text-transform:uppercase`, `~@${Meta.swapAlpha}`, [[
                    `span`, `#@StockSum`, `&@style>font-size:17px`, `~@${Gross.toFixed(2)}`]]]]]]]]]]]]];
    },

    ModelShipping: function () {

      return [
      `section`, `#@ModelSum`, [[
        `div`, `.@_g0`, `&@style>border-bottom:1px solid #e6e7e8;margin-top:16px`, [[
          `div`, `.@_gxM _geQ _cX3`, `&@style>margin-bottom:16px;font-weight:600`, [[`div`, [[`p`, `~@Shipping & Delivery`]]]]], [
          `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, [[
            `div`, `.@_yZS`, [[`span`, `~@Choose Shipping Method`]]], [
            `div`, `.@_sZ2`, [[
              `div`, [[
                `div`, `.@_yZS _gxM _uZM`, [[
                  `label`, `.@_tXv`, `&@role>radio`, [[
                    `input`, `&@type>radio`, `#@ShipBy`, `&@value>standard`, `&@name>shipby`], [
                      `span`, `.@_tCw _a2X _tY0`, `&@style>text-transform:uppercase;font-size:12px`, `~@standard delivery`]]]]], [
                `div`, `.@_yZS`, [[`span`, `&@style>font-size: 12px;border: 1px solid #1185fe;border-radius: .5em;padding: .75rem 1rem .75rem 2.75rem;margin: 1.5rem 0;`, `~@This option is our standard method of delivery and is 
                  entirely dependent to day to day logistical factors like traffic, accessibility and time; this option does 
                  not fully guarantee night-time deliveries and therefore warrants you checkout earlier in the day. Choosing 
                  this option prompts saving a one time off GPS location, please make sure to accept location tracking when 
                  in an ideal delivery address, a static location is vital for your delivery.`]]]]], [
              `div`, [[
                `div`, `.@_yZS _gxM _uZM`, [[
                  `label`, `.@_tXv`, `&@role>radio`, [[
                    `input`, `&@type>radio`, `#@ShipBy`, `&@value>expedite`, `&@name>shipby`], [
                      `span`, `.@_tCw _a2X _tY0`, `&@style>text-transform:uppercase;font-size:12px`, `~@pickup & expedited delivery`]]]]], [
                `div`, `.@_yZS`, [[`span`, `&@style>font-size: 12px;border: 1px solid #1185fe;border-radius: .5em;padding: .75rem 1rem .75rem 2.75rem;margin: 1.5rem 0;`, `~@Expedited delivery at you discretion, use our freighter hailing 
                  services & drone delivery services. This is an extension delivery service into our shipping & delivery mobile 
                  application which gives you the option of hailing a delivery drone or freight vehicle on a live app to 
                  deliver your package. It also avails pickup stations, for self-pickup.`]]]]]]]]]]]]]
    },

    ModelProxy: function (Arg) {

      return [`div`, `.@_geQ _tY0`, `&@style>justify-content:center`, [[
        `span`, `.@-_tX AppMedium`, `&@style>width:56px;height:56px`], [
        `div`, [[
          `span`, `&@style>font-size: 0.9rem;border: 1px solid #1185fe;border-radius: .5em;padding: .75rem 1rem .75rem 2.75rem;margin: 1.5rem 0;`, `~@redirecting to payment...`]]]]]
    },

    ModelPay: function (Arg) {

      return [
      `div`, `.@_geQ _tY0`, `&@style>justify-content:center`, [[
        `span`, `.@-_tX AppMedium`, `&@style>width:56px;height:56px`], [
        `div`, `&@style>padding: .75rem .75rem 2.75rem;margin: 1.5rem 0;`, [[
          `div`, `.@_gM_a _agM _guZ`, `&@style>background:#1185fe`, [[
            `a`, `#@paygate`, `.@_TX_a _atX`, /*`&@target>_blank`, `&@href>/`,*/ `&@href>${Arg.paygate}`, `&@style>font-size: 0.9rem;font-weight:300`, `~@proceed to payment`]]]]]]]
    },

    ModelStallCities: function (Args) {

      let ModelZones = [];

      Args.forEach((Zone, e) => {

        ModelZones.push([
        `div`, [[
          `div`, `.@_yZS _gxM _uZM`, [[
            `label`, `.@_tXv _geQ`, `&@role>checkbox`, `&@style>display:flex`, [[
              `input`, `&@type>checkbox`, `#@getCity`, `&@value>${Zone}`, `&@name>setSub`], [
                `span`, `.@_tCw _aA2 tXx`, `~@${Zone}`]]]]]]]);
      });

      return [
      `div`, [[
        `div`, `.@_gcQ _aXZ _uZM _tY0`, [[
          `div`, `.@_geQ _gxM _eYG`, [[
            `div`, `.@_aA2`, [[
              `div`, [[
                `span`, `&@style>`, `~@Choose Your Towns of Operation`]]]]]]], [
          `div`, `.@_QZg _gMz`, [[`a`, `#@DelModalStallCities`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]], [
        `div`, `.@_aXY _tY0 _XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);margin: 0 0 55px`, [[
          `div`, `.@_sZ2`, ModelZones]]], [
          `div`, `.@_azX- _gMX _gp0 _gmg`, [[
            `div`, `.@_gxM _gMX`, [[
              `div`, `.@_gMX`, [[
                `div`, `.@_eYG`], [
                `div`, `.@_QZg _gMz`, [[
                  `div`, `.@_axS`, [[
                    `div`, `.@_gM_a _agM _guZ`, [[
                      `a`, `#@setStallCity`, `.@_TX_a _atX _utQ`, `&@href>javascript:;`, `&@style>font-size:12px`, `~@set country & regions`]]]]]]]]]]]]]]]

    },

    ModelRadio: function (Args) {

      let ModelArgs = [];

      Args[1].forEach((Arg, e) => {

        ModelArgs.push([
        `div`, [[
          `div`, `.@_yZS _gxM _uZM`, [[
            `label`, `.@_tXv _geQ`, `&@role>radio`, `&@style>display:flex`, [[
              `input`, `&@type>radio`, `#@${Args[2]}`, `&@value>${Arg[0]}`, `&@name>setSub`, `&@style>margin:0 8px 0 0`], [
                `span`, `.@_tCw _aA2 tXx`, `~@${Arg[0]}`]]]]]]]);
      });

      return [
      `div`, `&@style>letter-spacing:0.75px`, [[
        `div`, `.@_gcQ _aXZ _uZM`, [[
          `div`, `.@_geQ _gxM _eYG`, [[
            `div`, `.@_aA2`, [[
              `div`, [[
                `span`, `&@style>`, `~@${Args[0]}`]]]]]]], [
          `div`, `.@_QZg _gMz`, [[`a`, `#@DelModalStallCities`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);`, [[
          `div`, `.@_sZ2`, ModelArgs]]]]]

    },

    ModelStallAlter: function (Args) {

      let ModelAlter = [];

      Args[1].forEach(Arg => {

        if (Arg[0] === `alpha`) {

          ModelAlter.push([
            `div`, [[
              `div`, `.@_gxM _yZS`, [[
                `span`, `.@_tXx`, `~@${Args[1].indexOf(Arg) + 1}.`], [`div`, `.@_eYG _tXx`, `~@Add a custom name for your item`]]], [
              `div`, `.@_eYG`, [[
                `div`, `.@_gMX`, [[
                  `div`, `.@_UFA _gMX`, [[
                    `input`, `#@getAlpha`, `.@_RRD _aA2 _pVa`, `&@autocomplete>off`, `&@placeholder>custom/signature tag`, `&@style>padding:8px 0;margin:0`]]]]]]]]])
        }

        if (Arg[0] === `usd`) {

          ModelAlter.push([
            `div`, [[
              `div`, `.@_gxM _yZS`, [[
                `span`, `.@_tXx`, `~@${Args[1].indexOf(Arg) + 1}.`], [`div`, `.@_eYG _tXx`, `~@What does your item cost?`]]], [
              `div`, `.@_eYG`, [[
                `div`, `.@_gMX`, [[
                  `div`, `.@_UFA _gMX`, [[
                    `input`, `#@getDollars`, `.@_RRD _aA2 _pVa`, `&@autocomplete>off`, `&@placeholder>amount in american dollars`, `&@style>padding:8px 0;margin:0`]]]]]]]]])
        }

        if (Arg[0] === `units`) {

          let ModelStack = [];

          Arg[1].forEach((Stack) => {

            let flip = ``;

            if (Stack === Args[2].unit) flip = `&@checked>true`

            ModelStack.push([
              `div`, [[
                `div`, `.@_yZS _gxM`, [[
                  `label`, `.@_tXv _geQ`, `&@role>radio`, `&@style>display:flex`, [[
                    `input`, `&@type>radio`, `#@getStack`, `&@value>${Stack}`, `&@name>getStack`, flip, `&@sum>${Args[2].sum}`, `&@style>margin:0 8px 0 0`], [
                      `span`, `.@_tCw _aA2 tXx`, `~@${Stack}`]]]]]]]);
          });

          ModelAlter.push([
            `div`, [[
              `div`, `.@_gxM _yZS`, [[
                `span`, `.@_tXx`, `~@${Args[1].indexOf(Arg) + 1}.`], [`div`, `.@_eYG _tXx`, `~@Select item unit for your price`]]], [
              `div`, `.@_eYG`, ModelStack]]])
        }

        if (Arg[0] === `feature`) {

          let ModelStack = [];

          Arg[1].forEach((Stack) => {

            let flip = ``;

            if (Stack === `in stock` && Args[2].feature === true) flip = `&@checked>true`;

            if (Stack === `out of stock` && Args[2].feature === false) flip = `&@checked>true`

            ModelStack.push([
              `div`, `.@_geQ`, [[
                `div`, `.@_yZS _gxM`, `&@style>width:100%`, [[
                  `label`, `.@_tXv _geQ`, `&@role>radio`, `&@style>display:flex`, [[
                    `input`, `&@type>radio`, `#@getAvail`, `&@value>${Stack}`, `&@name>getAvail`, flip, `&@sum>${Args[2].sum}`, `&@style>margin:0 8px 0 0`], [
                      `span`, `.@_tCw _aA2 tXx`, `~@${Stack}`]]]]]]]);
          });

          ModelAlter.push([
            `div`, [[
              `div`, `.@_gxM _yZS`, [[
                `span`, `.@_tXx`, `~@${Args[1].indexOf(Arg) + 1}.`], [`div`, `.@_eYG _tXx`, `~@Select item availability`]]], [
              `div`, `.@_eYG _gxM`, ModelStack]]])
        }
      })

      return [
      `div`, `&@style>letter-spacing:0.75px`, [[
        `div`, `.@_gcQ _aXZ _uZM`, [[
          `div`, `.@_geQ _gxM _eYG`, [[
            `div`, `.@_aA2`, [[
              `div`, [[
                `span`, `&@style>`, `~@${Args[0]}`]]]]]]], [
          `div`, `.@_QZg _gMz`, [[`a`, `#@DelModalStallCities`, `.@-_tX DelColor`, `&@href>javascript:;`]]]]], [
        `div`, `.@_aXY _XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);margin: 0 0 55px`, [[
          `div`, `.@_sZ2`, ModelAlter]]], [
          `div`, `.@_azX- _gMX _gp0 _gmg`, [[
            `div`, `.@_gxM _gMX`, [[
              `div`, `.@_gMX`, [[
                `div`, `.@_eYG`], [
                `div`, `.@_QZg _gMz`, [[
                  `div`, `.@_axS`, [[
                    `div`, `.@_gM_a _agM _guZ`, [[
                      `a`, `#@setAlter`, `.@_TX_a _atX _utQ`, `&@href>javascript:;`, `&@sum>${Args[2].sum}`, `&@style>font-size:12px`, `~@save & exit`]]]]]]]]]]]]]]]

    },

    ModelMyPay: function (Args) {

      let ModelPay = [];

      Args.bag.forEach(Pay => {

        ModelPay.push([
          `div`, `&@style>padding: 16px`, [[
            `div`, [[
              `div`, `.@gxM`, [[
                `div`, `~@${Pay.alpha}`], [
                `div`, `.@_gxM _yZS`, [[
                  `span`, `&@style>font-size:10px;padding:0 24px;background:#1185fe3b;border-radius:100px;color:#1185fe`, `~@#${Pay.MD5}`], [
                  `div`, `.@_QZg`, [[`span`, `&@style>font-size:10px`, `.@_a2X`, `~@${Pay.items} items`]]]]], [
                `div`, `.@_gxM _yZS`, [[
                  `div`, `.@_gxM`, [[
                    `span`, `.@_cCq _gS3`, `&@style>height:24px;width:24px;margin: 0 15px`, [[`img`, `.@_aWz`, `&@src>/${Pay.file}`]]]]], [
                  `div`, `.@_QZg`, [[`span`, `&@style>font-size:10px`, `.@_a2X`, `~@${Pay.mass}grams`]]]]], [
                `div`, `.@_gxM _yZS`, [[
                  `span`, `.@_-Zz`, `&@style>font-size:10px;padding:0 24px;background:#ffacac2b;border-radius:100px;color:#ffacac;text-transform:uppercase`, `~@cancelled`], [
                  `div`, `.@_QZg`, [[
                    `span`, `&@style>font-size:10px;padding:0 12px;background:#9999992e;border-radius:100px;`, `.@_a2X`, `~@kes${(Pay.items*Pay.dollars*Pay.swap).toFixed(2)}`]]]]]]]]]]]);
      })

      return [`div`, ModelPay]
    },

    ModelToast: function () {

      return [
      `div`, `&@style>position: fixed;bottom: 10px;width: 100%;align-content: center;justify-content: center;align-items: center;z-index: 31;`, [[
        `div`, `.@_tY0 _gxM`, `&@style>background:#000;color:#fff;font-size:11px;padding:8px;max-width:424px;border-radius:100px;width:100%`, [[
          `div`, `.@_eYG`, [[`span`, `#@toastAlpha`, `&@style>text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:100%;padding:0 16px 0 0`, `~@+ Organic Bananas`]]], [
          `div`, `.@_QZg`, [[`span`, `#@toastPay`, `&@style>white-space:nowrap;border-left:1px solid #999;padding:0 16px`, `~@k£. 51.23`]]]]]]]
    }, 

    ModalMailFee: function (Arg) {

      let ModelMailFee = [];

      Arg[0].zones.forEach(Geog => {

        let mailera = `${Geog.drop[0][0]}` + Geog.drop[0][1] + ` - ` + Geog.drop[1][0] + Geog.drop[1][1];

        let sum = Arg[1].dollars*Arg[1].items;

        let g = Arg[1].mass*Arg[1].items;

        let fee;

        Geog.rates.forEach(Fee => {

          if (Fee.saleSetAlpha[1] > sum && sum > Fee.saleSetAlpha[0]) {

            Fee.grams.forEach(G => {

              if (G.gramSetAlpha[0] < g && g < G.gramSetAlpha[1]) fee = G.sale[1];
          })
        }
      })

      fee = parseFloat(fee)*Arg[0].swap;

        ModelMailFee.push([
          `div`, `.@_gZ`, [[
            `div`, `.@_gcQ _aXZ`, [[
              `span`, `.@_tXx`, `~@${Geog.locale}`], [
              `div`, `.@_eYG`, [[
                `span`, `&@style>font-size:10px;font-weight:600;padding:0 12px;background:#9999992e;border-radius:100px;color:#999;text-transform:uppercase`, `~@${mailera}`]]], [
              `div`, `.@_QZg`, [[
                `span`, `&@style>fnt-size:17px`, `~@${Arg[0].swapAlpha + ` ` + fee.toFixed(2)}`]]]]]]])
      });
      
      return [`div`, `@_-Zz`, `#@ModalMailFee`, [[
        `div`, `.@_UQe _tY0`, `#@modalView`, [[
         `div`, `.@_HUa`], [`div`, `.@_UfX`, [[
          `div`, `.@_oPQ`, [[
            `div`, `&@style>letter-spacing:1.2px`, [[
              `div`, `.@_gcQ _aXZ uZM`, [[
                `div`, `.@_gxM _geQ`, `&@style>width:100%`, [[`a`, `#@DelMailFee`, `.@-_tX From`, `&@href>javascript:;`], [
                  `div`, `.@_eYG`, []]]]]], [
              `div`, `.@_aXY _XsQ _aA2`, `&@style>max-height: calc(100vh - 170px);padding:0;`, [[
                `div`, `.@sZ2`, `&@style>font-size:12px`, ModelMailFee]]]]]]]]]]]]];
    },

    ModelPull: function () {

      let ModelPullArgs = [];

      let PullArgs = [`brands`, `product tag`];

      PullArgs.forEach(Arg => {

        let style = ``;

        if (Arg === `product tag`) style = `text-decoration:line-through`; 

        ModelPullArgs.push([
          `a`, `#@pullArg`, `&@style>margin: 0 14px 14px 0;font-size:12px;padding:0 12px;color:#fff;border:1px solid #fff;border-radius:100px;${style}`, `&@href>javascript:;`, `~@${Arg}`])
      })

      return [[
      `main`, `.@_xC2`, [[
        `div`, `.@_tY0`, [[
          `section`, `#@ModelPull`, `&@style>background: #000`, [[
            `div`, `.@_g0`, `&@style>border-bottom:1px solid #e6e7e8;margin-top:16px`, [[
              `div`, `.@_gX0`, `&@style>max-width:960px;margin:0 auto;padding:0 8px;width:100%`, [[
                `div`, `.@_gZy`, ModelPullArgs]]]]]]], [
          `section`, `#@ModelPullStack`, `&@style>max-width:960px;margin:24px auto;width:100%`]]]]], [
      `nav`, `.@_uHC _tY0`, [[
        `div`, `.@_xCt`], [
        `div`, [[
          `div`, `.@_-tY`, [[
            `div`, `.@_aXz`, [[
              `a`, `#@foldPull`, `.@_-tX From`, `&@href>javascript:;`], [
              `div`, `.@_eYG _tY0`, `&@style>width:100%`, [[`input`, `#@pullRetailStack`, `.@_tY0 _RRD`, `&@style>border:none;width:100%;margin:0`, `&@placeholder>Search...`]]], [
              `div`, `.@_QZg`, [[`a`, `#@foldPull`, `.@_-tX Close`, `&@href>javascript:;`]]]]]]]]]]]]
    },

    ModelPullStack: function (Arg) {

      let ModelPullStack = [];

      Arg.forEach(Sell => {

        ModelPullStack.push([
        `div`, `.@_gZ`, [[
          `div`, `.@_gcQ _aXZ`, `&@style>padding: 16px 24px`, [[
            `span`, `.@_cCq _gS3`, `#@mug-ava`, `@href>javascript:;`, `&@style>height:24px;width:24px;`, [[
              `img`, `#@pullRetailStock`, `&@sum>${Sell.MD5}`, `.@_aWz`, `&@style>height:auto`, `&@src>/${Sell.files[0]}`]]], [
              `div`, `.@_eYG`, [[
                `a`, `#@pullRetailStock`, `.@_tXv _aA2 _aWz`, `&@sum>${Sell.MD5}`, `&@href>javascript:;`, `~@${Sell.alpha}`]]], [
          `div`, `.@_QZg`, [[
            `span`, `&@style>font-size:10px;padding:0 12px;background:#9999992e;border-radius:100px;`, `.@_a2X _tXx _tY0`, `~@€${(Sell.dollars*.84).toFixed(2)}`]]]]]]])
      })

      return [`div`, `.@_z4`, ModelPullStack]
    }, 

    ModelPullSharePay: function (Arg) {

      let Pay = Arg.fid[0][0];

      let ModelCentile = [];

      let price = (Pay[0].toFixed(2)).toString().split(`.`);

      if (Pay[1] > 0 || Pay[1] < 0) {

        let ModelSymbol = [];

        if (Pay[1] > 0) ModelSymbol = [`path`, `&@style>stroke:#17dd17;fill:none`, `&@d>M12 17.5 12 8 M6 13 12 8 18 13`];

        if (Pay[1] < 0) ModelSymbol = [`path`, `&@style>stroke:red;fill:none`, `&@d>M12 17.5 12 8 M6 13 12 17.5 18 13`];

        ModelCentile = [
          `div`, `.@_gxM`, [[
            `svg`, `&@style>width:24px;height:24px;min-height:24px`, [ModelSymbol]], [
            `span`, `.@_tXx`, `&@style>font-family:proxima-nova;font-size:15px;color:${(Pay[1]>0?`#17dd17`:`red`)}`, `~@${(Pay[1]>0?`+`:``)}${Pay[1].toFixed(2)} (${(Pay[1]>0?`+`:``)}${Pay[2].toFixed(2)}%)`]]]
      }

      let ModelTimeline = [];

      Pay[3].forEach(era => {ModelTimeline.push([`div`, `.@_geQ`, [[`span`, `.@_tXx`, `~@${era}`]]])});

      let ModelSVGCountY = [];

      Pay[4][1].sort((A, B) => {return B[1] - A[1]});

      let Vees = [Pay[4][1][0][1]*.75, Pay[4][1][0][1]*1.25, (Pay[4][1][0][1]*1.25 - Pay[4][1][0][1]*.75)];

      if (Pay[4][1][1] && Pay[4][1][0][1] - Pay[4][1][Pay[4][1].length -1][1] > 0) {

        Vees = [Pay[4][1][Pay[4][1].length -1][1]*.75, Pay[4][1][0][1]*1.25, Pay[4][1][0][1]*1.25  - (Pay[4][1][Pay[4][1].length -1][1]*.75)];
      }

      let V = [Vees[0] + Vees[2], Vees[0] + Vees[2]*.66, Vees[0] + Vees[2]*.33, Vees[0]];

      V.reverse();

      V.forEach((a) => {

        ModelSVGCountY.push([
          `g`, [[
            `rect`, `.@_pg4`, `&@x>1%`, `&@y>${((240*.9/V[3])*(V[3] - a))}`, `&@width>90%`, `&@height>1`], [
            `text`, `&@x>94%`, `&@y>${((240*.9/V[3])*(V[3] - a))}`, `&@style>font-size:10px;font-family:proxima-nova;font-weight:600`, `~@${a.toFixed(2)}`]]]);
      });

      let ModelSVGCountX = [];

      let max = Arg.secs - 60000*2;

      let H = [max - 60000*52, max - 60000*42, max - 60000*31, max - 60000*21, max - 60000*10, max];

      H.reverse();

      H.forEach((a) => {

        ModelSVGCountX.push([
          `text`, `&@x>${82 - (H.indexOf(a) * 77.5/(H.length - 1))}%`, `&@y>${((240*.9/V[3])*(V[3] - V[0])) + 17}`, `&@style>font-size:10px;font-family:proxima-nova;font-weight:600`, `~@${new Date(a).getUTCHours() + `:` + new Date(a).getUTCMinutes()}`]);
      });

      Pay[4][1].sort((A, B) => {return B[0] - A[0]});

      let JS = JSON.stringify(Pay[4][1]);

      JS.replace(new RegExp(`"`, `g`), `&quot;`);

      let ModelSVGline = [`g`, [[`path`, `&@ymax>${V[3] - V[0]}-${V[3]}`, `&@data>${JS}`, `&@style>fill:none;stroke:#5841d8;stroke-linejoin:round;stroke-width:2;stroke-linecap:round`, `&@d>M`]]];

      let ModelSVGDetails = [];

      let Pays = Pay[4][1].sort((A, B) => {return B[1] - A[1]});

      let SVGDetails = [
        [
          `high`, (Pays[1] && (Pays[0][1] > Pays[Pays.length - 1][1]))?Pays[0][1]: `unch`], 
        [
          `low`, (Pays[1] && (Pays[0][1] > Pays[Pays.length - 1][1]))?Pays[Pays.length - 1][1]: `unch`]];

      SVGDetails.forEach(Value => {

        ModelSVGDetails.push([
          `div`, `.@_geQ`, [[
            `div`, `.@_gxM`, [[
              `span`, `.@_tXx _tAa`, `~@${Value[0]}`], [
              `div`, `.@_eYG`, [[`span`, `.@_tXx tAa`, `~@${Value[1]}`]]]]]]])
      })

      return [
        `section`, `#@ModelPullSharePay`, `.@_-Zz`, `&@style>max-width:940px;margin:24px auto;width:100%;font-family:gotham-book`, [[
          `div`, `.@_z4`, [[
            `div`, `.@_gcQ _aXZ`, [[`span`, `&@style>font-family:gotham-book`, `~@Price per Share unit`]]], [
            `div`, `.@_gxM _gcQ`, [[
              `span`, `.@_tXx`, `&@style>font-family:proxima-nova;font-size:24px`, `~@$${price[0].toLocaleString() + `.` + price[1]} USD`], 
              ModelCentile]], [
            `div`, `.@_gxM _yZS`, [[
              `div`, `.@_eYG`], [
              `div`, `.@_QZg _geQ`, `&@style>text-transform:uppercase;font-size:11px`, ModelTimeline]]], [
            `div`, `.@_gcQ _aXZ _gZ`, [[
              `svg`, `#@ModelStockState`, `&@style>width:100%;min-height:${((240*.9/V[3])*(V[3] - V[0])) + 36}px;overflow:visible`, [[
                `g`, ModelSVGCountX], [`g`, ModelSVGCountY], ModelSVGline]]]], [
            `div`, `.@_gZ _gcQ _gxM`, `&@style>font-size:11px`, ModelSVGDetails]]]]];
    },

    ModelValuation: function (Arg) {

      let Till = Arg.fid[0][1];

      let ModelCentile = [];

      let Sum = (Till[0].toFixed(2)).split(`.`);

      if (Till[5][1][0] > 0 || Till[5][1][0] < 0) {

        let ModelSymbol = [];

        if (Till[5][1][0] > 0) ModelSymbol = [`path`, `&@style>stroke:#17dd17;fill:none`, `&@d>M12 17.5 12 8 M6 13 12 8 18 13`];

        if (Till[5][1][0] < 0) ModelSymbol = [`path`, `&@style>stroke:red;fill:none`, `&@d>M12 17.5 12 8 M6 13 12 17.5 18 13`];

        ModelCentile = [
          `div`, `.@_gxM`, [[
            `svg`, `&@style>width:24px;height:24px;min-height:24px`, [ModelSymbol]], [
            `span`, `.@_tXx`, `&@style>font-family:gotham-book;letter-spacing:.2px;font-size:15px;color:${(Till[5][1][0]>0?`#17dd17`:`red`)}`, `~@${(Till[5][1][0]>0?`+`:``)}${Till[5][1][0].toFixed(2)} (${(Till[5][1][0]>0?`+`:``)}${Till[5][1][1].toFixed(2)}%)`]]]
      }

      let ModelTimeline = [];

      Till[3].forEach(era => {ModelTimeline.push([`div`, `.@_geQ`, [[`span`, `.@_tXx`, `~@${era}`]]])});

      let ModelSVGCountY = [];

      let Axes = [];

      Till[4][6].forEach(Axis => {

        if (Axis[0] >= (Arg.secs - 3600000)) Axes.push(Axis);
      });

      Axes.sort((A, B) => {return B[1] - A[1]});

      Axes.push([Arg.secs - 3600000, Till[4][6][Till[4][6].indexOf(Axes[Axes.length - 1]) + 1][1]]);

      Axes.push([Arg.secs, Till[0]]);

      Axes.sort((A, B) => {return B[1] - A[1]});

      let Old = Axes.length - 1;

      let Factors = [Axes[Old][1]*.999, Axes[0][1]*1.001, (Axes[0][1]*1.001 - Axes[Old][1]*.999)];

      if (Axes[1] && Axes[0][1] - Axes[Old][1] > 0) {

        Factors = [Axes[Old][1]*.999, Axes[0][1]*1.001, Axes[0][1]*1.001  - (Axes[Old][1]*.999)];
      }

      let Scale = 320;console.log(Factors[2])

      if (Factors[2] > 10) Scale = 140

      if (Factors[2] > 20) Scale = 100

      if (Factors[2] > 50) Scale = 72

      if (Factors[2] > 100) Scale = 72

      let V = [Factors[0] + Factors[2], Factors[0] + Factors[2]*.66, Factors[0] + Factors[2]*.33, Factors[0]];

      V.reverse();

      V.forEach((a) => {

        ModelSVGCountY.push([
          `g`, [[
            `rect`, `.@_pg4`, `&@x>1%`, `&@y>${((240*Scale/V[3])*(V[3] - a))}`, `&@width>90%`, `&@height>1`], [
            `text`, `&@x>92%`, `&@y>${((240*Scale/V[3])*(V[3] - a))}`, `&@style>font-size:10px;font-family:gotham-book;letter-spacing:.2px;font-weight:300`, `~@${parseInt(a)}`]]]);
      });

      let ModelSVGCountX = [];

      let max = Arg.secs - 60000*2;

      let H = [max - 60000*52, max - 60000*42, max - 60000*31, max - 60000*21, max - 60000*10, max];

      H.reverse();

      H.forEach((a) => {

        let mins = new Date(a).getUTCMinutes();

        (mins < 10) ? mins = `0${mins}`: mins;

        ModelSVGCountX.push([
          `text`, `&@x>${82 - (H.indexOf(a) * 77.5/(H.length - 1))}%`, `&@y>${((240*Scale/V[3])*(V[3] - V[0])) + 17}`, `&@style>font-size:10px;font-family:gotham-book;letter-spacing:.2px;font-weight:300`, `~@${new Date(a).getUTCHours() + `:` + mins}`]);
      });

      Axes.sort((A, B) => {return B[0] - A[0]});

      let JS = JSON.stringify(Axes);

      JS.replace(new RegExp(`"`, `g`), `&quot;`);

      let ModelSVGline = [`g`, [[`path`, `&@ymax>${V[3] - V[0]}-${V[3] + `-` + Scale}`, `&@data>${JS}`, `&@style>fill:none;stroke:#5841d8;stroke-linejoin:round;stroke-width:2;stroke-linecap:round`, `&@d>M`]]];

      return [
        `section`, `#@ModelValuation`, `&@style>max-width:940px;margin:24px auto;width:100%`, [[
          `div`, `.@_z4`, `&@style>padding: 16px 0`, [[
            `div`, `.@_gcQ _aXZ`, [[`span`, `&@style>font-family:gotham-book`, `~@Market Valuation & Equity`]]], [
            `div`, `.@_gxM _gcQ`, [[
              `span`, `.@_tXx`, `&@style>font-family:gotham-book;letter-spacing:.2px;font-size:24px`, `~@$${Sum[0].toLocaleString() + `.` + Sum[1]} USD`], 
              ModelCentile]], [
            `div`, `.@_gxM _yZS _sZ2 _-Zz`, [[
              `div`, `.@_eYG`], [
              `div`, `.@_QZg _geQ`, `&@style>text-transform:uppercase;font-size:11px`, ModelTimeline]]], [
            `div`, `.@_gcQ _aXZ _gZ`, [[
              `svg`, `#@ModelTillState`, `&@style>width:100%;min-height:${((240*Scale/V[3])*(V[3] - V[0])) + 36}px;overflow:visible`, [[
                `g`, ModelSVGCountX], [`g`, ModelSVGCountY], ModelSVGline]]]]]]]];
    },

    ModelSales: function (Arg) {

      let Till = Arg.fid[0][1];

      let ModelCentile = [];

      let Sum = (Till[0].toFixed(2)).split(`.`);

      if (Till[5][1][0] > 0 || Till[5][1][0] < 0) {

        let ModelSymbol = [];

        if (Till[5][1][0] > 0) ModelSymbol = [`path`, `&@style>stroke:#17dd17;fill:none`, `&@d>M12 17.5 12 8 M6 13 12 8 18 13`];

        if (Till[5][1][0] < 0) ModelSymbol = [`path`, `&@style>stroke:red;fill:none`, `&@d>M12 17.5 12 8 M6 13 12 17.5 18 13`];

        ModelCentile = [
          `div`, `.@_gxM`, [[
            `svg`, `&@style>width:24px;height:24px;min-height:24px`, [ModelSymbol]], [
            `span`, `.@_tXx`, `&@style>font-family:proxima-nova;font-size:15px;color:${(Till[5][1][0]>0?`#17dd17`:`red`)}`, `~@${(Till[5][1][0]>0?`+`:``)}${Till[5][1][0].toFixed(2)} (${(Till[5][1][0]>0?`+`:``)}${Till[5][1][1].toFixed(2)}%)`]]]
      }

      let ModelTimeline = [];

      Till[3].forEach(era => {ModelTimeline.push([`div`, `.@_geQ`, [[`span`, `.@_tXx`, `~@${era}`]]])});

      let ModelSVGCountY = [];

      let Axes = [];

      Till[4][6].forEach(Axis => {

        if (Axis[0] >= (Arg.secs - 3600000)) Axes.push(Axis);
      });

      Axes.sort((A, B) => {return B[1] - A[1]});

      Axes.push([Arg.secs - 3600000, Till[4][6][Till[4][6].indexOf(Axes[Axes.length - 1]) + 1][1]]);

      Axes.push([Arg.secs, Till[0]]);

      Axes.sort((A, B) => {return B[1] - A[1]});

      let Old = Axes.length - 1;

      let Factors = [Axes[Old][1]*.999, Axes[0][1]*1.001, (Axes[0][1]*1.001 - Axes[Old][1]*.999)];

      if (Axes[1] && Axes[0][1] - Axes[Old][1] > 0) {

        Factors = [Axes[Old][1]*.999, Axes[0][1]*1.001, Axes[0][1]*1.001  - (Axes[Old][1]*.999)];
      }

      let Scale = 320;console.log(Factors[2])

      if (Factors[2] > 10) Scale = 28

      if (Factors[2] > 50) Scale = 72

      if (Factors[2] > 100) Scale = 72

      let V = [Factors[0] + Factors[2], Factors[0] + Factors[2]*.66, Factors[0] + Factors[2]*.33, Factors[0]];

      V.reverse();

      V.forEach((a) => {

        ModelSVGCountY.push([
          `g`, [[
            `rect`, `.@_pg4`, `&@x>1%`, `&@y>${((240*Scale/V[3])*(V[3] - a))}`, `&@width>90%`, `&@height>1`], [
            `text`, `&@x>92%`, `&@y>${((240*Scale/V[3])*(V[3] - a))}`, `&@style>font-size:10px;font-family:proxima-nova;font-weight:600`, `~@${a.toFixed(2)}`]]]);
      });

      let ModelSVGCountX = [];

      let max = Arg.secs - 60000*2;

      let H = [max - 60000*52, max - 60000*42, max - 60000*31, max - 60000*21, max - 60000*10, max];

      H.reverse();

      H.forEach((a) => {

        ModelSVGCountX.push([
          `text`, `&@x>${82 - (H.indexOf(a) * 77.5/(H.length - 1))}%`, `&@y>${((240*Scale/V[3])*(V[3] - V[0])) + 17}`, `&@style>font-size:10px;font-family:proxima-nova;font-weight:600`, `~@${new Date(a).getUTCHours() + `:` + new Date(a).getUTCMinutes()}`]);
      });

      Axes.sort((A, B) => {return B[0] - A[0]});

      let JS = JSON.stringify(Axes);

      JS.replace(new RegExp(`"`, `g`), `&quot;`);

      let ModelSVGline = [`g`, [[`path`, `&@ymax>${V[3] - V[0]}-${V[3] + `-` + Scale}`, `&@data>${JS}`, `&@style>fill:none;stroke:#5841d8;stroke-linejoin:round;stroke-width:2;stroke-linecap:round`, `&@d>M`]]];

      return [
        `section`, `#@ModelValuation`, `&@style>max-width:940px;margin:24px auto;width:100%`, [[
          `div`, `.@_z4`, `&@style>padding: 16px 0`, [[
            `div`, `.@_gcQ _aXZ`, [[`span`, `.@`, `~@Sales`]]], [
            `div`, `.@_gxM _gcQ`, [[
              `span`, `.@_tXx`, `&@style>font-family:proxima-nova;font-size:24px`, `~@$${Sum[0].toLocaleString() + `.` + Sum[1]} USD`], 
              ModelCentile]], [
            `div`, `.@_gxM _yZS _sZ2 _-Zz`, [[
              `div`, `.@_eYG`], [
              `div`, `.@_QZg _geQ`, `&@style>text-transform:uppercase;font-size:11px`, ModelTimeline]]], [
            `div`, `.@_gcQ _aXZ _gZ`, [[
              `svg`, `#@ModelTillState`, `&@style>width:100%;min-height:${((240*Scale/V[3])*(V[3] - V[0])) + 36}px;overflow:visible`, [[
                `g`, ModelSVGCountX], [`g`, ModelSVGCountY], ModelSVGline]]]]]]]];
    },

    ModelPaygate: function (Arg) {

      let Paygates = [
        //[`flutterwave`, [`m-pesa, paypal, debit & credit cards`, `unstable`]], 
        [`intasend`, [`m-pesa`, `recommended`]], 
        //[`jengapay`, [`m-pesa, eazzy pay`, `offline`]]
      ];

      let ModelPaygates = [];

      Paygates.forEach(Paygate => {

        let Style = `&@style>padding:0 12px;color:#fff;font-size:10px;border-radius:12px;`;

        if (Paygate[1][1] === `offline`) Style += `background:red`;

        else if (Paygate[1][1] === `stable`) Style += `background:#1185fe`;

        else if (Paygate[1][1] === `recommended`) Style += `background:#19e819`;

        else if (Paygate[1][1] === `unstable`) Style += `background:orange`;

        ModelPaygates.push([
          `div`, `.@_gZ _gcQ`, [[
            `div`, [[
              `span`, `&@style>text-transform:uppercase`, `~@${Paygate[0]}`], [
              `div`, [[`span`, `&@style>font-weight:600;color:#a6a6a6`, `~@${Paygate[1][0]}`]]]]], [
            `div`, `.@_QZg`, [[`span`, Style, `~@${Paygate[1][1]}`]]], [
            `label`, `#@gate`, `&@for>${Paygate[0]}`, `&@style>position:absolute;left:0;width:100%;height:100%`]]])
      })

      return [`div`, `.@_geQ _tY0`, `&@style>justify-content:center`, [[
        `div`, `&@style>padding:0 16px`, `~@Payment Options`], [
        `div`, `&@style>margin:24px auto;max-width:600px;width:100%;padding:0 12px`, [[
          `div`, `&@style>border: 1px solid #e6e7e8;border-radius: .5em;`, ModelPaygates]]]]]
    },

    ModelCustomPay: function (Arg) {

      Arg = [Arg.myCart, Arg.myRegion, Arg.Billto];

      if (Arg[0].length === 0) return [];

      let sum = 0,

        mass = 0;

      Arg[0].forEach(Stock => {

        sum += Stock.dollars*Stock.items

        mass += Stock.mass*Stock.items

      });

      let Meta = Arg[0][0];

      let Sum = (sum*Meta.swap).toFixed(2);

      let RegionSet, Range, Grams, Sell;

      Arg[1].zones.forEach(Region => {

        if (Region.locale === Arg[2][0]) RegionSet = Region;
      });

      RegionSet.rates.forEach(Rate => {

        if (Rate.saleSetAlpha[1] > sum && sum > Rate.saleSetAlpha[0]) {

          Range = Rate.saleSetAlpha;

          Rate.grams.forEach(Mass => {

            if (Mass.gramSetAlpha[0] < mass && mass < Mass.gramSetAlpha[1]) {

              Grams = Mass.gramSetAlpha;

              Sell = Mass.sale;
            }
          })
        }
      })

      let Gross = parseFloat(Sum) + parseFloat(Sell[1])*Meta.swap

      return [`div`, `.@_geQ _tY0`, `&@style>justify-content:center`, [[
        `div`, `&@style>margin:24px auto;max-width:600px;width:100%;padding:0 12px`, [[
          `div`, `&@style>border: 1px solid #e6e7e8;border-radius: .5em;`, [[
            `div`, `.@_gcQ _gZ`, [[
              `div`, `.@_-Xg _gxM _geQ`, [[
                `a`, `.@-_tX AppMedium`, `&@href>/`, `~@corrde`], [`span`, `&@style>padding:0 7px`, `~@| CORRDE PAY`]]], [
              `div`, `.@_QZg`, [[
                `span`, `.@-_tX Bag`, `&@style>width:15px;height:15px;margin: 0 8px`], [
                `span`, `&@style>font-weight: 600`, `~@K£.${Gross} KES`]]]]], [
            `div`, `.@_gZ`, [[
              `div`, `.@_gcQ _gxM`, `&@style>margin: 24px auto`, [[
                `span`, `~@Pay with`], [
                `div`, [[`span`, `.@-_tX Mpesa`, `&@style>width:100px;height:20px;margin: 0 -24px`]]]]], [
              `div`, `.@_gcQ`, [[
          `div`, `&@style>width:100%;`, [[
            `div`, `.@sZ2`, [[
              `div`, `.@_yZS _gMX`, [[
                `div`, `.@_UFA _gMX _gxM _geQ`, [[
                  `span`, `&@style>border-right:1px solid #e5e5e5;font-weight:600;color:#1dcae1;padding-right:8px`, `~@+254`], [
                  `input`, `#@payer`, `.@_RRD _aA2 _pVa`, `&@autocomplete>off`, `&@style>margin: 0;padding-left:8px`, `&@placeholder>Phone Number`]]]]]]], [
                `div`, `&@style>padding: 24px 0`, [[
                  `div`, `.@QZg`, [[
                    `div`, `.@_gM_a _agM _guZ`, `&@style>max-width: 450px;width:100%;margin:0 auto`, [[
                      `a`, `#@paycustom`, `.@_TX_a _atX _utQ _gMX _tXx`, `&@href>javascript:;`, `~@Pay Now`]]]]]]]]]]]]]]]]]]]
    }
  }
  
  return Model;
})();

  let Slim = txt => {

    txt = txt.replace(new RegExp(`\f`, `g`), ` `);

    txt = txt.replace(new RegExp(`\n`, `g`), ` `);

    txt = txt.replace(new RegExp(`\t`, `g`), ` `);

    txt = txt.replace(new RegExp(`\r`, `g`), ` `);

    txt = txt.replace(new RegExp(`/`, `g`), `u002F`);

    txt = txt.replace(new RegExp(`"`, `g`), `u0022`);

    txt = txt.replace(new RegExp(`&`, `g`), `u0026`);

    txt = txt.replace(new RegExp(`'`, `g`), `u0027`);

    return txt
  }

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
        this.allValues[value] = (typeof allValues[value] === `string`)? Slim(allValues[value]): allValues[value];
      }

      sessionStorage.setItem(`u`, JSON.stringify(this.allValues).replace(new RegExp(/&/), `u/0026`));
      return sessionStorage;
    },

    avail: function () {
      return JSON.parse(sessionStorage.u);
    },

    set: function (allValues) {

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

      sessionStorage.setItem(`u`, JSON.stringify(this.allValues).replace(new RegExp(/&/), `u/0026`));
      return sessionStorage;
    },

    get: function () {
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

let UA = new WebStore();