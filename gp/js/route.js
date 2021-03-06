`use strict`;

class Puller {

	Pull (Arg) {

    let Pull = new XMLHttpRequest;

    Pull.open(`POST`, Arg[0], true);

    Pull.setRequestHeader(`Content-Type`, `application/json`);

    Pull.send(JSON.stringify(Arg[1]));

    return Pull;
  }

 }

class Event {

	listen (Arg) { 

		(Arg[0].addEventListener) ? Arg[0].addEventListener(Arg[1], Arg[2]) : Arg[0].attachEvent(`on` + Arg[1], Arg[2]);
	}

	getSource (Arg) {

		if (Arg.target) return Arg.target;
	}

	Call () {

		if (new Controller().Old() === `.`) {

			this.SelectSlide();

			this.getAisles();

			this.getMailable();

			this.getMugger();

			this.getApp();

			this.Mugger();

			this.Signup();

			this.Signin();

			setInterval(() => this.SlidePulls(), 15000);
		}

		if (new Controller().Old() === `/aisles/`) {

			this.getOld();

			this.getMailable();
		}

		if (new Controller().Old() === `/cart/`) {

			this.pullCart();

			this.getOld();

			this.AlterCart();

			this.PayOut();

			this.Create();

			this.Signin();

			this.Signup();

		}

		if (new Controller().Old() === `/orders/`) {

			this.getApp();

			this.getPay();

			this.getOld();
		}

		if (new Controller().Old() === `/paygate/`) {

			this.getApp();

			this.gate();

			this.getPaygate();

			this.MobilePay();
		}

		if (new Controller().Old().split(`/`)[1] === `grocery`) {

			this.getApp();

			this.Shelve();

			this.AlterCart();

			this.getCart();
		}

		if (new Controller().Old() === `/nogps/`) this.NonNullDot();

		if (new Controller().Old() === `/paas/`) {

			this.getApp();

			this.initPAASModeller();

			this.Signup();

			this.Signin();

			this.PWSSignup();
		}

		if (new Controller().Old() === `/ships/`) {

			this.getOld();

			this.getAisle();
		}

		if (new Controller().Old().split(`/`)[1] === `tracking`) {

			this.getOld();

			this.getPay()

			this.getPayStep();

			this.fillSymetricals();

			this.Mugger()
		}

		if (new Controller().Old().split(`/`)[1] === `via`) {

			this.getPay()

			this.initVia();
		}
	}

	SelectSlide () {

		document.querySelectorAll(`.pullSlide`).forEach((Slide, slide)=> {

			this.listen([Slide, `click`, (e) => {
				
				UA.set({pullState: slide - 1});

				this.SlidePulls();

			}]);

		});
	}

	SlidePulls () {

		if (new Controller().Old() !== `.` || !document.querySelector(`#ModelStart`)) return;

			UA.set({pullState: UA.get().pullState + 1});

			if (!UA.get().pulls[parseInt(UA.get().pullState)]) UA.set({pullState: 0});

			let Sell = UA.get().pulls;

			let V = new View();

			document.querySelector(`#ModelStart #alpha`).innerHTML = Sell[UA.get().pullState].alpha;

			document.querySelector(`#ModelStart #pay`).innerHTML = `$${parseFloat(Sell[UA.get().pullState].dollars).toFixed(2)} usd/k£.${parseFloat((Sell[UA.get().pullState].dollars)*109).toFixed(2)} kes`;

			document.querySelector(`#ModelStart img`).src = `/${Sell[UA.get().pullState].files[0]}`;

			document.querySelector(`#ModelStart #set`).innerHTML = V.Alias(V.Alias(Sell[UA.get().pullState].set));

			document.querySelectorAll(`.mailable`).forEach(M => {M.setAttribute(`md`, Sell[UA.get().pullState].MD5)});

			let PullState = document.querySelectorAll(`#pullState`);

			PullState.forEach(State => State.querySelector(`._2Q`).style.stroke = `none`);

			PullState[UA.get().pullState].querySelector(`._2Q`).style.stroke = `#fff`;
	}

	getAisles () {

		if (!document.querySelector(`#catalog`)) return;

		this.listen([document.querySelector(`#catalog`), `click`, e => {

			let UAlog = UA.get().ualog;

			UAlog.push(`/aisles/`); 

			UA.set({ualog: UAlog});

			let Control = new Controller();

			Control.SetState([{}, `aisles`, `/aisles/`]);

			Control.Aisles();
		}]);
	}

