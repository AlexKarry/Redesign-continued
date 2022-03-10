export function handleSubmit(event) {
  event.preventDefault();
  // The Object.fromEntries() method transforms a list of key-value pairs into an object.
  // The FormData interface constructs a set of key/value pairs representing form fields and their values
  const formData = Object.fromEntries(new FormData(event.target));
  console.log(" form data ", formData);
  fetch(`http://localhost:3006/api`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}
