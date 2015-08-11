# eclectic_eye
A very strange and fancy eye ;D


##Examples

A huge base example [http://codepen.io/eclectic_boy/pen/bdZybj](http://codepen.io/eclectic_boy/pen/bdZybj)

A very crowded example [http://codepen.io/eclectic_boy/pen/KpELzY](http://codepen.io/eclectic_boy/pen/KpELzY)


##Requirements

 - [jQuery](https://jquery.com/);
 - [jQuery UI](https://jqueryui.com/);
 - [obeyCursor](https://github.com/eclectic-boy/obeyCursor);
 - [cursorSpy](https://github.com/eclectic-boy/cursorSpy).

#Usage

```html    
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<script type="text/javascript" src="/path/to/obeyCursor.js"></script>
<script type="text/javascript" src="/path/to/cursorSpy.js"></script>
<script type="text/javascript" src="js/eclectic_eye.js"></script>

<script type="text/javascript">
$(function() {
	$("#eye").eclectic_eye(opts);
});
</script>

<div id="eye"></div>
```

#Options

An optional options object `opts` can be passed to the widget. Here follow the available options:

###`basePath`
The path of the `img` folder within the repo. Mind the trailing slash.


#Changelog

###v1.0
First release