	getOld () {

		if (!document.querySelector(`#old`)) return;

		this.listen([document.querySelector(`#old`), `click`, e => {

			let UAlog = UA.get().ualog;

			let old = UAlog[UAlog.length - 2];

			UAlog.push(old); 

			UA.set({ualog: UAlog});

			let Control = new Controller();

			Control.SetState([{}, old, (old === `.`)? `/`: old]);

			Control.Call();
		}]);
	}

	getMailable () {

		if (!document.querySelectorAll(`.mailable`)) return;

		document.querySelectorAll(`.mailable`).forEach(Mailable => {

			this.listen([Mailable, `click`, S => {

				UA.set({mailable: Mailable.getAttribute(`md`), set: Mailable.getAttribute(`for`)});

				let UAlog = UA.get().ualog;

				UAlog.push(`/ships/`); 

				UA.set({ualog: UAlog});

				let Control = new Controller();

				Control.Mailable();

			}]);

		});
	}

	getAisle () {

		document.querySelectorAll(`.area`).forEach(Area => {

			this.listen([Area, `click`, S => {

				UA.set({area: Area.id});

				let Control = new Controller();

				Control.Aisle();

			}]);

		});
	}

	getApp () {

		if (!document.querySelector(`#app`)) return;

		this.listen([document.querySelector(`#app`), `click`, e => {

			let UAlog = UA.get().ualog;

			UAlog.push(`.`); 

			UA.set({ualog: UAlog});

			let Control = new Controller();

			Control.SetState([{}, `.`, `/`]);

			Control.Root();
		}]);
	}

	Shelve () {

		this.listen([window, `resize`, S => {

			if (!document.querySelector(`#ModelAisle`)) return;

			new View().DOM([`main`, [Models.ModelAisle([UA.get().aislePull, UA.get().set, document.body.clientWidth])]]);

			this.Call()
		}])
	}

	AlterCart () {

		document.querySelectorAll(`.alterCart`).forEach(Alter => {

			this.listen([Alter, `click`, S => {

				S = this.getSource(S);

    		if (!UA.get().trolley) UA.set({trolley: []});

    		let Cart = UA.get().trolley;

    		let Data = JSON.parse(S.getAttribute(`data`));

    		if (S.id === `max`) {

      		let item;

      		Cart.forEach(Stock => {

        		if (Stock.MD5 === Data[`MD5`]) item = Cart.indexOf(Stock);
      		});

      		if (typeof item !== `number`) {

      			Data[`items`] = 0;

        		Cart.push(Data);

        		item = Cart.length - 1;
      		}

      		Cart[item].items += 1;

      		let Seen = UA.get().UASeen;

      		Seen[Data.MD5] = Cart[item];

      		UA.set({trolley: Cart, UASeen: Seen});

      		if (document.querySelector(`#ModelAisle`)) {

      			S.parentNode.querySelector(`div`).className = `-Zz`;

      			S.parentNode.querySelector(`span`).innerHTML = (Cart[item].items < 10)? `0` + Cart[item].items: Cart[item].items;
					}
      	}

    		else if (S.id == `min`) {

      		let item;

      		Cart.forEach(Stock => {

        		if (Stock.MD5 === Data.MD5) item = Cart.indexOf(Stock);
      		});

      		if (typeof item !== `number`) return;

      		let CartSelf = [];

      		Cart[item].items -= 1;

      		let Seen = UA.get().UASeen;

      		if (Cart[item].items < 1) {

        		Cart.forEach(Stock => {

          		if (Stock.MD5 !== Data.MD5) item = CartSelf.push(Stock);
        		});

        		Seen[Data.MD5].items = 0;

        		Cart = CartSelf;

      			if (document.querySelector(`#ModelAisle`)) S.parentNode.className = `_-Zz`;
      		}

      		if (Cart[item]) {

      			Seen[Data.MD5] = Cart[item];

      			if (document.querySelector(`#ModelAisle`)) S.parentNode.querySelector(`span`).innerHTML = (Cart[item].items < 10)? `0` + Cart[item].items: Cart[item].items;
      		}
      		
      		UA.set({trolley: Cart, UASeen: Seen});
      	
      	}

      	if (document.querySelector(`#ModelAisle`)) {

      		let Bag = document.querySelector(`.Bag`);

      		(UA.get().trolley.length > 0)? Bag.setAttribute(`class`, `-_tX Bag _-gm`): Bag.setAttribute(`class`, `-_tX Bag`);
      	}

				let Control = new Controller();

				if (Control.Old() === `/cart/`) Control.Cart();
			}])
		});
	}

