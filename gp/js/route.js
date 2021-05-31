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

			setInterval(() => this.SlidePulls(), 15000);
		}

		if (new Controller().Old() === `/aisles/`) {

			this.getOld();

			this.getMailable();
		}

		if (new Controller().Old() === `/ships/`) {

			this.getOld();

			this.getAisle();
		}

		if (new Controller().Old().split(`/`)[1] === `grocery`) {

			this.getApp();

			this.Shelve();
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

		if (new Controller().Old() !== `.`) return;

		//setInterval(() => {

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

			PullState[UA.get().pullState].querySelector(`._2Q`).style.stroke = `#fff`

		//}, 7000)
	}

	getAisles () {

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

			new View().DOM([`main`, [Models.ModelAisle([UA.get().aislePull, UA.get().set, document.body.clientWidth])]]);

			this.Call()
		}])
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

		if (this.Old() === `/ships/`) this.Mailable();

		if (this.Old().split(`/`)[1] === `grocery`) this.Aisle();
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

		if (UA.get().set && UA.get().area) {

			let Pull = this.Pull([`/pulls/ua/`, {aisle: UA.get().set, pull: `aisle`, area: UA.get().area}]);

			Pull.onload = () => {

				let Pulls = JSON.parse(Pull.response);

				if (!Pulls.aisle) return;

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
}