document.getElementById("contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    fullName: this.fullName.value,
    email: this.email.value,
    phone: this.phone.value,
    subject: this.subject.value,
    message: this.message.value,
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      this.reset();
    } else {
      alert(data.error || "Something went wrong.");
    }
  } catch (error) {
    alert("Server error. Try again later.");
  }
});
