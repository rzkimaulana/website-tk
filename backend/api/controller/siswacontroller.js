const { siswa } = require("../../models");
const siswaValidation = require("../../validation/siswa");
const getsiswa = async (req, res) => {
  try {
    // Ambil data siswa dari database
    const dataSiswa = await siswa.findAll(); // Pastikan model 'Siswa' diimpor dengan benar
    res.status(200).json({
      success: true,
      siswa: dataSiswa,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data siswa.",
    });
  }
};


const getsiswaById = async (req, res) => {
  try {
    const { id } = req.params; 
    
    if (id) {
      
      const siswaById = await siswa.findByPk(id);
      
      if (!siswaById) {
        return res.status(404).json({ message: 'Produk tidak ditemukan' });
      }

      return res.status(200).json({
        siswa: siswaById,
      });
    } else {

      const siswa = await siswa.findAll();
      return res.status(200).json({
        siswa,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};


const updatesiswa = async (req, res) => {
  const { nama, tempatlahir, tanggallahir, jeniskelamin, alamat, namaorangtua, nohp,  } = req.body;
  try {
    const siswaUpdate = await siswa.update(
      {
        nama,
        tempatlahir,
        tanggallahir,
        jeniskelamin,
        alamat,
        namaorangtua,
        nohp
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.status(200).json({
      message: "Siswa updated successfully",
      siswa: siswaUpdate,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// const deleteProduct
const deletesiswa = async (req, res) => {
  try {
    const id = req.params.id;
    await siswa.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      message: "Siswa deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
   
    


const daftarSiswa = async (req, res) => {
  try {
    const { errors } = siswaValidation.validateCreatePayload(req.body);
    if (errors) {
      return res.status(400).json({ errors });
    }
    const {
      nama,
      tempatlahir,
      alamat,
      tanggallahir,
      jeniskelamin,
      namaorangtua,
      nohp,
    } = req.body;
    const data = req.body;
    if (!data) {
      return res.status(400).json({
        message: "data tidak ada",
      });
    }

    const siswabaru = await siswa.create({
      nama,
      tempatlahir,
      alamat,
      tanggallahir,
      jeniskelamin,
      namaorangtua,
      nohp,
    });

    return res.status(201).json({
      message: "Registration Berhasil",
      siswa: siswabaru,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Registration Gagal",
      error: error.message,
    });
  }
};

module.exports = {
  daftarSiswa,
  getsiswa,
  getsiswaById,
  updatesiswa,
  deletesiswa,
  
};
