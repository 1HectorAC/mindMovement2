    $(document).ready(function(){ 
        let MakeLinkElement = (link, linkLabel) => '<li class="nav-item"><a class="nav-link" href="'+link+'">'+linkLabel+'</a></li>';

        var left_navItems = $("<ul>", {class:'navbar-nav'}).append([
            MakeLinkElement("index.html","Home"),
            MakeLinkElement("game1.html","Basic Operations"),
            MakeLinkElement("game2.html","Char Memeory"),
            MakeLinkElement("game3.html","Color Direction")
        ].join('\n'));

        var right_navItems = $("<ul>", {class:'navbar-nav'}).append([
            MakeLinkElement("about.html","About"),
            MakeLinkElement("contact.html","Contact")
        ].join('\n'));

        let MakeDropdownLinkElement = (link, linkLabel) => '<li><a class="dropdown-item" href="'+link+'">'+linkLabel+'</a></li>';

        // dropdown nav items are for smaller screen nav.
        var dropdown_navItems = $('<ul', {class:'dropdown-menu', 'aria-labelledby':'navbarDropdownMenuLink'}).append([
            MakeDropdownLinkElement("game1.html","Basic Operations"),
            MakeDropdownLinkElement("game2.html","Char Memory"),
            MakeDropdownLinkElement("game3.html","Color Direction"),
            MakeDropdownLinkElement("about.html","About"),
            MakeDropdownLinkElement("contact.html","Contact")
        ])

        var all_navItems = $('<div>', {class:'collapse navbar-collapse justify-content-between', id:'navbarNavDropdown'}).append(
            left_navItems,
            right_navItems,
            dropdown_navItems
        );

        var nav = $('<nav>', {class:'navbar navbar-expand-lg navbar-light bg-light'}).append(
            $('<div>', {class:'container-fluid'}).append(
                '<a class="navbar-brand" href="index.html"><img src="static/img/mm2.png" alt="Logo" style="width:40px;"></a>',
                '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>',
                all_navItems,
                )
        );
        $(".nav-section").append(nav);

        // Add active link class to correct nav link based on page title.
        var pageTitles = ["Mind Movement", "Basic Operations Game", "Chars Memory Game", "Color Direction Game", "About Mind Movement", "Contact Information"]
        var indexOfTitle = pageTitles.indexOf(pageTitle = $("#page-title").text());
        if(indexOfTitle != -1)
            $(".nav-link:eq("+indexOfTitle+")").addClass("active");

    });
