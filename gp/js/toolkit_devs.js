`use strict`;

(function () {

  const S = io();

  const AJX = (reqs, allMeta, inCall) => {

    let req = new Req();

    req.call(`POST`, reqs[0], {
      title: reqs[1],
      JSON: JSON.stringify(allMeta),
      to: () => {

        let B = {}, A = {};

        if (req.req.responseText.length < 1) {
          A[`server_err`] = `Server Error.`;
        }

        if (JSON.parse(req.req.responseText).err) {
          A[`err`] = JSON.parse(req.req.responseText).err;
        }

        if (req.req.responseText.length > 0) {
          B = JSON.parse(req.req.responseText);
        }

        inCall(A, B);
      }
    });
  }

  let Slim = txt => {

    /*txt = txt.replace(new RegExp(`\f`, `g`), ` `);

    txt = txt.replace(new RegExp(`\n`, `g`), ` `);

    txt = txt.replace(new RegExp(`\t`, `g`), ` `);

    txt = txt.replace(new RegExp(`\r`, `g`), ` `);*/

    txt = txt.replace(new RegExp(`'`, `g`), `u/0027`);

    txt = txt.replace(new RegExp(`"`, `g`), `u/0022`);

    return txt
  }

  let SalesModal = (e) => {

    let Modal;

    if (e.id === `toModalSales`) {

      JSStore.to({log_secs: new Date().valueOf()});

      S.emit(`sales`, JSStore.avail().log_secs);

      document.querySelector(`#listSales`).innerHTML = ``;

      document.querySelector(`#Sale`).innerHTML = ``;

      Modal = document.querySelector(`#ModelSales`);
    }

    else if (e.id === `StockSuite`) {

      Modal = document.querySelector(`#ModelStockSuite`);

      JSStore.to({AddStock: {
        Dollars: false,
        Catalog: false,
        Feature: true,
        Files: [],
        Factory: false,
        MarketZone: false,
        Orient: false,
        Sale: 0,
        Set: false,
        Shelf: false, 
        Shop: false,
        Size: false,
        Sorts: false,
        StockAlpha: false,
        StockState: false,
        StockFullString: false,
        Units: false,
      }});

      document.querySelectorAll(`#File`).forEach(File => {

        File.querySelector(`img`).src = ``;

        File.querySelector(`#DelAva > a`).className = `_-Zz -_tX DelColor`;

        File.querySelector(`#DelAva > a`).setAttribute(`file-src`, ``);
      })
    }

    if (!Modal) return;
  
    if (Modal.className === `_-Zz`) Modal.className = `-Zz`;
  }

  let foldModals = e => {

    if (e.id === `del`) {

      let modals = document.querySelectorAll(`[for = 'modal']`);

      for (let i = 0; i < modals.length; i++) {
        
        if (modals[i].className === `_aAY -Zz`) {

          modals[i].setAttribute(`class`, `_aAY _-Zz`);
        }
      }
    }

  }

  let foldSalesModal = e => {

    let Modal;

    if (e.id === `foldSales`) {

      Modal = document.querySelector(`#ModelSales`);

      document.querySelector(`#Sale`).innerHTML = ``;
    }

    else if (e.id === `foldStockSuite`) Modal = document.querySelector(`#ModelStockSuite`)

    if (!Modal) return;

    if (Modal.className === `-Zz`) Modal.className = `_-Zz`;
  }

  let SaleModal = (e) => {

    if (e.id === `ModelSale`) {

      JSStore.to({log_secs: new Date().valueOf()});

      S.emit(`sale`, {log_secs: JSStore.avail().log_secs, log_md5: e.getAttribute(`for`)});

      document.querySelector(`#listSales`).innerHTML = ``;

      document.querySelector(`#Sale`).innerHTML = ``;
  
      let modal_ejs = document.querySelector(`#ModelSales`);
  
      if (modal_ejs.className === `_-Zz`) modal_ejs.className = `-Zz`;
    }
  }

  let editSale = e => {

    let saleClass, log_md5, deal = 0;

    if (e.id === `edit-daily`) {

      deal = new Auxll().longSlim(document.querySelector(`#daily-deal`).value);

      log_md5 = e.getAttribute(`for`);

      saleClass = `daily`;
      
      //if (typeof parseFloat(deal) === `number`) JSStore.to({daily_deal: parseFloat(deal)});
      
      document.querySelector(`#daily-deal`).value = ``;

    }

    if (saleClass && deal > 0 && deal < 100) {

      JSStore.to({log_secs: new Date().valueOf()});

      S.emit(`edit_sale`, {deal: deal, log_secs: JSStore.avail().log_secs, log_md5: log_md5, saleClass: saleClass});

      document.querySelector(`#Sale`).innerHTML = ``;

    }
  }

  let StockFeatures = e => {

    JSStore.to({push_stock: false})

    let Stock = JSStore.avail().AddStock

    if (e.parentNode.id === `DelAva`) {

      let Files = [];

      let FileStrings = [];

      let file = e.id.split(`-`)[1];

      let ModelFiles = document.querySelectorAll(`#File`);

      Stock.Files.forEach(File => {

        if (File !== e.getAttribute(`file-src`)) FileStrings.push(File);
      });

      Stock.Files = FileStrings;

      JSStore.to({AddStock: Stock});

      document.querySelectorAll(`.file`).forEach(File => {

        if (File !== document.querySelectorAll(`.file`)[file]) {

          let alloc = File.src;

          if (alloc[0] !== `h`) alloc = false;

          Files.push(alloc);
        }
      });

      Files.push(false);

      ModelFiles.forEach((File, fileModel) => {

        let alloc = Files[fileModel];

        if (alloc === false) alloc = ``;

        File.querySelector(`#DelAva > a`).className = `_-Zz -_tX DelColor`;

        //File.querySelector(`#DelAva > a`).setAttribute(`file_log`, ``);

        if (Files[fileModel] !== false) File.querySelector(`#DelAva > a`).className = `-Zz -_tX DelColor`;

        File.querySelector(`img`).src = alloc;

      });
    }

    else if (e.id === `StockStore`) Stock.Shop = e.value;

    else if (e.id === `StockState`) Stock.StockState = e.value;

    else if (e.id === `Sets`) Stock.Set = e.value;

    else if (e.id === `Catalog`) Stock.Catalog = e.value;

    else if (e.id === `Shelves`) Stock.Shelf = e.value;

    else if (e.id === `Sizes`) Stock.Size = e.value;

    else if (e.id === `Classes`) Stock.Sorts = e.value;

    else if (e.id === `Brands`) Stock.Factory = e.value;

    else if (e.id === `Markets`) Stock.MarketZone = e.value;

    else if (e.id === `Orients`) Stock.Orient = e.value;

    else if (e.id === `AddStock`) {

      let CleanString = new Auxll();

      let Unit = document.querySelector(`#Units`),

        StockAlpha = document.querySelector(`#Product`),

        Dollars = document.querySelector(`#Dollars`),

        StockString = document.querySelector(`#StockString`);

      if (CleanString.longSlim(Unit.value)) Stock.Units = Slim(Unit.value);

      if (CleanString.longSlim(StockAlpha.value)) Stock.StockAlpha = Slim(StockAlpha.value); 

      if (CleanString.longSlim(Dollars.value)) Stock.Dollars = Slim(Dollars.value);

      if (CleanString.longSlim(StockString.value)) Stock.StockString = Slim(StockString.value);

      JSStore.to({push_stock: true})
    }

    JSStore.to({AddStock: Stock});

    if (JSStore.avail().push_stock === true) {
          
      AJX([`/devs_reqs/`, `AddStock`], JSStore.avail(), (A, B) => {

        if (B.exit === true) window.location = `/store/${JSStore.avail().store_log_md5}/`;
      });
    }
  }

  let files = e => {

    let File = e.target;

    if (File.id === `file`) {

      e.stopImmediatePropagation();

      if (JSStore.avail().AddStock && JSStore.avail().AddStock.Files.length < 5) {

        JSStore.to({file: `StockFiles`})

        StockFile(File.files);
      }
    }
  }

  let allocFile = (img, file) => {

    let alloc = new FileReader();

    alloc.onload = (e) => img.src = e.target.result;

    alloc.readAsDataURL(file);
  }

  const StockFile = Files => {

    if (!Files || !Files.length) return;

    let Stock = JSStore.avail().AddStock;

    for (let i = 0; i < Files.length; i++) {

      let File = Files[i];

      if (!File.type.match(`image.*`) || File.size > 3048576) return;

      let StockFile;

      if (!document.querySelector(`#AvaPlane`)) {

        StockFile = new Image();

        StockFile.setAttribute(`id`, `AvaPlane`);
      }

      else StockFile = document.querySelector(`#AvaPlane`);

      allocFile(StockFile, File);

      StockFile.onload = () => {

        let fileSort;

        if (StockFile.src.charAt(11) === `j`) fileSort = `data:image/jpeg;base64,`;

        else if (StockFile.src.charAt(11) === `p`) fileSort = `data:image/png;base64,`;

        if (!fileSort) return;
        
        let b64 = StockFile.src.replace(fileSort,``), Duals = atob(b64), Alloc = [];

        for (let i = 0; i < Duals.length; i++) {

          Alloc.push(Duals.charCodeAt(i));
        }
  
        //let AllocFile = new Blob([new Uint8Array(Alloc)], {type: File.type});
  
        let AllocFile = new Blob([new Uint8Array(Alloc)], {type: `image/jpeg`});

        let AJX = new AJXFile();

        AJX.call(`/devs_reqs/`, {
          value: JSON.stringify(JSStore.avail()),
          to: () => {

            if (AJX.req.responseText.length > 0) {

              B = JSON.parse(AJX.req.responseText);

              if (B.fileString) {

                document.querySelector(`#Ava-${Stock.Files.length}`).src = `/${B.fileString}`;

                document.querySelector(`#DelAva-${Stock.Files.length}`).className = `-Zz -_tX DelColor`;

                document.querySelector(`#DelAva-${Stock.Files.length}`).setAttribute(`file-src`, B.fileString)

                Stock.Files.push(B.fileString);

                JSStore.to({AddStock: Stock});
              }
            }
          }}, AllocFile);
      };
          
    }
  }
 
  let e0 = e => {

    e = e.target;

    SalesModal(e);

    foldModals(e);

    foldSalesModal(e);

    SaleModal(e);

    editSale(e);

    StockFeatures(e)
  }

  document.addEventListener(`click`, e0);

  document.addEventListener(`change`, files);

  S.on(`sales`, J => {

    if (JSStore.avail().log_secs === J.log_secs) {

      let ModelSource = document.querySelector(`#listSales`)

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([J.ModelSales]);
    }
  })

  S.on(`sale`, J => {

    if (JSStore.avail().log_secs === J.log_secs) {

      let ModelSource = document.querySelector(`#Sale`)

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([J.ModelSale]);
    }
  })

  S.on(`edit_sale`, J => {

    if (JSStore.avail().log_secs === J.log_secs) {

      let ModelSource = document.querySelector(`#Sale`)

      let M = new Model();

      ModelSource.innerHTML = M.modelStringify([J.ModelSale]);
    }
  })
})();