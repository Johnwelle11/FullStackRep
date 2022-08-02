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
  console.log(event);
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

// $signup.click(() => {
//   const info = {
//     id: undefined,
//     firstname: $("#fname").val(),
//     lastname: $("#lname").val(),
//     address: $("#address").val(),
//     email: $("#email").val(),
//     gym_id: 1,
//   };
//   $.ajax({
//     url: "/cars",
//     method: "POST",
//     contentType: "application/json",
//     data: JSON.stringify(info),
//     dataType: "json",
//   });
// });

var modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
