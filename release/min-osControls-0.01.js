(function(){var t={},e=function(){!function(t){t.fileExplorer=function(){_e().createClass("osMenu",{css:function(t){t.bind(".topMenuArea",{width:"100%",background:"#fae9e6","font-family":"Arial","font-size":"14px"}),t.bind(".menuItem",{display:"table-cell",padding:"10px 4px 4px 10px"}),t.bind(".menuItem:hover",{background:_e().mix("#fae9e6","#999",.2)})},init:function(){this.addClass("topMenuArea"),this.mvc(this.model().items,function(t){return _e("div",function(){this.addClass("menuItem"),this.text(t.get("title"))})})}}),_e().createClass("actionItem",{init:function(){var t=this.model();t.get("icon")&&this.span("icon").span(t.get("icon")),this.span("title").bind(t,"title"),t.get("action")&&this.clickTo(t.get("action"),t)},tagName:"span"}),_e().createClass("showFile",{css:function(t){t.bind(".fileArea",{"background-color":"white",width:"100%",height:"600px","text-align":"center",padding:"20px"}),t.bind(".prevImage",{"max-height":"500px"})},init:function(){this.addClass("fileArea");this.div().img("prevImage").src("http://static.parade.com/wp-content/uploads/2014/03/Why-Do-Stars-All-Look-Almost-the-Same-Size-ftr.jpg").width("auto");this.h4().bind(this.model(),"title")}}),_e().createClass("deepAppleMenu",{requires:{css:[{url:"https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"}]},css:function(t){t.bind("div.me",{opacity:.4}),t.bind(".area",{display:"table-row"}),t.bind(".naviBtn",{border:"1px solid #222","background-color":"#aaa",color:"#aaa","border-radius":"4px",outline:"none",cursor:"pointer",background:"linear-gradient(#333,#666)"}),t.bind(".naviBtn:hover",{color:"white"}),t.bind(".nextLevel",{display:"table-cell","white-space":"nowrap"}),t.bind(".ddContent",{"background-color":"white",padding:"0px","border-top":"2px solid gray","font-family":"Helvetica","font-size":"14px",display:"table-cell","vertical-align":"top","text-align":"top",height:"600px",width:"200px",overflow:"auto"}),t.bind(".ddList",{height:"600px",overflow:"auto",width:"200px"}),t.bind(".ddContentItem",{"border-top":"1px solid gray",padding:"3px","background-color":"#eee",cursor:"pointer",color:"#666"}),t.bind(".active",{"background-color":_e().mix("#459","white",.6),color:"black"}),t.bind(".fa-folder",{color:"#6ec3e5","text-shadow":"0px 1px 1px black"}),t.bind(".fa-clone",{color:"gold","float":"right","text-shadow":"0px 1px 1px black"}),t.bind(".fa-file",{color:"#eef","text-shadow":"0px 1px 1px black "}),t.bind(".title",{"margin-left":"6px"}),t.bind(".ddContentItem:hover",{"text-decoration":"underline",color:"#222"})},setActive:function(t){var e=_data(t);this.addClass("area");for(var i=e.parent(),n=0;i;)n++,i=i.parent();if(n--,4>n&&(n=0),this.sendMsg("moveToLevel",.2*n),e&&e.hasOwn("items")&&e.items.length()>=0)return this._nextLevel.pushView(_e("deepAppleMenu",e.items)),this.sendMsg("activeFolder",e),void this.sendMsg("editTarget",e);this._nextLevel.pushView(_e("showFile",e)),this.sendMsg("editTarget",e),this.sendMsg("activeFile",e);var i=e.parent();if(i.parent()?this.sendMsg("activeFolder",e.parent().parent()):this.sendMsg("activeFolder",null),this._activeItem){if(this._activeItem==e)return;this._activeItem.set("active",!1)}this._activeItem=e,this._activeItem.set("active",!0)},init:function(){this._toolBar=this.div();var t=this.div("ddContent");return this._contentArea=t,this._nextLevel=this.div("nextLevel"),t.div("ddList").mvc(this.model(),function(t){return _e("div",function(){t.set("active",!1),this.addClass("ddContentItem"),this.actionItem(t),t.get("active")&&this.addClass("active");var e=this;if(t.on("active",function(){t.get("active")?e.addClass("active"):e.removeClass("active")}),t.hasOwn("variants")){var i=this.span("fa fa-clone");i.clickTo("showVariants",t),i.touchclick()}this.on("click",function(){t.get("active")?e.sendMsg("renameFile",e):e.sendMsg("setActive",t)}),this.on("dblclick",function(){this.sendMsg("openFile")}),this.on("mouseenter",function(){e.addClass("me"),e.sendMsg("dropTarget",t)}),this.on("mouseleave",function(){e.removeClass("me")}),this.touchclick(),this.drag(function(i){i.start&&e.sendMsg("dragStart",t),i.end&&e.sendMsg("dragEnd",t)})})}),t}}),_e().createClass("fileToolbar",{css:function(t){t.bind(".area",{width:"100%",background:"#eee"}),t.bind(".toolBtn",{border:"1px solid #aaa","background-color":"#aaa",color:"#333","border-radius":"0px",padding:"4px",outline:"none",cursor:"pointer",background:"linear-gradient(#fff,#eee)"})},init:function(){this.addClass("area"),this.button("toolBtn").text("+ Folder").clickTo("addFolder"),this.button("toolBtn").text("+ File").clickTo("addFile"),this.button("toolBtn").text("Open").clickTo("openFile"),this.button("toolBtn").text("Copy").clickTo("copyFile"),this.button("toolBtn").text("Delete").clickTo("deleteFile"),this.button("toolBtn").text("Rename").clickTo("renameFile")}}),_e().createClass("fullFileDisplay",{css:function(t){t.bind(".area",{width:"100%",color:"#554"}),t.bind(".msg",{"line-height":1,"font-size":"3em","text-align":"center","font-family":"Arial"}),t.bind(".msg button",{padding:"2em","font-size":"1.5em",border:"none"})},init:function(){this.addClass("area"),this.div("msg",function(){this.h2().text("We could open with some app the file "+this.model().get("title")),this.button().text("Go back").on("click",function(){this.popView()})})}}),_e().createClass("fileExplorer",{css:function(t){t.bind(".explorer",{width:"100%","background-color":"#fff"}),t.bind("input.editTitle",{width:"100%","font-size":"15px",padding:"4px"}),t.bind(".backBtn",{border:"1px solid #aaa","background-color":"#aaa",color:"#333","border-radius":"10px",padding:"5px","font-size":"12px",outline:"none",margin:"5px",cursor:"pointer",background:"linear-gradient(#fefefe,#e7e7e7)"}),t.bind(".variantsHead",{background:"#676767",color:"white","font-family":"Arial","font-size":"1.2em",padding:"0.5em",cursor:"pointer"})},addFile:function(){if(!this._activeFolder){var t=prompt("Give new name to file");if(t){this.model().push({title:t,icon:"fa fa-file",viewClass:"dataView1",active:!1});var e=this.model(),i=e.at(e.length()-1);i.moveToIndex(0)}}if(this._activeFolder&&this._activeFolder.items){var t=prompt("Give new name to file");if(t){this._activeFolder.items.push({title:t,icon:"fa fa-file",viewClass:"dataView1",active:!1});var e=this._activeFolder.items,i=e.at(e.length()-1);i.moveToIndex(0)}}},addFolder:function(){if(!this._activeFolder){var t=prompt("Give new name to folder");if(t){this.model().push({title:t,icon:"fa fa-folder",viewClass:"dataView1",active:!1,items:[]});var e=this.model(),i=e.at(e.length()-1);i.moveToIndex(0)}}if(this._activeFolder&&this._activeFolder.items){var t=prompt("Give new name to folder");if(t){this._activeFolder.items.push({title:t,icon:"fa fa-folder",viewClass:"dataView1",active:!1,items:[]});var e=this._activeFolder.items,i=e.at(e.length()-1);i.moveToIndex(0)}}else console.log(this._activeFolder)},openFile:function(){this._activeFile&&this._contentArea.pushView(_e("fullFileDisplay",this._activeFile))},renameFile:function(t){if(this._editTarget){if(t){var e=this._editTarget,i=t,n=_e("div",function(){var t=this;setTimeout(function(){var o=t.input("editTitle");o.val(e.get("title")).on("blur",function(){var t=o.val();t.length>0&&e.set("title",t),n.replaceWith(i)}).focus(),o._dom.select(),t._dom.addEventListener("click",function(){})},1)});return void i.replaceWith(n)}var o=prompt("Give new name to file");o&&this._editTarget.set("title",o)}},copyFile:function(){this._editTarget&&alert("Should copy file "+this._editTarget.get("title"))},deleteFile:function(){this._editTarget&&this._editTarget.remove()},activeFolder:function(t){if(console.log("activeFolder ",t),!t)return void(this._activeFolder=null);var e=_data(t);return this.model().parent()==e?void(this._activeFolder=null):void(this._activeFolder=_data(t))},activeFile:function(t){this._activeFile=_data(t)},editTarget:function(t){this._editTarget=_data(t)},moveToNext:function(){if(this._editTarget){return}},dragEnd:function(){if(this._dropTarget&&this._dropTarget!=this._dragItem){if(this._dragItem.items)for(var t=this._dropTarget;t;){if(t==this._dragItem)return;t=t.parent()}if(this._dropTarget.items&&this._dragItem.items){this._dropTarget.items.push(this._dragItem.toPlainData()),this._dragItem.remove();var e=this._dropTarget.items,i=e.at(e.length()-1);return void i.moveToIndex(0)}var n,o=0;if(this._dropTarget.items||(o=this._dropTarget.indexOf(),n=this._dropTarget.parent()),this._dropTarget.items&&(n=this._dropTarget.items),n||(n=this.model()),n&&this._dragItem){n.push(this._dragItem.toPlainData()),this._dragItem.remove();var e=n,i=e.at(e.length()-1);i.moveToIndex(o)}}},dropTarget:function(t){var e=_data(t);e.getID()&&(this._dropTarget=e)},dragStart:function(t){var e=_data(t);this._dragItem=e,this._dropTarget=null},ctrlDown:function(){this._ctrlDown=!0},ctrlUp:function(){this._ctrlDown=!1},shiftDown:function(){this._shiftDown=!0},shiftUp:function(){this._shiftDown=!1},moveToLevel:function(t){var e=this;if(e._folderLevel||(e._folderLevel=0),t!=e._folderLevel){var i=this._contentArea._dom,n=e._folderLevel;e._folderLevel=n;var o=200;console.log(t),later().ease("pow",400,function(e){i.style.marginLeft=-1*(n*(1-e)*o+t*e*o)+"px"},function(){e._folderLevel=t})}},showVariants:function(t){var e=_data(t);if(t&&e&&e.variants){this._mainView.pushView(_e("div",function(){this.div("variantsHead",function(){this.span("fa fa-arrow-circle-left"),this.span().text(" "),this.span().text("variants of file "+e.get("title"))}).on("click",function(){this.popView()}),this.fileExplorer(e.variants)}))}},init:function(){function t(t){t=t||window.event,console.log("Up "+t.keyCode),16==t.keyCode&&n.sendMsg("shiftUp"),9==t.keyCode&&n.sendMsg("moveToNext"),17==t.keyCode&&n.sendMsg("ctrlUp"),50==t.keyCode&&n.sendMsg("renameFile")}function e(t){t=t||window.event,console.log(t.keyCode),16==t.keyCode&&n.sendMsg("shiftDown"),17==t.keyCode&&n.sendMsg("ctrlDown")}this._mainView=this,this._activeModel=this.model(),this._dragList=[],this.addClass("explorer"),this.div().fileToolbar(),this._infoDiv=this.div();var i=this.div("fileBrowser");i.deepAppleMenu(this.model()),this._contentArea=i,document.onkeydown=e,document.onkeyup=t;var n=this}})},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){this.fileExplorer()})}(this)},i=function(t,e,n,o,a,s,r,d){var l,c=this;if(!(c instanceof i))return new i(t,e,n,o,a,s,r,d);var h=[t,e,n,o,a,s,r,d];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){l=t.apply(c,h)}),"function"==typeof l){if(l._classInfo.name!=i._classInfo.name)return new l(t,e,n,o,a,s,r,d)}else if(l)return l;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,h)}):"function"==typeof c.init&&c.init.apply(c,h)};i._classInfo={name:"ocControls"},i.prototype=new e,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.ocControls=i,this.ocControls=i):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.ocControls=i:this.ocControls=i}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());