	getCart () {

		this.listen([document.querySelector(`.Bag`), `click`, S => {

			if (!UA.get().trolley || !UA.get().trolley.length > 0) return;

			let UAlog = UA.get().ualog;

			UAlog.push(`/cart/`); 

			UA.set({ualog: UAlog});

			let Control = new Controller();

			Control.SetState([{}, `cart`, `/cart/`]);

			Control.Cart();

		}]);
	}

	pullCart () {

		if (!document.querySelector(`#gps`)) return;

		this.listen([document.querySelector(`#gps`), `click`, S => {

      let g = (gArray, gBugs) => navigator.geolocation.getCurrentPosition(a => {gArray(a)}, b => {gBugs(b)});

      let gArray = (Geo) => {

        let G = Geo.coords;

        if (typeof G.latitude === `number` && typeof G.longitude === `number`) UA.set({gArray: [G.longitude, G.latitude]});
      }

			let Control = new Controller();

      g(a => {

        gArray(a);

				Control.Cart();

      }, (b) => { //UA.set({gArray: [34.753, -.533]})

				Control.Cart();
      });

		}]);
	}

	PayOut () {

		if (!document.querySelector(`#payout`)) return;

		this.listen([document.querySelector(`#payout`), `click`, S => {

			let Control = new Controller();

			if (!UA.get().u) Control.Signin([true, `/paygate/`]);

			else {

				let UAlog = UA.get().ualog;

				UAlog.push(`/paygate/`);

				UA.set({ualog: UAlog});

				Control.SetState([{}, `paygate`, `/paygate/`]);

				Control.Call();

			}

		}]);
	}

	Signin () {

		if (!document.querySelector(`#signin`)) return;

		let Control = new Controller();

		this.listen([document.querySelector(`#signin`), `click`, S => {

			let Vals = [
				(!Models.Slim(document.querySelector(`#email`).value))? false: Models.Slim(document.querySelector(`#email`).value),
				(!Models.Slim(document.querySelector(`#key`).value))? false: Models.Slim(document.querySelector(`#key`).value)
			];

			if (Vals[0] === false || Vals[1] === false) return;

			let Pull = Control.Pull([`/pulls/ua/`, {pull: `md`, vals : Vals}]);

			Pull.onload = () => {

				let Pulls = JSON.parse(Pull.response);

				if (!Pulls.md) return;

				let Via = this.getSource(S).getAttribute(`via`);

				let UAlog = UA.get().ualog;

				UAlog.push(Via);

				UA.set({ualog: UAlog});

				Control.SetState([{}, Via.replace(new RegExp(`/`, `g`), `_`), (Via === `.`)? `/`: Via]);

				UA.set({u: Pulls.pulls});

				Control.Call();
			}

		}]);
	}

	gate () {

		if (!document.querySelector(`.gate`)) return;

		document.querySelectorAll(`.gate`).forEach(S => {

			this.listen([S, `click`, S => {

				let Control = new Controller();

				let Via = this.getSource(S).getAttribute(`for`);

				if (Via === `intasend`) {

					UA.set({paygate: Via});

					Control.MobilePay();
				}
			}]);
		});
	}

	getPaygate () {

		if (!document.querySelector(`#paygate`)) return;

		this.listen([document.querySelector(`#paygate`), `click`, e => {

			let Control = new Controller();

			Control.Paygate();
		}]);
	}

	MobilePay () {

		if (!document.querySelector(`#pay`)) return;

		this.listen([document.querySelector(`#pay`), `click`, S => {

			let Control = new Controller();

			let Mobile = Models.Slim(document.querySelector(`#mobile`).value);

			if (!Mobile || !Mobile.length > 9) return;

			Control.MobilePay();

			let Pull = Control.Pull([`/pulls/ua/`, {
				area: UA.get().area,
				dollars: UA.get().payOld,
				email: UA.get().u.email,
				gArray: UA.get().gArray,
				localePay: UA.get().localePayOld,
				mass: UA.get().mass,
				pull: `paygate`, 
				paygate: UA.get().paygate, 
				mobile: Mobile, 
				md: UA.get().u.md,
				trolley: UA.get().trolley
			}]);

			Pull.onload = () => {

				let Pulls = JSON.parse(Pull.response);

				if (!Pulls.paygate || !Pulls.md) return;

				let UAlog = UA.get().ualog;

				UAlog.push(`/tracking/${Pulls.md}/`);

				Control.SetState([{}, `tracking`, `/tracking/${Pulls.md}/`]);

				UA.set({tracking_md: Pulls.md, ualog: UAlog}); 

				Control.Call();
			}
		}]);
	}

