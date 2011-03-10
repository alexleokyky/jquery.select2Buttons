jQuery.fn.select2Buttons = function(options) {
  return this.each(function(){
    var select = $(this);
    select.hide();

    var buttonsHtml = $('<div class="select2Buttons"></div>');
    var selectIndex = 0;
    var addOptGroup = function(optGroup){
      if (optGroup.attr('label')){
        buttonsHtml.append('<strong>' + optGroup.attr('label') + '</strong>');
      }
      var ulHtml =  $('<ul class="select-buttons">');
      optGroup.children('option').each(function(){
        var liHtml = $('<li></li>');
        if ($(this).attr('disabled') || select.attr('disabled')){
          liHtml.addClass('disabled');
          liHtml.append('<span>' + $(this).html() + '</span>');
        }else{
          liHtml.append('<a href="#" data-select-index="' + (selectIndex + 1) + '">' + $(this).html() + '</a>');
        }

        // Mark current selection as "picked"
        if((!options || !options.noDefault) && select.attr("selectedIndex") == selectIndex){
          liHtml.children('a, span').addClass('picked');
        }
        ulHtml.append(liHtml);
        selectIndex++;
      });
      buttonsHtml.append(ulHtml);
    }

    var optGroups = select.children('optgroup');
    if (optGroups.length == 0) {
      addOptGroup(select);
    }else{
      optGroups.each(function(){
        addOptGroup($(this));
      });
    }

    select.after(buttonsHtml);

    buttonsHtml.find('a').click(function(e){
      event.preventDefault();

      buttonsHtml.find('a, span').removeClass('picked');
      $(this).addClass('picked');
      select.find('option:nth-child(' + $(this).attr('data-select-index') + ')').attr('selected', 'selected');
      select.trigger('change');
    });
  });
};
