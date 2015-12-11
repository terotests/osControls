// The code template begins here
"use strict";

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  // let the private classes out

  var osControls_prototype = function osControls_prototype() {
    // Then create the traits and subclasses for this class here...

    (function (_myTrait_) {

      // Initialize static variables here...

      /**
       * @param float t
       */
      _myTrait_.fileExplorer = function (t) {
        _e().createClass("osMenu", {
          css: function css(c) {
            c.bind(".topMenuArea", {
              width: "100%",
              "background": "#fae9e6",
              "font-family": "Arial",
              "font-size": "14px"
            });
            c.bind(".menuItem", {
              display: "table-cell",
              padding: "10px 4px 4px 10px"
            });
            c.bind(".menuItem:hover", {
              "background": _e().mix("#fae9e6", "#999", 0.2)
            });
          },
          init: function init() {
            this.addClass("topMenuArea");
            this.mvc(this.model().items, function (i) {
              return _e("div", function () {
                this.addClass("menuItem");
                this.text(i.get("title"));
              });
            });
          }
        });

        _e().createClass("actionItem", {
          init: function init() {
            //.addClass( item.get("active") ? "active" : "")
            var item = this.model();
            if (item.get("icon")) {
              this.span("icon").span(item.get("icon"));
            }
            this.span("title").bind(item, "title");
            if (item.get("action")) {
              this.clickTo(item.get("action"), item);
            }
          },
          tagName: "span"
        });

        // the simple class to display the file...
        _e().createClass("showFile", {
          css: function css(c) {
            c.bind(".fileArea", {
              "background-color": "white",
              "width": "100%",
              "height": "600px",
              "text-align": "center",
              "padding": "20px"
            });
            c.bind(".prevImage", {
              "max-height": "500px"
            });
          },
          init: function init() {
            this.addClass("fileArea");

            var mm = this.model(),
                me = this;

            if (mm.hasOwn("appUrl")) {
              // Then try to use some application to open up it
              var pp = umo(pp.get("appUrl"));
              pp.then(function () {
                var comp = pp.get("comp");
                if (comp) {
                  if (pp.hasOwn("compDataUrl")) {
                    var cData = umo(pp.get("compDataUrl"));
                    cData.then(function () {
                      me.e(comp, cData);
                    });
                  } else {
                    me.e(comp, pp.compData);
                  }
                  //
                  return;
                }
              });
            }
            if (mm.hasOwn("app")) {
              // Then try to use some application to open up it
              var pp = mm.app;
              var comp = pp.get("comp");
              if (comp) {
                if (pp.hasOwn("compDataUrl")) {
                  var cData = umo(pp.get("compDataUrl"));
                  var me = this;
                  cData.then(function () {
                    me.e(comp, cData);
                  });
                } else {
                  this.e(comp, pp.compData);
                }
                //
                return;
              }
            }
            this.pre().text(JSON.stringify(mm.toPlainData()));

            var im = this.div().img("prevImage").src("http://static.parade.com/wp-content/uploads/2014/03/Why-Do-Stars-All-Look-Almost-the-Same-Size-ftr.jpg").width("auto");
            this.h4().bind(this.model(), "title");
          }
        });

        _e().createClass("deepAppleMenu", {
          requires: {
            css: [{
              url: "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
            }]
          },
          css: function css(c) {
            c.bind("div.me", {
              "opacity": 0.4
            });
            c.bind(".area", {
              "display": "table-row"
            });
            c.bind(".naviBtn", {
              "border": "1px solid #222",
              "background-color": "#aaa",
              "color": "#aaa",
              "border-radius": "4px",
              "outline": "none",
              "cursor": "pointer",
              "background": "linear-gradient(#333,#666)"
            });
            c.bind(".naviBtn:hover", {
              "color": "white"
            });
            c.bind(".nextLevel", {
              "display": "table-cell",
              "white-space": "nowrap"
            });
            c.bind(".ddContent", {
              "background-color": "white",
              "padding": "0px",
              "border-top": "2px solid gray",
              "font-family": "Helvetica",
              "font-size": "14px",
              "display": "table-cell",
              "vertical-align": "top",
              "text-align": "top",
              "height": "600px",
              "width": "200px",
              "overflow": "auto"
            });
            c.bind(".ddList", {
              "height": "600px",
              "overflow": "auto",
              "width": "200px"
            });
            c.bind(".ddContentItem", {
              "border-top": "1px solid gray",
              "padding": "3px",
              "background-color": "#eee",
              "cursor": "pointer",
              "color": "#666"
            });
            c.bind(".active", {
              "background-color": _e().mix("#459", "white", 0.6),
              "color": "black"
            });
            // #6ec3e5
            c.bind(".fa-folder", {
              "color": "#6ec3e5",
              "text-shadow": "0px 1px 1px black"
            });
            c.bind(".fa-clone", {
              "color": "gold",
              "float": "right",
              "text-shadow": "0px 1px 1px black"
            });
            c.bind(".fa-file", {
              "color": "#eef",
              "text-shadow": "0px 1px 1px black "
            });
            c.bind(".title", {
              "margin-left": "6px"
            });
            c.bind(".ddContentItem:hover", {
              "text-decoration": "underline",
              "color": "#222"
            });
          },
          setActive: function setActive(itemid) {
            var item = _data(itemid);
            this.addClass("area");
            var p = item.parent(),
                cnt = 0;
            while (p) {
              cnt++;
              p = p.parent();
            }
            cnt--;
            if (cnt < 6) cnt = 0;
            this.sendMsg("moveToLevel", cnt * 0.2);

            if (item && item.hasOwn("items") && item.items.length() >= 0) {
              this._nextLevel.pushView(_e("deepAppleMenu", item));
              this.sendMsg("activeFolder", item);
              this.sendMsg("editTarget", item);
              return;
            } else {
              this.sendMsg("openMedia", item);
              // ?? clear next level ??
              this._nextLevel.clear();
              // this._nextLevel.pushView( _e("showFile", item))
              this.sendMsg("editTarget", item);
              this.sendMsg("activeFile", item);
              var p = item.parent();
              if (p.parent()) {
                this.sendMsg("activeFolder", item.parent().parent());
              } else {
                this.sendMsg("activeFolder", null);
              }
            }

            if (this._activeItem) {
              if (this._activeItem == item) return;
              this._activeItem.set("active", false);
            }
            this._activeItem = item;
            this._activeItem.set("active", true);
          },
          init: function init() {
            this._toolBar = this.div();
            var content = this.div("ddContent");
            var me = this;
            content.on("mouseenter", function () {
              me.sendMsg("dropTarget", this.model());
            });
            this._contentArea = content;

            this._nextLevel = this.div("nextLevel");
            content.div("ddList").mvc(this.model().items, function (item) {
              return _e("div", function () {
                item.set("active", false);
                this.addClass("ddContentItem");
                this.actionItem(item);
                if (item.get("active")) this.addClass("active");
                var me = this;
                item.on("active", function () {
                  if (item.get("active")) {
                    me.addClass("active");
                  } else {
                    me.removeClass("active");
                  }
                });
                if (item.hasOwn("variants")) {
                  var s = this.span("fa fa-clone");
                  s.clickTo("showVariants", item);
                  s.touchclick();
                }

                this.on("click", function () {
                  if (item.get("active")) {
                    me.sendMsg("renameFile", me);
                  } else {
                    me.sendMsg("setActive", item);
                  }
                });
                // this.clickTo("setActive", item)

                this.on("dblclick", function () {
                  this.sendMsg("openFile");
                });
                this.on("mouseenter", function () {
                  me.addClass("me");
                  me.sendMsg("dropTarget", item);
                });
                this.on("mouseleave", function () {
                  me.removeClass("me");
                });
                this.touchclick();
                this.drag(function (dv) {
                  if (dv.start) {
                    me.sendMsg("dragStart", item);
                  }
                  if (dv.end) {
                    me.sendMsg("dragEnd", item);
                  }
                });
              });
            });
            return content;
          }
        });

        _e().createClass("fileToolbar", {
          css: function css(c) {
            c.bind(".area", {
              "width": "100%",
              "background": "#eee"
            });
            c.bind(".toolBtn", {
              "border": "1px solid #aaa",
              "background-color": "#aaa",
              "color": "#333",
              "border-radius": "0px",
              "padding": "4px",
              "outline": "none",
              "cursor": "pointer",
              "background": "linear-gradient(#fff,#eee)"
            });
          },
          init: function init() {
            this.addClass("area");
            this.button("toolBtn").text("+ YouTube").clickTo("addYouTube", {
              comp: "youTube",
              compData: {
                url: "https://www.youtube.com/embed/Sj_9CiNkkn4"
              }
            });
            this.button("toolBtn").text("+ Folder").clickTo("addFolder");
            this.button("toolBtn").text("+ File").clickTo("addFile");
            this.button("toolBtn").text("Open").clickTo("openFile");
            this.button("toolBtn").text("Copy").clickTo("copyFile");
            this.button("toolBtn").text("Delete").clickTo("deleteFile");
            this.button("toolBtn").text("Rename").clickTo("renameFile");
          }
        });

        _e().createClass("fullFileDisplay", {
          css: function css(c) {
            c.bind(".area", {
              "width": "100%",
              "color": "#554"
            });
            c.bind(".msg", {
              "line-height": 1,
              "font-size": "3em",
              "text-align": "center",
              "font-family": "Arial"
            });
            c.bind(".msg button", {
              "padding": "2em",
              "font-size": "1.5em",
              "border": "none"
            });
          },
          init: function init() {
            this.addClass("area");
            this.div("msg", function () {
              this.h2().text("We could open with some app the file " + this.model().get("title"));
              this.button().text("Go back").on("click", function () {
                this.popView();
              });
            });
          }
        });

        _e().createClass("fileExplorer", {
          css: function css(c) {
            c.bind(".mediaFilerow", {
              "display": "table-row"
            });
            c.bind(".mediaFilerowItem", {
              "display": "table-cell"
            });
            c.bind(".explorer", {
              "width": "100%",
              "background-color": "#fff"
            });
            c.bind("input.editTitle", {
              width: "100%",
              "font-size": "15px",
              "padding": "4px"
            });
            c.bind(".backBtn", {
              "border": "1px solid #aaa",
              "background-color": "#aaa",
              "color": "#333",
              "border-radius": "10px",
              "padding": "5px",
              "font-size": "12px",
              "outline": "none",
              "margin": "5px",
              "cursor": "pointer",
              "background": "linear-gradient(#fefefe,#e7e7e7)"
            });
            c.bind(".variantsHead", {
              "background": "#676767",
              "color": "white",
              "font-family": "Arial",
              "font-size": "1.2em",
              "padding": "0.5em",
              "cursor": "pointer"
            });
          },
          /*
          {
              comp : "youTube",
              compData : {
                 url : "https://www.youtube.com/embed/Sj_9CiNkkn4"
              }
           }  
          */
          addYouTube: function addYouTube() {
            var theUrl = prompt("Give the URL of the YouTube video");
            if (theUrl) {
              var oo = {
                comp: "youTube",
                compData: {
                  url: "https://www.youtube.com/embed/" + parse_id(theUrl)
                }
              };
              this.send("addFile", oo);
            }

            function parse_id(url) {

              var v_i = url.indexOf("?v=");
              if (v_i) {
                var id = url.substring(v_i + 3, 3 + v_i + "WyZHXoOKYW4".length);
                return id;
              }
            }
          },
          addFile: function addFile(withApp) {
            if (!this._activeFolder) {
              var newName = prompt("Give new name to file");
              if (newName) {
                if (withApp) {
                  this.model().push({
                    title: newName,
                    icon: "fa fa-file",
                    viewClass: "dataView1",
                    "active": false,
                    app: withApp
                  });
                } else {
                  this.model().push({
                    title: newName,
                    icon: "fa fa-file",
                    viewClass: "dataView1",
                    "active": false
                  }); // move to index 0
                }
                var list = this.model();
                var lastItem = list.at(list.length() - 1);
                lastItem.moveToIndex(0);
              }
            }
            if (this._activeFolder && this._activeFolder.items) {
              var newName = prompt("Give new name to file");
              if (newName) {
                if (withApp) {
                  this._activeFolder.items.push({
                    title: newName,
                    icon: "fa fa-file",
                    viewClass: "dataView1",
                    "active": false,
                    app: withApp
                  });
                } else {
                  this._activeFolder.items.push({
                    title: newName,
                    icon: "fa fa-file",
                    viewClass: "dataView1",
                    "active": false
                  }); // move to index 0
                }
                var list = this._activeFolder.items;
                var lastItem = list.at(list.length() - 1);
                lastItem.moveToIndex(0);
              }
            }
          },
          addFolder: function addFolder() {
            if (!this._activeFolder) {
              var newName = prompt("Give new name to folder");
              if (newName) {
                var items = this.model();
                if (!items.isArray()) items = items.items;
                if (!items) return;
                items.push({
                  title: newName,
                  icon: "fa fa-folder",
                  viewClass: "dataView1",
                  "active": false,
                  items: []
                }); // move to index 0
                var lastItem = items.at(items.length() - 1);
                lastItem.moveToIndex(0);
              }
            }
            if (this._activeFolder && this._activeFolder.items) {
              var newName = prompt("Give new name to folder");
              if (newName) {
                this._activeFolder.items.push({
                  title: newName,
                  icon: "fa fa-folder",
                  viewClass: "dataView1",
                  "active": false,
                  items: []
                }); // move to index 0
                var list = this._activeFolder.items;
                var lastItem = list.at(list.length() - 1);
                lastItem.moveToIndex(0);
              }
            } else {
              console.log(this._activeFolder);
              // alert(this._activeFolder.get("title"));
            }
          },
          openFile: function openFile(itemid) {

            if (this._activeFile) this._contentArea.pushView(_e("fullFileDisplay", this._activeFile));
          },
          renameFile: function renameFile(elem) {
            if (this._editTarget) {
              // ?? can open up window ??
              if (elem) {
                var item = this._editTarget;
                var origElement = elem;
                var newElem = _e("div", function () {
                  var me = this;
                  setTimeout(function () {
                    var inp = me.input("editTitle");
                    inp.val(item.get("title")).on("blur", function () {
                      var newFileName = inp.val();
                      if (newFileName.length > 0) item.set("title", newFileName);
                      newElem.replaceWith(origElement);
                    }).focus();
                    inp._dom.select();
                    me._dom.addEventListener("click", function (e) {});
                  }, 1);
                });
                origElement.replaceWith(newElem);
                return;
              }
              var newName = prompt("Give new name to file");
              if (newName) {
                this._editTarget.set("title", newName);
              }
            }
          },
          copyFile: function copyFile() {
            if (this._editTarget) {
              alert("Should copy file " + this._editTarget.get("title"));
            }
          },
          deleteFile: function deleteFile() {
            if (this._editTarget) {
              this._editTarget.remove(); // alert("Should delete file "+this._activeFile.get("title"));
            }
          },
          activeFolder: function activeFolder(itemid) {
            console.log("activeFolder ", itemid);
            if (!itemid) {
              this._activeFolder = null;
              return;
            }
            var item = _data(itemid);
            if (this.model().parent() == item) {
              this._activeFolder = null;
              return;
            }
            this._activeFolder = _data(itemid);
          },
          activeFile: function activeFile(itemid) {
            this._activeFile = _data(itemid);
          },
          editTarget: function editTarget(itemid) {
            this._editTarget = _data(itemid);
          },
          moveToNext: function moveToNext() {
            if (this._editTarget) {
              return; //
              var ii = this._editTarget.indexOf();
              var p = this._editTarget.parent();
              if (p) {
                if (p.at(ii + 1)) {
                  this.sendMsg("editTarget", p.at(ii + 1));
                }
              }
            }
          },
          dragEnd: function dragEnd() {
            if (this._dropTarget && this._dropTarget != this._dragItem) {
              if (this._dragItem.items) {
                var p = this._dropTarget;
                while (p) {
                  if (p == this._dragItem) return;
                  p = p.parent();
                }
              }
              if (this._dropTarget.items && this._dragItem.items) {
                // folder into folder
                this._dropTarget.items.push(this._dragItem.toPlainData());
                this._dragItem.remove();
                var list = this._dropTarget.items;
                var lastItem = list.at(list.length() - 1);
                lastItem.moveToIndex(0);
                return;
              }
              var targetFolder;
              var targetIndex = 0;
              if (!this._dropTarget.items) {
                targetIndex = this._dropTarget.indexOf();
                targetFolder = this._dropTarget.parent();
              }
              if (this._dropTarget.items) targetFolder = this._dropTarget.items;
              if (!targetFolder) targetFolder = this.model();
              if (targetFolder && this._dragItem) {
                targetFolder.push(this._dragItem.toPlainData());
                this._dragItem.remove();
                var list = targetFolder;
                var lastItem = list.at(list.length() - 1);
                lastItem.moveToIndex(targetIndex);
              }
            }
          },
          openMedia: function openMedia(itemid) {
            this.sendMsg("openApplication", itemid);
          },
          dropTarget: function dropTarget(itemid) {
            var item = _data(itemid);
            if (item.getID()) {
              this._dropTarget = item;
            }
            // this._infoDiv.text("drop target was "+item.get("title"));
          },
          dragStart: function dragStart(itemid) {
            var item = _data(itemid);
            this._dragItem = item;
            this._dropTarget = null;
            // this._infoDiv.text("started dragging "+item.get("title"));
          },
          ctrlDown: function ctrlDown() {
            this._ctrlDown = true;
          },
          ctrlUp: function ctrlUp() {
            this._ctrlDown = false;
          },
          shiftDown: function shiftDown() {
            this._shiftDown = true;
          },
          shiftUp: function shiftUp() {
            this._shiftDown = false;
          },
          moveToLevel: function moveToLevel(newLevel) {
            // content._dom.style.marginLeft = "-30px";
            var me = this;
            if (!me._folderLevel) me._folderLevel = 0;
            if (newLevel == me._folderLevel) return;

            var cDom = this._contentArea._dom;
            var oldLevel = me._folderLevel;
            me._folderLevel = oldLevel;
            var w = 200;
            console.log(newLevel);
            later().ease("pow", 400, function (t) {
              cDom.style.marginLeft = -1 * (oldLevel * (1 - t) * w + newLevel * t * w) + "px";
            }, function () {
              me._folderLevel = newLevel;
            });
          },
          showVariants: function showVariants(itemid) {
            var item = _data(itemid);
            if (itemid && item && item.variants) {
              var me = this,
                  oldModel;
              this._mainView.pushView(_e("div", function () {
                this.div("variantsHead", function () {
                  this.span("fa fa-arrow-circle-left");
                  this.span().text(" ");
                  this.span().text("variants of file " + item.get("title"));
                }).on("click", function () {
                  this.popView();
                });
                this.fileExplorer(item.variants);
              }));
            }
          },
          init: function init() {

            this._mediaView = this.div("mediaFilerow");
            // the main view...
            this._mainView = this;

            this._activeModel = this.model();
            this._dragList = [];
            this.addClass("explorer");
            this.div().fileToolbar();
            this._infoDiv = this.div();
            var content = this.div("fileBrowser");

            content.deepAppleMenu(this.model());
            this._contentArea = content;
            document.onkeydown = checkKeyDown;
            document.onkeyup = checkKeyUp;
            var me = this;

            function checkKeyUp(e) {
              e = e || window.event;
              console.log("Up " + e.keyCode);
              if (e.keyCode == 16) {
                me.sendMsg("shiftUp");
              }
              if (e.keyCode == 9) me.sendMsg("moveToNext");
              if (e.keyCode == 17) me.sendMsg("ctrlUp");
              if (e.keyCode == 50) me.sendMsg("renameFile");
            }

            function checkKeyDown(e) {
              e = e || window.event;
              console.log(e.keyCode);
              if (e.keyCode == 16) me.sendMsg("shiftDown");
              if (e.keyCode == 17) me.sendMsg("ctrlDown");
            }
          }
        });

        _e().createClass("osManager", {

          css: function css(c) {
            c.bind(".mediaFilerow", {
              "display": "table-row"
            });
            c.bind(".mediaFilerowItem", {
              "display": "table-cell"
            });
          },

          openApplication: function openApplication(itemid) {
            // this._nextLevel.pushView( _e("showFile", item))
            var mm = _data(itemid),
                me = this;
            if (mm.hasOwn("appUrl")) {

              var pp = umo(mm.get("appUrl"));
              pp.then(function () {
                // alert("Open Media url ok "+pp.get("appUrl"));
                var comp = pp.get("comp");
                if (comp) {

                  if (pp.hasOwn("compDataUrl")) {
                    var cData = umo(pp.get("compDataUrl"));
                    cData.then(function () {
                      // me.e(comp, cData);
                      me._mediaView.prepend(_e("div", function () {
                        me.addClass("mediaFilerowItem");
                        me.e(comp, cData);
                      }));
                    });
                  } else {
                    me._mediaView.prepend(_e("div", function () {
                      this.addClass("mediaFilerowItem");
                      this.e(comp, pp.compData);
                    }));
                    // me.e(comp, pp.compData);
                  }
                  //
                  return;
                }
              });
              return;
            }
            if (mm.hasOwn("app")) {
              // Then try to use some application to open up it
              var pp = mm.app;
              var comp = pp.get("comp");
              if (comp) {
                this._mediaView.prepend(_e("div", function () {
                  this.addClass("mediaFilerowItem");
                  this.e(comp, pp.compData);
                }));
                //
                return;
              }
            }
          },

          init: function init() {
            console.log("--- called the osManager ---");
            this._mediaView = this.div("mediaFilerow");
            this.fileExplorer(this.model());
          }
        });
      };

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (main) {

        this.fileExplorer();
      });
    })(this);
  };

  var osControls = function osControls(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof osControls) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != osControls._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new osControls(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  osControls._classInfo = {
    name: "osControls"
  };
  osControls.prototype = new osControls_prototype();

  (function () {
    if (typeof define !== "undefined" && define !== null && define.amd != null) {
      __amdDefs__["osControls"] = osControls;
      this.osControls = osControls;
    } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
      module.exports["osControls"] = osControls;
    } else {
      this.osControls = osControls;
    }
  }).call(new Function("return this")());

  if (typeof define !== "undefined" && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
  osControls();
}).call(new Function("return this")());

// e.stopPropagation();