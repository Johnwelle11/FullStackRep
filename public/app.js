// $.get("/cars", (res) => {
//   console.log(res);
// });

fetch("/cars")
  .then((res) => res.json())
  .then((cars) => {
    document.write(JSON.stringify(cars));
  });