	Create () {

		if (!document.querySelector(`#create`)) return;

		this.listen([document.querySelector(`#create`), `click`, S => {

			let Control = new Controller();

			Control.Signup([true, `/paygate/`]);

		}]);
	}

	getMugger () {

		if (!document.querySelector(`#mug`)) return;

		this.listen([document.querySelector(`#mug`), `click`, S => {

			new Controller().Mugger();

		}]);
	}

	Signup () {

		if (!document.querySelector(`#signup`)) return;

		let Control = new Controller();

		this.listen([document.querySelector(`#signup`), `click`, S => {

			let Vals = [
				(!Models.Slim(document.querySelector(`#email`).value))? false: Models.Alias(Models.Slim(document.querySelector(`#email`).value)),
				(!Models.Slim(document.querySelector(`#mobile`).value))? false: Models.Alias(Models.Slim(document.querySelector(`#mobile`).value)),
				(!Models.Slim(document.querySelector(`#first`).value))? false: Models.Alias(Models.Slim(document.querySelector(`#first`).value)),
				(!Models.Slim(document.querySelector(`#last`).value))? false: Models.Alias(Models.Slim(document.querySelector(`#last`).value)),
				(!Models.Slim(document.querySelector(`#key`).value))? false: Models.Alias(Models.Slim(document.querySelector(`#key`).value))
			];

			if (Vals.length !== 5 || Vals[0] === false || Vals[1] === false || Vals[2] === false || Vals[3] === false || Vals[4] === false) return;

			let Via = this.getSource(S).getAttribute(`via`);

			Control.Signup([true, Via]);

			let Pull = Control.Pull([`/pulls/ua/`, {pull: `inimd`, vals : Vals}]);

			Vals = [];

			Pull.onload = () => {

				let Pulls = JSON.parse(Pull.response);

				if (!Pulls.md) return;

				let UAlog = UA.get().ualog;

				UAlog.push(Via);

				UA.set({ualog: UAlog});

				Control.SetState([{}, Via.replace(new RegExp(`/`, `g`), `_`), (Via === `.`)? `/`: Via]);

				UA.set({u: Pulls.pulls});

				Control.Call();
			}

		}]);
	}

	Mugger () {

		if (!document.querySelector(`.mugger`)) return;

		document.querySelectorAll(`.mugger`).forEach(S => {

			this.listen([S, `click`, S => {

				let Control = new Controller();

				let Via = this.getSource(S).innerHTML.toLowerCase();

				let UAlog = UA.get().ualog;

				if (Via === `create account`) Control.Signup([true, `.`]);

				else if (Via === `sign in`) Control.Signin([true, `.`]);

				else if (Via === `my orders` || Via === `pays`) {

					UAlog.push(`/orders/`);

					UA.set({pays: `all`, ualog: UAlog});

					Control.SetState([{}, `orders`, `/orders/`]);

					Control.Call();
				}

				else if (Via === `manage store`) {

					UAlog.push(`/pws/`);

					UA.set({ualog: UAlog});

					Control.SetState([{}, `pws`, `/pws/`]);

					Control.Call();
				}

				else if (Via === `corrde for business`) {

					UAlog.push(`/paas/`);

					UA.set({ualog: UAlog});

					Control.SetState([{}, `paas`, `/paas/`]);

					Control.Call();
				}

				else if (Via === `my stores`) {

					UAlog.push(`/stores/`);

					UA.set({ualog: UAlog});

					Control.SetState([{}, `paas`, `/stores/`]);

					Control.Call();
				}
			}]);
		});
	}

	getPay () {

		if (!document.querySelector(`.tracking`)) return;

		document.querySelectorAll(`.tracking`).forEach(S => {

			this.listen([S, `click`, S => {

				let Control = new Controller();

				let Via = this.getSource(S);

				let UAlog = UA.get().ualog;

				UAlog.push(`/tracking/${Via.id}/`);

				Control.SetState([{}, `tracking`, `/tracking/${Via.id}/`]);

				UA.set({tracking_md: Via.id, ualog: UAlog}); 

				Control.Call();
			}]);
		});
	}

