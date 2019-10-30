`use strict`;

(function () {

  //const REQS = `//corrde-reqs.corrde.com/`;
  const REQS = `/corrde-reqs/ua/`;

  function main (e) {
    let el = e.target;

    if (el.innerHTML === `Sign Up`) setup();

    if (el.parentNode.previousElementSibling && el.parentNode.previousElementSibling.getElementsByTagName(`input`).length === 3) ini(el);
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

  const createModal = (model) => {
    delModal();

    let div = document.body.appendChild(document.createElement(`div`));
    div.innerHTML = ``;
    div.innerHTML = new Model().modelString(model)
  }

  const delModal = () => {
    if (document.querySelector(`div > #modal`)) document.body.removeChild(document.querySelector(`div > #modal`).parentNode);
  }

  const ini = (e) => {
    let listSlims = [], listSpaces = e.parentNode.previousElementSibling.querySelectorAll(`input`);

    for (let value = 0; value < listSpaces.length; ++value) {
      let slimValue = new Auxll().longSlim(listSpaces[value].value);
      (slimValue) ? listSlims[value] = slimValue: listSlims= [];
    }

    if (listSlims.length !== 3) return; console.log(listSlims) //slimsAll/allSlims 

    let req = new Req();

    req.call(`POST`, REQS, {
      title: `ini`,
      JSON: JSON.stringify(listSlims),
      to: () => {
        if (req.req.responseText.length < 1) return;
        createModal(JSON.parse(req.req.responseText));
      }
    });
  }

  document.addEventListener(`click`, main); 
})();