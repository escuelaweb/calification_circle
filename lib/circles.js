
(function($, w, d, undefined) {

  function calificationCircle() {

    // Globals 
    var self = this,
        PI = Math.PI,
        $cElement, c, dataActual, dataMaximun, dataColor, progress, animatedPoint, dataFont,
        initialPoint , speed, dataBackground, textColor;

    function init(element, options) {
      
      // Set Globals
      self.options   = $.extend( {}, $.fn.calificationCircle.options, options );
      initialPoint   = self.options.initialPoint;
      animatedPoint  = initialPoint;
      speed          = self.options.speed;
      $cElement      = $(element);
      c              = element.getContext("2d");
      dataActual     = $cElement.data("actual");
      dataMaximun    = $cElement.data("maximun");
      dataColor      = $cElement.data("color") || "#000000";
      dataBackground = $cElement.data("bg-color") || "#565656";
      dataWidth      = $cElement.data("width") || "5";
      dataFont       = $cElement.data("font") || "30px Ubuntu";
      textColor      = $cElement.data("font-color") || "#FFFFFF";
      progress       = (( dataActual * 2 * PI ) /  dataMaximun ) - PI/2;

      c.lineWidth = dataWidth;
      self.animation = setInterval(function(){animate_calification()}, 20);
    }

    function clear() {
      c.clearRect(0, 0, $cElement.width(), $cElement.height());
    }

    function drawCircle(start, stop, color, fill) {
      fill = fill || false;
      c.beginPath();
      c.arc(
        $cElement.width()/2, 
        $cElement.height()/2, 
        $cElement.height()/2 - 2 * dataWidth, 
        start, 
        stop
      );
      if (fill==true){
        c.fillStyle = dataBackground;
        c.fill();
      }
      c.strokeStyle = color;
			c.stroke();
			c.closePath();
    }

    function animate_calification(){
      clear();
      drawCircle(0, 2*PI, "#F1F1F1", true);
      drawCircle(initialPoint, animatedPoint, dataColor);
      animatedPoint += speed;
      //console.log(animatedPoint);
      drawText();
      if (animatedPoint >= progress) {
        //console.log("finish");
        clearInterval(self.animation);
      }
    }

    function drawText() {
      c.font = dataFont;
      c.textAlign = "center";
      c.fillStyle = textColor;
      c.textBaseline = 'middle';
      c.fillText(
        dataActual.toString() + " / " + dataMaximun.toString() ,
        $cElement.width()/2,
        $cElement.height()/2
      );
    }
    // Metodos publicos
    return {
      init: init
    }
  }

  // Plugin jQuery
  $.fn.calificationCircle = function(options) {
    return this.each(function () {

      var circle =  new calificationCircle();

      circle.init(this, options);

      $.data( this, 'calificationCircle', circle );
    });
  };

  $.fn.calificationCircle.options = {
    'initialPoint' : -1*Math.PI/2,
    'speed' : Math.PI/64
  };
})(jQuery, window, document);