	getPayStep () {

		if (!document.querySelector(`.flow`)) return;

		document.querySelectorAll(`.flow`).forEach(S => {

			this.listen([S, `click`, S => {

				let Control = new Controller();

				let Via = this.getSource(S);

				if (Via.innerHTML === `confirmed` && UA.get().tracking.paid === false) if (UA.get().tracking.paygate === `intasend`) Control.SymetMobilePay();

				if (Via.innerHTML === `shipping` && UA.get().tracking.paid === true) {

					let Pull = Control.Pull([`/pulls/ua/`, {
						md: UA.get().u.md,
						pull: `via`,
						tracking_md: UA.get().tracking_md}]);

					Pull.onload = () => {

						let Pulls = JSON.parse(Pull.response);

						if (Pulls.tilled && Pulls.tilled === true) {

							let UAlog = UA.get().ualog;

							UAlog.push(`/via/${Pulls.tracking_md}/`);

							UA.set({ualog: UAlog});

							Control.SetState([{}, `via`, `/via/${Pulls.tracking_md}/`]);

							UA.set({via: Pulls.pulls});
						
						}

						Control.Call();
					}
				}
			}]);
		});
	}

	fillSymetricals () {

		if (!document.querySelector(`.val`)) return;

		let Vals = [];

		document.querySelectorAll(`.val`).forEach((S, val)=> {

			this.listen([S, `focus`, S => {

				let Via = this.getSource(S);

				if (Vals.length < 10) document.querySelectorAll(`.val`)[Vals.length].focus();

				else document.querySelectorAll(`.val`)[Vals.length - 1].focus();
			}]);
		});

		document.querySelectorAll(`.val`).forEach((S, val)=> {

			this.listen([S, `keyup`, S => {

				let Via = this.getSource(S);

				if (Vals.length < 10) {

					if (S.key !== `Backspace`) {

						if (Models.Slim(Via.value)) Vals[Vals.length] = Via.value;

						if (Vals.length < 10) document.querySelectorAll(`.val`)[Vals.length].focus();
					}

				}

				if (S.key === `Backspace`) {

					Vals.pop();

					if (Vals.length < 9) document.querySelectorAll(`.val`)[Vals.length].focus();
				}

				let Control = new Controller();

				if (Vals.length === 10) {

					new View().DOM([`main`, [Models.ModelSplash()]]);

					let sum = (Vals.toString().replace(new RegExp(`,`, `g`), ``)).toUpperCase();

					Vals = [];

					let Pull = Control.Pull([`/pulls/ua/`, {
						md: UA.get().u.md, 
						paygate: UA.get().tracking.paygate,
						paytrace: (UA.get().tracking.paytrace)? UA.get().tracking.paytrace: null,
						pull: `paytrace`, 
						sum : sum, 
						tracking_md: UA.get().tracking_md}]);

					Pull.onload = () => {

						let Pulls = JSON.parse(Pull.response);

						Control.Call();
					}
				}
			}]);
		});
	}

	initVia () {

		if (!document.querySelector(`.init-via`)) return;

		document.querySelectorAll(`.init-via`).forEach(S => {

			this.listen([S, `click`, S => {

				let Control = new Controller();

				let Via = this.getSource(S);

				let Pull = Control.Pull([`/pulls/ua/`, {
					md: UA.get().u.md,
					pull: `init-via`,
					tracking_md: UA.get().via.tracking_md,
					via_md: Via.id}]);

				Pull.onload = () => {

					let Pulls = JSON.parse(Pull.response);

					Control.Call();
				}
			}]);
		});
	}

	NonNullDot () {

		if (!document.querySelector(`#gps`)) return;

		this.listen([document.querySelector(`#gps`), `click`, S => {

      let g = (gArray, gBugs) => navigator.geolocation.getCurrentPosition(a => {gArray(a)}, b => {gBugs(b)});

      let gArray = (Geo) => {

        let G = Geo.coords;

        if (typeof G.latitude === `number` && typeof G.longitude === `number`) UA.set({gArray: [G.longitude, G.latitude]});
      }

			let Control = new Controller();

      g(a => {

        gArray(a);

				Control.Aisle();

      }, (b) => { UA.set({gArray: [34.753, -.533]})

				Control.Aisle();
      });

		}]);
	}

