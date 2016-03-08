var SlidePhoto = function(){
  this.init();
}

SlidePhoto.prototype = {
  init: function(){
    var self = this;
    self.$el = $("#js-slidePhoto");
    self.$wrap = self.$el.parent();
    self.$list = self.$el.find(".js-slidePhoto-list");
    self.$li = self.$list.find("li");
    self.$img = self.$li.find("img");
    self.$blank1 = self.$el.find(".js-slidePhoto-blank1");
    self.$blank2 = self.$el.find(".js-slidePhoto-blank2");

    self.linum = self.$li.length;
    self.idx = 0;
    self.idy = Math.round(self.linum / 2);
    self.show = 0;
    self.delay = 5000;
    self.isSp = false;

    self.setSize();
    self.initList();
    self.initBlank();
    self.setto();
    self.bindEvent();
  },

  setSize: function(){
    var self = this;

    self.w = self.$wrap.width();
    self.h = self.w * 2 / 3;
    if (self.w >= 768){
      self.isSp = false;
      self.$el.height(self.h);
      self.$blank1.height(self.h / 2);
      self.$blank2.height(self.h / 2);
      self.$list.height(self.h).css({
        "margin": 0,
      });
    }else{
      self.isSp = true;
      self.$el.height(self.h);
      var xl = this.show == 0 || this.show == 3 ? 0 : -self.w;
      var yl = this.show == 0 || this.show == 1 ? 0 : -self.h;
      self.$list.height(self.h * 2).css({
        "margin-left" : xl,
        "margin-top" : yl,
      });
    }
  },

  initList: function(){
    var self = this;

    $(self.$li[self.idx]).addClass("show0");
    $(self.$li[self.idy]).addClass("show2");

  },

  initBlank: function(){
    var self = this;

    self.$blank1.css({
      "top": 0,
      "left": self.w / 2,
    });
    self.$blank2.css({
      "top": self.h / 2,
      "left": 0,
    });
  },

  setto: function(){
    var self = this;

    var to = setTimeout(function callback(){
      self.moveList();
      self.moveBlank();

      to = setTimeout(callback, self.delay);
    }, self.delay);
  },

  moveList: function(){
    var self = this;

    self.idx = (self.idx + 1) % self.linum;
    self.idy = (self.idy + 1) % self.linum;
    self.show = (self.show + 1) % 4;

    $(self.$li[self.idx]).addClass("show" + self.show);
    $(self.$li[self.idy]).addClass("show" + (self.show + 2) % 4);

  },

  moveBlank: function(){
    var self = this;

    var sh = self.show;
    var x1 = sh == 0 || sh == 1 ?  self.w / 2 : 0;
    var y1 = sh == 0 || sh == 3 ?  0 : self.h / 2;
    var x2 = sh == 0 || sh == 1 ?  0 : self.w / 2;
    var y2 = sh == 0 || sh == 3 ?  self.h / 2 : 0;

    self.$blank1.animate({
      "top": y1,
      "left": x1,
    },"slow");

    self.$blank2.animate({
      "top": y2,
      "left": x2,
    },"slow","swing", function(){
        $(self.$li[(self.idx + self.linum - 1) % self.linum]).removeAttr("class");
        $(self.$li[(self.idy + self.linum - 1) % self.linum]).removeAttr("class");
    });
    if(self.isSp){
      var xl = sh == 0 || sh == 3 ? 0 : -self.w;
      var yl = sh == 0 || sh == 1 ? 0 : -self.h;
      self.$list.animate({
        "margin-left" : xl,
        "margin-top" : yl,
      });
    }
  },

  bindEvent: function(){
    var self = this;
    $(window).on("resize",function(){
      self.setSize();

      var sh = self.show;
      var x1 = sh == 0 || sh == 1 ?  self.w / 2 : 0;
      var y1 = sh == 0 || sh == 3 ?  0 : self.h / 2;
      var x2 = sh == 0 || sh == 1 ?  0 : self.w / 2;
      var y2 = sh == 0 || sh == 3 ?  self.h / 2 : 0;

      self.$blank1.stop(true,true).css({
        "top": y1,
        "left": x1,
      });
      self.$blank2.stop(true,true).css({
        "top": y2,
        "left": x2,
      });
    })
  },
}

var EquelHeightRow = function($el){
  this.init($el);
}

var EquelHeight = function(){
  $.each($(".js-equelHeight"),function(i, e){
    new EquelHeightRow($(e));
  });
}

EquelHeightRow.prototype = {
  init: function($el){
    var self = this;
    self.$el = $el;
    self.$col = $el.find(".js-equelHeight-col");

    self.height = self.getHeight();
    self.setHeight();
  },

  getHeight: function(){
    var self = this;
    var max = 0;
    $.each(self.$col, function(i, e){
      var elh = $(e).outerHeight();
      max = max >= elh ? max : elh;
    });
    console.log(max);
    return max;
  },

  setHeight: function(){
    var self = this;
    $.each(self.$col, function(i, e){
      $(e).height(self.height);
    });
  },
}



$(function(){
  //modules init
  new SlidePhoto();
  EquelHeight();

  $("#js-nav-btn").on("click", function(){
    $("#js-nav").toggleClass("showing");
    $("#js-nav-btn").toggleClass("showing");
  });
})

