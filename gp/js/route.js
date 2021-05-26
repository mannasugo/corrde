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

	ScrollStartPulls () {

		UA.set({pullState: UA.get().pullState + 1});

		if (!UA.get().pulls[parseInt(UA.get().pullState)]) UA.set({pullState: 0});

		let Sell = UA.get().pulls;

		document.querySelector(`#ModelStart #alpha`).innerHTML = Sell[UA.get().pullState].alpha;

		document.querySelector(`#ModelStart #pay`).innerHTML = `$${parseFloat(Sell[UA.get().pullState].dollars).toFixed(2)} usd/k£.${parseFloat((Sell[UA.get().pullState].dollars)*109).toFixed(2)} kes`;

		document.querySelector(`#ModelStart img`).src = Sell[UA.get().pullState].files[0];

		document.querySelector(`#ModelStart #set`).innerHTML = Sell[UA.get().pullState].set;

		let PullState = document.querySelectorAll(`#pullState`);

		PullState.forEach(State => State.querySelector(`._2Q`).style.stroke = `none`);

		PullState[UA.get().pullState].querySelector(`._2Q`).style.stroke = `#fff`
	}
}

class Controller extends Puller {

	constructor () {

		super();
	}

	Old () {

		if (!UA.get().ualog) UA.set({ualog: [`.`]});

		return UA.get().ualog[UA.get().ualog.length - 1];
	}

	Call () {

		if (this.Old() === `.`) this.Root();
	}

	Root () {

		let Pull = this.Pull([`/pulls/ua/`, {}]);

		Pull.onload = () => {

			UA.set({pullState: 0, pulls: JSON.parse(Pull.response).pulls});

			new View().DOM([`main`, [Models.ModelStart(UA.get().pulls)]]);

			setInterval(() => new Event().ScrollStartPulls(), 6000);
		}
	}
}