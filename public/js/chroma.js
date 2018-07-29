var red = 0,
    green = 0,
    blue = 0;

$("body").on('mouseup', '.slider input', function(event) {
    var value = $(this).val();
    if (this.id == 'red') {
        red = value;
    } else if (this.id == 'green') {
        green = value;
    } else if (this.id == 'blue') {
        blue = value;
    } 
    $(this).parent().find('.rgbVal').html(value);
    var color = "rgb(" + red + ", " + green + ", " + blue + ")";
    $('#sample div').css('background-color', color);
});

$('form').submit(function(event) {
    event.preventDefault();
    var range = $('#range').val();
    $('#image').html("<img>");
    $('#image img').attr('src', localStorage.imgSrc);
    $('#image img').attr('ckey-r', localStorage.red);
    $('#image img').attr('ckey-g', localStorage.green);
    $('#image img').attr('ckey-b', localStorage.blue);
    $('#image img').attr('data-rr', red);
    $('#image img').attr('data-rg', green);
    $('#image img').attr('data-rb', blue);
    $('#image img').attr('data-delta', '45');
    $('#image img').attr('alt', 'ckimage');
    $('#image img').attr('adv', 1);
    chroma_key.start();
})