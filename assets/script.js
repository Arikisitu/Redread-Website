window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("loader")?.classList.add("done"), 700);

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
});
