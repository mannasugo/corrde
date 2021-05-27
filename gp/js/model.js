`use strict`;

class View {

	constructor () {

		this.appendString = ``;
	}
    
  ModelDOM (Model) {

    if (typeof Model !== `object`) return;

    for (let lev = 0; lev < Model.length; lev++) {

      let a = Model[lev][0];

      let t2, lv2, z = a;

      if (a === `html`) a = `!doctype html><html`;

      this.appendString += `<` + a;

      for (let lev_ = 0; lev_ < Model[lev].length; lev_++) {

        let l2 = Model[lev][lev_];

       	if (typeof l2 === `string` && l2.split(`@`)[0] === `#`) this.appendString += ` id='` + l2.split(`@`)[1] + `'`;

        else if (typeof l2 === `string` && l2.split(`@`)[0] === `.`) this.appendString += ` class='` + l2.split(`@`)[1] + `'`;

        else if (typeof l2 === `string` && l2.split(`@`)[0] === `&`) {

          let plus = l2.split(`@`)[1].split(`>`);

          this.appendString += ` ` + plus[0] + `='` + plus[1] + `'`;
        }

        if (typeof l2 === `object`) lv2 = l2;

        if (typeof l2 === `string` && l2.split(`@`)[0] === `~`) t2 = l2;

      }

      this.appendString += `>`;

      if (typeof t2 === `string` && t2.split(`@`)[0] === `~`) this.appendString += t2.substring(2, t2.length+1);

      if (typeof lv2 === `object`) this.ModelDOM(lv2);

      let queer = [`img`, `input`, `meta`];

      if (queer.indexOf(z) === -1) this.appendString += `</` + z + `>`; 
    }

    return this.Alias(this.Alias(this.appendString));
  }

  Alias (String) {

    String = String.replace(new RegExp(`u/0026`, `g`), `&`);

    String = String.replace(new RegExp(`u/0027`, `g`), `'`);

    String = String.replace(new RegExp(`u/0022`, `g`), `"`);

    String = String.replace(new RegExp(`u/002F`, `g`), `/`);

    return String;
  }

  DOM (Arg) {

  	document.querySelector(Arg[0]).innerHTML = this.ModelDOM(Arg[1]);
  }
}

let Models = {

	ModelStart (Arg) {

		let ModelScroll = [];

		Arg.forEach(Sell => {

			ModelScroll.push([
				`div`, `&@style>margin:0 16px`, `&@href>javascript:;`, [[
					`svg`, `#@pullState`, `&@style>width:14px;min-height:14px;height:14px`, [[
						`circle`, `&@r>1.8`, `&@cx>7`, `&@cy>7`, `&@style>fill:#fff;stroke:none`], [
						`circle`, `.@_2Q`, `&@r>5`, `&@cx>7`, `&@cy>7`, `&@style>fill:none;stroke:none`]]], [
					`a`, `.@pullSlide`, `&@style>position:absolute;height:100%;width:100%`, `&@href>javascript:;`]]])
		})

		return [
      `main`, `.@_tY0`, `&@style>height:100%`, [[
        `div`, `.@_-tY`, [[
          `div`, `.@_aXz`, [[
            `div`, `.@_-Xg _gxM _geQ`, [[
              `a`, `.@-_tX AppMedium`, `&@href>/`, `~@corrde`], [
              `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@| corrde store`]]], [
            `div`, `.@_QZg`, [[
              `a`, `#@catalog`, `.@-_tX Shop`, `&@style>margin: 0 15px;width:24px;height:24px`, `&@href>javascript:;`]]]]]]], [
      	`div`, `#@ModelStart`, `.@_geQ`, `&@style>justify-content:center;width:100%;max-width:960px;margin:0 auto`, [[
      		`div`, `.@_geQ _gxM _aXZ _0yg`, [[
      			`div`, `.@_geQ _0yQ`, [[
      				`div`, `.@_aXZ`, [[
      					`div`, [[`span`, `#@alpha`, `.@_sZ2 _tXx`, `&@style>font-size:12.5px;text-transform:capitalize`, `~@${Arg[0].alpha}`]]], [
      					`div`, `.@_gxM _sZ2`, [[
      						`span`, `#@pay`, `.@_tXx`, `&@style>font-family:gotham-book;font-size:12px;text-transform:uppercase`, `~@$${parseFloat(Arg[0].dollars).toFixed(2)} usd/k£.${parseFloat((Arg[0].dollars)*109).toFixed(2)} kes`]]], [
      					`div`, `.@`, [[
      					  `div`, `.@_gM_a _agM _guZ`, `&@style>width:max-content`, [[
      					    `a`, `#@`, `.@_TX_a _atX _utQ _dMG`, `&@href>javascript:;`, [[
      					    	`span`, `&@style>padding:0 6px`, `~@Available in`], [
      					    	`span`, `&@style>width:17px;height:17px`, `.@-_tX To`]]]]]]], [
            		`div`, `.@_yZS`, [[`a`, `#@set`, `.@_aA2 _-Zz`, `&@style>text-decoration:underline;font-size:11px;color:#646060`, `&@href>javascript;;`, `~@${Arg[0].set}`]]]]]]], [
      			`div`, `.@_geQ _2yQ`, [[`img`, `&@src>${Arg[0].files[0]}`]]]]], [
      			`div`, `&@style>position: fixed;bottom: 16px;width: max-content;align-content: center;justify-content: center;align-items: center;z-index: 31;`, [[
        			`div`, `.@_gxM`, `&@style>background:rgba(0, 0, 0, .85);padding:8px 12px;border-radius:100px;width:100%`, ModelScroll]]]]]]];
	},

	ModelAisles () {

		let Aisles = [
			[`alcohol`, [`Alcohol`]], 
			[`beauty & personal care`, [``]], 
			[`beverages`, [`Beve`]],
			[`bread & bakery`, [`Wheat`]], 
			[`fast food & eatery`, [`Meals`]], 
			[`fruits & vegetables`, [`Veges`]]];

		let ModelAisles = [];

		Aisles.forEach(Aisle => {

			ModelAisles.push([
				`div`, `.@_gZ _gxM _geQ`, `&@style>text-transform:capitalize;padding:12px 24px;cursor:pointer`, [[
          `span`, `.@-_tX ${Aisle[1][0]}`], [`div`, `.@_eYG`, [[`span`, `~@${Aisle[0]}`]]]]])
		})
		
		return [`main`, `.@_tY0`, `&@style>height:100%`, [[
      `div`, `.@_-tY`, [[
        `div`, `.@_aXz`, [[
          `div`, `.@_-Xg _gxM _geQ`, [[
            `a`, `#@old`, `.@-_tX From`, `&@href>javascript:;`], [
            `span`, `&@style>padding:0 7px;text-transform:uppercase;`, `~@shop by category`]]], [
          `div`, `.@_QZg`, [[]]]]]]], [
      	`div`, `#@ModelAisles`, `.@_geQ _aXZ`, `&@style>max-width:600px;margin:55px auto 0`, [[
      		`div`, `.@_aXZ`, ModelAisles]]]]];


	}
}