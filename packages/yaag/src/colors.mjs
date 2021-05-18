// <http://www.w3.org/TR/css3-color/#svg-color>
export const names =  {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
};



// Parse name||hex to r g b a
export function toRGBA(color) {

    function parseIntFromHex(val) {
        return parseInt(val, 16);
    }
    function convertHexToDecimal(h) {
        return (parseIntFromHex(h) / 255);
    }

    color = color.replace(/^\s+/,'').replace(/\s+$/, '').toLowerCase();
    let named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    } else if (color == 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0 };
    }
    let match;
    // hex8
    if ((match = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4])
        };
    }
    // hex6
    if ((match = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: 1,
        };
    }
    // hex4
    if ((match = /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/.exec(color))) {
        return {
            r: parseIntFromHex(`${match[1]}${match[1]}`),
            g: parseIntFromHex(`${match[2]}${match[2]}`),
            b: parseIntFromHex(`${match[3]}${match[3]}`),
            a: convertHexToDecimal(`${match[4]}${match[4]}`)

        };
    }
    // hex3
    if ((match = /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/.exec(color))) {
        return {
            r: parseIntFromHex(`${match[1]}${match[1]}`),
            g: parseIntFromHex(`${match[2]}${match[2]}`),
            b: parseIntFromHex(`${match[3]}${match[3]}`),
            a: 1,
        };
    }
    throw new Error('Cannot parse this color: ' + color);
    return false;
}



export function toWGL(r,g,b,a = 1) {
  if (typeof r == "string") {
    const c = toRGBA(r)
    r = c.r
    g = c.g
    b = c.b
    a = c.a
  }
  const aa = a * 255
  return (r << 24) | (g << 16) | (b << 8) | aa
}

export function WGLtoRgba(x) {
  return {
    r:(x >> 24) & 0xff ,
    g:(x >> 16) & 0xff ,
    b:(x >> 8) & 0xff ,
    // TODO is there a better way !?
    a:(((x) & 0xff )/255).toPrecision(2)
  };
}

// 0xRRGGBBAA

export function getComplimentaryColor(color, lightningFactor = 1, alpha = 0xaa) {
   let r = (color >> 24) & 0xff;
   let g = (color >> 16) & 0xff;
   let b = (color >> 8) & 0xff;
   let [h, s, l] = rgbToHsl(r, g, b);
   if (l > 0.5) lightningFactor = .8;
   let [r0, g0, b0] = hslToRgb(h, s, Math.min(1, l * lightningFactor));
   // let r0 = Math.max(r, b, g) + Math.min(r,b,g) - r;
   // let b0 = Math.max(r, b, g) + Math.min(r,b,g) - b;
   // let g0 = Math.max(r, b, g) + Math.min(r,b,g) - g;
   return (r0 << 24) | (g0 << 16) | (b0 << 8) | alpha;
 }
function rgbToHsl(r, g, b) {
 r /= 255, g /= 255, b /= 255;

 var max = Math.max(r, g, b), min = Math.min(r, g, b);
 var h, s, l = (max + min) / 2;

 if (max == min) {
   h = s = 0; // achromatic
 } else {
   var d = max - min;
   s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

   switch (max) {
     case r: h = (g - b) / d + (g < b ? 6 : 0); break;
     case g: h = (b - r) / d + 2; break;
     case b: h = (r - g) / d + 4; break;
   }

   h /= 6;
 }

 return [ h, s, l ];
}

function hslToRgb(h, s, l) {
 var r, g, b;

 if (s == 0) {
   r = g = b = l; // achromatic
 } else {
   var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
   var p = 2 * l - q;

   r = hue2rgb(p, q, h + 1/3);
   g = hue2rgb(p, q, h);
   b = hue2rgb(p, q, h - 1/3);
 }

 return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];

   function hue2rgb(p, q, t) {
     if (t < 0) t += 1;
     if (t > 1) t -= 1;
     if (t < 1/6) return p + (q - p) * 6 * t;
     if (t < 1/2) return q;
     if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
     return p;
   }
}
