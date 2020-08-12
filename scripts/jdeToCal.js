function jdejulian2simple(e) {
  var t, n, a, l, i;
  if (
    ((t = parseInt(e.substr(0, 1), 10)),
    (n = parseInt(e.substr(1, 2), 10)),
    (a = parseInt(e.substr(3, 3), 10)),
    isNaN(t) || isNaN(n) || isNaN(a) || t < 0 || n < 0 || a <= 0 || a > 366)
  )
    return "Invalid JDE Julian Date";
  if (((l = 100 * (19 + t) + n), 366 == a && !leapYear(l)))
    return "Invalid JDE Julian Date";
  var r = dateFromDay(l, a);
  return "Invalid Date" ==
    parseDate(
      (i =
        zeroFill(r.getDate(), 2) +
        "/" +
        zeroFill(r.getMonth() + 1, 2) +
        "/" +
        l)
    )
    ? "Invalid JDE Julian Date"
    : i;
}
function simple2jdejulian(e) {
  var t, n, a, l, i;
  if ("Invalid Date" == parseDate(e)) return "Invalid Date";
  if (
    ((n = (t = parseDate(e)).getFullYear()),
    (a = Math.floor((n - 1900) / 100)) < 0 || a > 9)
  )
    return "Invalid Date for JDE";
  l = n % 100;
  var r = new Date(t.getFullYear(), 0, 1);
  return (
    (i = zeroFill(Math.round((t - r) / 1e3 / 60 / 60 / 24 + 1, 0), 3)),
    zeroFill(0 == a ? l + "" + i : a + "" + l + i, 6)
  );
}
function jdetosimple() {
  var e = document.getElementById("julianDate").value;
  parseInt(e, 10);
  if (e.length > 6) alert("JDE Julian Date must be 6 digits long.");
  else {
    e.length < 6 &&
      ((e = zeroFill(e, 6)), (document.getElementById("julianDate").value = e));
    var t = jdejulian2simple(e);
    "Invalid JDE Julian Date" != t
      ? (document.getElementById("simpleDateConverted").value = t)
      : alert(t);
  }
}
function simpletojde() {
  var e = simple2jdejulian(document.getElementById("simpleDate").value);
  "Invalid Date" != e
    ? "Invalid Date for JDE" != e
      ? (document.getElementById("julianDateConverted").value = e)
      : alert("JDE dates can range from year 1900 to 2899 only.")
    : alert("Invalid Date");
}
function simpletojdes() {
  var e,
    t,
    n,
    a = document.getElementById("simpledates").value.trim().split("\n"),
    l = a.length;
  for (n = document.getElementById("jdedates"), e = 0; e < l; e++)
    (t = simple2jdejulian(a[e])),
      0 != e ? (n.value += "\n" + t) : (n.value = t);
}
function jdetosimples() {
  var e,
    t,
    n,
    a = document.getElementById("jdedates").value.trim().split("\n"),
    l = a.length;
  for (n = document.getElementById("simpledates"), e = 0; e < l; e++)
    (t =
      a[e].trim().length > 6
        ? "Invalid JDE Date"
        : jdejulian2simple(zeroFill(a[e].trim(), 0))),
      0 != e ? (n.value += "\n" + t) : (n.value = t);
}
function zeroFill(e, t) {
  return (t -= e.toString().length) > 0
    ? new Array(t + (/\./.test(e) ? 2 : 1)).join("0") + e
    : e + "";
}
function parseDate(e) {
  var t = e.split("/"),
    n = new Date(t[2], t[1] - 1, t[0]);
  return n && n.getMonth() + 1 == t[1] && n.getDate() == Number(t[0])
    ? n
    : "Invalid Date";
}
function dateFromDay(e, t) {
  var n = new Date(e, 0);
  return new Date(n.setDate(t));
}
function leapYear(e) {
  return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0;
}
function myTrim(e) {
  return e.replace(/^\s+|\s+$/gm, "");
}
"function" != typeof String.prototype.trim &&
  (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
  }),
  $(document).ready(function () {
    $("#simpleDate").val(moment().format("DD/MM/YYYY")),
      $("#convertStoJ").click(),
      $("#julianDate").val($("#julianDateConverted").val()),
      $("#convertJtoS").click(),
      $("#msimpletojde").click(),
      $("#julianDate").on("keypress", function (e) {
        13 == e.which && $("#convertJtoS").click();
      }),
      $("#simpleDate").on("keypress", function (e) {
        13 == e.which && $("#convertStoJ").click();
      });
  });
