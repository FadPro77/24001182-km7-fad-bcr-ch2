// Fungsi untuk mengecek apakah form valid (semua input mandatory diisi)
function cekFormValid() {
  const tipeDriver = document.querySelector(".form__tipe-driver").value;
  const tanggal = document.querySelector(".form__tanggal").value;
  const waktu = document.querySelector(".form__waktu-jemput").value;

  // Jika tipe driver, tanggal, atau waktu kosong, return false
  return tipeDriver !== "" && tanggal !== "" && waktu !== "";
}

// Fungsi untuk toggle disabled pada tombol cari
function toggleTombolCari() {
  const tombolCari = document.querySelector(".btn-cari");
  if (cekFormValid()) {
    tombolCari.disabled = false; // Aktifkan tombol jika form valid
  } else {
    tombolCari.disabled = true; // Nonaktifkan tombol jika tidak valid
  }
}

// Panggil toggleTombolCari setiap kali ada perubahan di form
document
  .querySelector(".form__tipe-driver")
  .addEventListener("input", toggleTombolCari);
document
  .querySelector(".form__tanggal")
  .addEventListener("input", toggleTombolCari);
document
  .querySelector(".form__waktu-jemput")
  .addEventListener("input", toggleTombolCari);

// Fungsi pencarian mobil
async function cariMobil() {
  const tipeDriver = document.querySelector(".form__tipe-driver").value;
  const tanggal = document.querySelector(".form__tanggal").value;
  const waktu = document.querySelector(".form__waktu-jemput").value;
  const jumlahPenumpang = document.querySelector(
    ".form__jumlah-penumpang"
  ).value;

  if (!cekFormValid()) {
    alert("ISILAH FORM YANG TERSEDIA");
    return; // Hentikan proses jika form tidak valid
  }

  try {
    const response = await fetch("/data/cars.json");

    // Cek jika fetch gagal
    if (!response.ok) {
      throw new Error("Gagal mengambil data mobil");
    }

    const mobil = await response.json();
    console.log("Data mobil berhasil diambil:", mobil);

    const filteredCars = mobil.filter((car) => {
      const carDate = new Date(car.availableAt);
      const searchDate = new Date(`${tanggal}T${waktu}`);

      // Cek tipe driver
      const cocokDriver =
        (tipeDriver === "dengan-sopir" && car.transmission === "Manual") ||
        (tipeDriver === "tanpa-sopir" &&
          (car.transmission === "Automatic" ||
            car.transmission === "Automanual"));

      // Cek tanggal
      const cocokTanggal = carDate <= searchDate;

      // Cek kapasitas penumpang jika diisi, jika tidak diisi maka abaikan
      const cocokPenumpang =
        !jumlahPenumpang || car.capacity >= jumlahPenumpang;

      // Cek apakah mobil available
      const cocokAvailable = car.available === true;

      return cocokDriver && cocokTanggal && cocokPenumpang && cocokAvailable;
    });

    // Simpan hasil pencarian ke localStorage
    localStorage.setItem("mobilData", JSON.stringify(filteredCars));

    // Arahkan ke halaman hasil pencarian
    window.location.href = "hasilpencarian.html";
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

// Jalankan toggleTombolCari ketika halaman dimuat
document.addEventListener("DOMContentLoaded", toggleTombolCari);
