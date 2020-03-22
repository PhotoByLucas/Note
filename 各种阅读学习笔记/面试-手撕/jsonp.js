var jsonp=function(url,callback=()=>{}){
  var script = document.createElement('script')
  script.src=`${url}?callback=${callback}`
  var tag=document.getElementsByTagName('head')[0]
  tag.append(script)
}