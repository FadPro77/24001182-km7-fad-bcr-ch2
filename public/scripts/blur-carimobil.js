// Mendapatkan elemen-elemen yang diperlukan
const overlay = document.querySelector(".overlay");
const searchBox = document.querySelector(".search-box");

// Fungsi untuk menampilkan overlay dan menambahkan blur pada konten
function showOverlay() {
  overlay.style.display = "block"; // Tampilkan overlay
  document.body.classList.add("blur-active"); // Tambahkan blur ke seluruh body
}

// Fungsi untuk menghilangkan overlay dan blur
function hideOverlay() {
  overlay.style.display = "none"; // Sembunyikan overlay
  document.body.classList.remove("blur-active"); // Hapus blur dari body
}

// Menampilkan overlay ketika salah satu input dalam search-box di-klik
searchBox.querySelectorAll("input, select").forEach((input) => {
  input.addEventListener("focus", showOverlay);
});

// Menghilangkan overlay ketika user mengklik di luar search-box atau klik overlay
overlay.addEventListener("click", hideOverlay);
