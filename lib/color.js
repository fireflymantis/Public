//*** This code is copyright 2003 by Gavin Kistner, gavin@refinery.com
//*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
//*** Reuse or modification is free provided you abide by the terms of that license.
//*** (Including the first two lines above in your source code satisfies the conditions.)


this.rgb2hsv = function(r,g,b){
 //***Returns an hsv object from RGB values
 //***The r (red), g (green), and b (blue) should be values in the range 0 to 1
 //***The returned object has .h, .s, and .v properties.
 //***h is a value from 0 to 360
 //***s and v are values between 0 and 1
  var h,s,v,max,min,d;

  r=r>1?1:r<0?0:r;
  g=g>1?1:g<0?0:g;
  b=b>1?1:b<0?0:b;

  max=min=r;
  if (g>max) max=g; if (g<min) min=g;
  if (b>max) max=b; if (b<min) min=b;
  d=max-min;
  v=max;
  s=(max>0)?d/max:0;

  if (s==0) h=0;
  else {
   h=60*((r==max)?(g-b)/d:((g==max)?2+(b-r)/d:4+(r-g)/d));
   if (h<0) h+=360;
  }
  return {h:h,s:s,v:v}
}

this.hsv2rgb = function(h,s,v){
 //***Returns an rgb object from HSV values
 //***h (hue) should be a value from 0 to 360
 //***s (saturation) and v (value) should be a value between 0 and 1
 //***The .r, .g, and .b properties of the returned object are all in the range 0 to 1
 var r,g,b,i,f,p,q,t;
 while (h<0) h+=360;
 h%=360;
 s=s>1?1:s<0?0:s;
 v=v>1?1:v<0?0:v;

 if (s==0) r=g=b=v;
 else {
  h/=60;
  f=h-(i=Math.floor(h));
  p=v*(1-s);
  q=v*(1-s*f);
  t=v*(1-s*(1-f));
  switch (i) {
   case 0:r=v; g=t; b=p; break;
   case 1:r=q; g=v; b=p; break;
   case 2:r=p; g=v; b=t; break;
   case 3:r=p; g=q; b=v; break;
   case 4:r=t; g=p; b=v; break;
   case 5:r=v; g=p; b=q; break;
  }
 }
 return {r:r,g:g,b:b};
}

this.hex2dec = function(hex){
 //*** Turns a hexadecimal number into an integer
 return parseInt(hex,16);
}


this.dec2hex = function(dec,padTo){
 //*** Turns a decimal number into hexadecimal
 //*** If padTo is specified (optional) the result is padded with leading zeros to the specified number of characters
 var h=Math.round(dec).toString(16).toLowerCase();
 if (padTo && h.length<padTo) h=(Math.pow(10,padTo-h.length)+h).substr(1);
 return h;
}


this.htmlFromRgb = function(rgb){
 //*** Returns an HTML string like '#f3ca12' from an 'rgb' object
  return "#"+this.dec2hex(rgb.r*255,2)+this.dec2hex(rgb.g*255,2)+this.dec2hex(rgb.b*255,2);
    var decColor = rgb.r + (256 * rgb.g) + (65536 * rgb.b);
    var hexColor = decColor.toString(16);
    console.info([rgb, decColor, hexColor]);
    while (hexColor.length <= 6) hexColor += "0" + hexColor;
    return "#" + hexColor;

}


this.rgbFromHtml = function(htmlrgb){
 //*** Returns an rgb object from an HTML string like '#f3ca12' or '#ccc' (leading # is optional)
 if (htmlrgb.length==7 || htmlrgb.length==4) htmlrgb=htmlrgb.substr(1);
 if (htmlrgb.length==3) htmlrgb=htmlrgb.charAt(0)+htmlrgb.charAt(0)+htmlrgb.charAt(1)+htmlrgb.charAt(1)+htmlrgb.charAt(2)+htmlrgb.charAt(2);
 if (htmlrgb.length!=6) return null;
 return {r:this.hex2dec(htmlrgb.substr(0,2))/255,g:this.hex2dec(htmlrgb.substr(2,2))/255,b:this.hex2dec(htmlrgb.substr(4,2))/255}
}
