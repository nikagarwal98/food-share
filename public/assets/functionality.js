$(document).ready(function(){
  
  // Make tabs navigatable
  $('a').on('click', function(e){
    let tabsID = $(e.currentTarget).attr('data-tabs-id');
    let aID = $(e.currentTarget).attr('id');
    
    $('.tabs[data-tabs-id=' + tabsID + '] ul li.is-active').each(function(index, value){
      $(value).removeClass('is-active');
    });
    
    // Hide All Sections
    $('section[data-tabs-id=' + tabsID + ']').each(function(index, value){
      $(value).addClass('is-hidden');
    });
    
    // Add Active to Parent of clicked Link
    $(e.currentTarget).parent().addClass('is-active');
    
    // Show The Chosen Section
    $('section[data-for="' + aID + '"]').removeClass('is-hidden');
  });
  
  // Make hamburger menu navigatable
  $('.navbar-burger').on('click', function(e){
    let hamburger = $(e.currentTarget);
    let linkedMenuID = $(hamburger).attr('data-for');
    
    if($(hamburger).hasClass('is-active')) {
      // Toggle Off
      $(hamburger).removeClass('is-active');
      $('#' + linkedMenuID).removeClass('is-active');
    } else {
      // Toggle On
      $(hamburger).addClass('is-active');
      $('#' + linkedMenuID).addClass('is-active');
    }
    
  });
  
});
