var LineBlinker = {};
var orig = {};
var typing = {};
var deleting = {};

function LineBlink(state = true, HTMLELM = document.body, att = "") {
  if (state) {
    if (!orig[HTMLELM.id]) {
      orig[HTMLELM.id] = HTMLELM.innerHTML;
    }
    HTMLELM.innerHTML = orig[HTMLELM.id];
    LineBlinker[HTMLELM.id] = setInterval(() => {
      var text = HTMLELM.innerHTML;
      var textBool = (text.length - orig[HTMLELM.id].length) % 2;
      var textT = text.slice(0, -1); // dif length as orig
      var textF = text + att; //same length as orig
      HTMLELM.innerHTML = textBool ? textT : textF;
    }, 500);
  } else {
    clearInterval(LineBlinker[HTMLELM.id]);
    HTMLELM.innerHTML = orig[HTMLELM.id];
  }
}

function TypeText({
  text = "",
  delay = 0,
  speed = [100, 20],
  byp = false,
  HTMLELM = document.body,
  att = "$",
} = {}) {
  var objName = HTMLELM.id;
  if ((!deleting[objName] && !typing[objName]) || byp) {
    typing[objName] = true;
    setTimeout(() => {
      var char = text.slice(0, 1);
      if (!LineBlinker[objName]) {
        LineBlink(true, HTMLELM, att);
      }
      LineBlink(false, HTMLELM, att);
      orig[objName] = orig[objName] + char;
      LineBlink(true, HTMLELM, att);
      HTMLELM.innerHTML += att;
      setTimeout(() => {
        return text.length
          ? TypeText({
              text: text.slice(1),
              delay: 0,
              speed: speed,
              byp: true,
              HTMLELM: HTMLELM,
              att: att,
            })
          : (typing[objName] = false);
      }, Math.round(Math.random() * (speed[0] - speed[1]) + speed[1]));
    }, delay);
  } else {
    setTimeout(() => {
      TypeText({
        text: text,
        delay: delay,
        speed: speed,
        byp: false,
        HTMLELM: HTMLELM,
        att: att,
      });
    }, 50);
  }
}

function DeleteText({
  amount = 1,
  delay = 0,
  speed = [30, 20],
  byp = false,
  HTMLELM = document.body,
  att = "|",
} = {}) {
  var objName = HTMLELM.id;
  if ((!deleting[objName] && !typing[objName]) || byp) {
    deleting[objName] = true;
    setTimeout(() => {
      if (!LineBlinker[objName]) {
        LineBlink(true, HTMLELM, att);
      }
      LineBlink(false, HTMLELM, att);
      var chars = orig[objName].length - 1;
      orig[objName] = chars ? orig[objName].slice(0, -1) : " ";
      amount = !amount ? amount : --amount;
      LineBlink(true, HTMLELM, att);
      HTMLELM.innerHTML += att;
      setTimeout(() => {
        return amount
          ? DeleteText({
              amount: amount,
              delay: 0,
              speed: speed,
              byp: true,
              HTMLELM: HTMLELM,
              att: att,
            })
          : (deleting[objName] = false);
      }, Math.round(Math.random() * (speed[0] - speed[1]) + speed[1]));
    }, delay);
  } else {
    setTimeout(() => {
      DeleteText({
        amount: amount,
        delay: delay,
        speed: speed,
        byp: false,
        HTMLELM: HTMLELM,
        att: att,
      });
    }, 50);
  }
}
