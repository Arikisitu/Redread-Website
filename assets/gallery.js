/*
  RedRead Gallery
  Local file:// preview: uses assets/gallery-manifest.js
  Hosted site: refreshes from screenshots.json
*/
function renderRedReadGallery() {
  const allItems = Array.isArray(window.REDREAD_SCREENSHOTS)
    ? window.REDREAD_SCREENSHOTS
    : [];
  const items = allItems.slice(0, 6);

  const section = document.getElementById("screenshots");
  const gallery = document.getElementById("gallery");
  const navLink = document.querySelector('a[href="#screenshots"]');

  if (!section || !gallery) return;

  gallery.replaceChildren();

  if (!items.length) {
    section.hidden = true;
    if (navLink) navLink.hidden = true;
    return;
  }

  section.hidden = false;
  if (navLink) navLink.hidden = false;

  items.forEach((item, index) => {
    if (!item || !item.src) return;

    const card = document.createElement("article");
    card.className = `shot reveal${index === 0 ? " large" : ""}${index === items.length - 1 ? " website-shot" : ""}`;

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.caption || item.title || `RedRead screenshot ${index + 1}`;
    img.loading = index < 2 ? "eager" : "lazy";

    img.addEventListener("error", () => {
      card.remove();
      if (!gallery.children.length) {
        section.hidden = true;
        if (navLink) navLink.hidden = true;
      }
    });

    const label = document.createElement("div");
    label.className = "shot-label";
    label.textContent =
      `REDREAD / ${String(index + 1).padStart(2, "0")} — ${item.title || "SCREENSHOT"}`;

    card.append(img, label);
    gallery.appendChild(card);

    observeGalleryCard(card);
    card.addEventListener("click", () => openRedReadLightbox(img, label.textContent));
  });
}

let galleryObserver = null;

function observeGalleryCard(el) {
  if ("IntersectionObserver" in window) {
    if (!galleryObserver) {
      galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            galleryObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
    }
    galleryObserver.observe(el);
  } else {
    el.classList.add("show");
  }
}

async function updateGalleryFromJson() {
  if (location.protocol === "file:") return;

  try {
    const response = await fetch("screenshots.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("screenshots.json must be an array");

    window.REDREAD_SCREENSHOTS = data.filter(
      (item) => item && typeof item.src === "string" && item.src.trim()
    );
  } catch (error) {
    console.warn("RedRead: using local/generated screenshot manifest.", error);
  }
}

function openRedReadLightbox(img, caption) {
  const lightbox = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-image");
  const captionEl = document.getElementById("lightbox-caption");

  if (!lightbox || !image) return;

  image.src = img.src;
  image.alt = img.alt;
  if (captionEl) captionEl.textContent = caption || "";

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeRedReadLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

document.addEventListener("DOMContentLoaded", async () => {
  await updateGalleryFromJson();
  renderRedReadGallery();
});

document.querySelector(".lightbox-close")?.addEventListener(
  "click",
  closeRedReadLightbox
);

document.getElementById("lightbox")?.addEventListener("click", (event) => {
  if (event.target.id === "lightbox") closeRedReadLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeRedReadLightbox();
});