	initPAASModeller () {

		if (!document.querySelector(`.PAASModeller`)) return;

		document.querySelectorAll(`.PAASModeller`).forEach(S => {

			this.listen([S, `click`, S => {

				let Control = new Controller();

				let Via = this.getSource(S);

				if (Via.innerHTML === `sign up your store` && UA.get().u) Control.PAASModeller([`pws`]);

				else Control.Signin([true, `/paas/`]);
			}]);
		});
	}

	PWSSignup () {

		if (!document.querySelector(`#init-pws`)) return;

		let Control = new Controller();

		this.listen([document.querySelector(`#init-pws`), `click`, S => {

			let Vals = [
				(!Models.Slim(document.querySelector(`#pws`).value))? false: Models.Alias(Models.Slim(document.querySelector(`#pws`).value))
			];

			if (Vals[0] === false) return;

			Control.PAASModeller([`/pws/`]);

			let Pull = Control.Pull([`/pulls/ua/`, {md: UA.get().u.md, pull: `init-pws`, vals : Vals}]);

			Vals = [];

			Pull.onload = () => {

				let Pulls = JSON.parse(Pull.response);

				if (!Pulls.ws_md) return;

				let UAlog = UA.get().ualog;

				UAlog.push(`/ws/`);

				UA.set({ualog: UAlog});

				Control.SetState([{}, `ws`, `/dashboard/${Pulls.ws_md}/`]);

				UA.set({ws: Pulls.pulls});

				Control.Call();
			}

		}]);
	}
}

class Controller extends Puller {

	constructor () {

		super();

		this.State = history;
	}

	Old () {

		if (!UA.get().ualog) UA.set({ualog: [`.`]});

		return UA.get().ualog[UA.get().ualog.length - 1];
	}

	SetState (Arg) {

		this.State.pushState(Arg[0], Arg[1], Arg[2]);
	}

	Call () {

		if (this.Old() === `.`) this.Root();

		if (this.Old() === `/aisles/`) this.Aisles();

		if (this.Old() === `/paas/`) this.PaaS();

		if (this.Old() === `/billings/`) this.Billing();

		if (this.Old() === `/cart/`) this.Cart();

		if (this.Old().split(`/`)[1] === `grocery`) this.Aisle();

		if (this.Old() === `/orders/`) this.Pays();

		if (this.Old() === `/paygate/`) this.Paygate();

		if (this.Old() === `/pws/`) this.Apex();

		if (this.Old() === `/ships/`) this.Mailable();

		if (this.Old().split(`/`)[1] === `tracking`) this.Pay();

		if (this.Old().split(`/`)[1] === `via`) this.Via();
	}

	Root () {

		let Pull = this.Pull([`/pulls/ua/`, {}]);

		Pull.onload = () => {

			UA.set({pullState: 0, pulls: JSON.parse(Pull.response).pulls});

			new View().DOM([`main`, [Models.ModelStart(UA.get().pulls)]]);

			new Event().Call();
		}
	}

	Aisles () {

		new View().DOM([`main`, [Models.ModelAisles()]]);

		new Event().Call()
	}

	Mailable () {

		new View().DOM([`main`, [Models.ModelMailable()]]);

		new Event().Call()
	}

	Aisle () {

		if (UA.get().set && UA.get().area && UA.get().gArray && UA.get().gArray.length === 2) {

			let Pull = this.Pull([`/pulls/ua/`, {aisle: UA.get().set, gArray: UA.get().gArray, pull: `aisle`, area: UA.get().area}]);

			Pull.onload = () => {

				let Pulls = JSON.parse(Pull.response);

				if (Pulls.pulls) {

					let UAlog = UA.get().ualog;

					UAlog.push(`/grocery/${Pulls.aisle}/`);

					UA.set({ualog: UAlog});

					this.SetState([{}, `grocery`, `/grocery/${Pulls.aisle}/`]);

					UA.set({aislePull: Pulls.pulls});

					new View().DOM([`main`, [Models.ModelAisle([UA.get().aislePull, UA.get().set, document.body.clientWidth])]]);

					new Event().Call();

				}
			}
		}

		if (!UA.get().set) {

			let UAlog = UA.get().ualog;

			UAlog.push(`/aisles/`); 

			UA.set({ualog: UAlog});

			this.SetState([{}, `aisles`, `/aisles/`]);

			this.Aisles();
		}

		if (!UA.get().area) {

			let UAlog = UA.get().ualog;

			UAlog.push(`/ships/`); 

			UA.set({ualog: UAlog});

			this.Mailable();
		}


		if (!UA.get().gArray || UA.get().gArray.length !== 2) {

			let UAlog = UA.get().ualog;

			UAlog.push(`/nogps/`);

			UA.set({ualog: UAlog});

			new View().DOM([`main`, [Models.ModelNullDot()]]);

			new Event().Call();
		}
	}

