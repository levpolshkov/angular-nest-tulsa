(self.webpackChunktulsa_remote_application_client=self.webpackChunktulsa_remote_application_client||[]).push([[434],{6891:(e,t,r)=>{"use strict";r.d(t,{z:()=>o});var n=r(7053),s=r(7716),i=r(8832);let o=(()=>{class e{constructor(e){this.modalService=e}confirm(e={}){return new Promise((t,r)=>{const s=this.modalService.open(n.z);s.componentInstance.text=e.text,s.componentInstance.html=e.html,this.sub=s.closed.subscribe(e=>{console.log("ConfirmService closed reason=%o",e),this.sub.unsubscribe(),t(e)})})}}return e.\u0275fac=function(t){return new(t||e)(s.LFG(i.FF))},e.\u0275prov=s.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},1839:(e,t,r)=>{"use strict";r.d(t,{s:()=>T});var n=r(7716),s=r(8583),i=r(4330);const o=function(e){return{page:e}},a=function(){return{}};function c(e,t){if(1&e){const e=n.EpF();n.ynx(0),n.TgZ(1,"a",7),n.NdJ("click",function(){return n.CHM(e),n.oxw(2).prev()}),n.TgZ(2,"span"),n._uU(3,"\xab"),n.qZA(),n.qZA(),n.BQk()}if(2&e){const e=n.oxw(2);n.xp6(1),n.Q6J("queryParams",e.canPrev?n.VKq(1,o,e.searchTable.result.page-1):n.DdM(3,a))}}function l(e,t){if(1&e){const e=n.EpF();n.ynx(0),n.TgZ(1,"a",8),n.NdJ("click",function(){return n.CHM(e),n.oxw(2).prev()}),n.TgZ(2,"span"),n._uU(3,"\xab"),n.qZA(),n.qZA(),n.BQk()}}function h(e,t){if(1&e&&(n.ynx(0),n.TgZ(1,"a",10),n._uU(2),n.qZA(),n.BQk()),2&e){const e=n.oxw().$implicit;n.xp6(1),n.Q6J("queryParams",n.VKq(2,o,e)),n.xp6(1),n.Oqu(e)}}function u(e,t){if(1&e){const e=n.EpF();n.ynx(0),n.TgZ(1,"a",8),n.NdJ("click",function(){n.CHM(e);const t=n.oxw().$implicit;return n.oxw(2).go(t)}),n._uU(2),n.qZA(),n.BQk()}if(2&e){const e=n.oxw().$implicit;n.xp6(2),n.Oqu(e)}}function p(e,t){if(1&e&&(n.TgZ(0,"li",9),n.YNc(1,h,3,4,"ng-container",0),n.YNc(2,u,3,1,"ng-container",0),n.qZA()),2&e){const e=t.$implicit,r=n.oxw(2);n.ekj("active",e===r.searchTable.result.page),n.xp6(1),n.Q6J("ngIf",!r.searchTable.noRouting),n.xp6(1),n.Q6J("ngIf",r.searchTable.noRouting)}}function g(e,t){if(1&e){const e=n.EpF();n.ynx(0),n.TgZ(1,"a",7),n.NdJ("click",function(){return n.CHM(e),n.oxw(2).next()}),n.TgZ(2,"span"),n._uU(3,"\xbb"),n.qZA(),n.qZA(),n.BQk()}if(2&e){const e=n.oxw(2);n.xp6(1),n.Q6J("queryParams",e.canNext?n.VKq(1,o,1*e.searchTable.result.page+1):n.DdM(3,a))}}function d(e,t){if(1&e){const e=n.EpF();n.ynx(0),n.TgZ(1,"a",8),n.NdJ("click",function(){return n.CHM(e),n.oxw(2).next()}),n.TgZ(2,"span"),n._uU(3,"\xbb"),n.qZA(),n.qZA(),n.BQk()}}const f=function(e){return{disabled:e}};function m(e,t){if(1&e&&(n.TgZ(0,"div"),n.TgZ(1,"div",1),n.TgZ(2,"div",2),n.TgZ(3,"div",3),n._uU(4),n.qZA(),n.qZA(),n.TgZ(5,"div",2),n.TgZ(6,"ul",4),n.TgZ(7,"li",5),n.YNc(8,c,4,4,"ng-container",0),n.YNc(9,l,4,0,"ng-container",0),n.qZA(),n.YNc(10,p,3,4,"li",6),n.TgZ(11,"li",5),n.YNc(12,g,4,4,"ng-container",0),n.YNc(13,d,4,0,"ng-container",0),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA()),2&e){const e=n.oxw();n.xp6(4),n.lnq("",e.start," - ",e.end," of ",e.searchTable.result.total,""),n.xp6(3),n.Q6J("ngClass",n.VKq(10,f,!e.canPrev)),n.xp6(1),n.Q6J("ngIf",!e.searchTable.noRouting),n.xp6(1),n.Q6J("ngIf",e.searchTable.noRouting),n.xp6(1),n.Q6J("ngForOf",e.pages),n.xp6(1),n.Q6J("ngClass",n.VKq(12,f,!e.canNext)),n.xp6(1),n.Q6J("ngIf",!e.searchTable.noRouting),n.xp6(1),n.Q6J("ngIf",e.searchTable.noRouting)}}let T=(()=>{class e{constructor(){this.pagesToShow=5,this.pages=[]}ngOnInit(){this.searchTable.resultEvent.subscribe(e=>{this.calcPages(e)})}get start(){return this.searchTable&&this.searchTable.result&&this.searchTable.result.total?this.searchTable.result.size*this.searchTable.result.page-this.searchTable.result.size+1:0}get end(){if(!this.searchTable||!this.searchTable.result||!this.searchTable.result.total)return 0;const e=this.searchTable.result.page*this.searchTable.result.size;return e>this.searchTable.result.total?this.searchTable.result.total:e}get pageCount(){return Math.ceil(this.searchTable.result.total/this.searchTable.result.size)||0}prev(){var e,t;this.canPrev&&this.go((null===(t=null===(e=this.searchTable)||void 0===e?void 0:e.result)||void 0===t?void 0:t.page)-1)}next(){var e,t;this.canNext&&this.go((null===(t=null===(e=this.searchTable)||void 0===e?void 0:e.result)||void 0===t?void 0:t.page)+1)}get canPrev(){var e,t;return(null===(t=null===(e=this.searchTable)||void 0===e?void 0:e.result)||void 0===t?void 0:t.page)>1}get canNext(){var e,t;return(null===(t=null===(e=this.searchTable)||void 0===e?void 0:e.result)||void 0===t?void 0:t.page)<this.pageCount}go(e){e>this.pageCount&&(e=this.pageCount),this.searchTable.noRouting&&(this.searchTable.params.page=e,this.searchTable.doSearch())}calcPages(e){this.pages=[],this.pages.push(e.page);for(let t=0;t<this.pagesToShow-1&&!(this.pages.length>=this.pagesToShow);t++){const e=Math.min(...this.pages),t=Math.max(...this.pages);e>1&&this.pages.push(e-1),t<this.pageCount&&this.pages.push(t+1)}this.pages.sort((e,t)=>e-t)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["search-footer"]],inputs:{searchTable:"searchTable"},decls:1,vars:1,consts:[[4,"ngIf"],[1,"row"],[1,"col"],[1,"text-muted"],[1,"pagination","justify-content-end"],[1,"page-item",3,"ngClass"],["class","page-item","class","page",3,"active",4,"ngFor","ngForOf"],["routerLink",".","queryParamsHandling","merge",1,"page-link",3,"queryParams","click"],[1,"page-link",3,"click"],[1,"page"],["routerLink",".","queryParamsHandling","merge",1,"page-link",3,"queryParams"]],template:function(e,t){1&e&&n.YNc(0,m,14,14,"div",0),2&e&&n.Q6J("ngIf",t.searchTable&&t.searchTable.result)},directives:[s.O5,s.mk,s.sg,i.yS],styles:["[_nghost-%COMP%]{display:block;padding:10px}.page[_ngcontent-%COMP%]{padding:0 5px}.page-link[_ngcontent-%COMP%]{text-decoration:none;cursor:pointer}.active[_ngcontent-%COMP%]{font-weight:700}"]}),e})()},3252:(e,t,r)=>{"use strict";r.d(t,{D:()=>m});var n=r(7716),s=r(1681),i=r(4330),o=r(8583),a=r(8191);function c(e,t){if(1&e&&n._UZ(0,"div"),2&e){const e=n.oxw().$implicit,t=n.oxw(2);n.Tol(t.sortIcon(e))}}function l(e,t){if(1&e){const e=n.EpF();n.TgZ(0,"th",5),n.NdJ("click",function(){const t=n.CHM(e).$implicit;return n.oxw(2).sortBy(t)}),n.TgZ(1,"div"),n.TgZ(2,"span",6),n.TgZ(3,"div"),n._uU(4),n.YNc(5,c,1,2,"div",7),n.qZA(),n.qZA(),n.qZA(),n.qZA()}if(2&e){const e=t.$implicit,r=n.oxw(2);n.ekj("ion-hide-sm-down","sm"===e.hide),n.xp6(1),n.ekj("ion-hide-sm-down","sm"===e.hide)("ion-hide-md-down","md"===e.hide)("ion-hide-lg-down","lg"===e.hide)("ion-hide-xl-down","xl"===e.hide),n.xp6(2),n.Tol(e.headerClass),n.xp6(1),n.hij(" ",e.header," "),n.xp6(1),n.Q6J("ngIf",r.sortIcon(e))}}function h(e,t){if(1&e&&n._UZ(0,"i",8),2&e){const e=n.oxw(2);n.Q6J("routerLink",e.addNewUrl)}}function u(e,t){if(1&e){const e=n.EpF();n.TgZ(0,"td",11),n.NdJ("mouseover",function(t){const r=n.CHM(e).$implicit,s=n.oxw().$implicit;return r.onMouseOver&&r.onMouseOver(s,t)})("click",function(t){const r=n.CHM(e).$implicit,s=n.oxw().$implicit;return n.oxw(3).onRowClick(s,r,t)}),n._UZ(1,"div",12),n.qZA()}if(2&e){const e=t.$implicit,r=n.oxw().$implicit,s=n.oxw(3);n.ekj("ion-hide-sm-down","sm"===e.hide)("ion-hide-md-down","md"===e.hide)("ion-hide-lg-down","lg"===e.hide)("ion-hide-xl-down","xl"===e.hide),n.xp6(1),n.Tol(e.rowClass||e.classRenderer&&e.classRenderer(r,e)),n.Q6J("innerHTML",s.columnRenderer(r,e),n.oJD)}}function p(e,t){if(1&e&&(n.TgZ(0,"tr"),n.YNc(1,u,2,11,"td",10),n._UZ(2,"td"),n.qZA()),2&e){const e=n.oxw(3);n.xp6(1),n.Q6J("ngForOf",e.columns)}}function g(e,t){if(1&e&&(n.TgZ(0,"tbody"),n.YNc(1,p,3,1,"tr",9),n.qZA()),2&e){const e=n.oxw(2);n.xp6(1),n.Q6J("ngForOf",e.result.records)}}function d(e,t){1&e&&(n.TgZ(0,"tr"),n.TgZ(1,"td",13),n._uU(2," No results "),n.qZA(),n.qZA())}function f(e,t){if(1&e&&(n.TgZ(0,"table",1),n.TgZ(1,"thead"),n.TgZ(2,"tr"),n.YNc(3,l,6,14,"th",2),n.TgZ(4,"th"),n.YNc(5,h,1,1,"i",3),n.qZA(),n.qZA(),n.qZA(),n.YNc(6,g,2,1,"tbody",4),n.YNc(7,d,3,0,"tr",4),n.qZA()),2&e){const e=n.oxw();n.xp6(3),n.Q6J("ngForOf",e.columns),n.xp6(2),n.Q6J("ngIf",e.addNewUrl),n.xp6(1),n.Q6J("ngIf",e.result),n.xp6(1),n.Q6J("ngIf",e.result&&(!e.result.records||!e.result.records.length))}}let m=(()=>{class e{constructor(e,t,r,s,i,o){this.searchService=e,this.route=t,this.router=r,this.datePipe=s,this.currencyPipe=i,this.httpService=o,this.columns=[],this.addNewUrl="",this.noRouting=!1,this.defaultFilter={},this.ready=!1,this.onFilterChangeTimer=null,this.params={size:10,page:1,filter:{}},this.resultEvent=new n.vpe}ngOnInit(){this.noRouting?this.doSearch():setTimeout(()=>{this.route.queryParams.subscribe(e=>{this.onQueryParamsChange(e)})},50)}doSearch(){return this.searchUrl?this.searchService.search(this.searchUrl,this.params).then(e=>{this.result=e,this.resultEvent.emit(e)}):Promise.reject("SearchTableComponent: Missing searchUrl")}onRowClick(e,t,r){console.debug("SearchTableComponent.onRowClick: row=%o, column=%o",e,t)}onFilterChange(e=!1){this.onFilterChangeTimer&&clearTimeout(this.onFilterChangeTimer),this.onFilterChangeTimer=setTimeout(()=>{if(this.noRouting)this.doSearch();else{const e=this.searchParamsToQueryParams(this.params);this.router.navigate([],{queryParams:e})}},e?0:350)}columnRenderer(e,t){if(!t.renderer)return this.expandProp(e,t.field);if("string"==typeof t.renderer){let r=t.renderer.split(":"),n=r[0];return"date"===n?this.dateRenderer(e,t,r[1],r[2]):"currency"===n?this.currencyRenderer(e,t):`Error: ${t.renderer} undefined`}return t.renderer(e,t)}dateRenderer(e,t,r,n){return e[t.field]?this.datePipe.transform(e[t.field],r,n):""}currencyRenderer(e,t,r){return this.currencyPipe.transform(e[t.field],r)}onQueryParamsChange(e){this.params.page=+e.page||1,this.params.size=+e.size,Number.isNaN(this.params.size)&&(this.params.size=10),Object.keys(e).forEach(t=>{let r=t.match(/^filter\.(.*)/),n=e[t];"null"===n&&(n=null),r&&(this.params.filter[r[1]]=n)}),this.ready||Object.keys(this.defaultFilter).map(e=>{this.params.filter[e]||null===this.params.filter[e]||(this.params.filter[e]=this.defaultFilter[e])}),this.doSearch()}searchParamsToQueryParams(e){const t=new URLSearchParams;for(let n in e){if("filter"===n)continue;const r=e[n];"sort"!==n?t.set(n,r):t.set("sort",this.searchService.toSearchString(r))}for(let n in e.filter)t.set(`filter.${n}`,e.filter[n]);const r={};return t.forEach((e,t)=>{r[t]=e}),r}expandProp(e,t){return t.split(".").forEach(t=>{e=e?e[t]:null}),e}sortBy(e){this.params.sort||(this.params.sort={prop:"_id",dir:1}),this.params.sort.prop===e.field?this.params.sort.dir*=-1:this.params.sort.dir=1,this.params.sort.prop=e.field,this.onFilterChange()}sortIcon(e){return this.params.sort?this.params.sort.prop!==e.field?"":1===this.params.sort.dir?"fas fa-arrow-up":"fas fa-arrow-down":""}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(s.o),n.Y36(i.gz),n.Y36(i.F0),n.Y36(o.uU),n.Y36(o.H9),n.Y36(a.O))},e.\u0275cmp=n.Xpm({type:e,selectors:[["search-table"]],decls:1,vars:1,consts:[["class","table table-striped table-hover",4,"ngIf"],[1,"table","table-striped","table-hover"],[3,"ion-hide-sm-down","click",4,"ngFor","ngForOf"],["class","fas fa-plus float-end text-primary cursor-pointer",3,"routerLink",4,"ngIf"],[4,"ngIf"],[3,"click"],[1,"hover"],[3,"class",4,"ngIf"],[1,"fas","fa-plus","float-end","text-primary","cursor-pointer",3,"routerLink"],[4,"ngFor","ngForOf"],[3,"ion-hide-sm-down","ion-hide-md-down","ion-hide-lg-down","ion-hide-xl-down","mouseover","click",4,"ngFor","ngForOf"],[3,"mouseover","click"],[3,"innerHTML"],["colspan","99",1,"no-results"]],template:function(e,t){1&e&&n.YNc(0,f,8,4,"table",0),2&e&&n.Q6J("ngIf",t.columns)},directives:[o.O5,o.sg,i.rH],styles:["[_nghost-%COMP%]{display:block}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{cursor:pointer}.no-results[_ngcontent-%COMP%]{text-align:center;color:#6c757d;padding:25px}"]}),e})()}}]);