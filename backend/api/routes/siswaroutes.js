const { daftarSiswa, getsiswa, getsiswaById, updatesiswa, deletesiswa } = require("../controller/siswacontroller")

const express = require("express");
const router = express.Router();

router.post("/siswa", daftarSiswa);
router.get("/siswa", getsiswa);
router.get("/:id", getsiswaById);
router.put("/:id", updatesiswa);
router.delete("/:id", deletesiswa);

module.exports = router;
