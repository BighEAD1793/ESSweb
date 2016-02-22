var Visual = function(){
  this.init();
}

Visual.prototype = {
  init: function(){
    this.$el = $("#js-visual");
    this.$side = $el.find(".visual-side");
    this.$logo = $el.find(".visual-logo");
    this.$img = $el.find(".visual-img");

    setSize();
    bindEvents();
  },

}
