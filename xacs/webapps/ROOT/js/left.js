var lastMenu = null, lastSubMenu = null;

function init(menuName, subMenuName)
{
    initWithoutClick(menuName, subMenuName);
    
    if(lastSubMenu != null)
    {
        var tds = lastSubMenu.getElementsByTagName("TD");
        
        if(tds.length >= 4)
        {
            var firstMenuItem = tds.item(2);
            
            //IE
            if(navigator.userAgent.indexOf("MSIE") > 0) 
            {
                firstMenuItem.click();
            }
            //非IE
            else
            {
                var e = document.createEvent("MouseEvents");
                e.initEvent("click", true, true);
                firstMenuItem.dispatchEvent(e);
            }
        }
    }
}

function initWithoutClick(menuName, subMenuName)
{
    var menu = getMenuElementsByName(menuName);
    var subMenu = getMenuElementsByName(subMenuName);
    
    if(menu.length > 0)
    {
        this.lastMenu = menu[0];
        this.lastSubMenu = subMenu[0];
        showSubMenu(lastMenu, lastSubMenu);
    }
}

function getMenuElementsByName(name)
{
    var elements = null;
    
    //IE
    if(navigator.userAgent.indexOf("MSIE") > 0) 
    {
        var tds = document.getElementsByTagName("TD");
        elements = [];
        var td;
        var index = 0;

        for(var i = 0; i < tds.length; i++)
        {
            td = tds[i];

            if("name" in td && td.name == name)
            {
                elements[index++] = td;
            }
        }
    }
    //非IE
    else
    {
        elements = document.getElementsByName(name);
    }
    
    return elements;
}

function showSubMenu(menu, subMenu)
{
    if(menu != lastMenu)
    {
        lastMenu.className = "menu_collapse";
        lastSubMenu.style.display = "none";
    }
    
    if(subMenu.style.display == "none")
    {
        menu.className = "menu_expand";
        subMenu.style.display = "";
    }
    else
    {
        menu.className = "menu_collapse";
        subMenu.style.display = "none";
    }
    
    lastMenu = menu;
    lastSubMenu = subMenu;
}

function itemMouseAction(mi, mouseIn)
{
    if(mouseIn)
    {
        mi.style.borderStyle = "solid";
        mi.style.borderWidth = "1";
        mi.style.borderColor = "#7bc4d3";
    }
    else
    {
        mi.style.borderStyle = "none";
    }
}

function gotoSub(url, parentName)
{
    window.open(url, parentName);
}

// 打开子窗口URL后添加时间参数，避免浏览器缓存的问题
function gotoSubWithTime(url, parentName)
{
    window.open(url + "?time=" + new Date().getTime(), parentName);
}

function toLoginPage()
{
    window.parent.parent.parent.location.href="/logout.do";
}

//沈浪  页面跳转
function loadPage(url, parentName, realurl, title)
{
    url = url + "?realUrl=" + realurl + "&title=" + encodeURIComponent(title) + "&time=" + new Date().getTime();
    window.open(url, parentName);
}