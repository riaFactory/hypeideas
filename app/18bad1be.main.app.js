var _gaq=_gaq||[],google={site:function(a){return"https://sites.google.com/feeds/content/"+a+"/"},script:function(a){return"https://script.google.com/macros/s/"+a+"/exec"}},settings={styles:"assets/styles",app:jQuery("script[src*='app']").attr("src").split("app")[0]+"app/",endpoint:google.script(),site:google.site()};jQuery(document).ready(function(){$=jQuery.noConflict(),_gaq.push(["_trackPageview"]);var a=_.once(App.init);a()}),App=kendo.observable({Model:{},VO:{},Utils:{},source:new kendo.data.DataSource({batch:!0,schema:{parse:function(a){return _.map(a.feed.entry,function(a){return{content:a.content.$t,label:a.title.$t.split(".")[1],title:a.title.$t}})}},transport:{read:{cache:!0,url:settings.site+"apps?alt=json&kind=webpage",dataType:"jsonp"}}}),router:new kendo.Router,style:null,init:function(){var a=new kendo.Layout('<header></header><main></main><footer id="footer"></footer>'),b=new kendo.View('<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"><ul class="nav navbar-nav"></ul></div></nav>');footerView=new kendo.View('<ul class="actions"><li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li><li><a href="#" class="icon fa-facebook"><span class="label">Facebook</span></a></li><li><a href="#" class="icon fa-google-plus"><span class="label">Google+</span></a></li><li><a href="#" class="icon fa-dribbble"><span class="label">Dribbble</span></a></li><li><a href="#" class="icon fa-pinterest"><span class="label">Pinterest</span></a></li><li><a href="#" class="icon fa-instagram"><span class="label">Instagram</span></a></li></ul>'),a.showIn("header",b),a.showIn("footer",footerView),a.render($("body")),App.router.start(),App.style=new Hype.Style,App.loadModule({name:"public"})},getApi:function(a,b,c,d){var e=document.createElement("script");e.type="text/javascript",e.async=c,e.src=void 0==d?b:b+"&callback="+d,$(a).append(e)},loadModule:function(a){var b=App.ucwords(a.name,!0,!0),c=settings.app+"modules/"+App.ucwords(a.name,!0,!1)+"/",d=!_.isUndefined($(a.name+"-module").get(0));console.info("pathModule",c),d?$("main").html($(a.name+"-module").get(0)):$("main").load(c+b+".html",function(){_.has(App.Model[b],"init")&&App.Model[b].init(),_.has(App.Model[b],a.action)&&App.Model[b][a.action].apply(this,a.params),kendo.bind($(a.name+"-module").get(0),App.Model[b])})},parseMenu:function(a){return menuData="",_.each(a,function(a){menuData+='<li><a href="#'+App.friendlyURL2Convert(a.label)+'">'+a.label+"</a></li>"}),menuData},friendlyURL2Convert:function(a){return strCadena=a,""!=strCadena?(strCadena=strCadena.toLowerCase(),strCadena=strCadena.replace(/^\s*|\s*$/g,""),strCadena=strCadena.replace("&quot;",""),strCadena=strCadena.replace(" ","-").replace("_","-"),strCadena=strCadena.replace(/[������]/gi,"a"),strCadena=strCadena.replace(/[����]/gi,"e"),strCadena=strCadena.replace(/[����]/gi,"i"),strCadena=strCadena.replace(/[�����]/gi,"o"),strCadena=strCadena.replace(/[����]/gi,"u"),strCadena=strCadena.replace(/[�]/gi,"n"),strCadena=strCadena.replace(/[�]/gi,"c"),strCadena=strCadena.replace(/[^a-z0-9-]/gi,""),strCadena.substring(0,255)):""},ucwords:function(a,b,c){return(a.toLowerCase()+"").replace(/^([a-z])|\s+([a-z])/g,function(a){return a=c?a.toUpperCase():a.toLowerCase(),b?a.replace(/\s/g,""):a})}});var Hype=Hype||{};Hype.Style=kendo.Class.extend({init:function(){},setTable:function(a){$("table").addClass("table table-striped table-hover"),_.each($("tbody").children(),function(b,c){c%2==0&&$(b).addClass(a)})}}),App.Model.Public=kendo.observable({area:window.innerWidth*window.innerHeight,home:{background:"",logo:""},scale:"100%",width:window.innerWidth,height:window.innerHeight,init:function(){console.info("ok2"),$(".navbar-brand img").attr("src",$(menuData[0].content).find("img")[0].src),$(window).bind("resize",App.Model.Public.toResize),App.router.route(":section",App.Model.Public.toRoute)},resize:function(){App.Model.Public.set("width",window.innerWidth),App.Model.Public.set("height",window.innerHeight);var a=window.innerWidth*window.innerHeight,b=a>App.Model.Public.area?"100%":kendo.toString(window.innerWidth*window.innerHeight/App.Model.Public.area,"##%");App.Model.Public.set("scale",b),$(".background").css("width",window.innerWidth)},showWindow:function(a,b,c){App.Model.Public.set("modal.title",a),App.Model.Public.set("modal.body",b),App.Model.Public.set("modal.footer",c),$("#appModal").modal()},toBrowseHistory:function(){},toNavigate:function(a){a.preventDefault();var b=a.sender.dataSource.view(),c=_.map(a.sender.select(),function(a){return b[$(a).index()]})[0];return App.router.navigate(c.anchor),!1},toResize:function(){App.Model.Public.resize()},toRoute:function(a){console.info(a)}});