	Cart () {

		new View().DOM([`main`, [Models.ModelCart()]]);

		new Event().Call()
	}

	Signin (Arg) {

		new View().DOM([`main`, [Models.ModelSignin(Arg)]]);

		new Event().Call()
	}

	Signup (Arg) {

		new View().DOM([`main`, [Models.ModelSignup(Arg)]]);

		new Event().Call()
	}

	Paygate () {

		if (!UA.get().trolley || UA.get().trolley.length === 0) {

			let UAlog = UA.get().ualog;

			UAlog.push(`.`);

			UA.set({ualog: UAlog});

			this.SetState([{}, `.`, `/`]);

			this.Call();
		}

		else {

			new View().DOM([`main`, [Models.ModelPaygate()]]);

			new Event().Call()
		}
	}

	MobilePay () {

		new View().DOM([`main`, [Models.ModelMobilePay()]]);

		new Event().Call()

	}

	Pays () {

		let Pull = this.Pull([`/pulls/ua/`, {md: UA.get().u.md, pull: `pays`, state: `md`}]);

		Pull.onload = () => {

			UA.set({mdpays: JSON.parse(Pull.response).pulls});

			new View().DOM([`main`, [Models.ModelPays()]]);

			new Event().Call();
		}
	}

	Mugger () {

		new View().DOM([`main`, [Models.ModelMugger()]]);

		new Event().Call()

	}

	Pay () {

		let Pull = this.Pull([`/pulls/ua/`, {md: UA.get().u.md, pull: `pays`, state: `md`}]);

		Pull.onload = () => {

			let Pulls = JSON.parse(Pull.response);

			if (!Pulls.pulls) return;

			let Pay = [];

			Pulls.pulls.forEach(P => {

				if (P.MD5 === UA.get().tracking_md) Pay = P;
			});

			if (Pay.length === 0) return;

			UA.set({tracking: Pay});

			new View().DOM([`main`, [Models.ModelPay()]]);

			new Event().Call();
		}
	}

	SymetMobilePay () {

		new View().DOM([`main`, [Models.ModelSymetMobile()]]);

		new Event().Call()

	}

	Via () {

		if (!UA.get().tracking_md || !UA.get().u) return;

		let Pull = this.Pull([`/pulls/ua/`, {
			md: UA.get().u.md,
			pull: `via`,
			tracking_md: UA.get().tracking_md}]);

		Pull.onload = () => {

			let Pulls = JSON.parse(Pull.response);

			if (Pulls.tilled && Pulls.tilled === true) {

				UA.set({via: Pulls.pulls});

				new View().DOM([`main`, [Models.ModelVia()]]);

				new Event().Call()
						
			}
		}
	}

	Apex () {

		let Pull = this.Pull([`/pulls/ua/`, {lock: UA.get().u.lock || false, md: UA.get().u.md, pull: `apex-pws`}]);

		Pull.onload = () => {

			let Pulls = JSON.parse(Pull.response);

			let UAlog = UA.get().ualog;

			if (Pulls.lock === false) {

				UAlog.push(`.`);

				UA.set({ualog: UAlog});

				this.SetState([{}, `root`, `/`]);

				this.Call();
			}

			else if (Pulls.lock === true) {

				new View().DOM([`main`, [Models.ModelPWS([`store orders`, Models.ModelPWSPays()])]]);

				new Event().Call();
			}
		}
	}

	PaaS () {

		new View().DOM([`main`, [Models.ModelPAAS()]]);

		new Event().Call();

	}

	PAASModeller (Arg) {

		let Model = Models.ModelSplash();

		if (Arg[0] === `pws`) Model = Models.ModelPWSModeller();

		new View().DOM([`main`, [Model]]);

		new Event().Call();

	}
}