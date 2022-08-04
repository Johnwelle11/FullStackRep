// // import { data } from "jquery";

// fetch("/cars")
//   .then((res) => res.json())
//   .then((cars) => console.log(cars));

// fetch("/cars", {
//   method: "POST",
//   mode: "cors",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(),
// })
//   .then((res) => res.json())
//   .then((cars) => console.log(cars));

// fetch("/cars", {
//   method: "GET",
//   mode: "cors",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(),
// })
//   .then((res) => res.json())
//   .then((cars) => console.log(cars));

const $input = $('input[name="search"]');
const $userForm = $("#user-form");
$userForm.submit((event) => {
  // console.log(event);
  event.preventDefault();
  const userInput = Number($input.val());
  const URL = `/cars/${userInput}`;
  $.get(URL, (data) => {
    console.log(data);
    let results = $("#results");
    results.html("");
    const $span = $("<span></span>");
    $span.addClass("result-id");
    $span.appendTo(results);
    const $h3 = $(`<h3>${data.name}</h3>`);
    $h3.addClass("car-name");
    $h3.appendTo($span);
    const $h2 = $(`<h2>${data.type}</h2>`);
    $h2.addClass("car-type");
    $h2.appendTo($span);
    const $div = $(`<div>${data.model}</div>`);
    $div.addClass("car-model");
    $div.appendTo($span);
    const $p = $(`<p>${data.address}</p>`);
    $p.appendTo($div);
    const $a = $(`<a>${data.id}</a>`);
    $a.appendTo($span);
  });
});

const $input1 = $('input[name="search1"]');
const $users = $("#users");
$("#submit1").click((event) => {
  console.log(event);
  event.preventDefault();
  const users = Number($input1.val());
  console.log(users);
  const URL = `/car_owners/${users}`;
  $.get(URL, (data) => {
    console.log("milk");
    let results = $("#results1");
    results.html("");
    const $span = $("<span></span>");
    $span.addClass("result-id1");
    $span.appendTo(results);
    const $h3 = $(`<h3>${data.name}</h3>`);
    $h3.addClass("user-name");
    $h3.appendTo($span);
    const $h2 = $(`<h2>${data.phone_number}</h2>`);
    $h2.addClass("user-phone_number");
    $h2.appendTo($span);
    const $div = $(`<div>${data.email}</div>`);
    $div.addClass("user-email");
    $div.appendTo($span);
    const $p = $(`<p>${data.id}</p>`);
    $p.appendTo($div);
    // const $a = $(`<a>${data.id}</a>`);
    // $a.appendTo($span);
  });
});

const $allUsers = $("#allUsers");
$("#submit2").click((event) => {
  console.log(event);
  event.preventDefault();
  const URL = `/car_owners`;
  // results.html("");
  $.get(URL, (data) => {
    for (let i = 0; i < data.length; i++) {
      console.log(data);

      let results = $("#results1");
      const $span = $("<span></span>");
      $span.addClass("result-id1");
      $span.appendTo(results);
      const $h3 = $(`<h3>${data[i].name}</h3>`);
      $h3.addClass("user-name");
      $h3.appendTo($span);
      const $h2 = $(`<h2>${data[i].phone_number}</h2>`);
      $h2.addClass("user-phone_number");
      $h2.appendTo($span);
      const $div = $(`<div>${data[i].email}</div>`);
      $div.addClass("user-email");
      $div.appendTo($span);
      const $p = $(`<p>${data[i].id}</p>`);
      $p.appendTo($div);
    }
  });
});

const $signup = $(".signup");
// const $userForm = $("#user-form");
$signup.click(() => {
  console.log("milk");
  const owner = {
    id: undefined,
    name: $("#1").val(),
    phone_number: $("#3").val(),
    email: $("#2").val(),
    id: 1,
  };
  console.log(owner);
  $.ajax({
    url: "/car_owners",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(owner),
    dataType: "json",
  });
  window.open("./index.html");
});

// var modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };
