$(function () {

    // ------------------------------------------------------- //
    // Tooltips init
    // ------------------------------------------------------ //    

    $('[data-toggle="tooltip"]').tooltip()        

    // ------------------------------------------------------- //
    // Universal Form Validation
    // ------------------------------------------------------ //

    $('.form-validate').each(function() {  
        $(this).validate({
            errorElement: "div",
            errorClass: 'is-invalid',
            validClass: 'is-valid',
            ignore: ':hidden:not(.summernote),.note-editable.card-block',
            errorPlacement: function (error, element) {
                // Add the `invalid-feedback` class to the error element
                error.addClass("invalid-feedback");
                //console.log(element);
                if (element.prop("type") === "checkbox") {
                    error.insertAfter(element.siblings("label"));
                } 
                else {
                    error.insertAfter(element);
                }
            }
        });
    });

    // ------------------------------------------------------- //
    // Footer 
    // ------------------------------------------------------ //   

    var pageContent = $('.page-content');

    $(document).on('sidebarChanged', function () {
        adjustFooter();
    });

    $(window).on('resize', function(){
        adjustFooter();
    })

    function adjustFooter() {
        var footerBlockHeight = $('.footer__block').outerHeight();
        pageContent.css('padding-bottom', footerBlockHeight + 'px');
    }

    // ------------------------------------------------------- //
    // Adding fade effect to dropdowns
    // ------------------------------------------------------ //
    $('.dropdown').on('show.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeIn(100).addClass('active');
    });
    $('.dropdown').on('hide.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeOut(100).removeClass('active');
    });

    // ------------------------------------------------------- //
    // Sidebar Functionality
    // ------------------------------------------------------ //
    $('.sidebar-toggle').on('click', function () {
        $(this).toggleClass('active');

        $('#sidebar').toggleClass('shrinked');
        $('.page-content').toggleClass('active');
        $(document).trigger('sidebarChanged');

        if ($('.sidebar-toggle').hasClass('active')) {
            $('.navbar-brand .brand-sm').addClass('visible');
            $('.navbar-brand .brand-big').removeClass('visible');
            $(this).find('i').attr('class', 'fa fa-long-arrow-right');
        } else {
            $('.navbar-brand .brand-sm').removeClass('visible');
            $('.navbar-brand .brand-big').addClass('visible');
            $(this).find('i').attr('class', 'fa fa-long-arrow-left');
        }
    });
    const OFFSETTOP = -80;
    $('#dashboard-link').click(function() {
        $('html, body').animate(
        {
            scrollTop: $('#dashboard').offset().top + OFFSETTOP
        },
        {
            duration: 500,
            easing: "swing"
        })
        return false;
    })
    $('#configuration-link').click(function() {
        $('html, body').animate(
        {
            scrollTop: $('#configuration').offset().top + OFFSETTOP
        },
        {
            duration: 500,
            easing: "swing"
        })
        return false;
    })
    $('#fileUpload-link').click(function() {
        $('html, body').animate(
        {
            scrollTop: $('#fileUpload').offset().top + OFFSETTOP
        },
        {
            duration: 500,
            easing: "swing"
        })
        return false;
    })
    $('#statistics-link').click(function() {
        $('html, body').animate(
        {
            scrollTop: $('#statistics').offset().top + OFFSETTOP
        },
        {
            duration: 500,
            easing: "swing"
        })
        return false;
    })
    $('#dataVisual-link').click(function() {
        $('html, body').animate(
        {
            scrollTop: $('#datavisualization').offset().top + OFFSETTOP
        },
        {
            duration: 500,
            easing: "swing"
        })
        return false;
    })
    $('#runtime-link').click(function() {
        $('html, body').animate(
        {
            scrollTop: $('#runtime').offset().top + OFFSETTOP
        },
        {
            duration: 500,
            easing: "swing"
        })
        return false;
    })
});