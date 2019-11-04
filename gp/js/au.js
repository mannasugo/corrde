`use strict`;

(function () {

  //const REQS = `//corrde-reqs.corrde.com/`;
  const REQS = `/corrde-reqs/ua/`;

  const main = e => {
    let el = e.target;

    if (el.innerHTML === `post job to boost activity` || el.innerHTML === `Sell`) simpleCall(`iniSale`, JSStore.avail());

    if (el.getAttribute(`name`) === `field`) {
      JSStore.to({field: el.getAttribute(`value`)});
      simpleCall(`fieldSale`, JSStore.avail());
    }

    if (el.getAttribute(`name`) === `fieldSub`) {
      JSStore.to({fieldSub: el.getAttribute(`value`)});
      simpleCall(`subSale`, JSStore.avail());
    }

    if (el.getAttribute(`role`) === `sale`) sale(el);

    if (el.innerHTML === `switch to freelance`) window.location = `/p`;

    if (el.innerHTML === `switch to seller`) window.location = `/u`;
  }

  const setup = () => {
    let req = new Req();

    req.call(`POST`, REQS, {
      title: `setup`,
      JSON: JSON.stringify({}),
      to: () => {
        if (req.req.responseText.length < 1) return;
        createModal(JSON.parse(req.req.responseText));
      }
    });
  }

  const createModal = model => {
    delModal();

    let div = document.body.appendChild(document.createElement(`div`));
    div.innerHTML = ``;
    div.innerHTML = new Model().modelString(model)
  }

  const delModal = () => {
    if (document.querySelector(`div > #modal`)) document.body.removeChild(document.querySelector(`div > #modal`).parentNode);
  }

  const urlCall = to => {
    let req = new Req();

    req.call(`POST`, REQS, {
      title: `urlCall`,
      JSON: JSON.stringify({url: to}),
      to: () => {
        if (req.req.responseText.length < 1) return;
        if (typeof JSON.parse(req.req.responseText) === `object`) {
          let fro = JSON.parse(req.req.responseText);
          if (fro.url) {
            window.location = `/` + fro.url;
          }
        }
      }
    });
  }

  const simpleCall = (reqs, allMeta) => {
    let req = new Req();

    req.call(`POST`, REQS, {
      title: reqs,
      JSON: JSON.stringify(allMeta),
      to: () => {
        if (req.req.responseText.length < 1) return;
        createModal(JSON.parse(req.req.responseText));
      }
    });
  }

  sale = e => {
    let allValues = [], listSlims = [], listSpaces = e.parentNode.parentNode.parentNode.getElementsByTagName(`input`);

    for (let value = 0; value < listSpaces.length; ++value) {
      allValues[value] = listSpaces[value].value;
    }

    allValues.push(e.parentNode.parentNode.parentNode.querySelector(`textarea`).value);

    for (let value = 0; value < allValues.length; ++value) {
      let slimValue = new Auxll().longSlim(allValues[value]);
      (slimValue) ? listSlims[value] = slimValue: listSlims= [];
    }

    if (listSlims.length !== 5) return;

    if (!parseInt(listSlims[0]) || !parseInt(listSlims[1])) return;

    JSStore.to({lastSale: listSlims});

    let req = new Req();

    req.call(`POST`, REQS, {
      title: `sale`,
      JSON: JSON.stringify(JSStore.avail()),
      to: () => {
        if (req.req.responseText.length < 1) return;
        if (typeof JSON.parse(req.req.responseText) === `object`) {
          let fro = JSON.parse(req.req.responseText);
          if (fro.url) {
            window.location = fro.url;
          }
        }
      }
    });
  }

  document.addEventListener(`click`, main);
  //document.querySelector(`form`).addEventListener(`submit`, e => e.preventDefault());
})();