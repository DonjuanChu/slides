// jquery.tweet.js - See http://tweet.seaofclouds.com/ or https://github.com/seaofclouds/tweet for more info
// Copyright (c) 2008-2012 Todd Matthews & Steve Purcell
(function(e){typeof define=="function"&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){e.fn.tweet=function(t){function i(e,t){if(typeof e=="string"){var n=e;for(var r in t){var i=t[r];n=n.split("{"+r+"}").join(i===null?"":i)}return n}return e(t)}function s(t,n){return function(){var r=[];return this.each(function(){r.push(this.replace(t,n))}),e(r)}}function o(e){return e.replace(/</g,"&lt;").replace(/>/g,"^&gt;")}function u(e,t){return e.replace(r,function(e){var n=/^[a-z]+:/i.test(e)?e:"http://"+e,r=e;for(var i=0;i<t.length;++i){var s=t[i];if(s.url===n&&s.expanded_url){n=s.expanded_url,r=s.display_url;break}}return'<a href="'+o(n)+'">'+o(r)+"</a>"})}function a(e){return Date.parse(e.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i,"$1,$2$4$3"))}function f(e){var t=function(e){return parseInt(e,10)},n=new Date,r=t((n.getTime()-e)/1e3);return r<1&&(r=0),{days:t(r/86400),hours:t(r/3600),minutes:t(r/60),seconds:t(r)}}function l(e){return e.days>2?"about "+e.days+" days ago":e.hours>24?"about a day ago":e.hours>2?"about "+e.hours+" hours ago":e.minutes>45?"about an hour ago":e.minutes>2?"about "+e.minutes+" minutes ago":e.seconds>1?"about "+e.seconds+" seconds ago":"just now"}function c(e){return e.match(/^(@([A-Za-z0-9-_]+)) .*/i)?n.auto_join_text_reply:e.match(r)?n.auto_join_text_url:e.match(/^((\w+ed)|just) .*/im)?n.auto_join_text_ed:e.match(/^(\w*ing) .*/i)?n.auto_join_text_ing:n.auto_join_text_default}function h(){var e="https:"===document.location.protocol?"https:":"http:",t=n.fetch===null?n.count:n.fetch,r="&include_entities=1&callback=?";if(n.list)return e+"//"+n.twitter_api_url+"/1/"+n.username[0]+"/lists/"+n.list+"/statuses.json?page="+n.page+"&per_page="+t+r;if(n.favorites)return e+"//"+n.twitter_api_url+"/1/favorites.json?screen_name="+n.username[0]+"&page="+n.page+"&count="+t+r;if(n.query===null&&n.username.length===1)return e+"//"+n.twitter_api_url+"/1/statuses/user_timeline.json?screen_name="+n.username[0]+"&count="+t+(n.retweets?"&include_rts=1":"")+"&page="+n.page+r;var i=n.query||"from:"+n.username.join(" OR from:");return e+"//"+n.twitter_search_url+"/search.json?&q="+encodeURIComponent(i)+"&rpp="+t+"&page="+n.page+r}function p(e,t){return t?"user"in e?e.user.profile_image_url_https:p(e,!1).replace(/^http:\/\/[a-z0-9]{1,3}\.twimg\.com\//,"https://s3.amazonaws.com/twitter_production/"):e.profile_image_url||e.user.profile_image_url}function d(t){var r={};return r.item=t,r.source=t.source,r.screen_name=t.from_user||t.user.screen_name,r.name=t.from_user_name||t.user.name,r.retweet=typeof t.retweeted_status!="undefined",r.tweet_time=a(t.created_at),r.join_text=n.join_text==="auto"?c(t.text):n.join_text,r.tweet_id=t.id_str,r.twitter_base="http://"+n.twitter_url+"/",r.user_url=r.twitter_base+r.screen_name,r.tweet_url=r.user_url+"/status/"+r.tweet_id,r.reply_url=r.twitter_base+"intent/tweet?in_reply_to="+r.tweet_id,r.retweet_url=r.twitter_base+"intent/retweet?tweet_id="+r.tweet_id,r.favorite_url=r.twitter_base+"intent/favorite?tweet_id="+r.tweet_id,r.retweeted_screen_name=r.retweet&&t.retweeted_status.user.screen_name,r.tweet_relative_time=l(f(r.tweet_time)),r.entities=t.entities?(t.entities.urls||[]).concat(t.entities.media||[]):[],r.tweet_raw_text=r.retweet?"RT @"+r.retweeted_screen_name+" "+t.retweeted_status.text:t.text,r.tweet_text=e([u(r.tweet_raw_text,r.entities)]).linkUser().linkHash()[0],r.retweeted_tweet_text=e([u(t.text,r.entities)]).linkUser().linkHash()[0],r.tweet_text_fancy=e([r.tweet_text]).makeHeart()[0],r.avatar_size=n.avatar_size,r.avatar_url=p(r.retweet?t.retweeted_status:t,document.location.protocol==="https:"),r.avatar_screen_name=r.retweet?r.retweeted_screen_name:r.screen_name,r.avatar_profile_url=r.twitter_base+r.avatar_screen_name,r.user=i('<a class="tweet_user" href="{user_url}">{screen_name}</a>',r),r.join=n.join_text?i('<span class="tweet_join">{join_text}</span>',r):"",r.avatar=r.avatar_size?i('<a class="tweet_avatar" href="{avatar_profile_url}"><img src="{avatar_url}" height="{avatar_size}" width="{avatar_size}" alt="{avatar_screen_name}\'s avatar" title="{avatar_screen_name}\'s avatar" border="0"/></a>',r):"",r.time=i('<span class="tweet_time"><a href="{tweet_url}" title="view tweet on twitter">{tweet_relative_time}</a></span>',r),r.text=i('<span class="tweet_text">{tweet_text_fancy}</span>',r),r.retweeted_text=i('<span class="tweet_text">{retweeted_tweet_text}</span>',r),r.reply_action=i('<a class="tweet_action tweet_reply" href="{reply_url}">reply</a>',r),r.retweet_action=i('<a class="tweet_action tweet_retweet" href="{retweet_url}">retweet</a>',r),r.favorite_action=i('<a class="tweet_action tweet_favorite" href="{favorite_url}">favorite</a>',r),r}function v(t,r){var s=e('<ul class="tweet_list">');s.append(e.map(r,function(e){return"<li>"+i(n.template,e)+"</li>"}).join("")).children("li:first").addClass("tweet_first").end().children("li:odd").addClass("tweet_even").end().children("li:even").addClass("tweet_odd"),e(t).empty().append(s),n.intro_text&&s.before('<p class="tweet_intro">'+n.intro_text+"</p>"),n.outro_text&&s.after('<p class="tweet_outro">'+n.outro_text+"</p>"),e(t).trigger("loaded").trigger(r.length===0?"empty":"full"),n.refresh_interval&&window.setTimeout(function(){e(t).trigger("tweet:load")},1e3*n.refresh_interval)}function m(t){var r=e('<p class="loading">'+n.loading_text+"</p>");n.loading_text&&e(t).not(":has(.tweet_list)").empty().append(r),e.getJSON(h(),function(r){var i=e.map(r.results||r,d);i=e.grep(i,n.filter).sort(n.comparator).slice(0,n.count),e(t).trigger("tweet:retrieved",[i])})}var n=e.extend({username:null,list:null,favorites:!1,query:null,avatar_size:null,count:3,fetch:null,page:1,retweets:!0,intro_text:null,outro_text:null,join_text:null,auto_join_text_default:" I said, ",auto_join_text_ed:" I ",auto_join_text_ing:" I am ",auto_join_text_reply:" I replied to ",auto_join_text_url:" I was looking at ",loading_text:null,refresh_interval:null,twitter_url:"twitter.com",twitter_api_url:"api.twitter.com",twitter_search_url:"search.twitter.com",template:"{avatar}{time}{join} {text}",comparator:function(e,t){return t.tweet_time-e.tweet_time},filter:function(e){return!0}},t),r=/\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;return e.extend({tweet:{t:i}}),e.fn.extend({linkUser:s(/(^|[\W])@(\w+)/gi,'$1<span class="at">@</span><a href="http://'+n.twitter_url+'/$2">$2</a>'),linkHash:s(/(?:^| )[\#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/gi,' <a href="https://twitter.com/search?q=%23$1&lang=all'+(n.username&&n.username.length===1&&!n.list?"&from="+n.username.join("%2BOR%2B"):"")+'" class="tweet_hashtag">#$1</a>'),makeHeart:s(/(&lt;)+[3]/gi,"<tt class='heart'>&#x2665;</tt>")}),this.each(function(t,r){n.username&&typeof n.username=="string"&&(n.username=[n.username]),e(r).unbind("tweet:render").unbind("tweet:retrieved").unbind("tweet:load").bind({"tweet:load":function(){m(r)},"tweet:retrieved":function(t,n){e(r).trigger("tweet:render",[n])},"tweet:render":function(t,n){v(e(r),n)}}).trigger("tweet:load")})}});