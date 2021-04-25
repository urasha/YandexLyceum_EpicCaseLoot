$('.open-popup').click(function(e) {
    e.preventDefault();
    $('.popup-bg').fadeIn(500);
});

$('.close-popup').click(function() {
    $('.popup-bg').fadeOut(500);
});

$('.close-popup-2').click(function() {
    $('.popup-bg-2').fadeOut(500);
});